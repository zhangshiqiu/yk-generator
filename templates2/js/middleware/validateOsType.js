"use strict";

class validateOsTypeMiddle {
    static async validateOsType(ctx,next){
        await next();
    }
}


module.exports= validateOsTypeMiddle;

