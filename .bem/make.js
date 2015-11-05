/* global MAKE:false */

var PATH = require('path'),
    environ = require('bem-environ')(__dirname);

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
     * Возвращает список уровней переопределения для сборки бандла
     * @returns {Array}
     */
    getLevels : function() {
        var resolve = PATH.resolve.bind(PATH, this.root);
        return [
            'common.blocks'
        ]
        .map(function(path) { return resolve(path); })
        .concat(resolve(PATH.dirname(this.getNodePrefix()), 'blocks'));
    }
});

MAKE.decl('SpecNode', {

    getTechs : function() {
        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'css',
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
        return [
            'libs/bem-core/common.blocks',
            'common.blocks'
        ]
        .map(function(path) { return PATH.resolve(this.root, path); }, this)
        .concat(environ.getLibPath('bem-pr', 'spec.blocks'));
    }

});
