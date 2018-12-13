var $buttons = $('.buttonList>span')
var $imgs = $('.images>img')
var n=0
var size = $imgs.length

for(let i=0;i<$buttons.length;i++){
    $($buttons[i]).on('click',function(e){
        let $index = $(e.currentTarget).index()
        n=$index
        $(e.currentTarget).addClass('active').siblings('.active').removeClass('active')
        
        $('.images').css(
            'transform','translateX(-'+ $index*1048 +'px)'
        )
    })
}

var timer = setTimer.call()

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
})

$('.container').on('mouseleave',function(){
    timer = setTimer.call()
})

function setTimer(){
    return  setInterval(function(){
        n+=1
        $($buttons[n%size]).trigger('click')
        console.log(n%size)
    },3000)
}

