module.exports = {
    options : {
        expr : true,
        eqeqeq : true,
        undef : true,
        boss : true,
        sub : true,
        supernew : true,
        loopfunc : true,
        onecase : true,
        quotmark : 'single'
    },

    groups : {
        browserjs : {
            options : {
                browser : true,
                predef : ['modules']
            },
            includes : ['*.blocks/**/*.js'],
            excludes : [
                '**/*.bem/*.js',
                '**/*.deps.js',
                '**/*.spec.js'
            ]
        },

        specjs : {
            options : {
                browser : true,
                predef : [
                    'modules',
                    'describe',
                    'it',
                    'before',
                    'beforeEach',
                    'after',
                    'afterEach'
                ]
            },
            includes : ['*.blocks/**/*.spec.js']
        },

        bemdecljs : {
            options : {
                asi : true,
                predef : ['exports']
            },
            includes : [
                '*.bundles/**/*.bemdecl.js'
            ],
            excludes : [
                '**/.bem/**/*',
                '*.specs/**/*',
                'libs/**/*',
                'node_modules/**/*'
            ]
        }
    }
};
