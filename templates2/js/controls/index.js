/**
 * Created by zsq on 18-6-4.
 */
'use strict';

const baseCtrl= require('./base');

class indexCtrl extends baseCtrl {
  async index(id){
    let self= this;
    await self.render('index');
  }
}

module.exports= indexCtrl;