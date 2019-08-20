import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddItem from '@/components/AddItem'
import EditItem from '@/components/EditItem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },

    {
      path: '/add-item',
      name: 'AddItem',
      component: AddItem
    },

    {
      path: '/edit-item/:slug',
      name: 'EditItem',
      component: EditItem
    }
  ]
})
