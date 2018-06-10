/**
 * Created by zsq on 18-5-11.
 */
'use strict';
const {readdirSync,statSync,existsSync}= require('fs');
const dotFileMatch = new RegExp(/\/\.[^/]*$/);
const middleware= require('../middleware') || {};
const ParamMiddle= require('./param');
const Router= require('koa-router');
class loader {
    static loadDirectory (routesDir,app,prefix,options){
        let currentFolder= routesDir+ (prefix ? prefix : '');
        let files= readdirSync(currentFolder);
        files.forEach(path=>{
            let stats= statSync(currentFolder+'/'+path);
            if(!stats.isDirectory()){
                loader.loadFile(currentFolder+'/'+path,app,prefix);
            }else {
                loader.loadDirectory(routesDir,app,prefix+'/'+path,options);
            }
        })
    }

    static loadFile(file,app,prefix){
        if(dotFileMatch.test(file)) return console.log('Ignoring this file');
        try{
            loader.loadRouteByRoute(app,file,prefix);
        }catch (e){
            console.log(e);
        }
    }

    static loadRouteByRoute(app,file,prefix){
        let router= new Router();
        if(!file.endsWith('.js')) return console.log("Ignoring file because it doesn't end with .js");
        let routeObj= require(file);
        if(!routeObj) return;
        for(let method in routeObj){
            let routeList= routeObj[method];
            if(!routeList) return;
            for(let path in routeList){
                let obj= routeList[path];
                let action= obj['action'];
                let middles= obj['middle'];
                let rules= obj['rules'];
                let argMiddles= [];
                if(middles && middles.length){
                    for(let middle of middles){
                        if(middleware[middle]) argMiddles.push(middleware[middle][middle]);
                    }
                }
                if(action && action.includes('>')) {
                    let actions= action.split('>');
                    let controlFile= actions[0].trim();
                    if(!controlFile.endsWith('.js')) controlFile+='.js';
                    let actionFun= actions[1].trim();
                    if(!existsSync(controlFile)){
                        console.error('not found this class,please create this control: '+controlFile);
                        continue;
                    }
                    let finalAction= async (ctx)=>{
                        let fileClass= require(controlFile);
                        let arg= ParamMiddle.validate(ctx,rules); //todo
                        await new fileClass(ctx)[actionFun](...arg);
                    };
                    argMiddles.push(finalAction);
                    router[method](path, ...argMiddles);
                }
            }
        }
        app.use(router.routes()).use(router.allowedMethods());
    }
}

module.exports= loader;