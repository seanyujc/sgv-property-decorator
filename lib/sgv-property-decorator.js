/// <reference types='reflect-metadata'/>
export var singletonObjects = [];
/**
 * 根据类型初始化目标类的字段
 * @param target 目标类
 * @param key 类的字段
 */
export function Autowired(target, key) {
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
