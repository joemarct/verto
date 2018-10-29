import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome.vue'
// import Main from '@/components/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'LandingPage',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/main',
      name: 'Main',
      component: require('@/components/Main').default
    },
    {
      path: '/home',
      name: 'Home',
      component: require('@/components/Home').default
    },
    {
      path: '/settings',
      name: 'Settings',
      component: require('@/components/Settings').default
    },
    {
      path: '/checkforupdates',
      name: 'CheckForUpdates',
      component: require('@/components/CheckForUpdates').default
    },
    {
      path: '/newversionisavailable',
      name: 'NewVersionIsAvailable',
      component: require('@/components/NewVersionIsAvailable').default
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/transactiondetails',
      name: 'TransactionDetails',
      component: require('@/components/TransactionDetails').default
    },
    {
      path: '/downloadversion',
      name: 'DownloadVersion',
      component: require('@/components/DownloadVersion').default
    },
    {
      path: '/congratsscreen',
      name: 'CongratsScreen',
      component: require('@/components/CongratsScreen').default
    },
    {
      path: '/displaykey',
      name: 'DisplayKey',
      component: require('@/components/DisplayKey').default
    },
    {
      path: '/generatekey',
      name: 'GenerateKey',
      component: require('@/components/GenerateKey').default
    },
    {
      path: '/getvtx',
      name: 'GetVtx',
      component: require('@/components/GetVtx').default
    },
    {
      path: '/keepyourkeyssafe',
      name: 'KeepYourKeysSafe',
      component: require('@/components/KeepYourKeysSafe').default
    },
    {
      path: '/savetofile',
      name: 'SaveToFile',
      component: require('@/components/SaveToFile').default
    },
    {
      path: '/savetofileprocess',
      name: 'SaveToFileProcess',
      component: require('@/components/SaveToFileProcess').default
    },
    {
      path: '/saveyourkeys',
      name: 'SaveYourKeys',
      component: require('@/components/SaveYourKeys').default
    },
    {
      path: '/signupwithgatewayprovider',
      name: 'SignUpWithGatewayProvider',
      component: require('@/components/SignUpWithGatewayProvider').default
    },
    {
      path: '/storekeys',
      name: 'StoreKeys',
      component: require('@/components/StoreKeys').default
    },
    {
      path: '/termsconditions',
      name: 'TermsConditions',
      component: require('@/components/TermsConditions').default
    },
    {
      path: '/usercredentials',
      name: 'UserCredentials',
      component: require('@/components/UserCredentials').default
    },
    {
      path: '/writedownprocess',
      name: 'WriteDownProcess',
      component: require('@/components/WriteDownProcess').default
    },
    {
      path: '/writeyourkey',
      name: 'WriteYourKey',
      component: require('@/components/WriteYourKey').default
    },
    {
      path: '/choosepassword',
      name: 'ChoosePassword',
      component: require('@/components/ChoosePassword').default
    },
    {
      path: '/createwalletpassword',
      name: 'createwalletpassword',
      component: require('@/components/CreateWalletPassword').default
    },
    {
      path: '/selectkey',
      name: 'selectkey',
      component: require('@/components/SelectKey').default
    }
  ]
})
