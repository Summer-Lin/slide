### jQuery移动端轮播图，点击放大手动轮播，点击遮罩层消失，缩小回原样
### 动态图
![image](https://github.com/Summer-Lin/slide/blob/master/images/GIF.gif)

### 引用方法

```
1 引用
    <link rel="stylesheet" href="js/plugins/jquery.slide.css">   //引入CSS样式

2 引用jQuery
    <script src="js/plugins/jquery.js"></script>             //引入jQuery
    <script src="js/plugins/jquery.slide.js"></script>       //引入轮播图插件

3 调用
     $(function () {
            $('.slide').slide();
     })

（可以直接看例子怎么引用）

```


#### 引入代码

```

    <link rel="stylesheet" href="js/plugins/jquery.slide.css">   //引入CSS样式
    <script src="js/plugins/jquery.js"></script>             //引入jQuery
    <script src="js/plugins/jquery.slide.js"></script>       //引入轮播图插件
    <script>
        $(function () {
            $('.slide').slide();
        })

    </script>
</head>
<body>
<!--引入结构，类名不要变-->
<div class="slide">
    <ul>
        <li>
            <img src="images/1.jpg" alt="">
        </li>
        <li>
            <img src="images/2.jpg" alt="">
        </li>
        <li>
            <img src="images/3.jpg" alt="">
        </li>
        <li>
            <img src="images/4.jpg" alt="">
        </li>
        <li>
            <img src="images/5.jpg" alt="">
        </li>
    </ul>
    <!--左右箭头，箭头由CSS样式写的-->
    <a class="arrow-left" href="#"></a>
    <a class="arrow-right" href="#"></a>
</div>
</body>
```

