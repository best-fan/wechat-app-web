<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>后台管理</title>
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/login.css" />
    <link rel="stylesheet" href="css/layui.css">
    <script src="res/js/bmob-min.js"></script>

</head>

<body>
    <div class="page">
        <div class="loginwarrp">
            <div class="logo">濮阳打工网 </div>
            <div class="logo">小程序后台管理系统</div>
            <div class="login_form">
                <form class="layui-form layui-form-pane" id='myform' action="">
                    <li class="login-item">
                        <span>用户名：</span>
                        <input type="text" id="username" name="UserName" placeholder="请输入用户名" lay-verify="username" class="login_input">
                        <span id="count-msg" class="error">*</span>
                    </li>
                    <li class="login-item">
                        <span>密　码：</span>
                        <input type="password" id="password" name="password" placeholder="请输入密码" lay-verify="password" class="login_input">
                        <span id="password-msg" class="error">*</span>
                    </li>
                    <li class="login-sub">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1">登录</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </li>
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        window.onload = function() {
            var config = {
                vx: 4,
                vy: 4,
                height: 2,
                width: 2,
                count: 100,
                color: "121, 162, 185",
                stroke: "100, 200, 180",
                dist: 6000,
                e_dist: 20000,
                max_conn: 10
            }
            CanvasParticle(config);
        }
    </script>
    <script src="layui.js"></script>
    <script type="text/javascript" src="res/js/modules/login.js"></script>
    <script type="text/javascript" src="res/js/canvas-particle.js"></script>
</body>

</html>