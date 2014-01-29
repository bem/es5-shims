/* global MAKE:false */

var PATH = require('path'),
    environ = require('bem-environ')(__dirname),
    U = require('bem').util;

require('./nodes')(MAKE);

try {
    require(environ.getLibPath('bem-pr', 'bem/nodes'))(MAKE);
} catch(e) {
    if(e.code !== 'MODULE_NOT_FOUND') throw e;
    require('bem/lib/logger').warn('"bem-pr" is not installer');
}


MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,
    bundlesLevelsRegexp : /^.+?\.bundles$/,

    createCustomNodes : function() {
        var SetsNode = MAKE.getNodeClass('SetsNode');

        if(typeof SetsNode.createId === 'undefined') {
            return;
        }

        return SetsNode
            .create({ root : this.root, arch : this.arch })
            .alterArch();
    }

});


MAKE.decl('SetsNode', {

    /**
     * Описание уровней-источников для сетов
     * @returns {Object}
     */
    getSets : function() {
        return {
            'common' : ['common.blocks']
        };
    },

    getSourceTechs : function() {
        return ['specs'];
    }

});


MAKE.decl('BundleNode', {

    /**
     * Технологии сборки бандла / примера
     * @returns {Array}
     */
    getTechs : function() {
        return [
            'bemdecl.js',
            'deps.js',
            'js'
        ];
    },

    /**
     * Список технологий которые необходимо собирать в отдельном процессе
     * @returns {Array}
     */
    getForkedTechs : function() {
        return this.__base().concat(['browser.js+bemhtml']);
    },

    /**
     * Возвращает платформу по пути к уровню перепределения.
     *
     * @example
     *  'desktop.blocks'    -> desktop
     *  'touch-pad.bundles' -> touchPad
     *
     * @param {String} levelPath
     * @returns {String}
     */
    getPlatform : function(levelPath) {
        return levelPath.split('.')[0].replace(/-([a-z])/gi, function(_, letter) {
            return letter.toUpperCase();
        });
    },

    getCommonLevels : function() {
        return [
            'common.blocks'
        ];
    },

    /**
     * Возвращает список уровней переопределения для сборки бандла
     * @returns {Array}
     */
    getLevels : function() {
        var resolve = PATH.resolve.bind(PATH, this.root),
            buildLevel = this.getLevelPath(),
            getPlatformLevelsFn = 'get' + U.toUpperCaseFirst(this.getPlatform(buildLevel)) + 'Levels',
            levels = [];

        if(typeof this[getPlatformLevelsFn] === 'function') {
            Array.prototype.push.apply(levels, this[getPlatformLevelsFn].apply(this, arguments));
        }

        if(!levels.length) {
            return [];
        }

        return levels
            .map(function(path) { return resolve(path) })
            .concat(resolve(PATH.dirname(this.getNodePrefix()), 'blocks'));
    }
});

MAKE.decl('SpecNode', {

    getTechs : function() {
        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'spec.js+browser.js+bemhtml',
            'bemhtml',
            'html',
            'phantomjs'
        ];
    },

    getForkedTechs : function() {
        return ['bemhtml', 'spec.js+browser.js+bemhtml', 'phantomjs'];
    },

    getLevels : function() {
        return this.__base.apply(this, arguments)
            .concat(environ.getLibPath('bem-pr', 'spec.blocks'));
    }

});
