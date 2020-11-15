<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>附件-选择图片</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
    <link href="/admin/static/css/main.css" rel="stylesheet"/>
    <link href="/admin/pages/attach/css/article-img.css" rel="stylesheet"/>
</head>
<body class="layui-layout-body" >
<div class="p-search-panel" >
    <form class="layui-form">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label" style="padding-left: 0;">图片名:</label>
                <div class="layui-input-inline">
                    <input type="text" name="name" placeholder="请输入图片件名" id="name" onkeydown="if(event.keyCode===13){event.keyCode=0;event.returnValue=false;}" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <button id="queryBtn" class="layui-btn" type="button">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    搜索
                </button>
            </div>

            <div class="layui-inline">
                <button id="uploadBtn" class="layui-btn" type="button">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    上传图片
                </button>
            </div>
        </div>
    </form>
</div>
<div class="p-table-box">
    <div class="img-list-box" id="tableBox">
    </div>
    <div id="tabBoxPage"></div>
</div>

<script id="tableTpl" type="text/html">
    {{#  layui.each(d, function(index, item){ }}
    <div class="img-box">
        <img lay-src="{{ item.path }}">
        <span>{{ item.name }}</span>
    </div>
    {{#  }); }}
    {{#  if(d === null || d.length === 0){ }}
        暂无数据
    {{#  } }}
</script>
<script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
<script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
<script src="/admin/pages/attach/js/attach-img.js"></script>
</body>
</html>