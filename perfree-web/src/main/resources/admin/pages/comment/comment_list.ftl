<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>评论</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
    <link href="/public/libs/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="/admin/static/css/main.css" rel="stylesheet"/>
</head>
<body class="layui-layout-body">
    <div class="p-container">
        <div class="layui-card">
            <div class="layui-card-body">
                <div class="p-search-panel">
                    <form class="layui-form">
                        <div class="layui-form-item">
                            <div class="layui-inline">
                                <label class="layui-form-label">关键字:</label>
                                <div class="layui-input-inline">
                                    <input type="text" name="content" placeholder="请输入关键字" id="content" onkeydown="if(event.keyCode===13){event.keyCode=0;event.returnValue=false;}" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <button id="queryBtn" class="layui-btn" type="button">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                    查询
                                </button>
                            </div>

                            <div class="layui-inline">
                                <button id="batchDeleteBtn" class="layui-btn" type="button">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    批量删除
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="p-table-box">
                    <table class="layui-hide" id="tableBox" lay-filter="tableBox"></table>
                </div>
            </div>
        </div>

    </div>

    <script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
    <script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
    <script src="/admin/pages/comment/js/comment_list.js"></script>
</body>
</html>