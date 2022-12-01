
window.addEventListener('load', function () {

    //获取元素

    var arrow_l = document.querySelector('.arrow-l');

    var arrow_r = document.querySelector('.arrow-r');

    var focus = document.querySelector('.focus');

    var focusWidth = focus.offsetWidth;

    //鼠标经过，左右箭头隐藏

    focus.addEventListener('mouseenter', function () {

        arrow_l.style.display = 'block';

        arrow_r.style.display = 'block';

        clearInterval(timer);

        timer = null;

    })

    //鼠标离开启动定时器

    focus.addEventListener('mouseleave', function () {

        arrow_l.style.display = 'none';

        arrow_r.style.display = 'none';

        //启动定时器

        timer = setInterval(function () {

            //手动调用点击事件

            arrow_r.click();

        }, 2000);

    })

    //动态生成小圆圈

    var ul = focus.querySelector('ul');

    var ol = focus.querySelector('.circle')

    //console.log(ul.children.length);

    for (var i = 0; i < ul.children.length; i++) {

        var li = document.createElement('li');

        ol.appendChild(li);

        //记录当前小圆圈的索引号，通过自定义属性来做

        li.setAttribute('index', i);

        //排他思想 给li添加点击效果



        //小圆点点击事件

        li.addEventListener('click', function () {

            for (var i = 0; i < ol.children.length; i++) {

                ol.children[i].className = ' ';

            }

            this.className = 'current';

            //点击圆圈移动图片

            //动画函数使用者必须有定位  算法：小圆圈的索引号*图片大小就是ul的移动距离 注意是负值

            //当点击了某个li 就拿到了当前li的索引号

            var index = this.getAttribute('index');

            //当点击了li， 就要把li的索引号给num 控制图片

            num = index;

            //当点击了li， 就要把li的索引号给circle 控制圆圈

            circle = index;

            //console.log(focus.offsetWidth);

            animate(ul, -index * focusWidth);

        })

    }

    //让第一个圈添加白底

    ol.children[0].className = 'current';

    //克隆第一张图片，放到最后面 (写到生成小圆圈的外面)

    var first = ul.children[0].cloneNode(true);

    ul.appendChild(first);

    //点击右侧按钮滚动图片

    var num = 0;

    //控制小圆圈播放

    var circle = 0;

    //节流阀

    var flag = true;

    arrow_r.addEventListener('click', function () {

        //如果走到最后一张图片 ，ul快速复原 left改为0 (无缝滚动)

        if (flag) {

            flag = false; //关闭节流阀

            if (num == ul.children.length - 1) {

                ul.style.left = 0;

                num = 0;

            }

            num++;

            animate(ul, -num * focusWidth, function () {

                flag = true; //打开节流阀

            });

            circle++;

            //如果circle长度 = ol.children.length 回到0

            if (circle == ol.children.length) {

                circle = 0;

            }

            circleChange();

        }

    });

    //左侧按钮

    arrow_l.addEventListener('click', function () {

        //如果走到第一张图片 ，ul快速到最后一张 left改为-(ul.children.length - 1) * focusWidth + 'px' (无缝滚动)

        if (flag) {

            flag = false; //关闭节流阀

            if (num == 0) {

                num = ul.children.length - 1;

                ul.style.left = -num * focusWidth + 'px';

            }

            num--;

            animate(ul, -num * focusWidth, function () {

                flag = true;  //打开节流阀

            });

            circle--;

            //如果circle<0 说明到第一张图片了

            // if(circle < 0) {

            //     circle = ol.children.length - 1;

            // }

            circle = circle < 0 ? ol.children.length - 1 : circle;

            circleChange();

        }

    });

    function circleChange() {

        for (var i = 0; i < ol.children.length; i++) {

            ol.children[i].className = '';

        }

        ol.children[circle].className = 'current';

    }

    //定时器

    var timer = setInterval(function () {

        //手动调用点击事件

        arrow_r.click();

    }, 2000);

})


function animate(obj, target, callback) {



    //调用函数就清除一次定时器，避免问题发生



    clearInterval(obj.timer)



    //添加定时器



    obj.timer = setInterval(function () {



        //步长值写到计时器里面  改为整数(往上取整)



        var step = (target - obj.offsetLeft) / 10;



        //整数往大了取，负数往小了取



        step = step > 0 ? Math.ceil(step) : Math.floor(step);



        if (obj.offsetLeft == target) {



            //如果已经到达指定位置就停止定时器



            clearInterval(obj.timer);



            //回调函数写到定时器结束之后



            callback && callback();



        }



        //把每次加一步长值改变为慢慢变小的值



        obj.style.left = obj.offsetLeft + step + 'px';



    }, 15);



}