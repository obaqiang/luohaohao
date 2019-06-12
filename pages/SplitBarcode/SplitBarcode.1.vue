<template>
	<view class="SplitBarcode_area">
		<!-- 		<SwitchTitle v-bind:switchtitletext="i18n.switchtitletext" v-bind:switch_title_head_right_text="i18n.switch_title_head_right_text"
		 v-bind:isShowAll="isShowAll" /> -->
		<view class="common_line_dd"></view>
		<SpotScanOutHead v-bind:GetOutSourcePickDetail_data_detail_send="GetOutSourcePickDetail_data_detail_send" />
		<!-- <view class="common_line_dd" style="margin-top: 20upx;"></view> -->
		<PrintTemplatePick v-on:bindPickerChange="bindPickerChange"/>
		<!-- <view class="common_line_dd" style="margin-top: 20upx;"></view> -->
		<view class="common_bg_line" ></view>
		<SplitBarcodeBody style="margin-top: 0;margin-bottom: 0;" v-bind:GetOutSourcePickDetail_data_detail_send="GetOutSourcePickDetail_data_detail_send" />
		<view class="SpitBarcode_area">
			<text>拆分条码</text>
			<text>{{SpitBarcode}}</text>
		</view>
		<view class="common_bg_line" style="margin-bottom: 20upx;"></view>
		<!-- <view class="common_line_dd" style="margin-top: 20upx;"></view> -->
		<bindScanInput v-bind:scan_input_text="i18n.scan_input_text" v-bind:scan_icon_show="false" v-bind:input_focus="input_focus"
		 v-bind:placeholder_text='i18n.placeholder_text' v-model="split_num" @input="onInput" @work="work" />
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
				return uni.getStorageSync('SplitBarcode_Barcode')
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

					console.log('我的填啊')
					console.log(new_val)
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
				// spitQty_show:this.spitQty
			};
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['ErrRequestShow']),
			bindPickerChange(e){
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
							// uni.setStorageSync('PrintTemplate', that.picker_data[0].labelTypeCode)
							that.PrintTemplate = that.picker_data[0].labelTypeCode
							uni.setStorageSync('picker_data', that.picker_data)
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
							console.log('接口返回')
							console.log(that.SpitBarcode)
							uni.showToast({
								icon: 'none',
								title: '打印成功',
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
							// 							如果prQty==qty 返回上上级页面
							// 							else prQty>qty返回上一级页面 且更新数据
							if (res.data.result.prQty == res.data.result.prQty) {
								uni.navigateBack({
									delta: 2
								})
							} else {
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
	.SpitBarcode_area{
		padding-left: 87upx;
	}
	.SpitBarcode_area text:nth-child(2){
		margin-left: 60upx;
	}
</style>
