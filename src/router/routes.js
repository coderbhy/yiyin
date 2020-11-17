
const ManageLayout = () => import('layouts/ManageLayout')
const MainLayout = () => import('layouts/MainLayout')

const Home = () => import('pages/home/Home')
const Profile = () => import('pages/profile/Profile')
const Shoot = () => import('pages/add/Shoot')
const ManageHome = () => import('pages/manageHome/ManageHome')
const ManageSet = () => import('pages/manageSet/ManageSet')
const ManageOther = () => import('pages/manageOther/ManageOther')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', component: Home },
      { path: 'profile', component: Profile },
      { path: 'shoot', component: Shoot }
    ]
  },
  {
    path: '/manage',
    component: ManageLayout,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', component: ManageHome },
      { path: 'other', component: ManageOther },
      { path: 'set', component: ManageSet }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
