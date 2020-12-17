//头部显示隐藏框
show("#wei", ".weiBox")
show("#app", ".appBox")
show("#severs", '.sever')
show("#car", ".cars")
show("#all", ".allNone")


let userName = getCookie('userName')

if (!userName) {
    localStorage.setItem('url', location.href)
    location.href = '../html/login.html'
}
$(".userName").html(`你好，${userName}`)
getData()

//获取购物车表里的数据
async function getData() {
    let res = await pAjax({
            url: '../api/getCar.php',
            data: {
                userName: userName
            }
        })
        // console.log(JSON.parse(res));
    localStorage.setItem("proList", res)
    showData(JSON.parse(res))
    deleteItem()

}


//渲染数据
function showData(arr) {
    let conPan = document.querySelector("#conPan")
    if (arr.length == 0) {
        conPan.innerHTML = `
        <div class="jumbotron">
                <h1>购物车空空如也</h1>
                <p><a class="btn btn-primary btn-lg" href="../html/index.html" role="button">去挑选商品</a></p>
            </div> 
        `
        return
    }
    let allCheck = arr.every(item => {
        return item.isSelect == 1
    })
    let totals = total(arr)
    let str = `<table><thead>
    <th><input type="checkbox" id="allCheck" ${allCheck?'checked' :''}></th>
    <th>商品名称</th>
    <th>市场价</th>
    <th>订购价</th>
    <th>数量</th>
    <th>操作</th>
    </thead><tbody>`
    arr.forEach(item => {
        if (item.type == '鲜花') {
            str += `
        <tr>
        <td><input type="checkbox" class='check' ${item.isSelect==1?"checked":""} uid=${item.id}> </td>

        <td>
            <img src="${item.imgUrl}" alt="">
            <a href="" target="_blank">
                <span class="product-title">[${item.type}]${item.proName}</span>
            </a>
        </td>
        <td>
            <span>¥</span><span><s>${item.originalCost}</s></span>
        </td>
        <td>
            <span>¥</span><span>${item.proPrice}</span>
        </td>
        <td uid=${item.id} class="numTd">
            <div class="input-num">
                <button class="reduce">-</button>
                <input type="text" class="numIn" name="cpsl" value="${item.num}" maxlength="3">
                <button class="add">+</button>
            </div>
        </td>
        <td>
            <p><button class="removeBtn" uid=${item.id}>删除</button></p>
            <p>移到我的收藏</p>
        </td>
    </tr>
        `
        } else {
            str += `
            <tr>
            <td><input type="checkbox" ${item.isSelect==1?"checked":""} uid=${item.id} class='check'></td>
    
            <td>
                <img src="${item.imgUrl}" alt="">
                <a href="" target="_blank">
                    <span class="product-title">[${item.type}]${item.proName}</span>
                    <span class="feature">顺丰陆运深圳发货</span>
                </a>
            </td>
            <td>
                <span>¥</span><span><s>${item.originalCost}</s></span>
            </td>
            <td>
                <span>¥</span><span>${item.proPrice}</span>
            </td>
            <td uid=${item.id} class="numTd">
                <div class="input-num">
                    <button class="reduce">-</button>
                    <input type="text" class="numIn" name="cpsl" value="${item.num}" maxlength="3">
                    <button class="add">+</button>
                </div>
            </td>
            <td>
                <p><button class="removeBtn" uid=${item.id}>删除</button></p>
                <p>移到我的收藏</p>
            </td>
        </tr>
            `
        }

    });
    str += ` </tbody>
    </table>
    <div class="pay">
                <p>
                    <i class="iconfont icon-zuojiantou">
                </i>
                    <a href='../html/i.html'>
                         继续挑选</a>
                </p>
                <p><span>应付金额：</span><span>¥ ${totals.tPrice}</span><button id="payBtn">结算</button></p>
            </div>
    `


    conPan.innerHTML = str
}

//删除数据
function deleteItem() {
    $('.removeBtn').click(function() {
        console.log(this);
        if (!confirm("是否要删除这件商品？")) {
            return
        }
        let uid = $(this).attr('uid')
        delData(uid)
    })
}

