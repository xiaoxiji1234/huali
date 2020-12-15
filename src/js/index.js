//头部显示隐藏框
show("#wei", ".weiBox")
show("#app", ".appBox")
show("#severs", '.sever')
show("#car", ".cars")
show("#forever", ".hBox")
show("#cake", ".hBox")
show("#presented", ".hBox")
show("#forever", ".preserve")
show("#cake", ".cake")
show("#presented", ".present")


//圣诞新品
$.get('../api/getNew.php', 'get', function(res) {
    let row = JSON.parse(res);
    // console.log(row);
    let str = ''
    row.forEach((itme) => {
        str += `<li uid=${itme.proId}>
        <div>
            <h4>${itme.proName}</h4>
            <p>圣诞定制新品</p>
            <p>￥<span>${itme.proPrice}</span> </p>
        </div>
        <img src="${itme.imgBig1}" alt="">
    </li>`
    });
    $(".newPro ul").html(str)
})

// 爱情鲜花
$.get('../api/getLove.php', 'get', function(res) {
    let row = JSON.parse(res);
    // console.log(row);
    let str = ''
    row.forEach((itme) => {
        str += ` <dl uid=${itme.proId}>
        <dd>
            <img src="${itme.imgUrl}" alt="">
        </dd>
        <dt>
                <p>爱情 · ${itme.proName}

                </p>
                <p>
                    <span>￥</span><span>${itme.proPrice}</span>
    </p>
    <p>已售 ${itme.sale} 件</p>
    </dt>
    </dl>`
    });
    $(".loveItem").html(str)
})

// 送长辈
$.get('../api/getPar.php', 'get', function(res) {
    let row = JSON.parse(res);
    let str = ''
    row.forEach((itme) => {
        str += ` <dl uid=${itme.proId}>
        <dd>
            <img src="${itme.imgUrl}" alt="">
        </dd>
        <dt>
                <p>送长辈 · ${itme.proName}

                </p>
                <p>
                    <span>￥</span><span>${itme.proPrice}</span>
    </p>
    <p>已售 ${itme.sale} 件</p>
    </dt>
    </dl>`
    });
    $(".elderItem").html(str)
})

// 永生花

$.get('../api/getFor.php', 'get', function(res) {
    let row = JSON.parse(res);
    let str = ''
    row.forEach((itme) => {
        str += ` <dl uid=${itme.proId}>
        <dd>
            <img src="${itme.imgUrl}" alt="">
        </dd>
        <dt>
                <p>永生花 · ${itme.proName}

                </p>
                <p>
                    <span>￥</span><span>${itme.proPrice}</span>
    </p>
    <p>已售 ${itme.sale} 件</p>
    </dt>
    </dl>`
    });
    $(".forever").html(str)
})

// 蛋糕专区
$.get('../api/getCake.php', 'get', function(res) {
    let row = JSON.parse(res);
    let str = ''
    row.forEach((item) => {
        str += ` <dl uid=${item.proId}>
        <dd><img src="${item.imgUrl}" alt=""></dd>
        <dt>
            <h4>${item.proName}</h4>
            <p><span>￥</span><span>${item.proPrice}</span></p>
            <p>已售 ${item.sale}  件</p>
        </dt>
    </dl>`
    });
    $("#cakeItem").html(str)

})

// 礼品专区
$.get('../api/getPre.php', {
    min: 0,
    max: 5
}, function(res) {
    let row = JSON.parse(res);
    let str = ''
    row.forEach((item) => {
        str += ` <dl uid=${item.proId}>
        <dd><img src="${item.imgUrl}" alt=""></dd>
        <dt>
            <h4>${item.proName}</h4>
            <p><span>￥</span><span>${item.proPrice}</span></p>
            <p>已售 ${item.sale}  件</p>
        </dt>
    </dl>`
    });
    $("#p1").html(str)

})
$.get('../api/getPre.php', {
    min: 5,
    max: 10
}, function(res) {
    let row = JSON.parse(res);
    let str = ''
    row.forEach((item) => {
        str += ` <dl uid=${item.proId}>
        <dd><img src="${item.imgUrl}" alt=""></dd>
        <dt>
            <h4>${item.proName}</h4>
            <p><span>￥</span><span>${item.proPrice}</span></p>
            <p>已售 ${item.sale}  件</p>
        </dt>
    </dl>`
    });
    $("#p2").html(str)

})


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