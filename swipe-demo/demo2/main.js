var $images = $('.images>img')
var n=0
//初始化
$images.eq(0).addClass('current').siblings().addClass('enter')

var timer = setInterval(function(){
    n=getN(n)
    $images.eq(n).removeClass('current').addClass('leave').one('transitionend',function(e){
       $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    
    $images.eq(getN(n+1)).removeClass('enter').addClass('current')
    n+=1
},3000)

document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        window.clearInterval(timer)
    }else{
        timer = setInterval(function(){
            n=getN(n)
            $images.eq(n).removeClass('current').addClass('leave').one('transitionend',function(e){
               $(e.currentTarget).removeClass('leave').addClass('enter')
            })
            
            $images.eq(getN(n+1)).removeClass('enter').addClass('current')
            n+=1
        },3000)
    }
})

function getN(n){
    return n>=$images.length?n=0:n
}
