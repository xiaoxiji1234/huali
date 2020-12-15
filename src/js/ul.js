// 右侧ul菜单功能
$('.ulMenu li').click(function() {
    if (this.innerText == '回顶部') {
        $('body,html').animate({
                scrollTop: 0
            },
            500);
    }
})