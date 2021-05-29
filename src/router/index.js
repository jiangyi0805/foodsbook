import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: "Home",
        component: () =>
            import ("@/views/Home")
    },
    {
        path: "/detail",
        name: "Detail",
        component: () =>
            import ("@/views/Detail")
    },
    {
        path: '/step',
        name: "Step",
        component: () =>
            import ('@/views/Step')

    },
    {
        path: '/recommend',
        name: 'Recommend',
        component: () =>
            import ('@/views/Recommend')

    },
    {
        path: '*',
        name: "404",
        component: () =>
            import ('@/views/404')

    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router