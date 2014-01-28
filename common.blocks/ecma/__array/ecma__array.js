(function() {

var ptp = Array.prototype,
    toStr = Object.prototype.toString,
    methods = {
        indexOf : function(item, fromIdx) {
            fromIdx = +(fromIdx || 0);

            var t = this, len = t.length;

            if(len > 0 && fromIdx < len) {
                fromIdx = fromIdx < 0? Math.ceil(fromIdx) : Math.floor(fromIdx);
                fromIdx < -len && (fromIdx = 0);
                fromIdx < 0 && (fromIdx = fromIdx + len);

                while(fromIdx < len) {
                    if(fromIdx in t && t[fromIdx] === item)
                        return fromIdx;
                    ++fromIdx;
                }
            }

            return -1;
        },

        forEach : function(callback, ctx) {
            var i = -1, t = this, len = t.length;
            while(++i < len) i in t &&
                (ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t));
        },

        map : function(callback, ctx) {
            var i = -1, t = this, len = t.length,
                res = new Array(len);

            while(++i < len) i in t &&
                (res[i] = ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t));

            return res;
        },

        filter : function(callback, ctx) {
            var i = -1, t = this, len = t.length,
                res = [];

            while(++i < len) i in t &&
                (ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)) && res.push(t[i]);

            return res;
        },

        reduce : function(callback, initialVal) {
            var i = -1, t = this, len = t.length,
                res;

            if(arguments.length < 2) {
                while(++i < len) {
                    if(i in t) {
                        res = t[i];
                        break;
                    }
                }
            } else {
                res = initialVal;
            }

            while(++i < len) i in t &&
                (res = callback(res, t[i], i, t));

            return res;
        },

        some : function(callback, ctx) {
            var i = -1, t = this, len = t.length;

            while(++i < len)
                if(i in t && (ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)))
                    return true;

            return false;
        },

        every : function(callback, ctx) {
            var i = -1, t = this, len = t.length;

            while(++i < len)
                if(i in t && !(ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)))
                    return false;

            return true;
        }
    };

for(var name in methods)
    ptp[name] || (ptp[name] = methods[name]);

Array.isArray || (Array.isArray = function(obj) {
    return toStr.call(obj) === '[object Array]';
});

})();