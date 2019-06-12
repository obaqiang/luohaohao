<template>
	<view class="SplitBarcode_area" style="padding-top: 20upx;">
		<SpotScanOutHead v-bind:GetOutSourcePickDetail_data_detail_send="GetOutSourcePickDetail_data_detail_send"
		 v-bind:status_send="status_send" />

		<SplitBarcodeBody v-bind:GetOutSourcePickDetail_data_detail_send="GetOutSourcePickDetail_data_detail_send"
		 v-bind:SpitBarcode="SpitBarcode" />
		<!-- <view class="SpitBarcode_area">
			<text>拆分条码:</text>
			<text>{{SpitBarcode}}</text>
		</view> -->
		<PrintTemplatePick v-if="picker_data_show" v-on:bindPickerChange="bindPickerChange" v-bind:picker_data="picker_data" />

		<view class="common_bg_line" style="margin-bottom: 20upx;"></view>
		<bindScanInput v-bind:scan_input_text="i18n.scan_input_text" v-bind:scan_icon_show="false" v-bind:input_focus="input_focus"
		 v-bind:placeholder_text='i18n.placeholder_text' v-model="split_num" @input="onInput" @work="work" />
		<view class="body_list">
			<text class="text_a">{{i18n.text_d}}:</text>
			<view class="text_right_area">
				<text>{{SpitBarcode}}</text>
			</view>
		</view>
		<view class="common_grey_title" style="margin-top: 20upx;">{{i18n.text_a}}</view>

		<printerList v-on:printer_suc="printer_suc" />
		<loadingWait v-if="loading_wait_show" />
		<view class="btn_bot">
			<button @tap="sureWork">{{i18n.text_b}}</button>
			<button @tap="cancelWork">{{i18n.text_c}}</button>
		</view>
	</view>
</template>

