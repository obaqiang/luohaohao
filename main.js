import Vue from 'vue'
import App from './App'

import store from './store'
import VueI18n from 'vue-i18n'
import cookie from './static/cookie'
import en from './static/langs/en'
import zhCN from './static/langs/zhCN'
import zhTW from './static/langs/zhTW'
Vue.use(VueI18n)
Vue.config.productionTip = false
var i18n = new VueI18n({
	locale: 'zh-CN',
	messages: {
		'en': en.lan,
		'zh-CN': zhCN.lan,
		'zh-TW': zhTW.lan
	}
})
var ifQtyIsNull = function(qty) {
	if (qty == null) {
		return 0
	} else {
		console.log('需要得：' + qty)
		return qty
	}
}
var Percentage = function(num, total) {
	let that = this
	if (total < 0 || total == 0) {
		return 0
	} else if (num < 0) {
		return 0
	} else {
		console.log(Math.round(num / total * 10000) / 100.00 + "%")
		return (Math.round(num / total * 10000) / 100.00 + "%"); // 小数点后两位百分比
	}
}
var hideKeyBoard = function() {
	setTimeout(function() {
		uni.hideKeyboard()
	}, 1000)
}
Vue.prototype._i18n = i18n
Vue.prototype.$store = store
Vue.prototype.$ifQtyIsNull = ifQtyIsNull
Vue.prototype.$Percentage = Percentage
Vue.prototype.$hideKeyBoard = hideKeyBoard
App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	ifQtyIsNull,
	Percentage,
	hideKeyBoard,
	...App,
})
app.$mount()
