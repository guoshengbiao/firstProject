/**
 * Created by tangsuan on 2016/5/9.
 */
~function(){
    var search=document.getElementById("search-inner");
    var searchBtn=document.getElementById("searchBtn");
    var div=document.getElementById("search-list");
    var UL=div.getElementsByTagName("ul")[0];
    search.onkeyup=function(){

        var value=search.value;
        if(value){
            boxIsShow.show();
            callBaidu(value);
        }else {
            console.log("ok")
            boxIsShow.hide();
        }


    };

    var boxIsShow={
        isFalse:false,
        show:function(){
            if(!this.isFalse){
                div.style.display="block";
                this.isFalse=true;
            }
        },
        hide:function(){
            if(this.isFalse){
                div.style.display="none";
                this.isFalse=false;
            }
        }
    };
    function callBaidu(value){
        jsonp('http://suggest.taobao.com/sug?code=utf-8',{q:value},'callback',function(data){
            var inner=data.result,str='';
            for(var i=0;i<inner.length;i++){
                str+='<li>'+inner[i][0]+'<i>'+'约'+inner[i][1]+'个商品'+'</i>'+'</li>';
            }
            UL.innerHTML=str;
        })
    }
    div.onclick=function(e){
        var target= e.target;
        if(target.tagName.toLowerCase()=="li"){
            window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(target.innerHTML),'_blank');
        }
    };
    searchBtn.onclick=function(){
        var value=search.value;
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(search.value),'_blank');
    };


}();