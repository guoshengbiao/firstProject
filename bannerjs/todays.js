/**
 * Created by tangsuan on 2016/5/7.
 */
(function(){
    var Div=document.getElementById("todays-flag");
    var Flag=document.getElementById("Flag");
    var Left=document.getElementById("todaysLeft");
    var Right=document.getElementById("todaysRight");
    var step=0;
    Div.onmouseover=function(){
        Left.style.display=Right.style.display="block";
    };
    Div.onmouseout=function(){
        Left.style.display=Right.style.display="none";
    };
    Left.onclick=function(){

        step--;

        move();

    };
    Right.onclick=function(){
        step++;
        if(step>0){
            step=-4;
            utils.css(Flag,{left:step*1000});
            step++;
        }
        move();
    };
    function move(){
        var Tleft=step*1000;
        window.zhufengAnimate(Flag,{left:Tleft},600,function(){
            if(step==-4){
                step=0;
                utils.css(Flag,{left:0});
            }

        });
    }
})();
