
const ManageLayout = () => import('layouts/ManageLayout')
const MainLayout = () => import('layouts/MainLayout')

const Login = () => import('pages/login/Login')
const UserType = () => import('pages/type/UserType')
const Home = () => import('pages/home/Home')
const Profile = () => import('pages/profile/Profile')
const Shoot = () => import('pages/add/Shoot')
const Upload = () => import('pages/add/Upload')
const Edit = () => import('pages/edit/Edit')
const ManageHome = () => import('pages/manageHome/ManageHome')
const ManageSet = () => import('pages/manageSet/ManageSet')
const ManageOther = () => import('pages/manageOther/ManageOther')
const ManageType = () => import('pages/manageType/ManageType')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: 'home/first' },
      { path: 'login', component: Login, meta: { requiresAuth: false } },
      { path: 'usertype', component: UserType, meta: { requiresAuth: true } },
      { path: 'home/:type', component: Home, meta: { requiresAuth: true } },
      { path: 'profile', component: Profile, meta: { requiresAuth: true } },
      { path: 'shoot', component: Shoot, meta: { requiresAuth: true } },
      { path: 'upload', component: Upload, meta: { requiresAuth: true } },
      { path: 'edit', component: Edit, meta: { requiresAuth: true } },
      { path: 'test', component: () => import('pages/Test') }
    ]
  },
  {
    path: '/manage',
    component: ManageLayout,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', component: ManageHome, meta: { requiresAuth: true } },
      { path: 'other', component: ManageOther, meta: { requiresAuth: true } },
      { path: 'set', component: ManageSet, meta: { requiresAuth: true } },
      { path: 'type', component: ManageType, meta: { requiresAuth: true } }
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
