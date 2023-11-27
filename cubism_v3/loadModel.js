// var getCursorPosition = nodeRequire('get-cursor-position');
var LIVE2DCUBISMCORE = Live2DCubismCore
//如果资源在CDN，一定要写http://或者https://否则会以本域名请求且为相对路径
//模型的model3.json文件路径
let GetModelPath = localStorage.getItem('localModelPath')
let separator = GetModelPath.includes('\\') ? '\\' : '/';
let CleanModelPath = GetModelPath.slice((GetModelPath.lastIndexOf(separator)) + 1)
var baseModelPath = GetModelPath.slice(0,(GetModelPath.lastIndexOf(separator)));//"./models/";
console.log("Live2dV3 PATH:"+baseModelPath)
var modelNames = [CleanModelPath.slice(0,-12).toString()];
var modelPath;
//Application全局变量
var app = null;
//模型渲染的位置
var tag_target = '#live2ds';
//待机的动作索引
var idleIndex;
//登录的动作索引，只针对动作文件中有idel字段的
var loginIndex;
//回港动作，只针对碧蓝航线等有回港动作，动作文件中有home字段
var homeIndex;
//触摸部位动作组
var TouchBody;var TouchHead;var TouchSpecial;
//模型偏移位置
var model_x = 0;
var model_y = 40; //40
if (localStorage.getItem('localModelV3Yaxis') != null) {model_y=parseInt(localStorage.getItem('localModelV3Yaxis'));}
if (localStorage.getItem('localModelV3Xaxis') != null) {model_x=parseInt(localStorage.getItem('localModelV3Xaxis'));}
//渲染模型的宽高
var modelWidth = 600;
var modelHight = 720;
//渲染模型的比例
var scale = 100;
if (localStorage.getItem('localModelV3Scale') != null) {scale=localStorage.getItem('localModelV3Scale');}
scale=scale*2; //抵消缩放高清晰度
console.log(scale)
model_x=model_x*2; //抵消缩放高清晰度
model_y=model_y*2; //抵消缩放高清晰度
window.onload = function(){
    if(localStorage.getItem('localModelPath').slice(-11) == 'model3.json') // 当为live2d v3+
    {
        document.getElementById("live2d").style.width = modelWidth + "px";
        document.getElementById("live2d").style.height = modelHight + "px";
        document.getElementById("live2d").style.transform = "scale(0.5)";
        document.getElementById("live2ds").style.display = "flex";
        document.getElementById("live2ds").style.justifyContent = "center";
        document.getElementById("live2ds").style.alignItems = "center";
    }
}
//测试用，加载时间起点，不保证准确性
var startTime = null;
//音频播放器，用于播放音频
var AudioPlayer = new Audio();
//存储模型动作原始json
var MotionsJSON = null;
//第一种方式初始化模型，通过model3.json的内容去导入
function initModelConfig(modelJson){
    var fileReferences = modelJson.FileReferences;
    var mocPath =  fileReferences.Moc;
    loadMoc(mocPath);
    var textures = fileReferences.Textures;
    loadTextures(textures);
    var phyPath = fileReferences.Physics;
    loadPhyPath(phyPath);
    for (var key in fileReferences.Motions) {
        loadMotions(fileReferences.Motions[key]);
    }
    PIXI.loader.reset();
    PIXI.utils.destroyTextureCache();
    PIXI.loader
        .on("start", loadStartHandler)
        .on("progress", loadProgressHandler)
        .on("complete", loadCompleteHandler)
        .load(function (loader, resources) {
        var canvas = document.querySelector(tag_target);
        var view = canvas.querySelector('canvas');
        if(app != null){app.stop();}
        app = new PIXI.Application(modelWidth, modelHight, {transparent: true ,view: view});
        var moc = Live2DCubismCore.Moc.fromArrayBuffer(resources['moc'].data);
        var builder = new LIVE2DCUBISMPIXI.ModelBuilder();
        builder.setMoc(moc);
        builder.setTimeScale(1);
        var textureIndex = 0;
        for (var key in resources) {
            if(key.indexOf('texture')!= -1){
                builder.addTexture(textureIndex++ , resources[key].texture);
            }
        }
        if(resources['physics']){ builder.setPhysics3Json(resources['physics'].data); }
        var model = builder.build();
        app.stage.addChild(model);
        app.stage.addChild(model.masks);
        var motions = setMotions(model,resources);
        setMouseTrick(model,app,canvas,motions);
        setOnResize(model,app);
    });
}
//加载MOC文件
function loadMoc(mocPath){
    if(typeof(mocPath) !== 'undefined'){
        PIXI.loader.add('moc', modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + mocPath, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER });
    }else{
        console.log('Not find moc');
    }
}
//加载 texture 文件
function loadTextures(textures){
    if(textures.length >0){
        for (var i = 0; i < textures.length; i++) {
            //loadTextures;
            PIXI.loader.add('texture' + ( i + 1) , modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + textures[i]);
        }
    }else{
        console.log("Not find textures");
    }
}
// 加载physics文件
function loadPhyPath(phyPath){
    if(typeof(phyPath) !== 'undefined'){
        PIXI.loader.add('physics', modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + phyPath, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
    }else{
        console.log('Not find physics');
    }
}
//加载动作文件
function loadMotions(motions,TempCalc){
    //动作总数
    var motionCount = 0 ;
    if(motions.length >0){
        for (var i = 0; i < motions.length; i++) {
            PIXI.loader.add('motion'+ TempCalc + ( motionCount + 1) , modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + motions[i].File,modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + motions[i].Sound, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
            if(motions[i].File.indexOf('idle')!= -1 || motions[i].File.indexOf('bound')!= -1){
                idleIndex = motionCount;
            }else if(motions[i].File.indexOf('login') != -1){
                loginIndex = motionCount;
            }else if(motions[i].File.indexOf('home') != -1){
                homeIndex = motionCount;
            }else if(motions[i].File.indexOf('body') != -1){
                TouchBody = motionCount;
            }else if(motions[i].File.indexOf('head') != -1){
                TouchHead = motionCount;
            }else if(motions[i].File.indexOf('special') != -1){
                TouchSpecial = motionCount;
            }
            motionCount ++ ;
        }
        MotionsJSON = motions; //将原始json数据存储
    }else{
        console.error('Not find motions');
    }
}
//另一种初始化模型方式
function initModels(data){
    var model3Obj = {data:data,url: modelPath.substr(0, modelPath.lastIndexOf('/') + 1)};
    //清除loader内的内容，并清除缓存中的内容
    PIXI.loader.reset();
    PIXI.utils.destroyTextureCache();
    let TempCalc = 0;
    for (var key in data.FileReferences.Motions) {
        loadMotions(data.FileReferences.Motions[key],TempCalc);
        TempCalc++;
    }
    //调用此方法直接加载，并传入设置模型的回调方法
    new LIVE2DCUBISMPIXI.ModelBuilder().buildFromModel3Json(
      PIXI.loader
        .on("start", loadStartHandler)
        .on("progress", loadProgressHandler)
        .on("complete", loadCompleteHandler),
      model3Obj,
      setModel
    );  
}
//设置模型的回调方法
function setModel(model){
    var canvas = document.querySelector(tag_target);
    var view = canvas.querySelector('canvas');
    //重复加载模型是，先停止渲染，否则后台WebGL会报警告
    if(app != null){app.stop();}
    app = new PIXI.Application(modelWidth, modelHight, {transparent: true ,view:view});
    app.stage.addChild(model);
    app.stage.addChild(model.masks);
    var motions = setMotions(model,PIXI.loader.resources);
    setMouseTrick(model,app,canvas,motions);
    setOnResize(model,app);
}
//设置模型动作
function setMotions(model,resources){
    //动作数组，存放格式化好的动作数据
    var motions = [];
    for (var key in resources) {
        if(key.indexOf('motion') != -1){
            motions.push(LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(resources[key].data)); 
        }
    }
    var timeOut;
    if(motions.length > 0){
        window.clearTimeout(timeOut);
        model.animator.addLayer("motion", LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1.0);
        if(null != loginIndex && null != idleIndex){//如果有登录和待机动作，则在登录动作完成后切换到待机动作
            model.animator.getLayer("motion").play(motions[loginIndex]);

            if(MotionsJSON[loginIndex].Sound) {AudioPlayer.src=(modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + MotionsJSON[loginIndex].Sound);AudioPlayer.play();}
            
            timeOut = setTimeout( function(){model.animator.getLayer("motion").play(motions[idleIndex]);}, motions[loginIndex].duration * 1000 );
        }else if(null == loginIndex && null != idleIndex) {
            //如果没有登录动作，则默认随机播放动作
            let Rander = Math.floor(Math.random() * motions.length)
            model.animator.getLayer("motion").play(motions[Rander]);

            if (MotionsJSON[Rander].Sound){AudioPlayer.src=(modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + MotionsJSON[Rander].Sound);AudioPlayer.play();}
            
            timeOut = setTimeout( function(){model.animator.getLayer("motion").play(motions[idleIndex]);}, motions[Rander].duration * 1000 );
        }
        else {
            //如果没有登录与待机动作，则默认播放第一个动作
            model.animator.getLayer("motion").play(motions[0]);
            if (MotionsJSON[0].Sound) {AudioPlayer = new Audio(modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + MotionsJSON[0].Sound);AudioPlayer.play();}
        }
    }
    return motions;
}
//设置鼠标追击
//计算坐标时将modelWidth/Height除以4,消除2x缩放高清晰度的影响
function setMouseTrick(model,app,canvas,motions){
    var relative_x = 0, relative_y = 0; //记录鼠标相对坐标
    var rect = canvas.getBoundingClientRect();
    var center_x = modelWidth/4 + rect.left, center_y = modelHight/4 + rect.top;
    var mouse_x = center_x, mouse_y = center_y;
    var angle_x = model.parameters.ids.indexOf("ParamAngleX");
    if(angle_x < 0){ angle_x = model.parameters.ids.indexOf("PARAM_ANGLE_X"); }
    var angle_y = model.parameters.ids.indexOf("ParamAngleY");
    if(angle_y < 0){ angle_y = model.parameters.ids.indexOf("PARAM_ANGLE_Y"); }
    var eye_x = model.parameters.ids.indexOf("ParamEyeBallX");
    if(eye_x < 0){ eye_x = model.parameters.ids.indexOf("PARAM_EYE_BALL_X"); }
    var eye_y = model.parameters.ids.indexOf("ParamEyeBallY");
    if(eye_y < 0){ eye_y = model.parameters.ids.indexOf("PARAM_EYE_BALL_Y"); }
    app.ticker.add(function (deltaTime) {
        rect = canvas.getBoundingClientRect();
        center_x = modelWidth/4 + rect.left, center_y = modelHight/4 + rect.top;
        var x = mouse_x - center_x;
        var y = mouse_y - center_y;
        relative_x = x, relative_y = y; //记录相对坐标
        model.parameters.values[angle_x] = x * 0.1;
        model.parameters.values[angle_y] = -y * 0.1;
        model.parameters.values[eye_x] = x * 0.005;
        model.parameters.values[eye_y] = -y * 0.005;
        model.update(deltaTime);
        model.masks.update(app.renderer);
    });
    var scrollElm = bodyOrHtml();
    var mouseMove;
    document.body.addEventListener("mousemove", function(e){
        window.clearTimeout(mouseMove);
        mouse_x = e.pageX - scrollElm.scrollLeft;
        mouse_y = e.pageY - scrollElm.scrollTop;
        if(localStorage.getItem('enableAutoalign') == 'false'){;}
        else{mouseMove =  window.setTimeout(function(){mouse_x = center_x , mouse_y = center_y} , 5000);}
    });
    var timeOut;
    document.body.addEventListener("click", function(e){
        window.clearTimeout(timeOut);
        if(motions.length == 0){ return; }
        if(rect.left < mouse_x && mouse_x < (rect.left + rect.width) && rect.top < mouse_y && mouse_y < (rect.top + rect.height)){
            var rand = Math.floor(Math.random() * motions.length);
            model.animator.getLayer("motion").stop();
            console.log(relative_x,relative_y)
            if(TouchSpecial && rand==TouchSpecial && TouchBody){rand=TouchBody;} else if (TouchSpecial && rand==TouchSpecial && !TouchBody) {rand=0;}
            if(TouchHead && rand==TouchHead && TouchBody){rand=TouchBody;} else if (TouchHead && rand==TouchHead && !TouchBody) {rand=0;}
            if(relative_y < -65 && TouchHead){rand = TouchHead;}
            // else if(relative_y > 30 && relative_y < 70 && relative_x > -50 && relative_x < 50 && TouchBody){rand = TouchBody;}
            else if(relative_y < 30 && relative_y >-30 && relative_x > -45 && relative_x < 45 && TouchSpecial){rand = TouchSpecial;}

            model.animator.getLayer("motion").play(motions[rand]);
            console.log(MotionsJSON)
            if (MotionsJSON[rand].Sound) {
            AudioPlayer.src=(modelPath.substr(0, modelPath.lastIndexOf('/') + 1) + MotionsJSON[rand].Sound);AudioPlayer.play();}
            //如果有登录动作，则在随机播放动作结束后回到待机动作
            if(null != idleIndex){
                timeOut = setTimeout( function(){model.animator.getLayer("motion").play(motions[idleIndex]);}, motions[rand].duration * 1000 );
            }
        }
    });
    var onblur = false;
    var onfocusTime;
    sessionStorage.setItem('Onblur', '0');
    window.onblur = function(e){
        if('0' == sessionStorage.getItem('Onblur')){
            onfocusTime = setTimeout(function(){sessionStorage.setItem('Onblur','1');},30000);
        }
    };
    window.onfocus = function(e){
        window.clearTimeout(onfocusTime);
        if(motions.length > 0){
            if('1' == sessionStorage.getItem('Onblur')){
                model.animator.getLayer("motion").stop();
                if(null != loginIndex && null != idleIndex){//如果有回港和待机动作，则在登录动作完成后切换到待机动作
                    model.animator.getLayer("motion").play(motions[homeIndex]);
                    onfocusTime = setTimeout( function(){model.animator.getLayer("motion").play(motions[idleIndex]);sessionStorage.setItem('Onblur', '0');}, motions[homeIndex].duration * 1000 );
                }else{
                    //如果没有，则默认播放第一个动作
                    model.animator.getLayer("motion").play(motions[0]);
                }
            }
        }
    };
}
//设置浏览器onResize事件
function setOnResize(model, app){
    var onResize = function (event) {
        if (event === void 0) { event = null; }
            var width = modelWidth;
            var height = modelHight;
            app.view.style.width = width + "px";
            app.view.style.height = height + "px";
            app.renderer.resize(width, height);
            model.position = new PIXI.Point(modelWidth/2 + model_x, modelHight/2 + model_y);
            model.scale = new PIXI.Point(scale,scale);
            model.masks.resize(app.view.width, app.view.height);
    };
    onResize();
    window.onresize = onResize;
}
//获取页面内容方法
function bodyOrHtml(){
    if('scrollingElement' in document){ return document.scrollingElement; }
    if(navigator.userAgent.indexOf('WebKit') != -1){ return document.body; }
    return document.documentElement;
}
//加载模型开始时Handler
function loadStartHandler(){
    //优化加载开始计时
    startTime = new Date();
    console.log("Start loading Model at " + startTime);
}
//加载模型Handler，监控加载进度
function loadProgressHandler(loader) {
    console.log("progress: " + Math.round(loader.progress) + "%");
}
//加载模型结束Handler
function loadCompleteHandler(){
    var loadTime = new Date().getTime() - startTime.getTime();
    console.log('Model initialized in '+ loadTime/1000 + ' second');
    PIXI.loader.off("start", loadStartHandler);//监听事件在加载完毕后取消
    PIXI.loader.off("progress", loadProgressHandler);//监听事件在加载完毕后取消
    PIXI.loader.off("complete", loadCompleteHandler);//监听事件在加载完毕后取消
}
//简单发送AJAX异步请求读取json文件
function loadModelV3(){
    //随机模型，如果想指定模型可以将随机值改为指定参数，或直接传指定模型名
    var modelName =  modelNames[Math.floor(Math.random() * modelNames.length )];
    //拼接路径
    //如果model3的文件形如baseModelPath/xxx/xxx.model3.json则下面不用修改，否则按照文件路径进行修改
    modelPath =  baseModelPath + "/" + modelName + ".model3.json";//baseModelPath + modelName + "/" + modelName + ".model3.json";
    var ajax = null;
    if(window.XMLHttpRequest){ajax = new XMLHttpRequest();}else if(window.ActiveObject){
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        throw new Error('loadModelJsonError');
    }  
    ajax.open('GET', modelPath, true);
    ajax.send();
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){  
            if(ajax.status == 200){ 
                var data = JSON.parse(ajax.responseText)
                // initModelConfig(data);
                initModels(data);
            }else{
                console.error('Response error,Code:' + ajax.status);
            }
        }
    };
}