/**
 * Created by zsq on 18-6-4.
 */
'use strict';

class baseCtrl{
    constructor(ctx){
        this.ctx= ctx;
    }
    send(obj){
        this.ctx.body= obj;
    }

    async render(nav){
        await this.ctx.render(nav);
    }
}

module.exports= baseCtrl;