<script>
	import SpotScanOutHead from "../components/SpotScanOutHead/SpotScanOutHead.vue"
	import SwitchTitle from "../components/SwitchTitle/SwitchTitle.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import SplitBarcodeBody from "../components/SplitBarcodeBody/SplitBarcodeBody.vue"
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import printerList from "../components/printerList/printerList.vue"
	import PrintTemplatePick from "../components/PrintTemplatePick/PrintTemplatePick.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			loadingWait,
			SpotScanOutHead,
			SwitchTitle,
			SplitBarcodeBody,
			bindScanInput,
			printerList,
			PrintTemplatePick
		},
		computed: {
			connect_url() {
				return this.$store.state.connect_url
			},
			current_language() {
				return this.$store.state.current_language
			},
			post_header() {
				return this.$store.state.post_header
			},
			i18n() {
				return this.$t('SplitBarcode')
			},
			i18n_modal() {
				return this.$t('modal_text')
			},
			MAC() {
				return this.$store.state.MAC
			},
			DetailId() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail').id
			},
			Barcode() {
				return uni.getStorageSync('Barcode')
			},
			LocationCode() {
				return uni.getStorageSync('LocationCode')
			},
			OutgoingOperation_permissionCode() {
				return uni.getStorageSync('OutgoingOperation_permissionCode')
			},
			GetOutSourcePickDetail_data_detail() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail')
			},
		},
		watch: {
			GetOutSourcePickDetail_data_detail: {
				handler(new_val, old_val) {

					// 					console.log('我的填啊')
					// 					console.log(new_val)
					this.GetOutSourcePickDetail_data_detail_send = new_val
					this.split_num = new_val.spitQty
				},
				immediate: true
			}
		},
		data() {
			return {
				// switchtitletext: '打印机',
				switch_title_head_right_text: '',
				isShowAll: false,
				// scan_input_text: '拆分数量',
				input_focus: '',
				placeholder_text: '',
				split_num: '',
				loading_wait_show: false,
				picker_data: '',
				RuleCode: 'SPIT',
				Count: '1',
				// DetailId:'',
				// Barcode:'',
				// LocationCode:'',
				SpitBarcode: '',
				PrintTemplate: '',
				SpitQty: '',
				SpitOutstock_url: '',
				GetOutSourcePickDetail_data_detail_send: '',
				// spitQty_show:this.spitQty,
				picker_data_show: false,
				status_send:''
			};
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['ErrRequestShow']),
			bindPickerChange(e) {
				console.log(e)
				this.PrintTemplate = e
			},
			onInput(val) {
				this.scan_input_foc = true
				this.SpitQty = val;
			},
			work(e) {

			},
			printer_suc() {
				this.GenerateBarcode()
			},
			sureWork() {
				let that = this
				// that.PrintTemplate = uni.getStorageSync('PrintTemplate')
				that.SpitOutstock()
			},
			cancelWork() {
				uni.navigateBack({});
			},
			GetLabelStyle() {
				let that = this
				that.loading_wait_show = true
				let new_url = 'api/services/wmspda/Label/GetLabelStyle'
				// 				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
				// 					new_url = 'api/services/wmspda/Label/GetLabelStyle'
				// 				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
				// 					new_url = 'api/services/wmspda/OutSourceFeed/ScanBarcode'
				// 				}
				uni.request({
					url: that.connect_url + new_url,
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
							that.picker_data = res.data.result
							that.picker_data_show = true
							// uni.setStorageSync('PrintTemplate', that.picker_data[0].labelTypeCode)
							that.PrintTemplate = that.picker_data[0].labelTypeCode
							// uni.setStorageSync('picker_data', that.picker_data)
						}

					}

				});
			},
			GenerateBarcode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Barcode/GenerateBarcode',
					data: {
						MAC: that.MAC,
						RuleCode: that.RuleCode,
						Count: that.Count
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.SpitBarcode = res.data.result.barcodes[0]
							// 							console.log('接口返回')
							// 							console.log(that.SpitBarcode)
							uni.showToast({
								icon: 'none',
								// title: '打印成功',
								title: that.i18n.toast_text_a,
								duration: 3000
							});
						}

					}

				});
			},
			SpitOutstock() {
				let that = this
				that.loading_wait_show = true
				// 				let new_url = ''
				// 				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
				// 					new_url = 'api/services/wmspda/OutSourcePick/SpitOutstock'
				// 				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
				// 					new_url = 'api/services/wmspda/OutSourceFeed/SpitOutstock'
				// 				}
				uni.request({
					url: that.connect_url + that.SpitOutstock_url,
					data: {
						MAC: that.MAC,
						DetailId: that.DetailId,
						Barcode: that.Barcode,
						LocationCode: that.LocationCode,
						SpitBarcode: that.SpitBarcode,
						PrintTemplate: that.PrintTemplate,
						SpitQty: that.split_num
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							// 							如果qty>=prqty 返回上上级页面
							// 							else prQty>qty返回上一级页面 且更新数据
							let GetOutSourcePickDetail_data_detail = uni.getStorageSync('GetOutSourcePickDetail_data_detail')
							GetOutSourcePickDetail_data_detail.prQty = res.data.result.prQty
							GetOutSourcePickDetail_data_detail.qty = res.data.result.qty
							// 							GetOutSourcePickDetail_data_detail.storageQty = res.data.result.storageQty
							// 							GetOutSourcePickDetail_data_detail.spitQty = res.data.result.spitQty
							uni.setStorageSync('GetOutSourcePickDetail_data_detail', GetOutSourcePickDetail_data_detail)
							if (res.data.qty > res.data.prqty || res.data.qty == res.data.prqty) {
								that.status_send = res.data.result.status
								let BillCodeDetail = uni.getStorageSync('BillCodeDetail')
								BillCodeDetail.status = res.data.result.status
								uni.setStorageSync('BillCodeDetail', BillCodeDetail)
								uni.navigateBack({
									delta: 2
								})
							} else {
								that.status_send = res.data.result.lineStatus
								let BillCodeDetail = uni.getStorageSync('BillCodeDetail')
								BillCodeDetail.status = res.data.result.lineStatus
								uni.setStorageSync('BillCodeDetail', BillCodeDetail)
								uni.navigateBack({
									delta: 1
								})
							}

						}

					}

				});
			},

		},
		onLoad() {

			let that = this
			let title = ''
			that.status_send = uni.getStorageSync('BillCodeDetail').status
			if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
				that.SpitOutstock_url = 'api/services/wmspda/OutSourcePick/SpitOutstock'
				title = that.i18n.page_title_a
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
				that.SpitOutstock_url = 'api/services/wmspda/OutSourceFeed/SpitOutstock'
				title = that.i18n.page_title_b
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductPick') { //生产领料
				that.SpitOutstock_url = 'api/services/wmspda/ProductPick/SpitOutstock'
				title = that.i18n.page_title_c
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductFeed') { //生产领料
				that.SpitOutstock_url = 'api/services/wmspda/ProductFeed/SpitOutstock'
				title = that.i18n.page_title_d
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.OtherOutstock') { //其他出库
				that.SpitOutstock_url = 'api/services/wmspda/OtherOutstock/SpitOutstock'
				title = that.i18n.page_title_e
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.PoReturn') { //采购退料
				that.SpitOutstock_url = 'api/services/wmspda/PoReturn/SpitOutstock'
				title = that.i18n.page_title_f
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Sales.SalesOutstock') { //销售出库
				that.SpitOutstock_url = 'api/services/wmspda/SalesOutstock/SpitOutstock'
				title = that.i18n.page_title_g
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.OutTransfer' || that.OutgoingOperation_permissionCode ==
				'Pages.WPDA.OutStock.Product.ProductTransferOut' || that.OutgoingOperation_permissionCode ==
				'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //调拨出库//生产调拨出库//委外调拨出库
				that.SpitOutstock_url = 'api/services/wmspda/OutTransfer/SpitOutstock'
				title = that.i18n.page_title_h
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.Convert.OutConvert') { //形态转换出库
				that.SpitOutstock_url = 'api/services/wmspda/OutTransfer/SpitOutstock'
			}
			uni.setNavigationBarTitle({
				title: this.i18n.page_title
			});
			this.GetLabelStyle()
		}
	}
</script>

<style>
	.SplitBarcode {
		padding-bottom: 200upx;
	}

	.btn_bot {
		display: flex;
		position: fixed;
		bottom: 40upx;
		width: 750upx;
	}

	.btn_bot button {
		background: #FFB700;
		font-size: 30upx;
		padding: 5upx 120upx;
	}

	.btn_bot button:nth-child(1) {
		background: #FFB700;
		color: #FFFFFF;
	}

	.btn_bot button:nth-child(2) {
		background: #FFB700;
		color: #666666;
	}

	.SpitBarcode_area {
		padding-left: 87upx;
	}

	.SpitBarcode_area text:nth-child(2) {
		margin-left: 60upx;
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
		font-size: 25upx;
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

	.text_right_area text {
		font-size: 25upx;
		height: 50upx;
	}

	.text_right_area_hover {
		display: flex;
		border: 1px solid #ffb700;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}
</style>
