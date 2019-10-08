(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.SGVPropertyDecorator = {}));
}(this, function (exports) { 'use strict';

    /// <reference types='reflect-metadata'/>
    var singletonObjects = [];
    /**
     * 根据类型初始化目标类的字段
     * @param target 目标类
     * @param key 类的字段
     */
    function Autowired(target, key) {
        var Type = Reflect.getMetadata("design:type", target, key);
        var n = null;
        for (var _i = 0, singletonObjects_1 = singletonObjects; _i < singletonObjects_1.length; _i++) {
            var o = singletonObjects_1[_i];
            if (o instanceof Type) {
                n = o;
                break;
            }
        }
        if (n == null) {
            n = new Type();
            singletonObjects.push(n);
        }
        var getter = function () {
            if (n) {
                return n;
            }
            else {
                return function () {
                    return null;
                };
            }
        };
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: true,
                get: getter,
                set: undefined,
            });
        }
    }
    function asyncData(params) {
        return function (target, propertyKey, descriptor) {
            console.log(target, propertyKey, descriptor);
        };
    }

    exports.Autowired = Autowired;
    exports.asyncData = asyncData;
    exports.singletonObjects = singletonObjects;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
