/**
 * Created by Wwei on 2016/9/1.
 */
Ext.define('Admin.view.users.UserForm', {
    extend: 'Ext.window.Window',
    xtype: 'userForm',

    title: '用户添加(默认密码：123456)',

    requires: [
        'Admin.view.users.UserFormController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',

    modal: true,
    height: 600,
    width: 700,

    controller: 'userform',

    viewModel: {
        links: {
            theUser: {
                type: 'users.User',
                create: true
            }
        },
        data: {
            roleComboQueryMode: 'remote'
        }
    },

    items: {
        xtype: 'form',
        modelValidation: true,
        defaults: {
            labelAlign: 'left',
            margin: 10,
            msgTarget: 'side',
        },
        items: [{
            xtype: 'hidden',
            name: 'userId',
            bind: {
                value: '{theUser.userId}'
            }
        }, {
            layout: 'column',
            items: [{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'username',
                    fieldLabel: '用户名',
                    regex: /^[A-Za-z0-9]{4,40}$/,
                    regexText: '用户名必须长度4，字母或者数字',
                    bind: {
                        value: '{theUser.username}',
                        disabled:'{usernameDis}'
                    }
                }]
            }, {
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'realname',
                    fieldLabel: '昵称',
                    bind: {
                        value: '{theUser.realname}'
                    }
                }]
            }]
        }, {
            layout: 'column',
            items: [{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'qq',
                    fieldLabel: 'QQ',
                    regex: /^\d{5,10}$/,
                    regexText: '请确保QQ号正确',
                    bind: '{theUser.qq}'
                }]
            }, {
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'phone',
                    fieldLabel: '电话号码',
                    regex:/^1(3|4|5|7|8)\d{9}$/,
                    regexText: '请确保手机号正确',
                    bind: '{theUser.phone}'
                }]
            }]
        }, {
            layout: 'column',
            items: [
                {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'combo',
                        fieldLabel: '用户类型',
                        name: 'userType',
                        displayField: 'label',
                        valueField: 'value',
                        editable: false,
                        store: {
                            data: [{
                                label: '游戏运营人员', value: 1
                            },{
                                label: '玩家', value: 3
                            }]
                        },
                        bind: '{theUser.userType}'
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'filefield',
                        name: 'idPath',
                        fieldLabel: '头像',
                        labelWidth: 50,
                        msgTarget: 'side',
                        anchor: '100%',
                        accept: 'image/jpeg,image/png',
                        buttonText: '选择图片...',
                        validator: function (value) {
                            if(value==''){
                                return true;
                            }
                            var arr = value.split('.');
                            if (arr[arr.length - 1] == 'jpg' || arr[arr.length - 1] == 'jpeg'
                                || arr[arr.length - 1] == 'JPG' || arr[arr.length - 1] == 'JPEG' || arr[arr.length - 1] == 'PNG' || arr[arr.length - 1] == 'png') {
                                return true;
                            } else {
                                return '必须选择JPG或者PNG格式的图片！';
                            }
                        }
                    },{
                        xtype: 'button',
                        text: '查看',
                        hidden: true,
                        handler: function () {
                            var me = this,
                                w=me.up('window'),
                                viewModel=w.getViewModel().data;
                            window.open(Common.Dic.config.IMG_ADDRESS+'/'+viewModel.theUser.data.idPath);
                        },
                        bind: {
                            hidden: '{showIdCardButton}'
                        }
                    }]
                }]
        },{
                xtype: 'textareafield',
                fieldLabel: '描述',
                name: 'description',
                anchor: '100%',
                bind: '{theUser.description}'
            }
        ],
        buttons: [{
            text: '确定',
            handler: 'editUser'
        }, {
            text: '取消',
            handler: 'closeUserWindow'
        }]
    }
});
