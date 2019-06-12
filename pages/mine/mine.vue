<template>
	<view class="minepage">
		<choServerModalNew v-if="showchoservermodal" v-bind:connect_url="connect_url" v-bind:defaultA="defaultA"
		 v-bind:defaultB="defaultB" v-bind:showchoservermodal="showchoservermodal" v-on:closeChoServerModal="closeChoServerModal"
		 v-on:conFirmCho="conFirmCho" v-bind:tenancyName="tenancyName"/>
		<image class="homebanner" :src="mine_banner_bg"></image>

		<view class="mes_area">
			<view class="mes_list" @tap="gotoUserInfo">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_userinfo"></image>
					<text>{{i18n.user_info}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
			<view class="mes_list" @tap="gotoDeviceInfo">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_device"></image>
					<text>{{i18n.facility_information}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
			<view class="mes_list" @tap="gotochangePwd">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_password"></image>
					<text>{{i18n.Change_Password}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
			<view class="mes_list" @tap="gotoOrganizationalSwitching">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_team"></image>
					<text>{{i18n.Organizational_switching}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
			<!-- <view class="mes_list" @tap="hotUpdate">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_team"></image>
					<text>热更新</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view> -->
		</view>

		<!-- <view class="mes_area">
			<view class="mes_list">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_language"></image>
					<text>选择语言</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
			<view class="mes_list">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_server"></image>
					<text>服务设置</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
		</view> -->

		<view class="mes_area">
			<view class="mes_list" @tap="gotochooslan">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_language"></image>
					<text>{{i18n.select_language}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
			<view class="mes_list" @tap="gotoSetService">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_server"></image>
					<text>{{i18n.service_settings}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
		</view>

		<view class="mes_area">
			<view class="mes_list">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_about"></image>
					<text>{{i18n.about}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
			<view class="mes_list" @tap="GetCSVersion">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_update"></image>
					<text>{{i18n.update}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
		</view>

		<view class="mes_area">
			<view class="mes_list" @tap="logOut">
				<view class="mes_list_left">
					<image class="mes_list_icon" :src="set_exit"></image>
					<text>{{i18n.log_out}}</text>
				</view>
				<image class="mes_list_right_icon" :src="set_next_page"></image>
			</view>
		</view>

		<showModal v-if="ifshowmodal" v-bind:show_modal_header="i18n.show_modal_header" v-bind:show_modal_body="i18n.show_modal_body"
		 v-on:showModalClick="showModalClick" />
		<loadingWait v-if="loading_wait_show" />
		<downloading v-if="downloading_show" v-bind:remark="remark"/>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import showModal from "../components/showModal/showModal.vue"
	import choServerModalNew from "../components/choServerModalNew/choServerModalNew.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import downloading from "../components/downloading/downloading.vue"
	export default {
		components: {
			showModal,
			choServerModalNew,
			loadingWait,
			downloading
		},

		data() {
			return {
				mine_banner_bg: "../../static/img/mine_banner_bg.jpg",
				set_userinfo: "../../static/img/set_userinfo.png",
				set_device: "../../static/img/set_device.png",
				set_password: "../../static/img/set_password.png",
				set_team: "../../static/img/set_team.png",
				set_language: "../../static/img/set_language.png",
				set_server: "../../static/img/set_server.png",
				set_about: "../../static/img/set_about.png",
				set_update: "../../static/img/set_update.png",
				set_exit: "../../static/img/set_exit.png",
				set_next_page: "../../static/img/set_next_page.png",
				TenantId: '1',
				ClientCode: 'WPDA',
				deviceType: 8,
				ifshowmodal: false,
// 				show_modal_header: '服务设置',
// 				show_modal_body: '重新配置服务将退出登陆',
				show_modal_from: 'mine',
				showchoservermodal: false,
				defaultA: '',
				defaultB: '',
				updata_url: '',
				loading_wait_show: false,
				downloading_show:false,
				remark:''

			};
		},
		onNavigationBarButtonTap() {

		},
		computed: {
			current_version() {
				return this.$store.state.current_version
			},
			connect_url_all() {
				return this.$store.state.connect_url_all
			},
			connect_url() {
				return this.$store.state.connect_url
			},
			current_language() {
				return this.$store.state.current_language
			},
			token() {
				return this.$store.state.token
			},
			OrgId() {
				return this.$store.state.OrgId
			},
			i18n() {
				return this.$t('mine')
			},
			tenancyName(){
				return this.$store.state.tenancyName
			}
		},

		methods: {
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
			showModalClick(e) {
				if (e == false) { //取消

				} else if (e == true) { //确定
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
					this.showchoservermodal = true
				}
				this.ifshowmodal = false
			},
			closeChoServerModal() {
				this.showchoservermodal = false
			},
			conFirmCho() {
				this.showchoservermodal = false
				uni.reLaunch({
					url: '../mylogin/mylogin'
				});
			},
			hotUpdate() {
				uni.downloadFile({
					url: 'http://47.101.50.234:83/ApkVersion/__UNI__BCD6896.wgt',
					success: (downloadResult) => {
						console.log(JSON.stringify(downloadResult))
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {

								console.log('install success...');
								plus.runtime.restart();
							}, function(e) {
								console.error('install fail...');
							});
						}
					}
				});
			},
			gotochangePwd() {
				uni.navigateTo({
					url: '../changePwd/changePwd'
				});
			},
			gotoUserInfo() {
				uni.navigateTo({
					url: '../UserInfo/UserInfo'
				});
			},
			gotoDeviceInfo() {
				uni.navigateTo({
					url: '../DeviceInfo/DeviceInfo'
				});
			},
			gotochooslan() {
				uni.navigateTo({
					url: '../chooslan/chooslan'
				});
			},
			gotoOrganizationalSwitching() {
				uni.navigateTo({
					url: '../OrganizationalSwitching/OrganizationalSwitching'
				});
			},
			gotoSetService() {
				let that = this
				that.ifshowmodal = true
			},
			showModalsuccess() {
				let that = this
				that.ifshowmodal = false
			},
			logOut() {
				uni.reLaunch({
					url: '../mylogin/mylogin'
				});
			},
			GetCSVersion() {
				let that = this
				uni.request({
					url: that.connect_url + 'api/services/app/ClientVersion/GetCSVersion', //仅为示例，并非真实接口地址。
					data: {
						TenantId: that.TenantId,
						ClientCode: that.ClientCode

					},
					method: 'POST',
					header: {
						'Content-Type': 'application/json', //自定义请求头信息
						'Authorization': 'Bearer ' + that.token,
						'Abp.Localization.CultureName': that.current_language
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.result != null) {
							that.remark = res.data.result.remark
							that.updata_url = that.connect_url + res.data.result.path.replace(/\\/g, '/')
							if (that.current_version < res.data.result.version) {
								if (res.data.result.updateMode == 1) {
									uni.showActionSheet({
										// itemList: ['可升级'],
										itemList: that.i18n.itemList,
										success: function(res) {
											if (res.tapIndex == 0) {
												that.doDownLoad()
												
												that.downloading_show = false
												// console.log('跳转到下载界面')
											}
										},
										fail: function(res) {
											console.log(res.errMsg);
										}
									});
								} else if (res.data.result.updateMode == 2) {
									uni.showToast({
										title: "强制性升级",
									})
								}
							} else {
								uni.showToast({
									icon: 'none',
									// title: '当前已是最新版本',
									title: that.i18n.toast_text_a,
									duration: 3000
								});
							}
						}

					}
				});
			},
			ClientChangeOrgainzation() {
				let that = this
				uni.request({
					url: that.connect_url + 'api/services/app/ClientVersion/GetCSVersion', //仅为示例，并非真实接口地址。
					data: {
						OrgId: that.OrgId,
						deviceType: that.deviceType
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/json', //自定义请求头信息
						'Authorization': 'Bearer ' + that.token,
						'Abp.Localization.CultureName': that.current_language
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.result != null) {
							that.updata_url = that.connect_url + res.data.result.path.replace(/\\/g, '/')
						}


					}

				});
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.i18n.page_title
			});

		}
	}
</script>

<style>
	.homebanner {
		width: 750upx;
		height: 300upx;
		margin-top: -100upx;
	}

	.minepage {
		background: #F2F2F2;
	}

	.mes_area {
		background: #FFFFFF;
		margin-top: 20upx;
	}

	.mes_list_icon {
		width: 50upx;
		height: 50upx;
		margin: 0 20upx;
	}

	.mes_list_right_icon {
		width: 25upx;
		height: 50upx;
		margin: 0 20upx;
	}

	.mes_list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		border-bottom: 1px solid #DDDDDD;
	}

	.mes_list_left {
		display: flex;
		font-size: 25upx;
	}
</style>
