/**
 * Created by tangsuan on 2016/5/2.
 */
    //顶部旋转和中部搜索框购物车
    ~function(){
        var shopcar=document.getElementById("shopcar");
        var down=utils.children(shopcar,'div')[0];
        var num=utils.children(shopcar,'div')[1];
        var top=utils.children(num,'i')[1];
        shopcar.onmouseenter=function(){
            down.style.display='block';
            top.style.display='block';
            utils.addClass(num,'shoppingDown')
        };
        shopcar.onmouseleave=function(){
            down.style.display='none';
            top.style.display='none';
            utils.removeClass(num,'shoppingDown')
        };
        var oLis=document.getElementById("header").getElementsByTagName("li");
        for(var i=0;i<oLis.length;i++) {
            var cur = oLis[i];
            if(utils.hasClass(cur,"add")){
                cur.onmouseenter=function(){
                    var _this=this;
                    var div=utils.children(_this,"div")[0];
                    var icon=utils.children(_this,'i')[0];
                    utils.addClass(_this,"show1");
                    div.style.display="block";
                    utils.addClass(icon,"hover");
                };
                cur.onmouseleave=function(){
                    var _this=this;
                    var div=utils.children(_this,'div')[0];
                    var icon=utils.children(_this,'i')[0];
                    utils.removeClass(_this,"show1");
                    div.style.display="none";
                    utils.removeClass(icon,"hover");
                }
            }
        }

    }();





    ~function(){


        var tabSib=document.getElementById("sidebar"),
        SibDivs=utils.children(tabSib,"div"),
            //ItemDivs=utils.getElementsByClass("item_",document);
        ItemDivs=document.getElementsByClassName("item_");
        for(var j=0;j<ItemDivs.length;j++){
            ItemDivs[j].style.top=-j*31+"px";
        }

        for(var i=0;i<SibDivs.length;i++){
            var cur=SibDivs[i];
            cur.index=i;
            cur.onmouseover=function(){
                utils.addClass(this,"hover");

                ItemDivs[this.index].style.display="block";
            };
            cur.onmouseout=function(){
                utils.removeClass(this,"hover");
                ItemDivs[this.index].style.display="none";
            }
        }

        //飞线
        ~function(){
            var flag=false;
            var fly=document.getElementById("guessyou");
            var point=document.getElementById("flyPoint");
            fly.onmouseenter=function(){
                if(flag)return;
                flag=true;
                utils.css(point,{left:0});
                zhufengAnimate(point,{left:845},700,function(){flag=false;});
            }
        }();

        //移动图片
        ~function(){
            var big=document.getElementsByClassName("move");
            for(var i= 0,len=big.length;i<len;i++){
                var cur=big[i];
                cur.onmouseenter=function(){
                    var Img=this.getElementsByTagName("img")[0];
                    zhufengAnimate(Img,{marginRight:2},200);

                };
                cur.onmouseleave=function(){
                    var Img=this.getElementsByTagName("img")[0];
                    zhufengAnimate(Img,{marginRight:-3},200);
                }

            }
        }();


        //楼层导航

        ~function(){
            var floorAry = [
                {id: "oneFloor", text: "服装", top: null},
                {id: "twoFloor", text: "美妆", top: null},
                {id: "threeFloor", text: "手机", top: null},
                {id: "fourFloor", text: "家电", top: null},
                {id: "fiveFloor", text: "数码", top: null},
                {id: "sixFloor", text: "运动", top: null},
                {id: "sevenFloor", text: "居家", top: null},
                {id: "eightFloor", text: "母婴", top: null},
                {id: "nineFloor", text: "食品", top: null},
                {id: "tenFloor", text: "图书", top: null},
                {id: "elevenFloor", text: "服务", top: null}
            ];

            var floorIndex = document.getElementById("floorIndex"), oLis = null;
            //1、把对应的左侧楼层索引动态的绑定
            ~function () {
                var str = "";
                for (var i = 0, len = floorAry.length; i < len; i++) {
                    var curFloor = floorAry[i];
                    var curFloorEle = document.getElementById(curFloor["id"]);
                    curFloor["top"] = utils.offset(curFloorEle).top;

                    str += "<li zhufengText='" + curFloor["text"] + "' zhufengTop='" + curFloor["top"] + "'>" + (i + 1) + "F</li>";
                }
                floorIndex.innerHTML = str;

                //->重新计算楼层索引距离页面的高度
                utils.css(floorIndex, "marginTop", -len * 31 / 2);

                //->获取容器下的所有的LI
                oLis = utils.children(floorIndex);
            }();

            //2、给所有的LI绑定鼠标滑过的事件
            ~function () {
                for (var i = 0, len = oLis.length; i < len; i++) {
                    var curLi = oLis[i];
                    curLi.index = i;
                    curLi.onmouseover = function () {
                        utils.css(this, {
                            background: "orangered",
                            color: "#fff"
                        });
                        this.innerHTML = this.getAttribute("zhufengText");
                    };
                    curLi.onmouseout = function () {
                        if (this.getAttribute("isLoad") === "true") {
                            utils.css(this, {
                                background: "",
                                color: "red"
                            });
                            return;
                        }
                        utils.css(this, {
                            background: "",
                            color: "#000"
                        });
                        this.innerHTML = (this.index + 1) + "F";
                    };
                }
            }();

            //3、控制楼层的显示隐藏
            function showFloor() {
                var curTop = utils.win("scrollTop"), curHeight = utils.win("clientHeight");

                floorIndex.style.display = curTop + curHeight > oLis[0].getAttribute("zhufengTop") ? "block" : "none";

                for (var i = 0, len = oLis.length; i < len; i++) {
                    var curLi = oLis[i], curLiTop = curLi.getAttribute("zhufengTop"), curLiText = curLi.getAttribute("zhufengText"), curLiF = (i + 1) + "F";
                    curLi.index = i;

                    var aa = i === 0 ? curHeight : (curHeight / 2);
                    if (curTop + aa > curLiTop) {
                        utils.css(curLi, "color", "red");
                        curLi.setAttribute("isLoad", true);
                        curLi.innerHTML = curLiText;

                        //->让其兄弟元素没有选中的样式
                        var curSiblings = utils.siblings(curLi);
                        for (var k = 0; k < curSiblings.length; k++) {
                            utils.css(curSiblings[k], "color", "#000");
                            curSiblings[k].setAttribute("isLoad", false);
                            curSiblings[k].innerHTML = (curSiblings[k].index + 1) + "F";
                        }
                    }
                }
            }
            window.onscroll = showFloor;

            //4、点击每一个楼层索引,实现让其滚动到指定的区域
            var timer = null;
            for (var i = 0; i < oLis.length; i++) {
                var curLi = oLis[i];
                curLi.onclick = function () {
                    window.onscroll = null;
                    var target = this.getAttribute("zhufengTop");
                    move(target);
                }
            }
            function move(target) {
                var begin = utils.win("scrollTop"), duration = 500;
                var step = Math.abs((target - begin) / duration * 10);
                _move();
                function _move() {
                    window.clearTimeout(timer);
                    var cur = utils.win("scrollTop");
                    if (target > begin) {//->向下
                        if (cur + step >= target) {
                            window.onscroll = showFloor;
                            utils.win("scrollTop", target);
                            return;
                        }
                        utils.win("scrollTop", cur + step);
                    } else if (target < begin) {//->向上
                        if (cur - step <= target) {
                            window.onscroll = showFloor;
                            utils.win("scrollTop", target);
                            return;
                        }
                        utils.win("scrollTop", cur - step);
                    } else {//->不动
                        window.onscroll = showFloor;
                        return;
                    }
                    timer = window.setTimeout(_move, 10);
                }
            }

        }();

    }();

