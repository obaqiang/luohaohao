<template>
	<view>
		<choServerModalNew v-if="showchoservermodal" v-bind:connect_url="connect_url_show" v-bind:defaultA="defaultA"
		 v-bind:defaultB="defaultB" v-bind:showchoservermodal="closeChoServerModal" v-on:closeChoServerModal="closeChoServerModal"
		 v-on:conFirmCho="conFirmCho" v-bind:tenancyName="tenancyName_show" />
		<!-- <choServerModal v-if="showchoservermodal" v-bind:showchoservermodal="showchoservermodal" v-on:success="success()" /> -->
		<image class="login_head" :src="login_head"></image>
		<view class="head_login_text_area">
			<view class="login_text">
				{{ i18n.login_text }}

			</view>
			<view>
				<!-- <input type="text"> -->
				<view class="login_in">
					<image class="login_username" :src="login_username"></image>
					<input class="login_input" type="text" v-model="account" :placeholder="i18n.a_text" @confirm="accountConfirm"
					 :focus="login_focus">
					<image class="login_clear" :src="login_clear" @tap="DeleteLoginName"></image>
				</view>
				<view class="login_in">
					<image class="login_username" :src="login_password"></image>
					<input class="login_input" v-if="password_type=='password'" type="password" v-model="password" :placeholder="i18n.b_text"
					 :focus="pwd_focus">
					<input class="login_input" v-if="password_type!='password'" type="text" v-model="password" :placeholder="i18n.b_text"
					 :focus="pwd_focus">
					<image class="login_clear" :src="login_password_show" @tap="ChangeInputType"></image>
				</view>
				<view class="my_login_hook_area" @tap="RemberLogin">
					<image class="ali_icon" :src="ali_no_hook" v-if="rember_login==false"></image>
					<image class="ali_icon" :src="ali_hook" v-if="rember_login"></image>
					<text>{{i18n.c_text}}</text>
				</view>

				<button class="btn_login" @tap="bindLogin">{{ i18n.login_in_now }}</button>
				<button class="btn_server" @tap="choServer">{{ i18n.configure_server }}</button>
				{{err}}
			</view>
		</view>
		<!-- <button @tap="initPosition">我得天</button> -->
		<copyRightIntro />
		<showModal v-if="ifshowmodal" v-bind:show_modal_header="show_modal_header" v-bind:show_modal_body="show_modal_body"
		 v-bind:show_modal_from="show_modal_from" v-bind:updata_url="updata_url" v-on:showModalClick="showModalsuccess" />
		<loadingWait v-if="loading_wait_show" />
		<downloading v-if="downloading_show" v-bind:remark="remark" />
	</view>
</template>

