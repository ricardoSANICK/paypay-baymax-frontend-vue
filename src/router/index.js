import Vue from 'vue';
import Router from 'vue-router';

const Home = '/home/Home';
const Feed = '/home/Feed';
const LogIn = '/authentication/LogIn';

const Employee = '/catalog/employee/Employee';

const Review = '/performance/review/Review';
const Feedback = '/performance/feedback/Feedback';

Vue.use(Router);

const lazyLoad = (routeComponent) =>{
  return () => import(`@/views${routeComponent}`)
}

export default new Router({
    mode: 'history', //Remove hash mode (#)
    base: process.env.BASE_URL, //Add a / base
    routes: [
      { 
        path: '/', component: lazyLoad(Home), 
        children:[
          { path: '' , name: 'Feed' , component: lazyLoad(Feed) }
          , { path: 'employee' , name: 'Employee' , component: lazyLoad(Employee) }
          , { path: 'review' , name: 'Review' , component: lazyLoad(Review) }
          , { path: 'feedback' , name: 'Feedback' , component: lazyLoad(Feedback) }
        ]
      },
      { path: '/login', name:"LogIn", component: lazyLoad(LogIn) }
    ]
});
  
  