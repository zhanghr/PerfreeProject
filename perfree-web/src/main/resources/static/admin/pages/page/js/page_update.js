let layer, form, xmSelect, element;
// markdown编辑器
let markdownEditor;
let categorySelect;
let tagSelect;
layui.config({
    base: '/static/public/libs/layuiComponents/'
}).extend({
    xmSelect: 'xm-select/xm-select'
})
layui.use(['layer', 'form', 'xmSelect', 'element'], function () {
    layer = layui.layer;
    element = layui.element;
    form = layui.form;
    xmSelect = layui.xmSelect;
    layer.config({
        offset: '20%'
    });
    initMarkdownEditor();
    initEvent();
    initTag();
    initCategory();
});

/**
 * 初始化页面事件
 */
function initEvent() {
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(draftForm)', function (data) {
        data.field.status = 1;
        submitArticle(data.field);
        return false;
    });
    form.on('submit(publishForm)', function (data) {
        data.field.status = 0;
        submitArticle(data.field);
        return false;
    });
}

/**
 * 提交文章
 * @param data
 */
function submitArticle(data) {
    if (categorySelect.getValue().length > 0) {
        data.categoryId = categorySelect.getValue()[0].value;
    }
    let tagArr = [];
    tagSelect.getValue().forEach(res => {
        const tag = {tagId: res.id, name: res.name};
        tagArr.push(tag)
    });
    data.articleTags = tagArr;
    data.isComment = data.isComment === 'on' ? 1 : 0
    $.ajax({
        type: "POST",
        url: "/admin/page/update",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (d) {
            if (d.code === 200) {
                location.reload();
                parent.layer.msg("页面修改成功", {icon: 1})
                parent.toPage('/admin/page');
                parent.element.tabDelete('tabNav', '-4');
            } else {
                layer.msg(d.msg, {icon: 2});
            }
        },
        error: function (data) {
            layer.msg("页面修改失败", {icon: 2});
        }
    });
}

/**
 * 初始化markdown编辑器
 */
function initMarkdownEditor() {
    markdownEditor = editormd("editor", {
        placeholder: '请输入内容',
        width: "100%",
        height: '700',
        name: "content",
        syncScrolling: "single",
        path: "/static/public/libs/editormd/lib/", //注意2：你的路径
        saveHTMLToTextarea: false,
        tex: true, // 开启科学公式TeX语言支持，默认关闭
        watch: false,
        imageUpload: false,
        markdown: $("#articleContent").val(),
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        toolbarIcons: function () {
            return [
                "undo", "|",
                "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                "h1", "h2", "h3", "h4", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|","customImg","customVideo","|",
                "link", "reference-link",  "code", "preformatted-text", "code-block", "table", "datetime", "|",
                "goto-line", "watch", "preview", "clear", "search"
            ]
        },
        toolbarIconsClass: {
            customImg: "fa-picture-o",
            customVideo: "fa-video-camera"
        },
        toolbarHandlers: {
            customImg: function (cm, icon, cursor, selection) {
                openSelectImPanel(2, null, markdownEditor, cm, icon, cursor, selection);
            },
            customVideo: function (cm, icon, cursor, selection) {
                openSelectVideoPanel(markdownEditor, cm, icon, cursor, selection);
            }
        },
        lang: {
            toolbar: {
                customImg: "插入图片",
                customVideo: "插入视频"
            }
        }
    });
}


/**
 * 初始化标签选择框
 */
function initTag() {
    let tagsValue = $("#tagsValue").val();
    tagsValue = tagsValue.substr(0, tagsValue.length - 1);
    let initValue = tagsValue.split(",");
    $.get("/admin/tag/allList", function (res) {
        if (res.code === 200) {
            let tagArr = [];
            res.data.forEach(r => {
                const param = {name: r.name, value: r.id, id: r.id};
                tagArr.push(param);
            })
            tagSelect = xmSelect.render({
                el: '#tag',
                tips: '请选择标签',
                theme: {
                    color: '#5FB878',
                },
                initValue: initValue,
                searchTips: '搜索标签或输入标签名新增',
                filterable: true,
                create: function (val, arr) {
                    //返回一个创建成功的对象, val是搜索的数据, arr是搜索后的当前页面数据
                    return {
                        name: val,
                        value: val
                    }
                },
                data: tagArr,
                on: function (data) {
                    if (data.isAdd && data.change[0].id === null || data.isAdd && data.change[0].id === undefined) {
                        $.ajax({
                            type: "POST",
                            url: "/admin/tag/add",
                            contentType: "application/json",
                            data: JSON.stringify({name: data.change[0].value}),
                            success: function (d) {
                                if (d.code === 200) {
                                    const currentProfileIndex = (data.arr || []).findIndex((profile) => profile.value === d.data.name);
                                    data.arr[currentProfileIndex].id = d.data.id;
                                } else {
                                    layer.msg("新建标签失败", {icon: 2});
                                }
                            },
                            error: function (data) {
                                layer.msg("新建标签失败", {icon: 2});
                            }
                        });
                    }
                }
            });
        } else {
            layer.msg(res.msg, {icon: 2});
        }
    });
}

/**
 * 初始化分类选择框
 */
function initCategory() {
    $.get("/admin/category/allList", function (res) {
        if (res.code === 200) {
            categorySelect = xmSelect.render({
                el: '#category',
                theme: {
                    color: '#5FB878',
                },
                model: {label: {type: 'text'}},
                radio: true,
                tips: '请选择分类',
                filterable: true,
                searchTips: '输入分类名搜索',
                clickClose: true,
                initValue: [$("#categoryIdValue").val()],
                tree: {
                    show: true,
                    strict: false,
                    expandedKeys: [-1],
                },
                height: 'auto',
                data() {
                    return res.data
                }
            });
        } else {
            layer.msg(res.msg, {icon: 2});
        }
    });
}