//最右边侧边栏
~function(){
    var ele=document.getElementById("elevator");
    var eleUl=utils.children(ele,'ul')[0];
    var liFeed=utils.getElementsByClass('feedback',eleUl)[0];
    var liTop=utils.getElementsByClass('top',eleUl)[0];
    var eleLis=ele.getElementsByTagName("li");
    var flag=false;
    window.onresize=function(){
        var change=utils.win('clientHeight');
        utils.css(liFeed,{top:change *.55-300});
        utils.css(liTop,{top:change*.55-300});
        utils.css(eleUl,{top:change *.45});console.log(change)
    };
    console.log(utils.win('clientHeight'));
    for(var i=0;i<eleLis.length;i++){
        var cur=eleLis[i];
        if(utils.hasClass(cur,"hiddenBar")){
            cur.onclick=function(){
                var innerDiv=utils.children(this,'div')[0];
                var em=utils.children(this,'em')[0];
                if(this.flag&&flag){
                    ele.style.right='-270px';
                    this.flag=false;
                    flag=true;
                    utils.removeClass(innerDiv,'bg');
                    em.style.left='0';
                    return;
                }
                this.flag=true;flag=true;
                ele.style.right='0';
                innerDiv.className='bg';
                em.style.left='0';
            }
        }else if(utils.hasClass(cur,"top")){

            cur.onclick=function(){
                utils.win('scrollTop',0);
            }
        }


        cur.onmouseenter=function(){
            var em=utils.children(this,'em')[0],div=utils.children(this,'div')[0];
            em.style.left='-60px';
            div.className='bg';
        };
        cur.onmouseleave=function(){
            var em=utils.children(this,'em')[0],div=utils.children(this,'div')[0];
            em.style.left='0';
            setTimeout(function(){div.className='';},200);
        }
    }

}();


