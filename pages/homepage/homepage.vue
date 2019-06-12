<template>
	<view>
		<image class="homebanner" :src="home_banner"></image>
		<!-- <image class="scan" :src="scanscan" @tap="scanCode"></image> -->
		<view class="head_list_area">
			<view class="head_list">
				{{ i18n.today_in }}
				<image class="banner_icon" :src="home_today_in_stock"></image>
			</view>
			<view class="head_list">
				{{ i18n.today_out }}
				<image class="banner_icon" :src="home_today_out_stock"></image>
			</view>
		</view>

		<view class="head_list_area">
			<view class="head_list">
				<text class="head_list_text">{{instockCount}}</text>{{ i18n.deals }}
			</view>
			<view class="head_list">
				<text class="head_list_text">{{outstockCount}}</text>{{ i18n.deals }}
			</view>
		</view>

		<view class="module_area">
			<view class="module_list" v-if="module_a" @tap="gotoWarehousingOperation">
				<image class="module_list_icon" :src="home_in_stock"></image>
				<text>
					<!-- {{ i18n.Warehousing_operation }} -->
					{{module_a_text}}
				</text>
			</view>
			<view class="module_list" v-if="module_b" @tap="gotoOutgoingOperation">
				<image class="module_list_icon" :src="home_out_stock"></image>
				<text>
					<!-- {{ i18n.Outgoing_operation }} -->
					{{module_b_text}}
				</text>
			</view>
			<view class="module_list" v-if="module_c" @tap="gotoInLibraryOperation">
				<image class="module_list_icon" :src="home_stock_in_work"></image>
				<text>
					<!-- {{ i18n.In_library_operation }} -->
					{{module_c_text}}
				</text>
			</view>
			<view class="module_list" v-if="module_d" @tap="gotoQualityOperation">
				<image class="module_list_icon" :src="home_quality"></image>
				<text>
					<!-- {{ i18n.Quality_operation }} -->
					{{module_d_text}}
				</text>
			</view>
			<view class="module_list" v-if="module_e" @tap="gotoStockCheck">
				<image class="module_list_icon" :src="home_query"></image>
				<text>
					<!-- {{ i18n.SEO }} -->
					{{module_e_text}}
				</text>
			</view>

		</view>


		<showModal v-if="ifshowmodal" v-bind:ifshowmodal="ifshowmodal" v-bind:show_modal_header="show_modal_header"
		 v-bind:show_modal_body="show_modal_body" v-on:success="success()" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import showModal from "../components/showModal/showModal.vue"
	export default {
		components: {
			showModal
		},

		data() {
			return {
				home_banner: "../../static/img/home_banner.png",
				scanscan: "../../static/img/scanscan.png",
				home_today_in_stock: "../../static/img/home_today_in_stock.png",
				home_today_out_stock: "../../static/img/home_today_out_stock.png",
				home_in_stock: "../../static/img/home_in_stock.png",
				home_out_stock: "../../static/img/home_out_stock.png",
				home_stock_in_work: "../../static/img/home_stock_in_work.png",
				home_quality: "../../static/img/home_quality.png",
				home_query: "../../static/img/home_query.png",
				ifshowmodal: false,
				show_modal_header: '这是header',
				show_modal_body: '这是body',
				module_a: false,
				module_a_text: '',
				module_b: false,
				module_b_text: '',
				module_c: false,
				module_c_text: '',
				module_d: false,
				module_d_text: '',
				module_e: false,
				module_e_text: '',
				// childPermissions: '',
				instockCount: '',
				outstockCount: '',
				interval:''

			};
		},
		onNavigationBarButtonTap() {
			uni.scanCode({
				success: function(res) {
					// 					console.log('条码类型：' + res.scanType);
					// 					console.log('条码内容：' + res.result);
				}
			});
		},
		computed: {
			i18n() {
				return this.$t('homepage')
			},
			connect_url() {
				return this.$store.state.connect_url
			},
			current_language() {
				return this.$store.state.current_language
			},
			post_header() {
				return this.$store.state.post_header
			},
			MAC() {
				return this.$store.state.MAC
			},
			childPermissions() {
				return this.$store.state.childPermissions
			}
		},
		watch: {
			childPermissions: {

				handler(newName, oldName) {
					this.loadPage()
				},
				immediate: true
			}
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			scanCode() {
				uni.scanCode({
					success: function(res) {
						// 						console.log('条码类型：' + res.scanType);
						// 						console.log('条码内容：' + res.result);
					}
				});
			},
			success() {
				this.ifshowmodal = !this.ifshowmodal
			},
			gotoWarehousingOperation() { //入库作业
				uni.navigateTo({
					url: '../WarehousingOperation/WarehousingOperation'
				});
			},
			gotoOutgoingOperation() { //出库作业
				uni.navigateTo({
					url: '../OutgoingOperation/OutgoingOperation'
				});
			},
			gotoInLibraryOperation() { //库内作业
				uni.navigateTo({
					url: '../InLibraryOperation/InLibraryOperation'
				});
			},
			gotoQualityOperation() { //质量作业
				uni.navigateTo({
					url: '../QualityOperation/QualityOperation'
				});
			},
			gotoStockCheck(){//综合查询
				uni.navigateTo({
					url: '../StockCheckTable/StockCheckTable'
				});
			},
			loadPage() {
				let that = this
				that.module_a = false
				that.module_b = false
				that.module_c = false
				that.module_d = false
				that.module_e = false
				for (let i = 0; i < that.childPermissions.length; i++) {
					if (that.childPermissions[i].permissionCode == 'Pages.WPDA.InStock') { //入库作业
						that.module_a = true
						that.module_a_text = that.childPermissions[i].permissionName
					} else if (that.childPermissions[i].permissionCode == 'Pages.WPDA.OutStock') { //出库作业
						that.module_b = true
						that.module_b_text = that.childPermissions[i].permissionName
					} else if (that.childPermissions[i].permissionCode == 'Pages.WPDA.StockIn') { //库内作业
						that.module_c = true
						that.module_c_text = that.childPermissions[i].permissionName
					} else if (that.childPermissions[i].permissionCode == 'Pages.WPDA.QualityJob') { //质量作业
						that.module_d = true
						that.module_d_text = that.childPermissions[i].permissionName
					} else if (that.childPermissions[i].permissionCode == 'Pages.WPDA.IntegratedQuery') { //综合查询
						that.module_e = true
						that.module_e_text = that.childPermissions[i].permissionName
					}
				}
			},
			GetTodayInOutSummary() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/TodayInOutSummary/GetTodayInOutSummary',
					data: {
						MAC: that.MAC
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = false
						console.log(res.data)
// 						console.log(JSON.stringify(that.post_header))
// 						console.log(JSON.stringify(res.data))
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.instockCount = res.data.result.instockCount
							that.outstockCount = res.data.result.outstockCount
						}else{
							console.log('qingchu')
							clearInterval(that.interval)
						}
					}
				});
			},


			GetParameters() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Parameter/GetParameters',
					data: {
						SystemType: "WMS"
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = false
						console.log(res.data)
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							let GetParameters_data = res.data.result
							for (let i = 0; i < GetParameters_data.length; i++) {
								if (GetParameters_data[i].key == 'BarcodeAllowMultiLocation') {
									if (GetParameters_data[i].value == 0) {
										uni.setStorageSync('BarcodeAllowMultiLocation_show', false)
									} else {
										uni.setStorageSync('BarcodeAllowMultiLocation_show', true)
									}
								}
							}
						}

					}

				});
			},
		},
		onLoad() {

			uni.setNavigationBarTitle({
				title: this.i18n.homepage_title
			});
			uni.setTabBarItem({
				index: 0,
				text: this.i18n.homepage_bar_a,
			})
			uni.setTabBarItem({
				index: 1,
				text: this.i18n.homepage_bar_b,
			})
			let that = this
			that.GetTodayInOutSummary()
			that.interval = setInterval(function() {
				console.log(123)
				that.GetTodayInOutSummary()
			}, 5*60*1000)
			that.GetParameters()
			that.loadPage()

		}
	}
</script>

<style>
	.homebanner {
		width: 750upx;
		height: 300upx;
	}

	.banner_icon {
		width: 30upx;
		height: 30upx;
	}

	.head_list_area {
		display: flex;
		width: 750upx;
		border-bottom: 1px solid #DDDDDD;

	}

	.head_list {
		width: 50%;
		justify-content: center;
		display: flex;
		align-items: center;
		height: 70upx;
		font-size: 25upx;
	}

	.head_list:nth-child(1) {
		border-right: 1px solid #DDDDDD;

	}

	.head_list_text {
		color: #ff7200;
		font-size: 25upx;
	}

	.module_list_icon {
		width: 100upx;
		height: 100upx;
		margin-bottom: 20upx;
	}

	.module_area {}

	.module_list {
		width: 50%;
		height: 200upx;
		float: left;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 25upx;
	}

	.scan {
		position: fixed;
		top: 20upx;
		z-index: 1001;
		right: 20upx;
		width: 50upx;
		height: 50upx;
	}
</style>
