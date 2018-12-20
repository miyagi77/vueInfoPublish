import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        navList: [{
            name: '短信',
            path: '/'
        }, {
            name: 'QQ邮箱',
            path: '/QQemail'
        }, {
            name: '公众号',
            path: '/sites'
        }],
        leftList: [
            { name: "信息发布" ,class:"el-icon-message"},
            { name: "模板管理" ,class:"el-icon-tickets"},
            { name: "历史发送",class:"el-icon-document" }
        ],
        qqList: [
            { name: "信息发布" ,class:"el-icon-message"},
            { name: "历史发送",class:"el-icon-document" }
        ]
    },
    mutations: {

    },
    actions: {

    }
})