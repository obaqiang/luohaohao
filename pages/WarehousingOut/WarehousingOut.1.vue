<template>
	<view>
		<view class="warehousing_info_area">
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_num}}</text>
				<text class="warehousing_info_list_b">{{billCode}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_date}}</text>
				<text class="warehousing_info_list_b">{{billDate}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_status}}</text>
				<text v-if="status==1" class="warehousing_info_list_b">新增</text>
				<text v-if="status==2" class="warehousing_info_list_b">待检</text>
				<text v-if="status==3" class="warehousing_info_list_b">检验中</text>
				<text v-if="status==8" class="warehousing_info_list_b">完成</text>
			</view>
			<!-- <view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_made_sun}}</text>
				<text class="warehousing_info_list_b">{{qty}}</text>
				<text class="warehousing_info_list_b">{{i18n.num_to_pick}}</text>
				<text class="warehousing_info_list_b">{{waitQty}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.ok_num}}</text>
				<text class="warehousing_info_list_b">{{passQty}}</text>
				<text class="warehousing_info_list_b">{{i18n.scan_num}}</text>
				<text class="warehousing_info_list_b">{{scanQty}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.stock_num}}</text>
				<text class="warehousing_info_list_b">{{instockQty}}</text>
			</view> -->
		</view>
		<view class="warehousing_scan_area">
			<view class="common_title">{{i18n.material_info}}</view>
			<view class="body_list">
				<text class="text_a">{{scan_b}}:</text>
				<view class="text_right_area">
					<input class="text_right_input" type="text" :placeholder="scan_a" :focus="scan_input_foc_a" v-model="scan_input_value_a"
					 @confirm="scanConfirmA" />
					<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanDataA"></image>
				</view>
			</view>
			<view class="body_list">
				<text class="text_a">{{scan_f}}:</text>
				<view class="text_right_area">
					<input class="text_right_input" type="text" :placeholder="scan_e" :focus="scan_input_foc_b" v-model="scan_input_value_b"
					 @confirm="scanConfirmB" />
				</view>
			</view>
			<view class="body_list">
				<text class="text_a">{{scan_d}}:</text>
				<view class="text_right_area">
					<input class="text_right_input" type="text" :placeholder="scan_c" :focus="scan_input_foc_c" v-model="scan_input_value_c"
					 @confirm="scanConfirmC" />
					<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanDataC"></image>
				</view>
			</view>


		</view>
		<view class="scan_info_area" v-if="scan_info_area_show">
			<view class="common_title">
				扫描信息
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">最大允许数量</text>
				<text class="warehousing_info_list_b">{{maxAllowQty}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">物料代码</text>
				<text class="warehousing_info_list_b">{{materialCode}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">物料名称</text>
				<text class="warehousing_info_list_b">{{materialName}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">条码数量</text>
				<text class="warehousing_info_list_b">{{barcodeInitQty}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">入库数量</text>
				<text class="warehousing_info_list_b">{{barcodeInstockQty}}</text>
			</view>
		</view>
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import scanInput from "../components/scanInput/scanInput.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			scanInput,
			loadingWait
		},
		data() {
			return {
				scan_a: '',
				scan_b: '',
				scan_c: '',
				scan_d: '',
				scan_e: '',
				scan_f: '',
				billCode: "",
				billDate: "",
				id: '',
				instockQty: '',
				passQty: '',
				qty: '',
				scanQty: '',
				waitQty: '',
				receipts_data: '',
				BarCode: '',
				scan_input_value: '',
				scan_input_foc: false,
				LocationCode: '',
				InstockQty: '',
				status: '',
				maxAllowQty: '',
				materialCode: '',
				materialName: '',
				barcodeInitQty: '',
				barcodeInstockQty: '',
				loading_wait_show: false,
				scan_info_area_show: false,
				scan_input_foc_a: true,
				scan_input_foc_b: false,
				scan_input_foc_c: false,
				scan_input_value_a: '',
				scan_input_value_b: '',
				scan_input_value_c: '',
				text_right_area_icon: "../../static/img/text_right_area_icon.png",
			}
		},
		computed: {
			i18n() {
				return this.$t('WarehousingOut')
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
		},
		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '../DetailsOfDocumentsAOut/DetailsOfDocumentsAOut'
			})
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			initData() {
				let that = this
				// that.billCode = ''
				// that.LocationCode = ''
				// that.BarCode = ''
				that.scan_input_value = ''
				that.materialCode = ''
				that.materialName = ''
				that.barcodeInitQty = ''
				that.barcodeInstockQty = ''
				that.scan_info_area_show = false
				that.scan_input_foc_a = true
				that.scan_input_foc_b = false
				that.scan_input_foc_c = false
				that.scan_input_value_a = ''
				that.scan_input_value_b = ''
				that.scan_input_value_c = ''

			},
			scanConfirmA() {
				let that = this
				that.scan_input_foc_a = false
				that.scan_input_foc_c = true
				// that.BarCode = that.scan_input_value_a
				that.GetMaxAllowInstockQty()
			},
			scanConfirmB() {
				let that = this
				if (that.maxAllowQty > that.scan_input_value_b && that.scan_input_value_b > 0) {
					that.scan_input_foc_b = false
					that.scan_input_foc_c = true
				} else {
					that.NoMaxAllowQty()
				}
			},
			NoMaxAllowQty(){
				let that= this
				that.scan_input_foc_b = true
				that.scan_input_foc_c = false
				uni.showToast({
					icon: 'none',
					title: '不可大于最大入库数量且不能小于0',
					duration: 2000
				})
			},
			scanConfirmC() {
				let that = this
				that.LocationCode = that.scan_input_value_c
				that.Instock()
			},
			scanDataA() {
				let that = this
				uni.scanCode({
					success: function(res) {
						// console.log('需要的:' + res.result)
						// that.BarCode = res.result
						that.scan_input_value_a = res.result
						that.GetMaxAllowInstockQty()
					}
				});

			},
			scanDataC() {
				let that = this
				uni.scanCode({
					success: function(res) {
						// console.log('需要的:' + res.result)
						// that.LocationCode = res.result
						that.scan_input_value_c = res.result
						that.Instock()
					}
				});

			},
			GetMaxAllowInstockQty() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/OutSourceReturn/GetMaxAllowInstockQty',
					data: {
						MAC: that.MAC,
						BillCode: that.billCode,
						BarCode: that.scan_input_value_a
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = false
						console.log(res.data)
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.scan_input_value_b = res.data.result.maxAllowQty
							console.log(that.scan_input_value)
							that.scan_info_area_show = true
							that.maxAllowQty = res.data.result.maxAllowQty
							that.materialCode = res.data.result.materialCode
							that.materialName = res.data.result.materialName
							that.barcodeInitQty = res.data.result.barcodeInitQty
							that.barcodeInstockQty = res.data.result.barcodeInstockQty
						}

					}

				});
			},
			Instock() {
				let that = this
				if (that.maxAllowQty > that.scan_input_value_b && that.scan_input_value_b > 0) {
					that.loading_wait_show = true
					uni.request({
						url: that.connect_url + 'api/services/wmspda/OutSourceReturn/Instock',
						data: {
							MAC: that.MAC,
							BillCode: that.billCode,
							LocationCode: that.scan_input_value_c,
							BarCode: that.scan_input_value_a,
							InstockQty: that.scan_input_value_b
						},
						method: 'POST',
						header: that.post_header,
						success: (res) => {
							that.loading_wait_show = false
							console.log(res.data)
							that.ErrRequestShow(res)
							if (res.data.success == true) {
								console.log(res)
								that.initData()
								uni.showToast({
									icon: 'none',
									title: '物品扫码入库上架成功',
									duration: 2000
								})
								console.log(that.BarCode)
							}

						},
						fail: (res) => {
							console.log(res)
						}

					});
				} else {
					that.NoMaxAllowQty()
				}


			}
		},
		onLoad() {
			this.scan_a = this.i18n.scan_a
			this.scan_b = this.i18n.scan_b
			this.scan_c = this.i18n.scan_c
			this.scan_d = this.i18n.scan_d
			this.scan_e = this.i18n.scan_e
			this.scan_f = this.i18n.scan_f
			this.receipts_data = uni.getStorageSync('OutsourcingReturnSheet_data')
			console.log(this.receipts_data)
			this.billDate = this.receipts_data.billDate
			this.billCode = this.receipts_data.billCode
			this.id = this.receipts_data.id
			this.instockQty = this.receipts_data.instockQty
			this.passQty = this.receipts_data.passQty
			this.qty = this.receipts_data.qty
			this.scanQty = this.receipts_data.scanQty
			this.waitQty = this.receipts_data.waitQty
			this.status = this.receipts_data.status

		}
	}
</script>

<style>
	page {
		background: #e7e7e7;
	}

	.warehousing_info_area {
		background: #ffffff;
		width: 750upx;
		margin-top: 20upx;
		padding: 20upx 0;

	}

	.warehousing_info_list {
		display: flex;
	}

	.warehousing_info_list_a {
		width: 200upx;
		text-align: center;
	}

	.warehousing_info_list_b {
		width: 200upx;
		text-align: left;
	}

	.warehousing_scan_area {
		background: #FFFFFF;
		margin-top: 20upx;
	}

	.body_list {
		display: flex;
		line-height: 60upx;
		padding-left: 30upx;
		align-items: center;
		margin-top: 20upx;
	}

	.text_a {
		width: 150upx;
		text-align: right;
	}

	.text_b {
		padding-left: 50upx;
	}

	.text_right_area {
		display: flex;
		border: 1px solid #DDDDDD;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}

	.text_right_area:hover {
		border: 1px solid #ffb700;
	}

	.text_right_area_icon {
		width: 50upx;
		height: 50upx;
	}

	.scan_info_area {
		background: #FFFFFF;
		width: 750upx;
		margin-top: 20upx;
		padding: 20upx 0;
	}
</style>
