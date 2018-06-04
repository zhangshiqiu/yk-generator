/**
 * Created by zsq on 18-5-15.
 */
'use strict';

const controls_path= process.dirsrc+'/controls';
module.exports= {
  'get': {
    '/': {
      action: controls_path+'/index > index',
      middle: ['validateOsType'],
      rules: {
        'id query int': true
      }
    }
  }
};