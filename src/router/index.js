import Vue from 'vue'
import Router from 'vue-router'
import BookList from '../views/BookList.vue'
import BookAdd from '../views/BookAdd.vue'
import Index from '../views/Index.vue'
import BookUpdate from '../views/BookUpdate.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '图书管理',
            component: Index,
            children: [
                {
                    path: '/BookList',
                    name: '图书列表',
                    component: BookList
                },
                {
                    path: '/BookAdd',
                    name: '图书添加',
                    component: BookAdd
                },
                {
                    path: '/BookUpdate',
                    component: BookUpdate,
                    show: false
                }
            ]
        }
    ]
})