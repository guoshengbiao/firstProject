~function(){
    var banner=document.getElementById("banner"),
        bannerInner=utils.children(banner)[0],
        oDivs=bannerInner.getElementsByTagName("div"),
        oImg=bannerInner.getElementsByTagName("img"),
        bannerTip=utils.children(banner,"ul")[0],
        oLis=bannerTip.getElementsByTagName("li"),
        a=utils.children(banner,"a"),
        Left=a[0],Right=a[1];

    var jsonData=null;
    ~function(){
        var xhr=new XMLHttpRequest;
        xhr.open("get","json/banner.txt?_="+Math.random(),false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
                jsonData=utils.formatJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }();
    ~function(){
        var str1="",str2="";
        for(var i= 0,len=jsonData.length;i<len;i++){
            var cur=jsonData[i];
            str1+='<div><a href="#" class="bannerInnerA"><img src=""  curImg="'+cur["img"]+'" alt=""/></a></div>';
            i===0?str2+='<li class="bg">'+(i+1)+'</li>':str2+='<li>'+(i+1)+'</li>';
        }
        bannerInner.innerHTML=str1;
        bannerTip.innerHTML=str2;
        str1=null;str2=null;
    }();
    window.setTimeout(lazyImg,100);
    function lazyImg(){
        for(var i= 0,len=oImg.length;i<len;i++){
            (function(i){
                var cur=oImg[i];
                var img=new Image;
                img.src=cur.getAttribute("curImg");
                img.onload=function(){
                    cur.src=this.src;
                    cur.style.display="block";
                    if(i===0){
                        var par=cur.parentNode;
                        utils.css(par,"zIndex",1);
                        zhufengAnimate(par,{opacity:1},300);
                    }
                    img=null;
                };
            })(i);
        }
    }
    var timer=null,step= 0,interval=2000;

    timer=window.setInterval(move,interval);
    function move(){
        if(step===oLis.length-1){
            step=-1;
        }
        step++;
        innerMove();
    }
    function innerMove(){
        for(var i= 0,len=oDivs.length;i<len;i++){
            var cur=oDivs[i];
            if(i===step){
                utils.css(cur,"zIndex",1);
                var sib=utils.siblings(cur);
                zhufengAnimate(cur,{opacity:1},300,function(){
                    for(var i=0;i<sib.length;i++){
                        utils.css(sib[i],"opacity",0);
                    }
                });
                continue;
            }
            utils.css(cur,{zIndex:0});
        }
        for(var k=0;k<oLis.length;k++){
            var point=oLis[k];
            k===step?utils.addClass(point,"bg"):utils.removeClass(point,"bg");
        }
    }
    banner.onmouseover=function(){
        clearInterval(timer);
        Right.style.display=Left.style.display="block";

    };
    banner.onmouseout=function(){
        Right.style.display=Left.style.display="none";
        timer=window.setInterval(move,interval);
    };

    ~function(){
        for(var i= 0,len=oLis.length;i<len;i++){
            var cur=oLis[i];cur.index=i;
            cur.onmouseenter=function(){
                step=this.index;
                innerMove();
            }
        }
    }();
    Right.onclick=move;
    Left.onclick=function(){
        step--;
        if(step===-1){
            step=oDivs.length-1;
        }
        innerMove();
    };
}();


