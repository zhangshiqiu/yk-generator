'use strict';


function convertToObject(str, defaultValue) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
}

exports.isObject= function (obj) {
  let type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};
exports.toStr = function(str) {
  return str;
};

exports.toInt = function(str) {
  return parseInt(str) || 0;
};

exports.toFloat = function(str) {
  return parseFloat(str) || 0;
};

exports.toDatetime = function(str) {
  return new Date(str ? Date.parse(str) : 0);
};

exports.toObject = function(str) {
  let obj = convertToObject(decodeURIComponent(str), {});
  return (this.isObject(obj)? obj : {});
};

exports.toArray = function(str) {
  // var arr = convertToObject(str, []);
  return Array.isArray(str) ? str : [];
  // return toString.call(str) === '[object Array]'? str : [];
};

exports.toBool = function(str) {
  if (typeof str === 'string') {
    return str.toLowerCase() === 'true';
  } else if (typeof str === 'boolean') {
    return str;
  }
  return false;
};

exports.encodeURIComponent = function(str) {
  return encodeURIComponent(str);
};
exports.decodeURIComponent = function(str) {
  str=str?str.replace(/%2B/g,'%20').replace(/\+/g," "):str;
  return decodeURIComponent(str);
};


exports.isObjectEmpty= function (obj) {
  if(this.isObject(obj)){
    let keys= Object.keys(obj);
    if(keys.length) return true;
    return false;
  }
  return false;
}

