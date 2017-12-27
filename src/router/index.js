import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/common/login';
import Home from '@/components/common/Home';

import DashBoard from '@/components/page/DashBoard';
import equipment from '@/components/page/equipment';
import FormLayouts from '@/components/page/FormLayouts';
import BasicTables from '@/components/page/BasicTables';
import customer from '@/components/page/customer';
import organization from '@/components/page/organization';
import space from '@/components/page/space';
import member from '@/components/page/member';

import usermgt from '@/components/page/usermgt';

import modifypd from '@/components/page/modifypd';



Vue.use(Router)

 const router = new Router({
mode:'hash',
  base:__dirname,
  routes: [
		{
        path:'/login',
        component:login,
      },
    	{
      path: '/',
      component: Home,
      meta:{requiresAuth:true},
      children:[
        {
        	 path:'',
          component:DashBoard,
          meta:{requiresAuth:true},
        },
        {
          path: '/DashBoard', 
          component: DashBoard,
          meta:{requiresAuth:true},
    		},{
          path: '/customer', 
          component: customer
    		},{
          path: '/organization', 
          component: organization,
          meta:{requiresAuth:true},
    		},{
          path:'/equipment',
          component:equipment,
          meta:{requiresAuth:true},
        },{
          path:'/FormLayouts',
          component:FormLayouts,
          meta:{requiresAuth:true},
        },{
          path:'/BasicTables',
          component:BasicTables,
          meta:{requiresAuth:true},
          
        },{
          path:'/space',
          component:space,
          meta:{requiresAuth:true},
          
        },{
          path:'/member',
          component:member,
          meta:{requiresAuth:true},
          
        },
        {
          path:'/usermgt',
          component:usermgt,
          meta:{requiresAuth:true},
          
        },{
        	path:'/modifypd',
          component:modifypd,
          meta:{requiresAuth:true},
          
        }
 
      ]
    }
    
  ]
})

router.beforeEach((to, from, next) => {
	
if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!sessionStorage.getItem("state")) {

      next({
        path: '/login',
//      query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
} else {
    next( ) // 确保一定要调用 next()
}
})
export default router;