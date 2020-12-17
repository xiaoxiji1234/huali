//头部显示隐藏框
show("#wei", ".weiBox")
show("#app", ".appBox")
show("#severs", '.sever')
show("#all", ".allNone")


//渲染数据
let k = urlObj(location.href)
let keys = decodeURI(k.key);
let len = 12
let userName = getCookie("userName")
if (!userName) {
    $(".userName").html('你好，请<a href="../html/login.html">登录</a>')
} else {
    $(".userName").html(`你好，${userName}`)
}

list(keys)





//分类筛选
$('#classify span').click(function() {
    let key2 = this.innerText
    $('#classify span').removeClass('actSpan')
    $(this).addClass('actSpan')
    list(key2)
    selects(key2)
})

//筛选按钮
$('.seBox button').click(function() {
    let key2 = this.innerText
    $('.seBox button').removeClass('clickBtn')
    $(this).addClass('clickBtn')
    select(key2);
})




function list(key) {
    $.get('../api/select.php', {
        key: key,
        min: 1,
        len: len
    }, function(res) {
        let row = JSON.parse(res);
        if (row.code == 1) {
            showData(row.list)
            let page = document.querySelector(".page")
            new Pagination(page, {
                pageInfo: {
                    pagenum: 1, // 当前页数
                    pagesize: len, // 每页多少条
                    total: row.total, // 数据总数
                    totalpage: Math.ceil(row.total / len) // 页码总数
                },
                textInfo: {
                    first: '首页',
                    prev: '上一页',
                    list: '',
                    next: '下一页',
                    last: '末页'
                },
                change: function(num) {
                    show2(num, key)
                }
            })
        }

    })
}

function select(key) {
    $.get('../api/order.php', {
        key: key,
        min: 1,
        len: len
    }, function(res) {
        let row = JSON.parse(res);
        if (row.code == 1) {
            localStorage.setItem('select', res)
            showData(row.list)
            let page = document.querySelector(".page")
            new Pagination(page, {
                pageInfo: {
                    pagenum: 1, // 当前页数
                    pagesize: len, // 每页多少条
                    total: row.total, // 数据总数
                    totalpage: Math.ceil(row.total / len) // 页码总数
                },
                textInfo: {
                    first: '首页',
                    prev: '上一页',
                    list: '',
                    next: '下一页',
                    last: '末页'
                },
                change: function(num) {
                    show3(num, key)
                }
            })
        }

    })
}









//点击分页
async function show2(n, key) {
    let res = await pAjax({
            url: "../api/select.php",
            data: {
                key: key,
                min: n,
                len: len
            }
        })
        // console.log(res);
    showData(JSON.parse(res).list)
    scrollTo(0, 0)
}


async function show3(n, key) {
    let res = await pAjax({
            url: "../api/order.php",
            data: {
                key: key,
                min: n,
                len: len
            }
        })
        // console.log(res);
    showData(JSON.parse(res).list)
    scrollTo(0, 0)
}

//渲染数据
function showData(arr) {
    let str = ''
    arr.forEach(item => {
        str += `
        <dl item=${item.proId}>
            <dd>
                <img src="${item.imgUrl}" alt="">
            </dd>
            <dt>
                <h5>${item.type}/${item.proName}</h5>
                <p>${item.material}
                </p>
                <p>¥ ${item.proPrice}</p>
            </dt>
        </dl>
        `
    });
    $('#proBox').html(str)
}

$('#proBox').click(function() {
    let e = window.event
    let uid = $(e.target.parentNode.parentNode).attr('item');
    location.href = `../html/detil.html?uid=${uid}`
})









function show(ele, ele2) {
    $(ele).hover(function() {
        $(ele2).css('display', 'block')
    }, function() {
        $(ele2).css('display', 'none')
    })
}