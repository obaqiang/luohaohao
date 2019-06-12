<template>
	<view>
		<view class="user_info_list">
			<text>{{i18n.text_a}}:</text>
			<input type="text" v-model="PDANo">
		</view>
		<view class="user_info_list">
			<text>{{i18n.text_b}}:</text>
			<!-- <input type="text"> -->
			<text>{{MAC}}</text>
		</view>
		<view class="user_info_list">
			<text>{{i18n.text_c}}:</text>
			<text>{{ip_net}}</text>
		</view>

		<view class="common_btn_bot_fb" style="margin-top: 200upx;" @click="sureSet">{{i18n.text_d}}</view>
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			loadingWait,
		},

		data() {
			return {
				mine_banner_bg: "../../static/img/mine_banner_bg.jpg",
				loading_wait_show: false,
				PDANo: ''
			};
		},
		onNavigationBarButtonTap() {

		},
		computed: {
			connect_url() {
				return this.$store.state.connect_url
			},
			post_header() {
				return this.$store.state.post_header
			},
			MAC() {
				return this.$store.state.MAC
			},
			i18n() {
				return this.$t('DeviceInfo')
			},
			ip_net() {
				return this.$store.state.ip_net
			}
		},

		methods: {
			...mapMutations(['ErrRequestShow']),
			GetPDACode() { //获得PDA编号
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Setting/GetPDACode',
					data: {
						MAC: that.MAC,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.PDANo = res.data.result
						}
					}
				});
			},
			SetPDACode() { //设置PDA编号
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Setting/SetPDACode',
					data: {
						MAC: that.MAC,
						PDANo: that.PDANo

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.GetOutSourcePickDetail_data = res.data.result
							uni.showModal({
								title: that.i18n.modal_text_a,
								content: that.i18n.modal_text_b,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
									uni.navigateBack({
										delta: 1
									})
								}
							});
							
						}
					}
				});
			},
			sureSet() {
				this.SetPDACode()
			}

		},
		onLoad() {
			this.GetPDACode()

		}
	}
</script>

<style>
	page {
		background: #E7E7E7;
	}

	.user_info_list {
		border: 1px solid #666666;
		width: 700upx;
		margin: 20upx 25upx;
		display: flex;
		align-items: center;
		height: 72upx;
	}

	.user_info_list text {
		margin-left: 30upx;
	}

	.user_info_list input {
		margin-left: 30upx;
	}
</style>
