/**
 * Created by hasee on 2018/4/21.
 */
Ext.define('Admin.view.players.Players', {
    extend: 'Ext.window.Window',
    xtype: 'players',
    title: '比赛详细信息',
    width: '50%',
    height: '450px',
    resizable:false,
    draggable:false,
    requires: [
        'Admin.view.players.PlayersController',
        'Ext.button.Button',
        'Ext.form.field.Date'
    ],
    controller: "players",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'form',
        reference: 'form',
        id:'playersForm',
        defaultButton: 'btn_search',
        layout: 'column',
        defaults: {
            labelAlign: 'right'
        },
        items: [{
            xtype: 'textfield',
            id: 'players_match_id',
            reference: 'match_id',
            fieldLabel: '比赛id',
            bind: '{thePlayers.match_id}',
            margin: '15px 0px 0px 0px',
            name: 'match_id'
        }]
    },{
        xtype: 'grid',
        sortableColumns: true,
        reference: 'grid',
        flex: 1,
        //store: 'players.Players',
        store:Ext.create('Ext.data.Store',{
            id:'playersStore',
           reference:'playersStore',
           proxy:{
               type:'ajax',
               url:Common.Config.requestPath('Match', 'getMatchDetailPlayers'),
               //timeout:90000,
                reader: {
                    type: 'json',
                    rootProperty: 'data.list',
                    totalProperty: 'data.total'
                }
           },
        //autoLoad:true
        }),
        columns: [{
            text: "玩家账号id",
            dataIndex: 'account_id',
            hidden:true
        }, {
            text: "玩家名称",
            dataIndex: 'personaname'
        },{
            text: "玩家位置",
            dataIndex: 'player_slot'
        }, {
            text: "英雄",
            dataIndex: 'heroPath',
            renderer:function (value) {
                return '<img style="width: 75%;height: 75%;" title="" alt="" src="' + value + '">'
            }
        }, {
            text: "英雄",
            dataIndex: 'hero_id',
            hidden:true
        }, {
            text: "物品0",
            dataIndex: 'item_0',
            hidden:true,
            renderer:function (value, cellmeta, record, rowIndex, columnIndex, store) {
                /*console.log(store)
                console.log(rowIndex)
                console.log(columnIndex)
                console.log(record)
                var shit = ''
                var myStore = Ext.create('Ext.data.Store',{
                    model: 'Admin.model.item.Item',
                    id:'getItemByIdStore',
                    proxy:{
                        type:'ajax',
                        url:Common.Config.requestPath('Item', 'getItemById'),
                        extraParams: {
                            itemId:value
                        },
                        reader: {
                            type: 'json',
                            rootProperty: 'data.list',
                            totalProperty: 'data.total'
                        },
                    },
                    autoLoad:false
                });
                myStore.load({
                    scope:this,
                    callback:function(records){
                        for(var i=0;i<myStore.getCount();i++){
                            var records = myStore.getAt(rowIndex);
                                shit = records.get('itemPath');
                                store.getAt(rowIndex).set("item_0", shit);
                           }

                        }

                });*/
                return value
            }
        }, {
            text: "物品1",
            dataIndex: 'item_1',
            hidden:true
        }, {
            text: "物品2",
            dataIndex: 'item_2',
            hidden:true
        }, {
            text: "物品3",
            dataIndex: 'item_3',
            hidden:true
        }, {
            text: "物品4",
            dataIndex: 'item_4',
            hidden:true
        }, {
            text: "物品5",
            dataIndex: 'item_5',
            hidden:true
        }, {
            text: "物品1",
            dataIndex: 'itemPath0',
            renderer:function (value) {
                return '<img style="width: 100%;height: 100%;" title="" alt="" src="'+ value + '">'

            }
        }, {
            text: "物品2",
            dataIndex: 'itemPath1',
            renderer:function (value) {
                return '<img style="width: 100%;height: 100%;" title="" alt="" src="'+ value + '">'

            }
        }, {
            text: "物品3",
            dataIndex: 'itemPath2',
            renderer:function (value) {
                return '<img style="width: 100%;height: 100%;" title="" alt="" src="'+ value + '">'

            }
        }, {
            text: "物品4",
            dataIndex: 'itemPath3',
            renderer:function (value) {
                return '<img style="width: 100%;height: 100%;" title="" alt="" src="'+ value + '">'

            }
        }, {
            text: "物品5",
            dataIndex: 'itemPath4',
            renderer:function (value) {
                return '<img style="width: 100%;height: 100%;" title="" alt="" src="'+ value + '">'

            }
        }, {
            text: "物品6",
            dataIndex: 'itemPath5',
            renderer:function (value) {
                return '<img style="width: 100%;height: 100%;" title="" alt="" src="'+ value + '">'

            }
        }, {
            text: "背包1",
            dataIndex: 'backpack_0',
            hidden:true
        }, {
            text: "背包2",
            dataIndex: 'backpack_1',
            hidden:true
        }, {
            text: "背包3",
            dataIndex: 'backpack_2',
            hidden:true
        }, {
            text: "击杀",
            dataIndex: 'kills'
        }, {
            text: "死亡",
            dataIndex: 'deaths'
        }, {
            text: "助攻",
            dataIndex: 'assists'
        },/**
         *
         0 - NONE - finished match, no abandon.
         1 - DISCONNECTED - player DC, no abandon.
         2 - DISCONNECTED_TOO_LONG - player DC > 5min, abandoned.
         3 - ABANDONED - player DC, clicked leave, abandoned.
         4 - AFK - player AFK, abandoned.
         5 - NEVER_CONNECTED - player never connected, no abandon.
         6 - NEVER_CONNECTED_TOO_LONG - player took too long to connect, no abandon.
         */ {
            text: "逃跑者状态",
            dataIndex: 'leaver_status',
            renderer:function (value) {
                if(value == 0){
                    return "无"
                }else if(value == 1){
                    return "断开连接"
                }else if(value == 2){
                    return "断开连接时间过长"
                }else if(value == 3){
                    return "已放弃"
                }else if(value == 4){
                    return "永久离开"
                }else if(value == 4){
                    return "从未连接"
                }else if(value == 4){
                    return "从未连接时间过长"
                }
            }
        }, {
            text: "最后一击",
            dataIndex: 'last_hits'
        }, {
            text: "否决",
            dataIndex: 'denies'
        }, {
            text: "每分钟金钱",
            dataIndex: 'gold_per_min'
        }, {
            text: "每分钟经验",
            dataIndex: 'xp_per_min'
        }, {
            text: "等级",
            dataIndex: 'level'
        }, {
            text: "英雄伤害",
            dataIndex: 'hero_damage'
        }, {
            text: "对塔伤害",
            dataIndex: 'tower_damage'
        }, {
            text: "英雄治疗",
            dataIndex: 'hero_healing'
        }, {
            text: "金钱",
            dataIndex: 'gold'
        }, {
            text: "金钱花费",
            dataIndex: 'gold_spent'
        }, {
            text: "scaled英雄伤害",
            dataIndex: 'scaled_hero_damage',
            hidden:true
        }, {
            text: "scaled高塔伤害",
            dataIndex: 'scaled_tower_damage',
            hidden:true
        }, {
            text: "scaled英雄治疗",
            dataIndex: 'scaled_hero_healing',
            hidden:true
        }],
        listeners: {
            beforerender: 'loadStore',
        }
    }]
});