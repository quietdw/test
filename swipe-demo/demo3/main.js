var $buttons = $('.innerList>span')
var $imgs = $('.images>img')
var n=0
var size = $imgs.length

for(let i=0;i<$buttons.length;i++){
    $($buttons[i]).on('click',function(e){
      
        let $index = $(e.currentTarget).index()
        n=$index
        $(e.currentTarget).addClass('active').siblings('.active').removeClass('active')
        
        $('.images').css(
            'transform','translateX(-'+ $index*920 +'px)'
        )
    })
}

