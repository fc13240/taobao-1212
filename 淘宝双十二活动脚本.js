/**
 * 淘宝双十二活动脚本
 *
 * Author: YBQ789
 * Date: 2020/12/03
 * Versions: 1.2.0
 * Github: https://github.com/YBQ789/taobao-1212
 */

 //版本号
versions = 'V1.2.0';

//无障碍判定
try {
    auto();
} catch (error) {
    toast("请手动开启无障碍并授权给Auto.js");
    sleep(2000);
    exit();
}

//获取控件是否存在操作
function get(txt)
{
    return descContains(txt).exists() || textContains(txt).exists();
}
width = device.width;//获取设备的宽度
height = device.height;//获取设备的高度
speed = 1;
float = 1.25;
setScreenMetrics(width, height);

/**
 * 根据float倍数sleep随机时间
 * @param time 
 */
function randomSleep(time) {
    sleep(ramdomByFloat(time));
}

/**
 * 随机滑动
 */
function randomSwipe() {
    smlMove(ramdomByFloat(width / 2), ramdomByFloat(height / 1.5), ramdomByFloat(width / 2), ramdomByFloat(height / 4), ramdomByFloat(800));
}

/**
 * 范围随机数生成
 * @param min 
 * @param max 
 */
function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

/**
 * 根据float生成随机数
 * @param number 
 */
function ramdomByFloat(number) {
    return random(number, number * float);
}


/**
 * 仿真随机带曲线滑动 
 * @param qx 起点x轴坐标
 * @param qy 起点y轴坐标
 * @param zx 终点x轴坐标
 * @param zy 终点y轴坐标
 * @param time 滑动时间，毫秒
 */
function smlMove(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezierCurves(point, i).x), parseInt(bezierCurves(point, i).y)];
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
};

function bezierCurves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
};


//开始运行
function run()
{
    console.show();
    console.setPosition(0, 100);
    randomSleep(1000 * speed);
    //console.setSize(width/1.5,height/5);
    
    toast("开始运行");
    log("正在启动淘宝APP");
    launchApp("手机淘宝");
    randomSleep(1000 * speed);
    //进入搜索界面
    var text = "搜索";
    if(get(text)){
        descContains(text).click();
        randomSleep(1000 * speed);
        setText("欢乐造红包");
        randomSleep(1000 * speed);
        textContains(text).click();
        log("正在进入活动页面，如果过一会没有打开页面，请手动搜索 欢乐造红包 并打开页面");
        randomSleep(1000 * speed);
        start();
    }
}
//任务开始
function start()
{
    textContains("领欢乐币").waitFor();
    randomSleep(1500 * speed);
    if(get("领欢乐币")){
        textContains("领欢乐币").click();
    }    
    randomSleep(1500 * speed);
    if(get("去打卡")){
        console.info("去打卡");
        textContains("去打卡").click();
    }   
    randomSleep(1500 * speed);
    var title = ["去完成"];
    for(var i = 0; i < title.length; i++){
        num = 1;
        j=0;
        while(true){
            var flag = get(title[i]);
            toast("["+title[i]+"]返回值为："+flag);
            if(text(title[i]).findOnce(j)!=null){
                console.info("第"+num+"次"+title[i]);
                num++;
                textContains(title[i]).findOnce(j).click();    
                // goto(title[i])
                while(true){
                    sleep(random(6500,8500));
                    if (textContains("开通即享").exists()) {
                        log("跳过开通任务");
                        j++;
                        back();break;
                    }
                    if (textContains("很抱歉，本次活动为邀请制").exists()) {
                        log("跳过本次任务");
                        j++;
                        back();break;
                    }
                    if (textContains("复制链接").exists()) {
                        log("跳过分享任务");
                        j++;
                        back();randomSleep(1500 * speed);back();break;
                    }
                    if (textContains("点击施肥").exists()) {
                        log("跳过施肥任务");
                        j++;
                        back();break;
                    }
                    if (descContains("流量").exists()) {
                        log("跳过充值任务");
                        j++;
                        back();break;
                    }
                    if (textContains("开通连续包月").exists()) {
                        log("跳过开通连续包月任务");
                        j++;
                        back();randomSleep(1500 * speed);
                        textContains("忍痛离开").click();
                        break;
                    }
                    if (textContains("淘宝特价版送红包").exists()) {
                        log("跳过打开APP任务");
                        j++;
                        back();break;
                    }
                    if (textContains("轻点照亮").exists()||textContains("垃圾分类").exists()) {
                        log("跳过拍立淘任务");
                        j++;
                        back();break;
                    }
                    if (textContains("开通88VIP").exists()) {
                        log("跳过开通88VIP任务");
                        j++;
                        back();break;
                    }
                    if (textContains("消除三次").exists()) {
                        log("跳过游戏任务");
                        j++;
                        back();break;
                    }
                    if(textContains("浏览").exists()||descContains("浏览").exists()){
                        var txt = ["任务完成","任务已完成","任务已经全部完成啦"];     
                        randomSwipe();
                        randomSleep(5000 * speed);
                        randomSwipe();
                        randomSleep(8000 * speed);
                        randomSwipe();
                        randomSleep(4000 * speed);
                        if(get(txt[0]) || get(txt[1]) || get(txt[2])){
                            toast("浏览完成"); back(); break;
                        }
                    }else{
                        back();break;
                    }
                }
            }else{
                break;   
            }
            randomSleep(3000 * speed);
        }
    }
    //立即领取任务
    count = 3;
    while(text("立即领取").exists()){
        text("立即领取").findOne().click();
        randomSleep(1500 * speed);
        count--;
        if(count<0){
            break;
        }
    }
    console.info("脚本结束")
    randomSleep(500 * speed);
    console.hide();
    exit();
}
 
//开始执行run
alert("【淘宝双十二活动脚本"+versions+"】\n\n脚本执行过程请勿手动点击屏幕，否则脚本执行可能会错乱，导致任务失败\n执行过程中可按音量+键终止\n\n执行淘宝任务时请确保使用低版本淘宝（V9.0.0及以下），否则无法获取奖励\n\n最新版脚本请到GitHub获取\nhttps://github.com/YBQ789/taobao-1212\n\nPowered By YBQ789");
run();
alert("任务已完成！");