<script>
	import copyRightIntro from "../components/copyRightIntro/copyRightIntro.vue"
	import choServerModal from "../components/choServerModal/choServerModal.vue"
	import choServerModalNew from "../components/choServerModalNew/choServerModalNew.vue"
	import showModal from "../components/showModal/showModal.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import downloading from "../components/downloading/downloading.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			copyRightIntro,
			choServerModal,
			showModal,
			loadingWait,
			choServerModalNew,
			downloading
		},
		data() {
			return {
				ali_no_hook: "../../static/img/ali_no_hook.png",
				ali_hook: "../../static/img/ali_hook.png",
				login_head: "../../static/img/login_head.png",
				login_username: "../../static/img/login_username.png",
				login_clear: "../../static/img/login_clear.png",
				login_password: "../../static/img/login_password.png",
				login_password_show: "../../static/img/login_password_show.png",
				// account: 'Default',
				account: '',
				// tenancyName:'Default',
				usernameOrEmailAddress: 'admin',
				// password: '123qwe',
				password: '',
				deviceType: '8',
				// mac: '02-F4-8D-CB-0A-41',
				showchoservermodal: false,
				TenantId: '1',
				ClientCode: 'WPDA',
				ifshowmodal: false,
				show_modal_header: '版本更新',
				show_modal_body: '',
				show_modal_from: 'mylogin',
				updata_url: '',
				childPermissions: '',
				err: '',
				rember_login: false,
				password_type: 'password',
				// positionTop: 0,
				loading_wait_show: false,
				login_focus: true,
				pwd_focus: false,
				defaultA: '',
				defaultB: '',
				connect_url_show: '',
				downloading_show: false,
				remark: ''
			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			connect_url_all() {
				return this.$store.state.connect_url_all
			},
			connect_url() {
				let connect_url = uni.getStorageSync('connect_url')
				if (connect_url != '') {
					this.changeServerUrl(connect_url)
					return connect_url
				} else {
					return this.$store.state.connect_url
				}

			},
			current_language() {
				return this.$store.state.current_language
			},
			current_version() {
				return this.$store.state.current_version
			},
			post_header() {
				return this.$store.state.post_header
			},
			MAC() {
				return this.$store.state.MAC
			},
			i18n() {
				return this.$t('mylogin')
			},
			tenancyName() {
				let tenancyName = uni.getStorageSync('tenancyName')
				if (tenancyName != '') {
					return tenancyName
				} else {
					return this.$store.state.tenancyName
				}
				// return this.$store.state.tenancyName
			}
		},
		watch: {
			connect_url: {
				handler(new_val, old_val) {
					this.connect_url_show = new_val
				},
				immediate: true
			},
			tenancyName: {
				handler(new_val, old_val) {
					this.tenancyName_show = new_val
				},
				immediate: true
			},

		},
		methods: {
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['changePostHeader']),
			...mapMutations(['MyLoginSucRes']),
			...mapMutations(['initPosition']),
			...mapMutations(['MacInfo']),
			...mapMutations(['ErrRequestShow']),
			...mapMutations(['RequestErrToast']),
			...mapMutations(['changeIpNet']),
			...mapMutations(['changeServerUrl']),

			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				this.initPosition()
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				let that = this
				try {
					this.ClientLogin()
					setTimeout(function() {
						that.loading_wait_show = false
					}, 6000)
				} catch (err) {
					this.loading_wait_show = false
					uni.showToast({
						icon: 'none',
						title: '服务地址配置路径不合法',
						duration: 3000
					});
				}
			},
			accountConfirm() {
				this.login_focus = false
				this.pwd_focus = true
			},
			choServer() {
				for (let i = 0; i < this.connect_url_all.length; i++) {
					if (this.connect_url == this.connect_url_all[i]) {
						this.defaultA = i
					}
				}

				if (this.$i18n.locale == 'zh-CN') {
					this.defaultB = 0
				} else if (this.$i18n.locale == 'en') {
					this.defaultB = 1
				} else if (this.$i18n.locale = 'zh-TW') {
					this.defaultB = 2
				}
				this.showchoservermodal = !this.showchoservermodal
			},
			conFirmCho(e) {
				this.showchoservermodal = false
				this.connect_url_show = e.connect_url_show
				this.tenancyName_show = e.tenancyName_show
			},
			closeChoServerModal() {

				this.showchoservermodal = !this.showchoservermodal
			},
			doDownLoad() {
				let that = this
				uni.showToast({
					icon: 'none',
					title: '开始下载',
					duration: 3000
				});
				that.downloading_show = true

				var dtask = plus.downloader.createDownload(that.updata_url, {}, function(d, status) {
					console.log(d)
					console.log(status)
					if (status == 200) { // 下载成功  
						var path = d.filename;
						plus.runtime.install(path)
						console.log(d.filename);
						that.loading_wait_show = false
					} else { //下载失败  
						// alert("Download failed: " + status);
						uni.showToast({
							icon: 'none',
							title: '下载失败',
							duration: 3000
						});
						that.loading_wait_show = false
					}
				});
				dtask.start();
			},
			showModalsuccess(e) {
				let that = this
				if (e) {
					that.doDownLoad()
					that.ifshowmodal = false
				} else {
					this.ifshowmodal = false
				}

			},
			RemberLogin() {
				let that = this
				that.rember_login = !that.rember_login

			},
			DeleteLoginName() {
				let that = this
				that.account = ''
				that.password = ''
			},
			ChangeInputType() {
				let that = this
				console.log(132)
				// that.password_type = 'password' ? 'text':'password'
				if (that.password_type == 'password') {
					that.password_type = 'text'
				} else {
					that.password_type = 'password'
				}
			},
			ClientLogin() {

				let that = this
				if (that.rember_login == true) {
					uni.setStorageSync('account', that.account);
					uni.setStorageSync('password', that.password);
				} else {
					uni.setStorageSync('account', '');
					uni.setStorageSync('password', '');
				}
				that.loading_wait_show = true
				that.MacInfo()
				that.changeIpNet()
				uni.request({
					url: that.connect_url_show + 'api/Account/ClientLogin', //仅为示例，并非真实接口地址。
					data: {
						tenancyName: that.tenancyName_show,
						usernameOrEmailAddress: that.account,
						password: that.password,
						deviceType: that.deviceType,
						MAC: that.MAC
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/json', //自定义请求头信息
						'Abp.Localization.CultureName': that.$i18n.locale
					},
					success: (res) => {
						// console.log(res)
						that.loading_wait_show = false
						that.MyLoginSucRes(res)

						// 						if (res.data.success == true) {
						// 							if (res.data.result.currentOrgUnit == null) {
						// 								uni.showToast({
						// 									title: '当前用户不属于任何组织，无法登录',
						// 									duration: 2000
						// 								});
						// 							} else if (res.data.result.grantPermission == null) {
						// 								uni.showToast({
						// 									title: '用户未授权',
						// 									duration: 2000
						// 								});
						// 							} else {
						// 
						// 								that.changeToken(res.data.result.token)
						// 								let post_header = {
						// 									'Content-Type': 'application/json', //自定义请求头信息
						// 									'Authorization': 'Bearer ' + res.data.result.token,
						// 									'Abp.Localization.CultureName': that.current_language
						// 								}
						// 								that.changePostHeader(post_header)
						// 								that.changeOrgId(res.data.result.currentOrgUnit.id)
						// 								that.childPermissions = res.data.result.grantPermission.childPermissions[0].childPermissions
						// 								uni.setStorageSync('childPermissions', that.childPermissions);
						// 								uni.setStorageSync('currentOrgUnit', res.data.result.currentOrgUnit);
						// 								uni.setStorageSync('orgUnits', res.data.result.orgUnits);
						// 								uni.switchTab({
						// 									url: '../homepage/homepage'
						// 								})
						// 							}
						// 
						// 						} else {
						// 							uni.showToast({
						// 								title: res.data.error.message,
						// 								duration: 2000
						// 							});
						// 						}
					},
					fail: (res) => {
						that.loading_wait_show = false
						that.RequestErrToast()
					}
				});
			},
			GetCSVersion() {
				let that = this
				uni.request({
					url: that.connect_url_show + 'api/services/app/ClientVersion/GetCSVersion', //仅为示例，并非真实接口地址。
					data: {
						TenantId: that.TenantId,
						ClientCode: that.ClientCode
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/json', //自定义请求头信息
						'Authorization': 'Bearer ' + that.token,
						'Abp.Localization.CultureName': that.$i18n.locale
					},
					success: (res) => {
						console.log(res.data)
						that.ErrRequestShow(res)
						if (res.data.result != null) {
							that.remark = res.data.result.remark
							that.updata_url = that.connect_url + res.data.result.path.replace(/\\/g, '/')
							if (that.current_version < res.data.result.version) {
								if (res.data.result.updateMode == 1) {
									that.ifshowmodal = true
									that.show_modal_body = '可升级'
								} else if (res.data.result.updateMode == 2) {
									// that.show_modal_body = '强制性升级'
									that.doDownLoad()
								}
							}
						} else {
							uni.showModal({
								title: '缺失apk文件'
							})
						}
					},
					fail: (res) => {
						that.RequestErrToast()
					}
				});
			},
		},
		onLoad() {
			// plus.key.hideSoftKeybord()
			// this.MacInfo();
			let that = this
			// that.initPosition()
			let current_language = uni.getStorageSync('current_language')
			if (current_language != '') {
				this.$i18n.locale = current_language
			}
			try {
				this.GetCSVersion()
			} catch (err) {
				console.log(err)
			}
			that.account = uni.getStorageSync('account');
			that.password = uni.getStorageSync('password');
			if (that.account != '') {
				that.rember_login = true
			}
			this.initPosition()
			// console.log(this.$i18n.locale)
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: '飞机迪斯科健康捷克洛夫斯基的离开九分电视剧了肯定是登上飞机离开二五七二块钱恩里克我去了',
			// 				duration: 3000
			// 			});
		},
		// 		created() {
		// 			window.onscroll = function() {
		// 				//变量scrollTop是滚动条滚动时，距离顶部的距离
		// 				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		// 				//变量windowHeight是可视区的高度
		// 				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
		// 				//变量scrollHeight是滚动条的总高度
		// 				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
		// 				//滚动条到底部的条件
		// 				if (scrollTop + windowHeight == scrollHeight) {
		// 					//写后台加载数据的函数
		// 					console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
		// 				}
		// 			}
		// 		}
	}
