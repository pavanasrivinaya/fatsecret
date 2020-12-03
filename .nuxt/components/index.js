export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Togglebutton } from '../..\\components\\togglebutton.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components_Logo" */).then(c => c.default || c)
export const LazyTogglebutton = import('../..\\components\\togglebutton.vue' /* webpackChunkName: "components_togglebutton" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components_VuetifyLogo" */).then(c => c.default || c)
