/// <reference types='reflect-metadata'/>

export const singletonObjects: any[] = [];

/**
 * 根据类型初始化目标类的字段
 * @param target 目标类
 * @param key 类的字段
 */
export function Autowired(target: any, key: string) {
  const Type = Reflect.getMetadata("design:type", target, key);
  let n: any = null;
  if (Type) {
    for (const o of singletonObjects) {
      if (o instanceof Type) {
        n = o;
        break;
      }
    }
    if (n == null) {
      n = new Type();
      singletonObjects.push(n);
    }
  }

  const getter = () => {
    if (n) {
      return n;
    } else {
      return () => {
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

export function createSingletonObject(Type: any, ...args: any) {
  let n: any = null;

  if (Type) {
    for (const o of singletonObjects) {
      if (o instanceof Type) {
        n = o;
        break;
      }
    }

    if (n == null) {
      n = new Type(...args);
      singletonObjects.push(n);
    }
  }
  return n;
}

export function asyncData(params?: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(target, propertyKey, descriptor);
  };
}