</script>

<style>
	.login_head {
		width: 750upx;
		display: block;
	}

	page {
		background: #f2f2f2;
	}

	.head_login_text_area {
		width: 700upx;
		background: #FFFFFF;
		margin: auto;
		position: relative;
		top: -104upx;
		border-radius: 10upx;
		padding-bottom: 50upx;
	}

	.login_text {
		font-size: 36upx;
		line-height: 104upx;
		text-align: center;
	}

	.login_username {
		width: 50upx;
		height: 50upx;
	}

	.login_in {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 104upx;
		border-bottom: 1upx solid #DDDDDD;
		width: 650upx;
		margin: auto;
	}

	.login_clear {
		width: 50upx;
		height: 50upx;
	}

	.login_input {
		width: 400upx;
		margin: 50upx;
		border: none;
		outline: none;
	}

	.btn_login {
		background: #ffb700;
		color: #FFFFFF;
		width: 600upx;
		/* margin-top: 100upx; */
	}

	.btn_server {
		color: #ffb700;
		background: #FFFFFF;
		border: 1px solid #FFB700;
		width: 600upx;
		margin-top: 20upx;
	}

	.ali_icon {
		width: 50upx;
		height: 50upx;
		margin-left: 50upx;
	}

	.my_login_hook_area {
		display: flex;
		align-items: center;
		height: 100upx;
	}

	.my_login_hook_area text {
		color: #FFB700;
		margin-left: 30upx;
	}
</style>