//删除购物车表里的相应数据
async function delData(id) {
    let res = await pAjax({
            url: '../api/removeCar.php',
            data: {
                id: id
            }
        })
        // console.log(res);
    if (JSON.parse(res).code) {
        alert("删除成功")
        getData()
    }

}

//计算商品总价
function total(data) {
    let res = data.filter(item => {
        return item.isSelect == 1
    })
    let totalNum = res.reduce((sum, item) => {
        return sum + item.num * 1
    }, 0)
    let totalPrice = res.reduce((sum, item) => {
        return sum + item.num * item.proPrice
    }, 0)
    return {
        tNum: totalNum,
        tPrice: totalPrice
    }
}




$('#conPan').click(function() {
    let e = window.event
        //点击全选按钮
    if (e.target.id == "allCheck") {
        let data = JSON.parse(localStorage.getItem("proList"))
        data.forEach(item => {
            e.target.checked ? item.isSelect = 1 : item.isSelect = 0
        })
        localStorage.setItem("proList", JSON.stringify(data))
        showData(data)
    }

    //单选按钮
    if (e.target.className == "check") {
        let data = JSON.parse(localStorage.getItem("proList"))
        let id = e.target.getAttribute("uid")
        data.forEach(item => {
                if (item.id == id) {
                    item.isSelect = e.target.checked ? 1 : 0;
                }
            })
            // console.log(data);
        localStorage.setItem("proList", JSON.stringify(data))
        showData(data)
    }

    //加减数量按钮
    if (e.target.className == "reduce") {
        let data = JSON.parse(localStorage.getItem("proList"))
        let id = e.target.parentNode.parentNode.getAttribute("uid")
        let r = data.filter(item => {
            return item.id == id
        })[0]
        let nums = r.num * 1
        nums = nums - 1 >= 1 ? nums - 1 : 1
        pAjax({
            url: "../api/upCar.php",
            data: {
                userName: userName,
                id: id,
                num: nums
            }
        }).then(res => {
            if (JSON.parse(res).code) {
                r.num = nums;
                localStorage.setItem('proList', JSON.stringify(data));
                showData(data);
            }
        })

    }
    if (e.target.className == "add") {
        let data = JSON.parse(localStorage.getItem("proList"))
        let id = e.target.parentNode.parentNode.getAttribute("uid")
        let r = data.filter(item => {
            return item.id == id
        })[0]
        let nums = r.num * 1
        nums = nums + 1
        pAjax({
            url: "../api/upCar.php",
            data: {
                userName: userName,
                id: id,
                num: nums
            }
        }).then(res => {
            if (JSON.parse(res).code) {
                r.num = nums;
                localStorage.setItem('proList', JSON.stringify(data));
                showData(data);
            }
        })

    }

    if (e.target.id == "payBtn") {
        let data = JSON.parse(localStorage.getItem("proList"))
        let totals = total(data)
        let res2 = data.filter(item => {
            return item.isSelect == 1
        })
        let r3 = data.filter(item => {
            return item.isSelect != 1
        })
        res2.forEach(item => {
            pAjax({
                url: "../api/removeCarData.php",
                data: {
                    userName: userName,
                    id: item.id
                }
            }).then(r => {
                if (!JSON.parse(r).code) {
                    return
                }
            })
        })
        alert(`支付成功，一共支付了${totals.tPrice}元`)
        localStorage.setItem("proList", JSON.stringify(r3))
        showData(r3)

    }


})





//更新数量
async function upData(id, num, r, datas) {
    let res = await pAjax({
        url: "../api/upCar.php",
        data: {
            userName: userName,
            id: id,
            num: num
        }
    })
    if (JSON.parse(res).code) {
        r.num = num;
        console.log(r.num);
        localStorage.setItem('goodsList', JSON.stringify(datas));
        showData(datas);
    }

}

function show(ele, ele2) {
    $(ele).hover(function() {
        $(ele2).css('display', 'block')
    }, function() {
        $(ele2).css('display', 'none')
    })
}