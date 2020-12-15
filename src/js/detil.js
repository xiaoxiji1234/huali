//头部显示隐藏框
show("#wei", ".weiBox")
show("#app", ".appBox")
show("#severs", '.sever')
show("#car", ".cars")

console.log(1);

// 获取数据
// $.get('../api/getItem.php', )


// 搜索框
$('#selectBtn').click(function() {
    let key = encodeURI($('#seText').val())
    if (!key) {
        location.href = `../html/list.html`
        return
    }
    location.href = `../html/list.html?key=${key}`
})

//吸顶效果

$(window).scroll(function() {
    if ($(window).scrollTop() > $(".ulMenu").offset().top) {
        $(".ulMenu").css({ "position": "fixed", "top": 0 });
    } else {
        $(".ulMenu").css({
            "position": "absolute",
            right: '70px',
            top: '720px'
        });
    }
});









function show(ele, ele2) {
    $(ele).hover(function() {
        $(ele2).css('display', 'block')
    }, function() {
        $(ele2).css('display', 'none')
    })
}