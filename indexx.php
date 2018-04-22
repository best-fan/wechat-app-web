<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>濮阳打工网</title>
    <link rel="stylesheet" href="css/layui.css">
    <link rel="stylesheet" href="res/css/index.css" media="all" />
    <script src="res/js/bmob-min.js"></script>
    <script src="layui.js"></script>
    <script>
        layui.config({
            base: 'res/js/modules/' //你存放新模块的目录，注意，不是layui的模块目录
        }).use('index_pd'); //加载入口
    </script>
</head>

<body class="layui-layout-body">
    <div class="layui-layout layui-layout-admin">
        <div class="layui-header">
            <div class="layui-logo">濮阳打工网后台管理</div>
            <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item" mobile>
                        <a href="https://mpkf.weixin.qq.com/" target="_blank" ><i class="iconfont icon-shezhi1" data-icon="icon-shezhi1"></i><cite>微信客服</cite></a>
                    </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <img src="http://dwz.cn/7uuir4" class="layui-nav-img"> <span id="userName"></span>
                    </a>
                    <dl class="layui-nav-child">
                        <dd><a href="javascript:;" data-url="changepwd.html"><i class="iconfont" data-icon="icon-shezhi1"></i><cite>修改密码</cite></a></dd>
                        <dd><a a href="javascript:void(0);" onclick="exit()" >退出</a></dd>
                       
                    </dl>
                </li>
            </ul>
        </div>
        <div class="layui-side layui-bg-black">
            <div class="user-photo">
                <a class="img" title="我的头像"><img src="http://dwz.cn/7uuir4"></a>
                <p>你好！<span id="username"></span>, 欢迎登录</p>
            </div>
            <div class="navBar layui-side-scroll"></div>
            
        </div>
        <!-- 右侧内容 -->
        <div class="layui-body layui-form">
            <div class="layui-tab marg0" lay-filter="bodyTab">
                <ul class="layui-tab-title top_tab">
                    <li class="layui-this" lay-id=""><i class="iconfont icon-computer"></i> <cite>首页</cite></li>
                </ul>
                <div class="layui-tab-content clildFrame">
                    <div class="layui-tab-item layui-show">
                        <iframe src="main.html"></iframe>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部固定区域 -->
        <div class="layui-footer">
            <p> © 2018 小樊工作室提供 技术支持  </p>

        </div>
    </div>

    <script type="text/javascript" src="res/js/modules/index.js"></script>
    <script type="text/javascript" src="res/js/modules/leftNav.js"></script> 
    <script type="text/javascript" src="res/js/modules/nav.js"></script> 
</body>

</html>