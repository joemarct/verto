import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4b06d308 = () => import('../pages/signUpWithGatewayProvider.vue' /* webpackChunkName: "pages/signUpWithGatewayProvider" */).then(m => m.default || m)
const _1ee33638 = () => import('../pages/writeYourKey.vue' /* webpackChunkName: "pages/writeYourKey" */).then(m => m.default || m)
const _556d5aef = () => import('../pages/getVtx.vue' /* webpackChunkName: "pages/getVtx" */).then(m => m.default || m)
const _f643e6b8 = () => import('../pages/main.vue' /* webpackChunkName: "pages/main" */).then(m => m.default || m)
const _17628b84 = () => import('../pages/keepYourKeysSafe.vue' /* webpackChunkName: "pages/keepYourKeysSafe" */).then(m => m.default || m)
const _80ab9706 = () => import('../pages/choosePassword.vue' /* webpackChunkName: "pages/choosePassword" */).then(m => m.default || m)
const _1f3cdbe2 = () => import('../pages/generateKey.vue' /* webpackChunkName: "pages/generateKey" */).then(m => m.default || m)
const _28354a4e = () => import('../pages/checkForUpdates.vue' /* webpackChunkName: "pages/checkForUpdates" */).then(m => m.default || m)
const _a492df00 = () => import('../pages/saveToFileProcess.vue' /* webpackChunkName: "pages/saveToFileProcess" */).then(m => m.default || m)
const _5ae5c996 = () => import('../pages/userCredentials.vue' /* webpackChunkName: "pages/userCredentials" */).then(m => m.default || m)
const _3276df47 = () => import('../pages/welcome.vue' /* webpackChunkName: "pages/welcome" */).then(m => m.default || m)
const _0cc7d315 = () => import('../pages/downloadVersion.vue' /* webpackChunkName: "pages/downloadVersion" */).then(m => m.default || m)
const _87e8b4c2 = () => import('../pages/saveToFile.vue' /* webpackChunkName: "pages/saveToFile" */).then(m => m.default || m)
const _21b1659a = () => import('../pages/storeKeys.vue' /* webpackChunkName: "pages/storeKeys" */).then(m => m.default || m)
const _5c0cb40e = () => import('../pages/writeDownProcess.vue' /* webpackChunkName: "pages/writeDownProcess" */).then(m => m.default || m)
const _39bf0fcf = () => import('../pages/saveYourKeys.vue' /* webpackChunkName: "pages/saveYourKeys" */).then(m => m.default || m)
const _335385a8 = () => import('../pages/newVersionIsAvailable.vue' /* webpackChunkName: "pages/newVersionIsAvailable" */).then(m => m.default || m)
const _398cac0a = () => import('../pages/congratsScreen.vue' /* webpackChunkName: "pages/congratsScreen" */).then(m => m.default || m)
const _4529dc8e = () => import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */).then(m => m.default || m)
const _fbdd8e30 = () => import('../pages/displayKey.vue' /* webpackChunkName: "pages/displayKey" */).then(m => m.default || m)
const _5613c4a2 = () => import('../pages/transactionDetails.vue' /* webpackChunkName: "pages/transactionDetails" */).then(m => m.default || m)
const _e833f14a = () => import('../pages/terms_conditions.vue' /* webpackChunkName: "pages/terms_conditions" */).then(m => m.default || m)
const _0f4f3812 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _2fbd865f = () => import('../pages/__tests__/index.spec.js' /* webpackChunkName: "pages/__tests__/index.spec" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/signUpWithGatewayProvider",
			component: _4b06d308,
			name: "signUpWithGatewayProvider"
		},
		{
			path: "/writeYourKey",
			component: _1ee33638,
			name: "writeYourKey"
		},
		{
			path: "/getVtx",
			component: _556d5aef,
			name: "getVtx"
		},
		{
			path: "/main",
			component: _f643e6b8,
			name: "main"
		},
		{
			path: "/keepYourKeysSafe",
			component: _17628b84,
			name: "keepYourKeysSafe"
		},
		{
			path: "/choosePassword",
			component: _80ab9706,
			name: "choosePassword"
		},
		{
			path: "/generateKey",
			component: _1f3cdbe2,
			name: "generateKey"
		},
		{
			path: "/checkForUpdates",
			component: _28354a4e,
			name: "checkForUpdates"
		},
		{
			path: "/saveToFileProcess",
			component: _a492df00,
			name: "saveToFileProcess"
		},
		{
			path: "/userCredentials",
			component: _5ae5c996,
			name: "userCredentials"
		},
		{
			path: "/welcome",
			component: _3276df47,
			name: "welcome"
		},
		{
			path: "/downloadVersion",
			component: _0cc7d315,
			name: "downloadVersion"
		},
		{
			path: "/saveToFile",
			component: _87e8b4c2,
			name: "saveToFile"
		},
		{
			path: "/storeKeys",
			component: _21b1659a,
			name: "storeKeys"
		},
		{
			path: "/writeDownProcess",
			component: _5c0cb40e,
			name: "writeDownProcess"
		},
		{
			path: "/saveYourKeys",
			component: _39bf0fcf,
			name: "saveYourKeys"
		},
		{
			path: "/newVersionIsAvailable",
			component: _335385a8,
			name: "newVersionIsAvailable"
		},
		{
			path: "/congratsScreen",
			component: _398cac0a,
			name: "congratsScreen"
		},
		{
			path: "/settings",
			component: _4529dc8e,
			name: "settings"
		},
		{
			path: "/displayKey",
			component: _fbdd8e30,
			name: "displayKey"
		},
		{
			path: "/transactionDetails",
			component: _5613c4a2,
			name: "transactionDetails"
		},
		{
			path: "/terms:conditions",
			component: _e833f14a,
			name: "termsconditions"
		},
		{
			path: "/",
			component: _0f4f3812,
			name: "index"
		},
		{
			path: "/:_tests__/index.spec",
			component: _2fbd865f,
			name: "_tests__-index.spec"
		}
    ],
    
    
    fallback: false
  })
}
