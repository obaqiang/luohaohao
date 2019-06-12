import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		token: '',
		OrgId: '',
		connect_url: 'http://47.101.50.234:83/',
		// current_language:'zh-CN',
		connect_url_all: [
			'http://47.101.50.234:83/',
			'http://182.61.31.228:8101/',
			'http://182.61.31.228:8102/'
		],
		current_version: 109,
		deviceType: 8,
		post_header: '',
		MAC: '',
		tenancyName: 'Default',
		language_all: ['中文', 'English', '繁體'],
		childPermissions: '',
		ip_net: ''

	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		changeIpNet(state) {
			state.ip_net = '111.111.111.111'
		},
		MacInfo(state) {
			state.MAC = "00-50-56-C0-00-01"
			// 			var locator = new ActiveXObject("WbemScripting.SWbemLocator");
			// 			var service = locator.ConnectServer(".");
			// 			var properties = service.ExecQuery("Select * from Win32_NetworkAdapterConfiguration Where IPEnabled =True");
			// 			var e = new Enumerator(properties); {
			// 				var p = e.item();
			// 				var mac = p.MACAddress;
			// 				console.log(mac)
			// 				return (mac)
			// 			}


			// 			var mac = "xxx-xxx-xxx-xxx";
			// 			if (plus.os.name == "Android") {
			// 				// 导入UIAlertView类
			// 				//WifiManager
			// 				var Context = plus.android.importClass("android.content.Context");
			// 				var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
			// 				var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
			// 				var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");
			// 				var wifiInfo = wifiManager.getConnectionInfo();
			// 				alert(wifiInfo.getMacAddress());
			// 			}
			// 			state.MAC = mac
			// return mac;
		},

		changeTenancyName(state, newtenancyName) {
			state.tenancyName = newtenancyName
		},
		changeServerUrl(state, choosed_url) {
			state.connect_url = choosed_url
		},
		changeToken(state, token) {
			state.token = token
		},
		// 		changeLanguage(state,current_language){
		// 			state.current_language = current_language
		// 		},
		changeOrgId(state, OrgId) {
			state.OrgId = OrgId
		},
		changePostHeader(state, post_header) {
			state.post_header = post_header
		},

		initPosition() {
			let a = Vue.prototype.$i18n.locale
			// 			console.log(a)
			// 			console.log(Vue.prototype.$i18n.messages[a])
			// 防止页面因为input弹起
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		// 请求发生失败时发起提醒
		ErrRequestShow(state, res) {
			let cur_lan = Vue.prototype.$i18n.locale
			console.log(cur_lan)
			if (res.data.success != true) {
				uni.showToast({
					icon: 'none',
					title: res.data.error.message,
					duration: 3000
				});
				if(res.data.error.message=='当前用户没有登录到系统！'){
					uni.reLaunch({
						url: '../mylogin/mylogin'
					});
				}
			} else {
				if (res.data.result != null) {
					if (res.data.result.length == 0) {
						uni.showToast({
							icon: 'none',
							title: Vue.prototype.$i18n.messages[cur_lan].requestErrMessage.no_data,
							duration: 3000
						});
					}
				}

			}
		},
		RequestErrToast() {
			uni.showToast({
				icon: 'none',
				title: '请求失败',
				duration: 3000
			});
		},
		MyLoginSucRes(state, res) {
			let cur_lan = Vue.prototype.$i18n.locale
			// console.log(res)
			// console.log(JSON.stringify(res))
			if (res.data.success == true) {
				if (res.data.result.currentOrgUnit == null) {
					uni.showToast({
						icon: 'none',
						title: Vue.prototype.$i18n.messages[cur_lan].requestErrMessage.no_organize_unit,
						duration: 2000
					});
				} else if (res.data.result.grantPermission == null) {
					uni.showToast({
						icon: 'none',
						title: Vue.prototype.$i18n.messages[cur_lan].requestErrMessage.no_permission,
						duration: 2000
					});
				} else {
					state.token = res.data.result.token
// 					console.log('需要的token:')
// 					console.log(res.data.result.token)
					let post_header = {
						'Content-Type': 'application/json', //自定义请求头信息
						'Authorization': 'Bearer ' + res.data.result.token,
						'Abp.Localization.CultureName': Vue.prototype.$i18n.locale
					}
					state.post_header = post_header
// 					console.log('需要的post_header')
// 					console.log(state.post_header)
					// that.changePostHeader(post_header)
					// that.changeOrgId(res.data.result.currentOrgUnit.id)
					state.changeOrgId = res.data.result.currentOrgUnit.id
					// that.childPermissions = res.data.result.grantPermission.childPermissions[0].childPermissions
					// uni.setStorageSync('childPermissions', res.data.result.grantPermission.childPermissions[0].childPermissions);
					state.childPermissions = res.data.result.grantPermission.childPermissions[0].childPermissions
					uni.setStorageSync('currentOrgUnit', res.data.result.currentOrgUnit);
					uni.setStorageSync('orgUnits', res.data.result.orgUnits);
					uni.setStorageSync('mylogin_data', res.data.result)
					uni.switchTab({
						url: '../homepage/homepage'
					})
				}

			} else {
				uni.showModal({
					title: Vue.prototype.$i18n.messages[cur_lan].index_data.tips,
					content: res.data.error.message,
					confirmText: Vue.prototype.$i18n.messages[cur_lan].index_data.determine,
					cancelText:Vue.prototype.$i18n.messages[cur_lan].index_data.cancel,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				// 				uni.showToast({
				// 					icon: 'none',
				// 					title: res.data.error.message,
				// 					duration: 2000
				// 				});
			}
		}
	}
})

export default store
