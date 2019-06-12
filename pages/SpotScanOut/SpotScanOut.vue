<template>
	<view>
		<SpotScanOutHead v-bind:GetOutSourcePickDetail_data_detail_send="GetOutSourcePickDetail_data_detail_send" v-bind:status_send="status_send"/>
		<view class="common_bg_line"></view>

		<bindScanInput v-bind:scan_input_text="i18n.scan_input_text_a" v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_a"
		 v-bind:placeholder_text='i18n.placeholder_text_a' @input="onInputA" @work="workA" v-model="Barcode" />

		<bindScanInput v-bind:scan_input_text="i18n.scan_input_text_b" v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_b"
		 v-bind:placeholder_text='i18n.placeholder_text_b' @input="onInputB" @work="workB" v-model="LocationCode" />

		<view class="common_bg_line"></view>

		<SpotScanOutTable v-if="SpotScanOutTable_show" v-bind:SpotScanOutTable_data="SpotScanOutTable_data" />
		<loadingWait v-if="loading_wait_show" />
		<onlyConfirmModal v-if="onlyConfirmModal_show" v-bind:onlyConfirmModal_text="onlyConfirmModal_text"
		 v-on:onlyConfirmModalConfirm='onlyConfirmModalConfirm' />
	</view>
</template>

<script>
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import SpotScanOutTable from "../components/SpotScanOutTable/SpotScanOutTable.vue"
	import SpotScanOutHead from "../components/SpotScanOutHead/SpotScanOutHead.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import onlyConfirmModal from "../components/onlyConfirmModal/onlyConfirmModal.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			bindScanInput,
			SpotScanOutTable,
			loadingWait,
			SpotScanOutHead,
			onlyConfirmModal
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
				return this.$t('SpotScanOut')
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
			OutgoingOperation_permissionCode() {
				return uni.getStorageSync('OutgoingOperation_permissionCode')
			},
			// 			GetOutSourcePickDetail_data_detail() {
			// 				return uni.getStorageSync('GetOutSourcePickDetail_data_detail')
			// 			}

		},
		watch: {
			// 			GetOutSourcePickDetail_data_detail: {
			// 				handler(new_val, old_val) {
			// 					this.GetOutSourcePickDetail_data_detail_send = new_val
			// 				},
			// 				immediate: true
			// 			}
		},
		data() {
			return {
				// 				scan_input_text_a: '物料条码',
				// 				scan_input_text_b: '库位码',
				input_focus_a: true,
				input_focus_b: false,
				// 				placeholder_text_a: '请输入或扫描物料条码',
				// 				placeholder_text_b: '请输入或扫描库位码',
				Barcode: '',
				LocationCode: '',
				loading_wait_show: false,
				SpotScanOutTable_data: '',
				SpotScanOutTable_show: false,
				ScanBarcode_url: '',
				Outstock_url: '',
				GetOutSourcePickDetail_data_detail_send: '',
				onlyConfirmModal_text: '',
				onlyConfirmModal_show: false,
				status_send:''
			};
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['ErrRequestShow']),
			onlyConfirmModalConfirm() {
				this.onlyConfirmModal_show = false
				uni.navigateTo({
					url: '../SplitBarcode/SplitBarcode'
				})
			},
			initInputStatus() {
				this.input_focus_a = false
				this.input_focus_b = false
			},
			onInputA(val) {
				this.Barcode = val;

				this.initInputStatus()
				this.input_focus_a = true
			},
			workA(e) {
				this.initInputStatus()
				// this.scan_input_foc_b = true
				// uni.setStorageSync('SplitBarcode_Barcode', this.Barcode)
				this.ScanBarcode()

			},
			onInputB(val) {
				this.LocationCode = val;
				this.initInputStatus()
				this.input_focus_b = true
			},
			workB(e) {
				this.initInputStatus()
				this.Outstock()
			},
			ScanBarcode() {
				let that = this
				that.loading_wait_show = true
				// 				let new_url = ''
				// 				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
				// 					new_url = 'api/services/wmspda/OutSourcePick/ScanBarcode'
				// 				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
				// 					new_url = 'api/services/wmspda/OutSourceFeed/ScanBarcode'
				// 				}
				uni.request({
					url: that.connect_url + that.ScanBarcode_url,
					data: {
						MAC: that.MAC,
						DetailId: that.DetailId,
						Barcode: that.Barcode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							let fifo = res.data.result.fifo
							let res_data = res.data.result

							if (fifo == null) {
								that.SpotScanOutTable_data = res_data.storageInfo
								that.input_focus_b = true
								that.SpotScanOutTable_show = true
							} else if (fifo == false) { //弹出选择框
								uni.showModal({
									title: that.i18n.show_modal.alert,
									content: that.i18n.show_modal.show_modal_content_a,
									cancelText: that.i18n.show_modal.show_modal_cancelText_a,
									confirmText: that.i18n.show_modal.show_modal_confirmText_a,
									success: function(res) {
										if (res.confirm) {
											// console.log('用户点击确定');
											that.SpotScanOutTable_data = res_data.storageInfo
											that.input_focus_b = true
											that.SpotScanOutTable_show = true
										} else if (res.cancel) {
											// console.log('用户点击取消');
											that.SpotScanOutTable_data = res_data.needFIFOStorageInfo
											that.input_focus_b = true
											that.SpotScanOutTable_show = true
										}
									}
								});

							} else if (fifo == true) {
								that.initInputStatus()
								// 								uni.showToast({
								// 									icon:'none',
								// 									title: '此条码不属于先进先出范围内条码,确定查看可出库条码',
								// 									duration: 2000
								// 								});
								uni.showModal({
									title: that.i18n.show_modal.alert,
									content: that.i18n.show_modal.show_modal_content_b,
									cancelText: that.i18n.show_modal.show_modal_cancelText_b,
									confirmText: that.i18n.show_modal.show_modal_confirmText_b,
									success: function(res) {
										if (res.confirm) {
											// console.log('用户点击确定');
											that.input_focus_a = true
											that.SpotScanOutTable_show = true
										} else if (res.cancel) {
											// console.log('用户点击取消');
											that.input_focus_a = true
											that.SpotScanOutTable_show = true
										}
									}
								});
								that.SpotScanOutTable_data = res_data.needFIFOStorageInfo
							}
						} else {
							that.Barcode = ''
							that.initInputStatus()
							that.input_focus_a = true
						}

					}

				});
			},
			Outstock() {
				let that = this
				that.loading_wait_show = true
				// let new_url = ''
				// 				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
				// 					new_url = 'api/services/wmspda/OutSourcePick/Outstock'
				// 				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
				// 					new_url = 'api/services/wmspda/OutSourceFeed/Outstock'
				// 				}
				uni.request({
					url: that.connect_url + that.Outstock_url,
					data: {
						MAC: that.MAC,
						DetailId: that.DetailId,
						Barcode: that.Barcode,
						LocationCode: that.LocationCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							let res_data = res.data.result
							that.GetOutSourcePickDetail_data_detail_send.storageQty = res.data.result.storageQty
							that.GetOutSourcePickDetail_data_detail_send.spitQty = res.data.result.spitQty
							
							if (res_data.isSpitBarcode == true) { //跳转到拆包界面
								this.onlyConfirmModal_show = true
								// this.onlyConfirmModal_text = '需要拆分条码'
								this.onlyConfirmModal_text = this.i18n.onlyConfirmModal_text
								uni.setStorageSync('Barcode', that.Barcode)
								uni.setStorageSync('LocationCode', that.LocationCode)

							} else {
								that.GetOutSourcePickDetail_data_detail_send.prQty = res.data.result.prQty
								that.GetOutSourcePickDetail_data_detail_send.qty = res.data.result.qty
								that.GetOutSourcePickDetail_data_detail_send.storageQty = res.data.result.storageQty
								that.GetOutSourcePickDetail_data_detail_send.spitQty = res.data.result.spitQty
								// that.GetOutSourcePickDetail_data_detail_send.status = res.data.result.status
								uni.showToast({
									icon: 'none',
									// title: '提交成功',
									title: that.i18n.toast_text_a,
									duration: 3000
								});
								if (res.data.result.qty > res.data.result.prQty || res.data.result.qty == res.data.result.prQty) { //返回上衣页面
									that.status_send = res.data.result.status
									console.log('aa数据')
									console.log(that.GetOutSourcePickDetail_data_detail_send.status)
									//此时需要回写上一层页面的status
									let BillCodeDetail = uni.getStorageSync('BillCodeDetail')
									BillCodeDetail.status = res.data.result.status
									uni.setStorageSync('BillCodeDetail', BillCodeDetail)
									setTimeout(function() {
										uni.navigateBack({});
									}, 1000)

								} else { //清空input中的值
									that.status_send = res.data.result.lineStatus
									console.log('bb数据')
									console.log(that.GetOutSourcePickDetail_data_detail_send.status)
									let BillCodeDetail = uni.getStorageSync('BillCodeDetail')
									BillCodeDetail.status = res.data.result.lineStatus
									uni.setStorageSync('BillCodeDetail', BillCodeDetail)
									that.Barcode = ''
									that.LocationCode = ''
									that.SpotScanOutTable_data = ''
									that.SpotScanOutTable_show = false
									that.initInputStatus()
									that.input_focus_a = true

								}
							}
							uni.setStorageSync('GetOutSourcePickDetail_data_detail', that.GetOutSourcePickDetail_data_detail_send)
						} else {
							that.LocationCode = ''
							that.initInputStatus()
							that.input_focus_b = true
						}
					}

				});
			}
		},
		onLoad() {
			let that = this
			let title = ''
			if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
				that.ScanBarcode_url = 'api/services/wmspda/OutSourcePick/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/OutSourcePick/Outstock'
				title = that.i18n.page_title_a
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
				that.ScanBarcode_url = 'api/services/wmspda/OutSourceFeed/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/OutSourceFeed/Outstock'
				title = that.i18n.page_title_b
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductPick') { //生产领料
				that.ScanBarcode_url = 'api/services/wmspda/ProductPick/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/ProductPick/Outstock'
				title = that.i18n.page_title_c
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductFeed') { //生产补料
				that.ScanBarcode_url = 'api/services/wmspda/ProductFeed/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/ProductFeed/Outstock'
				title = that.i18n.page_title_d
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.OtherOutstock') { //其他出库
				that.ScanBarcode_url = 'api/services/wmspda/OtherOutstock/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/OtherOutstock/Outstock'
				title = that.i18n.page_title_e
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.PoReturn') { //采购退料
				that.ScanBarcode_url = 'api/services/wmspda/PoReturn/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/PoReturn/Outstock'
				title = that.i18n.page_title_f
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Sales.SalesOutstock') { //销售出库
				that.ScanBarcode_url = 'api/services/wmspda/SalesOutstock/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/SalesOutstock/Outstock'
				title = that.i18n.page_title_g
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.OutTransfer' || that.OutgoingOperation_permissionCode ==
				'Pages.WPDA.OutStock.Product.ProductTransferOut' || that.OutgoingOperation_permissionCode ==
				'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //调拨出库//生产调拨出库//委外调拨出库
				that.ScanBarcode_url = 'api/services/wmspda/OutTransfer/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/OutTransfer/Outstock'
				title = that.i18n.page_title_h
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.Convert.OutConvert') { //形态转换出库
				that.ScanBarcode_url = 'api/services/wmspda/OutConvert/ScanBarcode'
				that.Outstock_url = 'api/services/wmspda/OutConvert/Outstock'
				title = that.i18n.page_title_i
			}
			uni.setNavigationBarTitle({
				title: title
			});
			// this.MacInfo();
			// 1:返回先进先出Null:可以出库,True:表示不可出库,需要先进先出,False:弹出是否出库选择框 提示用户是否进行出库
			// fifi 是true 直接显示NeedFIFOStorageInfo

			//IsSpitBarcode=false PrQty Qty 进行比较 PrQty== Qty返回上一层界面  否则 进行头部数据嗯行
			// IsSpitBarcode = true 跳转到拆包界面 数据带到拆包界面


			// 			uni.showModal({
			// 				title: '提示',
			// 				content: '是否拆分条码',
			// 				success: function(res) {
			// 					if (res.confirm) {
			// 						uni.setStorageSync('Barcode', that.Barcode)
			// 						uni.setStorageSync('LocationCode', that.LocationCode)
			// 						uni.navigateTo({
			// 							url: '../SplitBarcode/SplitBarcode'
			// 						})
			// 					} else if (res.cancel) {
			// 
			// 					}
			// 				}
			// 			});

		},
		onShow() {
			this.GetOutSourcePickDetail_data_detail_send = uni.getStorageSync('GetOutSourcePickDetail_data_detail')
			this.status_send = uni.getStorageSync('BillCodeDetail').status
			console.log(this.GetOutSourcePickDetail_data_detail_send)
		}
	}
</script>

<style>
</style>
