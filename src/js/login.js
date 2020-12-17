//头部显示隐藏框
show("#wei", ".weiBox")
show("#app", ".appBox")
show("#severs", '.sever')
show("#car", ".cars")

let url = localStorage.getItem('url') || '../html/index.html'








$('.lgBtn').click(function() {
    let index = $(this).index()
    $('.lgBtn').removeClass("activeBtn")
    $(this).addClass('activeBtn')
    $('#changeLi li').removeClass("showLi")
    $($("#changeLi li")[index]).addClass("showLi")
})

let telReg = /^1[3,5,6,7,8]\d{9}$/
let emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

$('#loginBtn').click(function() {
    let e = window.event
    e.preventDefault()
    if (telReg.test($("#tel").val())) {
        let tel = $("#tel").val()
        pAjax({
            url: '../api/login.php',
            type: 'post',
            data: {
                tel: tel,
                password: $('#password').val()
            }
        }).then(function(res) {
            if (JSON.parse(res).code) {
                setCookie('userName', tel)
                location.href = url
            } else {
                alert('用户名或密码错误')
            }
        })
    } else if (emailReg.test($('#tel').val())) {
        let email = $('#tel').val()
        pAjax({
            url: '../api/login.php',
            type: 'post',
            data: {
                email: email,
                password: $('#password').val()
            }
        }).then(function(res) {
            if (JSON.parse(res).code) {
                setCookie('userName', email)
                location.href = url
            } else {
                alert('用户名或密码错误')
            }
        })
    } else {
        alert("用户名格式错误")
    }
})


function show(ele, ele2) {
    $(ele).hover(function() {
        $(ele2).css('display', 'block')
    }, function() {
        $(ele2).css('display', 'none')
    })
}