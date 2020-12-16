//头部显示隐藏框
show("#wei", ".weiBox")
show("#app", ".appBox")
show("#severs", '.sever')
show("#car", ".cars")

let userName = getCookie("userName")
if (!userName) {
    $(".userName").html('你好，请<a href="../html/login.html">登录</a>')
} else {
    $(".userName").html(`你好，${userName}`)
}

let uid = urlObj(location.href)['uid']


// 获取数据
$.get('../api/getItem.php', {
    uid: uid
}, function(res) {
    console.log(res);
    showData(res)
    changeImg()
    car(res)
}, 'json')



// 渲染数据
function showData(obj) {
    if (obj.flowerLanguage == null) {
        $('#item').html(`<ol class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li><a href="#">${obj.type}</a></li>
    <li class="active">${obj.proName}</li>
    </ol>
    <div class="itemInfo">
    <div class="imgBox">
        <p class="bigImg">
            <img src="${obj.imgBig1}" alt="" class="big">
        </p>
        <p class="smallImg" id="smallImg">
            <img src="${obj.imgBig1}" alt="" class="small">
            <img src="${obj.imgBig2}" alt="" class="small">
            <img src="${obj.imgBig3}" alt="" class="small">
            <img src="${obj.imgBig4}" alt="" class="small">
        </p>
    </div>
    <div class="infoBox">
        <h4>${obj.proName}</h4>
        <p>${obj.introduce}</p>
        <div class="info">
            <p class="price"><span>售价</span><span><i>¥</i> ${obj.proPrice}</span><span>市场价：<s>¥ ${obj.proPrice}</s></span><span><i class="iconfont icon-shouji1"></i>手机专享价 ¥ ${obj.proPrice}</span><span>已售<i>${obj.proPrice}</i>件</span></p>
            <p><span>材料</span> ${obj.material}</p>
            <p><span>包装</span>${obj.packing}</p>
            <p><span>配送说明</span>${obj.distribution}
            </p>
            <p><span>配送至</span>广州天河区</p>
            <p>现在下单，最快今天送达</p>
            <p><button id="carBtn"><i class="iconfont icon-icon-"></i>加入购物车</button><button>立刻购买</button><span><i class="iconfont icon-shoucang1"></i>收藏商品</span></p>
        </div>
    </div>
    </div>
    <div class="info">
    <ul class="clearFix meUl">
        <li class="actLi">
            商品详情
        </li>
        <li>
            用户评价(<span>${obj.appraise}</span>)
        </li>
        <li>
            常见问题
        </li>
        <li>
            购物保障
        </li>
    </ul>
    </div>
    <div class="detilItem clearFix">
    <div class="detilTop clearFix">
        <div class="h4">
            <h4>产品参数</h4>
        </div>
        <div class="itIn">
            <p><span>编号</span><span>${obj.proId}</span></p>
            <p><span>类别</span><span>鲜花</span></p>
            <p><span>附送</span><span>下单填写留言，即免费赠送精美贺卡!</span></p>
        </div>
        
    </div>
    ${obj.detil}
    
    </div>`)
        return
    }
    $('#item').html(`<ol class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li><a href="#">${obj.type}</a></li>
    <li class="active">${obj.proName}</li>
    </ol>
    <div class="itemInfo">
    <div class="imgBox">
        <p class="bigImg">
            <img src="${obj.imgBig1}" alt="" class="big">
        </p>
        <p class="smallImg" id="smallImg">
            <img src="${obj.imgBig1}" alt="" class="small">
            <img src="${obj.imgBig2}" alt="" class="small">
            <img src="${obj.imgBig3}" alt="" class="small">
            <img src="${obj.imgBig4}" alt="" class="small">
        </p>
    </div>
    <div class="infoBox">
        <h4>${obj.proName}</h4>
        <p>${obj.introduce}</p>
        <div class="info">
            <p class="price"><span>售价</span><span><i>¥</i> ${obj.proPrice}</span><span>市场价：<s>¥ ${obj.proPrice}</s></span><span><i class="iconfont icon-shouji1"></i>手机专享价 ¥ ${obj.proPrice}</span><span>已售<i>${obj.proPrice}</i>件</span></p>
            <p><span>花语</span>${obj.flowerLanguage}</p>
            <p><span>材料</span> ${obj.material}</p>
            <p><span>包装</span>${obj.packing}</p>
            <p><span>配送说明</span>${obj.distribution}
            </p>
            <p><span>配送至</span>广州天河区</p>
            <p>现在下单，最快今天送达</p>
            <p><button id="carBtn"><i class="iconfont icon-icon-"></i>加入购物车</button><button>立刻购买</button><span><i class="iconfont icon-shoucang1"></i>收藏商品</span></p>
        </div>
    </div>
    </div>
    <div class="info">
    <ul class="clearFix meUl">
        <li class="actLi">
            商品详情
        </li>
        <li>
            用户评价(<span>${obj.appraise}</span>)
        </li>
        <li>
            常见问题
        </li>
        <li>
            购物保障
        </li>
    </ul>
    </div>
    <div class="detilItem clearFix">
    <div class="detilTop clearFix">
        <div class="h4">
            <h4>产品参数</h4>
        </div>
        <div class="itIn">
            <p><span>编号</span><span>${obj.proId}</span></p>
            <p><span>类别</span><span>鲜花</span></p>
            <p><span>附送</span><span>下单填写留言，即免费赠送精美贺卡!</span></p>
        </div>
        
    </div>
    ${obj.detil}
    
    </div>`)
}


// 图片切换
function changeImg() {
    console.log($('.small'));
    $('.small').hover(function() {
        let src = $(this).attr('src')
        $('.big').attr('src', src)

    })
}


// 加入购物车
function car(obj) {
    $('#carBtn').click(function() {
        if (!userName) {
            location.href = '../html/login.html'
            localStorage.setItem('url', location.href)
            return
        }
        addCar(obj, userName)
    })
}





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





async function addCar(obj, name) {

    let res = await pAjax({
        url: "../api/addCar.php",
        data: {
            proId: obj.proId,
            userName: name,
            proName: obj.proName,
            proPrice: obj.proPrice,
            originalCost: obj.originalCost,
            imgUrl: obj.imgUrl,
            num: 1,
            type: obj.type
        }
    })
    if (JSON.parse(res).code) {
        alert("添加购物车成功！")
    }
}



function show(ele, ele2) {
    $(ele).hover(function() {
        $(ele2).css('display', 'block')
    }, function() {
        $(ele2).css('display', 'none')
    })
}