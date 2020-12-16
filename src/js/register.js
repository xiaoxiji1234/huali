//头部显示隐藏框
show("#wei", ".weiBox")
show("#app", ".appBox")
show("#severs", '.sever')
show("#car", ".cars")

let verifyCode = new GVerify({
    id: "code",
    length: 4
});



$('.reBtn').click(function() {
    let index = $(this).index()
    $('.reBtn').removeClass("activeBtn")
    $(this).addClass('activeBtn')
    $('#changeLi li').removeClass("showLi")
    $($("#changeLi li")[index]).addClass("showLi")
})



jQuery.validator.addMethod('testTel', function(value) {
    let reg = /^1[3,5,6,7,8]\d{9}$/
    if (reg.test(value)) {
        return true
    } else {
        return false
    }
}, '手机号格式不正确')
jQuery.validator.addMethod('testCode', function(value) {
    let codeRes = verifyCode.validate(value)
    if (codeRes) {
        return true
    } else {
        return false
    }

}, '验证码不正确')

$('#registerTel').validate({
    rules: {
        tel: {
            required: true,
            testTel: true,
            remote: {
                url: "../api/getTel.php", //后台处理程序
                type: "post", //数据发送方式
                dataType: "json", //接受数据格式   
                data: { //要传递的数据
                    tel: function() {
                        return $("#tel").val()
                    }
                }
            }
        },
        password: {
            required: true,
            maxlength: 14,
            minlength: 8
        },
        codes: {
            required: true,
            testCode: true
        }
    },
    messages: {

        tel: {
            required: '手机号不能为空',
            remote: '手机号已存在'
        },
        password: {
            minlength: '密码的长度最短不少于8位',
            maxlength: '密码的长度最长不超过14位',
            required: '密码不能为空'
        },
        codes: {
            required: '验证码不能为空'
        }
    },
    submitHandler: function() {
        pAjax({
            url: '../api/addUser.php',
            type: 'post',
            data: {
                password: $("#password").val(),
                tel: $("#tel").val()

            }
        }).then(function(res) {
            if (JSON.parse(res).code) {
                alert('注册成功')
                location.href = "login.html"
            } else {
                console.log("数据有错误");
            }
        })
    }

})
$('#registerEmail').validate({
    rules: {
        email: {
            required: true,
            email: true,
            remote: {
                url: "../api/getEmail.php", //后台处理程序
                type: "post", //数据发送方式
                dataType: "json", //接受数据格式   
                data: { //要传递的数据
                    email: function() {
                        return $("#email").val()
                    }
                }
            }
        },
        password: {
            required: true,
            maxlength: 14,
            minlength: 8
        }
    },
    messages: {

        email: {
            required: '邮箱不能为空',
            email: '邮箱格式不正确',
            remote: '邮箱已存在'
        },
        password: {
            minlength: '密码的长度最短不少于8位',
            maxlength: '密码的长度最长不超过14位',
            required: '密码不能为空'
        }

    },
    submitHandler: function() {
        pAjax({
            url: '../api/addUser.php',
            type: 'post',
            data: {
                password: $("#password1").val(),
                email: $("#email").val()
            }
        }).then(function(res) {
            if (JSON.parse(res).code) {
                alert('注册成功')
                location.href = "login.html"
            } else {
                console.log("数据有错误");
            }
        })
    }

})


function show(ele, ele2) {
    $(ele).hover(function() {
        $(ele2).css('display', 'block')
    }, function() {
        $(ele2).css('display', 'none')
    })
}