//Note: In this file only write "PURE Function"
// Do not add any other service here. 

import { NonArrayObject } from "../models/utility.model";

/**
 * @param obj : it should be object
 * @param chain : 'obj.some_value1.some_value2'
 * @description: it will be use in place of optional chaining
 * Eg: obj?.some_value1?.some_value2. 
 * It will help to increase the code coverage While writing test cases.
 */

export function getObjValue(obj:NonArrayObject, chain:string):any {
    if(!obj) {
        return undefined;
    }

    const keys = chain.split('.');
    let result = obj;
    for (const key of keys) {
        result = result[key];
        if (result === undefined || result === null) {
            break;
        }
    }
    return result;

}

/**
 * @param json: It contains json string
 * @description: It checks given string is valid json or not
 * Eg: JSON.parse on plain string throws errors
 * Always use this function before JSON.parse
 */
export function isValidJSON(json:string):boolean {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * @param obj: it should be object
 * @description: It gives you deep clone object
 */
export function cloneObject<T extends object>(object:T):T {
    return JSON.parse(JSON.stringify(object));
}


export function isUndefinedNullOrEmpty(object:any) {
    let isUndefinedOrNull = true;
    if (typeof object === 'number') {
      isUndefinedOrNull = false;
    } else if (object) {
      isUndefinedOrNull = false;

      //this check only blank object {}
      if (
        typeof object === 'object' &&
        !Array.isArray(object) &&
        Object.keys(object).length === 0
      ) {
        isUndefinedOrNull = true;
      }
    }
  
    return isUndefinedOrNull;
}


export function setSession(key:string,data:any) {
    sessionStorage.setItem(key,JSON.stringify(data));
}
  
export function getSession(key:string) {
    try {
      const storedData = sessionStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      return null;
    }
}

export function removeSession(key:string) {
    sessionStorage.removeItem(key);
}