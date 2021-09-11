// ==UserScript==
// @name         Bilibili BlackList
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fuck the inferior UP!
// @author       Kl1nge5
// @match        https://www.bilibili.com/
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==


$(function(){
    let blackList = new Set(GM_getValue("blacklist"));
    let rbox = $(".rcmd-box");
    let cbutton = $(".change-btn");
    let UPs = $(".video-card-reco").children(".info-box").children().children(".info").children(".up");
    let videoCard = $(".video-card-reco");
    let checkTimer = 0;
    if (!blackList.has("112233placeholder!!@@##")){
        GM_setValue("blacklist", ["112233placeholder!!@@##"]);
        blackList = new Set(GM_getValue("blacklist"));
        console.log("黑名单初始化完成");
    }
    console.log("%c=======================", "color: blue; font-size: 24px");
    console.log("黑名单为:[" + blackList + "]");
    console.log("你不会在换一换中刷到他们的视频");
    console.log("%c=======================", "color: blue; font-size: 24px");
    // 删除黑名单up的视频
    function FuckTheUP() {
        UPs = $(".video-card-reco").children(".info-box").children().children(".info").children(".up");
        for (let i = 0; i < UPs.length ;i++) {
            if (blackList.has(UPs[i].innerText)) {
                $(UPs[i]).parent().parent().parent().parent().remove();
                console.log("过滤了" + UPs[i].innerText + "的视频");
            }
        }
    }
    // 添加拉黑按钮
    function addButton() {
        videoCard = $(".video-card-reco");
        videoCard.append(`<div class="watch-later-video van-watchlater black BanToBlackList" style="top: 6px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACFQTFRFAAAADAwMQEBAMTEx////MDAwZGRkv7+/gICAqampVVVV7waAfQAAAHxJREFUeJzt2MEJgCAYhmGvXdug/9ICjfAV0bkRGqEJnKEBGrWDFAgJQoEg73P6QXkRb+ocAABAUmu5uvfAoFxjtYFV031Lu+Yw9JKPB7MtfYJn4dAShkY64yHaR4AAAQIECBAgQIAAAQIEcgM/vNpKPzzLBz7/HwAAgDpcaECAGgWpUzcAAAAASUVORK5CYII=);color: white;"><span class="wl-tips" style="display: none;"></span></div>`);
        let BanToBlackList = $(".BanToBlackList");
        BanToBlackList.click(Ban)
        BanToBlackList.mouseover(ShowDescribe)
        BanToBlackList.mouseout(HideDescribe)
    };
    // 外观调整
    function ShowDescribe(e) {
        let foo = $(e.currentTarget).children();
        let name = foo.parent().prev().prev().children().children(".info").children(".up").text();
        foo.css("right", "-6px");
        if (blackList.has(name)) {
            foo.text("移除")
        }
        else
        {
            foo.text("拉黑")
        }
        foo.show();
        foo.attr("class", "wl-tips van-watchlater-move-enter-active van-watchlater-move-enter-to");
    }

    function HideDescribe(e) {
        let foo = $(e.currentTarget).children();
        foo.hide();
        foo.attr("class", "wl-tips");
    }
    // 拉黑函数
    function Ban(e){
        let foo = $(e.currentTarget);
        let describe = foo.children();
        let name = foo.prev().prev().children().children(".info").children(".up").text();
        if (blackList.has(name)) {
            describe.css("right", "-40px");
            blackList.delete(name);
            GM_setValue("blacklist", Array.from(blackList));
            foo.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACFQTFRFAAAADAwMQEBAMTEx////MDAwZGRkv7+/gICAqampVVVV7waAfQAAAHxJREFUeJzt2MEJgCAYhmGvXdug/9ICjfAV0bkRGqEJnKEBGrWDFAgJQoEg73P6QXkRb+ocAABAUmu5uvfAoFxjtYFV031Lu+Yw9JKPB7MtfYJn4dAShkY64yHaR4AAAQIECBAgQIAAAQIEcgM/vNpKPzzLBz7/HwAAgDpcaECAGgWpUzcAAAAASUVORK5CYII=)");
            describe.text("已从黑名单中移除");
            console.log("解除黑名单：" + name)
        }
        else
        {
            describe.css("right", "-30px");
            blackList.add(name);
            GM_setValue("blacklist", Array.from(blackList));
            foo.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAANlBMVEUAAAD8/PxpaWlfX1/9/f1ycnIAAAAAAAAAAAAAAAAAAAD09PTr6+vv7+/h4eFjY2NZWVn///+5pCBCAAAAEXRSTlOZ/Lez/bqKZBGPAPfy9ey1sk5dq9MAAACBSURBVEjH7dc7FsQgDENRQSZAAvl4/5udUrVU5vj1t3El4xy9Qaz1cWIcMDoGOqw6mgcbsux7Peuqjqsl4jJdLNOVx3Q1neH2OavjMCN+u+GwglJxeAuldpeNUnGUqqOUHSWdKOlESSdKOknSqZJO673vDVn2jZrJ7Gltj3n7ffgDLGYI2l1NOaQAAAAASUVORK5CYII=)");
            describe.text("已加入黑名单");
            console.log("加入黑名单：" + name);
        }
    }
    // 检查视频 添加拉黑按钮
    function detectChange() {
        // 10次加，10次删
        if (checkTimer >= 19) {
            rbox.unbind('DOMSubtreeModified'); // 关闭变化检测（b站有bug，会误触发）
            checkTimer = 0; // 重置计数器
            FuckTheUP(); // 删除视频
            addButton(); // 添加拉黑按钮
            console.log("检查完毕");
        }
        else
        {
            checkTimer++;
        }
    }
    // 按下换一换时，绑定div变化检测
    cbutton.click(function(){
        rbox.bind('DOMSubtreeModified', detectChange);
    });
    // 可视化黑名单
    // 懒狗不想做
    //  function addVisibleList(){
    //     let a = $(".international-home").append(`<div class="contact-help black-list" style="top: calc(50% + 50px);display: flex;align-items: center;user-select: none;cursor: pointer;">黑名单</a>`);
    //     let visibleListEntrance = a.children(".black-list")[0];
    // }
    // 页面加载完后初始化
    FuckTheUP();
    addButton();
    //  addVisibleList();
})

