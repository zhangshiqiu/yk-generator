/**
 * Created by zsq on 18-5-21.
 */
'use strict';
let convert = require('./convert');

const RULE_REG = /^(\w+)\s?(\w+)?\s?(\w+)?$/;
const converts = {
  'string': convert.toStr,
  'int': convert.toInt,
  'float': convert.toFloat,
  'datetime': convert.toDatetime,
  'object': convert.toObject,
  'array': convert.toArray,
  'bool': convert.toBool,
  'encodeURIComponent':convert.encodeURIComponent,
  'decodeURIComponent':convert.decodeURIComponent
};

class validateParamMiddle{
  static validate(req,res,rules){
    if(!rules || !convert.isObject(rules) || !convert.isObjectEmpty(rules)) return [];
    let keys= Object.keys(rules);
    let isWrong= false;
    let args= [];
    let error= {};
    for(let key of keys){
      let params= validateParamMiddle.validateFormat(key);
      if(params instanceof Error){
        error= params;
        isWrong= true;
        break;
      }
      params['isNeed']= rules[key];
      let value= validateParamMiddle.validateValue(params,req);
      if(value instanceof Error){
        error= value;
        isWrong= true;
        break;
      }
      args.push(value);
    }
    if(!isWrong) return args;
    return error;
  }

  static validateFormat(key){
    let match= key.match(RULE_REG);
    if(match){
      return {
        name: match[1],
        position: match[2],
        type: match[3] || 'string'
      }
    }else {
      return new Error('参数配置格式有误: '+key);
    }
  }
  static validateValue(params,req){
    let value= req[params['position']][params['name']];
    if(params['isNeed'] && !value){
      return new Error('缺少参数'+params['name']);
    }
    return converts[params['type']](value);
  }
}

module.exports= validateParamMiddle;