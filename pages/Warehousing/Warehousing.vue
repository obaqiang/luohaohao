<template>
	<view>
		<!-- <button @tap="deleteData">删除</button> -->
		<view class="warehousing_info_area">
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_num}}</text>
				<text class="warehousing_info_list_b">{{billCode}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_date}}</text>
				<text class="warehousing_info_list_b">{{billDate}}{{creationTime}}</text>
			</view>
			<!-- 委外退料 委外发料 委外补料 生产领料 生产补料 生产退料 产成品入库 其他入库 其他出库 采购退料 销售出库 销售退货 调拨出库 调拨入库 形态转换出库 形态转换入库 -->
			<view v-if="permissionCode!='Pages.WPDA.Instock.Storage.PurInstock'" class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_status}}</text>
				<text v-if="status==1" class="warehousing_info_list_b">{{i18n.status_a}}</text>
				<text v-if="status==2" class="warehousing_info_list_b">{{i18n.status_b}}</text>
				<text v-if="status==7" class="warehousing_info_list_b">{{i18n.status_c}}</text>
				<text v-if="status==8" class="warehousing_info_list_b">{{i18n.status_d}}</text>
			</view>
			<!-- 来料入库 -->
			<view v-if="permissionCode=='Pages.WPDA.Instock.Storage.PurInstock'" class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.order_status}}</text>
				<text v-if="status==1" class="warehousing_info_list_b">{{i18n.status_a}}</text>
				<text v-if="status==2" class="warehousing_info_list_b">{{i18n.status_f}}</text>
				<text v-if="status==3" class="warehousing_info_list_b">{{i18n.status_g}}</text>
				<text v-if="status==4" class="warehousing_info_list_b">{{i18n.status_h}}</text>
				<text v-if="status==8" class="warehousing_info_list_b">{{i18n.status_d}}</text>
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
			<bindScanInput v-bind:scan_input_text="scan_b" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_a"
			 @input="onInputA" @work="workA" v-model="scan_input_value_a" />
			<bindScanInput v-if="BarcodeAllowMultiLocation_show" v-bind:scan_input_text="scan_f" v-bind:scan_icon_show="false"
			 v-bind:input_focus="scan_input_foc_b" @input="onInputB" @work="workB" v-model="scan_input_value_b" />
			<bindScanInput v-bind:scan_input_text="scan_d" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_c"
			 @input="onInputC" @work="workC" v-model="scan_input_value_c" />

		</view>
		<view class="scan_info_area" v-if="scan_info_area_show">
			<view class="common_title">
				{{i18n.text_a}}
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.maxAllowQty}}</text>
				<text class="warehousing_info_list_b">{{maxAllowQty}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.materialCode}}</text>
				<text class="warehousing_info_list_b">{{materialCode}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.materialName}}</text>
				<text class="warehousing_info_list_b">{{materialName}}</text>
			</view>
			<view class="warehousing_info_list" v-if="permissionCode=='Pages.WPDA.Instock.Storage.PurInstock'||permissionCode=='Pages.WPDA.Instock.Storage.PorductInstock'||permissionCode=='Pages.WPDA.Instock.Storage.OtherInstock'||permissionCode=='Pages.WPDA.Instock.Storage.ProductTransferIn'||permissionCode=='Pages.WPDA.Instock.Storage.OutstouceTransferIn'||permissionCode=='Pages.WPDA.Instock.ReturnMaterial.ProductReturn'||permissionCode=='Pages.WPDA.StockIn.Convert.InConvert'||permissionCode=='Pages.WPDA.StockIn.TransferAdjust.InTransfer'">
				<text class="warehousing_info_list_a">{{i18n.barcodeInitQty}}</text>
				<text class="warehousing_info_list_b">{{barcodeInitQty}}</text>
			</view>
			<view class="warehousing_info_list">
				<text class="warehousing_info_list_a">{{i18n.barcodeInstockQty}}</text>
				<text class="warehousing_info_list_b">{{barcodeInstockQty}}</text>
			</view>
		</view>
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			loadingWait,
			bindScanInput
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
				GetMaxAllowInstockQty_url: '',
				Instock_url: '',
				BarcodeAllowMultiLocation_show: true,
				creationTime: '',
			}
		},
		computed: {
			i18n() {
				return this.$t('Warehousing')
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
			permissionCode() {
				return uni.getStorageSync('WarehousingOperation_permissionCode')
			}
		},
		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '../DetailsOfDocumentsA/DetailsOfDocumentsA'
			})
		},
		// 		onBackPress(options) {
		// 			if (options.from === 'navigateBack') {
		// 				return false;
		// 			}
		// 			this.back();
		// 			return true;
		// 		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			deleteData() {
				// 				console.log(this.$refs.aaa.$refs.input_ref.inputValue)
				// 				console.log(this.$refs.aaa.$refs.input_ref.inputValue)
				// 				console.log(this.$refs.aaa.$refs.input_ref.inputValue)
				// 				console.log(this.$refs.aaa.$refs.aaa.inputValue)
				// 				console.log(this.$refs.bbb.$refs.bbb.inputValue)
				// 				console.log(this.$refs.ccc.$refs.ccc.inputValue)
				let that = this
				uni.navigateTo({
					url: '../Warehousing/Warehousing'
				});
				// 				that.$refs.aaa.$refs.aaa.inputValue = 0
				// 				that.$refs.bbb.$refs.bbb.inputValue = 0
				// 				that.$refs.ccc.$refs.ccc.inputValue = 0

			},
			initInputStatus() {
				this.scan_input_foc_a = false
				this.scan_input_foc_b = false
				this.scan_input_foc_c = false
			},
			onInputA(val) {
				this.initInputStatus()
				this.scan_input_foc_a = true
				this.scan_input_value_a = val;
			},
			onInputB(val) {
				this.initInputStatus()
				this.scan_input_foc_b = true
				this.scan_input_value_b = val;
			},
			onInputC(val) {
				this.initInputStatus()
				this.scan_input_foc_c = true
				this.scan_input_value_c = val;
			},
			workA() {
				// this.scan_input_value_a = e.detail.value
				// console.log(that.scan_input_value_a)
				this.initInputStatus()
				this.GetMaxAllowInstockQty()


			},
			workB() {
				// 				this.scan_input_foc_a = true
				// 				this.scan_input_foc_b = false
				this.initInputStatus()
				this.scan_input_foc_c = true
			},
			workC() {
				// let that = this
				this.initInputStatus()
				this.Instock()
			},
			getReceiptsData() {
				this.receipts_data = uni.getStorageSync('receipts_data')
				this.billCode = this.receipts_data.billCode
				console.log(this.receipts_data)
				if (this.receipts_data.billDate) {
					this.billDate = this.receipts_data.billDate.slice(0, 16).replace('T', ' ')
				}
				if (this.receipts_data.creationTime) {
					this.creationTime = this.receipts_data.creationTime.slice(0, 16).replace('T', ' ')
				}

				this.id = this.receipts_data.id
				this.instockQty = this.receipts_data.instockQty
				this.passQty = this.receipts_data.passQty
				this.qty = this.receipts_data.qty
				this.scanQty = this.receipts_data.scanQty
				this.waitQty = this.receipts_data.waitQty
				this.status = this.receipts_data.status
				console.log(this.status)
			},
			initData() {
				let that = this
				// that.billCode = ''
				// 				that.LocationCode = ''
				// 				that.BarCode = ''
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
			NoMaxAllowQty() {
				let that = this
				that.scan_input_foc_b = true
				that.scan_input_foc_c = false
				uni.showToast({
					icon: 'none',
					// title: '不可大于最大入库数量且不能小于0',
					title: that.i18n.toast_a,
					duration: 2000
				})
			},
			GetMaxAllowInstockQty() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.GetMaxAllowInstockQty_url,
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
							that.scan_input_foc_c = true
							console.log(that.scan_input_value)
							that.scan_info_area_show = true
							that.maxAllowQty = res.data.result.maxAllowQty
							that.scan_input_value_b = that.maxAllowQty
							that.materialCode = res.data.result.materialCode
							that.materialName = res.data.result.materialName
							that.barcodeInitQty = res.data.result.barcodeInitQty
							that.barcodeInstockQty = res.data.result.barcodeInstockQty
						} else {
							that.scan_input_value_a = ''
							that.initInputStatus()
							that.scan_input_foc_a = true
						}

					}

				});
			},
			Instock() {
				let that = this
				if (that.maxAllowQty > that.scan_input_value_b - 1 && that.scan_input_value_b > 0) {
					that.loading_wait_show = true
					uni.request({
						url: that.connect_url + that.Instock_url,
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
								that.status = res.data.result.status
								that.initData()
								uni.showModal({
									// title: '提示',
									title:that.i18n.modal_a,
									content: that.i18n.entry_success,
									success: function(res) {
										if (res.confirm) {
											// console.log('用户点击确定');
										} else if (res.cancel) {
											// console.log('用户点击取消');
										}
										// that.deleteData()
									}
								});

							} else {
								that.scan_input_value_c = ''
								that.initInputStatus()
								that.scan_input_foc_c = true
								console.log('zheli ')
								// console.log(that.scan_input_foc_c)
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
			let that = this
			let title = ''
			that.BarcodeAllowMultiLocation_show = uni.getStorageSync('BarcodeAllowMultiLocation_show')
			console.log(that.BarcodeAllowMultiLocation_show)
			// that.permissionCode = uni.getStorageSync('WarehousingOperation_permissionCode')
			this.getReceiptsData()
			if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PurInstock') { //来料入库
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/PurInstock/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/PurInstock/Instock'
				title = that.i18n.page_title

			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.ProductReturn') { //生产退料
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/ProductReturn/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/ProductReturn/Instock'
				title = that.i18n.page_title_a
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PorductInstock') { //产成品入库
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/ProductInstock/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/ProductInstock/Instock'
				title = that.i18n.page_title_b
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OtherInstock') { //其他入库
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/OtherInstock/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/OtherInstock/Instock'
				title = that.i18n.page_title_c
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.SalesReturn') { //销售退货
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/SalesReturn/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/SalesReturn/Instock'
				title = that.i18n.page_title_d
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') { //生产调拨入库
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/InTransfer/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/InTransfer/Instock'
				title = that.i18n.page_title_e
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OutstouceTransferIn') { //委外调拨入库
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/InTransfer/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/InTransfer/Instock'
				title = that.i18n.page_title_f
			} else if (that.permissionCode == 'Pages.WPDA.OutStock.Product.ProductTransferOut' || that.permissionCode ==
				'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut' || that.permissionCode ==
				'Pages.WPDA.StockIn.TransferAdjust.OutTransfer') { //生产调拨出库//委外调拨出库//调拨出库
				if (that.permissionCode == 'Pages.WPDA.OutStock.Product.ProductTransferOut') { //生产调拨出库
					title = that.i18n.page_title_g_a
				} else if (that.permissionCode == 'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //委外调拨出库
					title = that.i18n.page_title_g_b
				} else if (that.permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.OutTransfer') { //调拨出库
					title = that.i18n.page_title_g_c
				}

				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/InTransfer/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/InTransfer/Instock'

			} else if (that.permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.InTransfer') { //调拨入库
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/InTransfer/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/InTransfer/Instock'
				title = that.i18n.page_title_h
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.Convert.InConvert') { //形态转换入库
				that.GetMaxAllowInstockQty_url = 'api/services/wmspda/InConvert/GetMaxAllowInstockQty'
				that.Instock_url = 'api/services/wmspda/InConvert/Instock'
				title = that.i18n.page_title_i
			}
			uni.setNavigationBarTitle({
				title: title
			});
			this.scan_a = this.i18n.scan_a
			this.scan_b = this.i18n.scan_b
			this.scan_c = this.i18n.scan_c
			this.scan_d = this.i18n.scan_d
			this.scan_e = this.i18n.scan_e
			this.scan_f = this.i18n.scan_f

			// 此页面做特殊处理,因为pda的原因,导致input 无法使用v-model语法糖,所以在清空数据的时候我们采用跳转到当前页面这一变态做法来满足清空input值的需求，记录跳转次数，然后再监听返回事件
			//$ref的方法被否决，因为只在pc端生效，在pda中input清空无效，所以否定此做法

		},
		onShow() {
			this.initInputStatus()
			this.scan_input_foc_a = true
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.warehousing_info_area {
		background: #ffffff;
		width: 750upx;
		margin-top: 20upx;
		padding: 20upx 0;

	}

	.warehousing_info_list {
		display: flex;
		font-size: 25upx;
	}

	.warehousing_info_list_a {
		width: 200upx;
		text-align: center;
	}

	.warehousing_info_list_b {
		width: 400upx;
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
