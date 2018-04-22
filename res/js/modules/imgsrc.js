Bmob.initialize("你的Application ID", "你的REST API Key");
layui.use(['layedit', 'upload'], function() {

    if (localStorage.getItem("login_type") == '2') {
        var $ = layui.jquery;
        var layer = layui.layer;
        layer.msg('权限不足，无法编辑', { icon: 4 });
        $(':button').prop('disabled', true);
        $(':input').prop('disabled', true);
    } else {
        var $ = layui.jquery;
        var layer = layui.layer,
            upload = layui.upload;
        var tag_token = $(".tag_token").val();
        //普通图片上传
        var uploadInst = upload.render({
            elem: '.btn_upload_img',
            type: 'images',
            exts: 'jpg|png|gif|jpeg' //设置一些后缀，用于演示前端验证和后端的验证
                //,auto:false //选择图片后是否直接上传
                //,accept:'images' //上传文件类型
                ,
            url: 'upload.php',
            data: {
                '_token': tag_token
            },
            before: function(obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result) {
                    $('.img-upload-view').attr('src', result); //图片链接（base64）
                });
            },
            done: function(res) {
                $('#upSrc').val("http://admin.xxsyywl.cn/" + res.data);
                //如果上传失败
                if (res.status == 1) {
                    return layer.msg('上传成功');

                } else { //上传成功
                    layer.msg(res.message);
                    //console.log(res.data);
                    //$('#detSrc').val("http://admin.xxsyywl.cn/" + res.data);

                }
            },
            error: function() {
                //演示失败状态，并实现重传
                return layer.msg('上传失败,请重新上传');
            }
        });
        getimg();

    }
});

//获取图片地址
function getimg() {
    layui.use(['layedit'], function() {
        var $ = layui.jquery;
        var ImgSrc = Bmob.Object.extend("SwiperImgSrc");
        var query = new Bmob.Query(ImgSrc);
        query.find({
            success: function(results) {
                //alert("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // alert(object.id + ' - ' + object.get('playerName'));
                    switch (i) {
                        case 0:
                            $('#img_1').attr('src', object.get('swiperImgSrc'));
                            $('#img_1').attr('alt', object.id);
                            break;
                        case 1:
                            $('#img_2').attr('src', object.get('swiperImgSrc'));
                            $('#img_2').attr('alt', object.id);
                            break;
                        case 2:
                            $('#img_3').attr('src', object.get('swiperImgSrc'));
                            $('#img_3').attr('alt', object.id);
                            break;
                    }
                }
            },
            error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
            }
        });
    });
    // console.log('图片获取成功');
}

//提交图片1地址
function putimg1() {
    layui.use(['layedit'], function() {
        var $ = layui.jquery;
        // alert($('#img_1')[0].src)
        // alert($('#img_1').attr("alt"))
        // alert($('#putimg_1').val().length)
        if ($('#putimg_1').val().length == 0) {
            layer.msg('图片链接不能为空', { icon: 2 });
            $('#putimg_1').focus();
        } else {
            var ImgSrc = Bmob.Object.extend("SwiperImgSrc");
            var query = new Bmob.Query(ImgSrc);
            query.get($('#img_1').attr("alt"), {
                success: function(gameScore) {
                    // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                    gameScore.set('swiperImgSrc', $('#putimg_1').val());
                    gameScore.save();
                    layer.msg('更新成功', { icon: 1 });
                    $('#putimg_1').val("");
                    setTimeout(function() {
                        getimg();
                    }, 1.5 * 1000);
                    // The object was retrieved successfully.
                },
                error: function(object, error) {

                }
            });
        }

    });

}

//提交图片2地址
function putimg2() {
    layui.use(['layedit'], function() {
        var $ = layui.jquery;
        // alert($('#img_1')[0].src)
        // alert($('#img_1').attr("alt"))
        // alert($('#putimg_1').val().length)
        if ($('#putimg_2').val().length == 0) {
            layer.msg('图片链接不能为空', { icon: 2 });
            $('#putimg_2').focus();
        } else {
            var ImgSrc = Bmob.Object.extend("SwiperImgSrc");
            var query = new Bmob.Query(ImgSrc);
            query.get($('#img_2').attr("alt"), {
                success: function(gameScore) {
                    // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                    gameScore.set('swiperImgSrc', $('#putimg_2').val());
                    gameScore.save();
                    layer.msg('更新成功', { icon: 1 });
                    $('#putimg_2').val("");
                    setTimeout(function() {
                        getimg();
                    }, 1.5 * 1000);
                    // The object was retrieved successfully.
                },
                error: function(object, error) {

                }
            });
        }

    });

}

//提交图片3地址
function putimg3() {
    layui.use(['layedit'], function() {
        var $ = layui.jquery;
        // alert($('#img_1')[0].src)
        // alert($('#img_1').attr("alt"))
        // alert($('#putimg_1').val().length)
        if ($('#putimg_3').val().length == 0) {
            layer.msg('图片链接不能为空', { icon: 2 });
            $('#putimg_3').focus();
        } else {
            var ImgSrc = Bmob.Object.extend("SwiperImgSrc");
            var query = new Bmob.Query(ImgSrc);
            query.get($('#img_3').attr("alt"), {
                success: function(gameScore) {
                    // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                    gameScore.set('swiperImgSrc', $('#putimg_3').val());
                    gameScore.save();
                    layer.msg('更新成功', { icon: 1 });
                    $('#putimg_3').val("");
                    setTimeout(function() {
                        getimg();
                    }, 1.5 * 1000);
                    // The object was retrieved successfully.
                },
                error: function(object, error) {

                }
            });
        }

    });

}