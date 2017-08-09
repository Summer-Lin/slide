;(function ($, window, document, undefined) {

    var pluginName = "slide",
        defaults = {
            // 索引
            index: 0,
            // div的宽度
            width: 2,
            // 变大后的长度高度
            enlargeWidth: 3.2,
            enlargeHeight: 1.5,
            // 判断点击，防止快速滚动
            flag: true,
            auto: 1000,
            clickFlag: true
        };

    function slide(element, options) {
        this.$ul = $('.slide>ul');
        this.$li = $('.slide>ul>li');
        this.$img = $('.slide>ul>li>img');

        this.options = $.extend({}, defaults, options);
        // 初始化
        this.init();
    }

    slide.prototype = {
        init: function () {
            var _this = this;
//        设置div宽高
            $('.slide').css({width: this.options.width + "rem"});
            // 保存div原有的高度
            this.options.height = this.$img.height();
            // 设置div高度
            $('.slide').css({height: this.$img.height()});

            // 创建最后一张图片，为第一张图片
            this.createLi();
            //索引指示点
            this.creatPoints();

//        右点击事件
            $('.arrow-right').click(function () {
                _this.arrowRight();
            });
            //        右点击事件
            $('.arrow-left').click(function () {
                _this.arrowLeft();
            });
            // 点击放大
            $('.slide>ul').click(function () {
                _this.clickEnlarge();

            });
            // 点击遮罩层消失，轮播图变小
            $('body').on('click', '.mask', function () {
                _this.clickReduce(defaults.width);
            })
        },
        // 点击恢复原样
        clickReduce: function (value) {
            var _this = this;
            // 移除遮罩层
            $('.mask').remove();
            // 将宽度设置成原来的宽度
            _this.options.width = value;
            $('.slide').css({width: value + "rem"});
            $('.slide').css({height: this.options.height});

            $('.slide>ul>li').css({width: value + "rem"});
            $('.slide>ul>li').css({height: 100 + "%"});


            // 变成原来的样子，索引从0开始
            _this.options.index = 0;
            _this.pointColor(_this.options.index);
            $('.slide>ul').css({left: 0 + "rem"});
            this.options.clickFlag = true;

        },
        // 点击放大
        clickEnlarge: function () {
            // 防止多次点击生成多个遮罩层
            if (!this.options.clickFlag) {
                return false;
            }
            var _this = this;

            _this.options.width = _this.options.enlargeWidth;
            // 动态生成遮罩层
            var mask = $('<div class="mask"></div>');
            // 遮罩层
            $('.slide').before(mask);

            // 设置变大后的样式
            $('.slide').css({width: _this.options.enlargeWidth + "rem"});
            $('.slide').css({height: _this.options.enlargeHeight + "rem"});

            $('.slide>ul>li').css({width: _this.options.enlargeWidth + "rem"});
            $('.slide>ul>li').css({height: 100 + "%"});

            // 恢复到索引为0
            _this.options.index = 0;
            _this.pointColor(_this.options.index);
            $('.slide>ul').css({left: 0 + "rem"});

            this.options.clickFlag = false;
        },
        // 右点击函数
        arrowRight: function () {
            var _this = this;
            //this.options.flag表示，动画完成后才可以继续点击
            if (this.options.flag) {
                this.options.flag = false;
                this.options.index++;

                // 当索引到达li的个数，滑动到最后一张，索引变为0，
                if (this.options.index == this.$li.length) {
                    this.pointColor(0);
                    this.$ul.stop().animate({left: -this.options.index * this.options.width + "rem"}, 500, function () {
                        _this.options.index = 0;
                        _this.$ul.css({left: 0});
                        _this.options.flag = true;
                    })
                } else {
                    this.pointColor(this.options.index);
                    this.$ul.stop().animate({left: -this.options.index * this.options.width + "rem"}, 500, function () {
                        _this.options.flag = true;
                    })
                }
            }

        },
        // 左点击函数
        arrowLeft: function () {
            var _this = this;

            if (this.options.flag) {
                this.options.flag = false;

                if (this.options.index == 0) {
                    _this.options.index = this.$li.length;
                    _this.$ul.css({left: -this.options.index * this.options.width + "rem"});
                    this.options.index--;
                    // 改变索引颜色
                    this.pointColor(this.options.index);
                    this.$ul.stop().animate({left: -this.options.index * this.options.width + "rem"}, 500, function () {

                        _this.options.flag = true;
                    })
                } else {
                    this.options.index--;
                    // 改变索引颜色
                    this.pointColor(this.options.index);
                    this.$ul.stop().animate({left: -this.options.index * this.options.width + "rem"}, 500, function () {
                        _this.options.flag = true;
                    })
                }
            }

        },
//        创建最后一张图片，为第一张图片
        createLi: function () {
            var $liImg = $('<li><img src="' + $('.slide>ul>li').eq(0).children().eq(0).attr('src') + '" /></li>');
            this.$ul.append($liImg);

        },
        // 索引指示点
        creatPoints: function () {
            $('.slide').append('<div class="index-point"><ul><li class="active"></li></div>');
            for (var i = 0; i < this.$li.length - 1; i++) {
                $('.index-point>ul').append('<li></li>');
            }
        },
        //  改变指示点颜色
        pointColor: function (index) {
            $('.index-point li').removeClass('active');
            $('.index-point li').eq(index).addClass('active');
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new slide(this, options));
            }
        });
    };

})(jQuery, window, document);