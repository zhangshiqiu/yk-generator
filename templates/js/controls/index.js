/**
 * Created by zsq on 18-6-4.
 */
'use strict';

const baseCtrl= require('./base');

class indexCtrl extends baseCtrl {
  index(id){
    console.log(id);
  }
}

module.exports= indexCtrl;