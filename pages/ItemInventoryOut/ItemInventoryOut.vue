<template>
	<view>
		<ItemInventoryOutHeadInfo v-bind:BillCodeDetail_send="BillCodeDetail_send" />
		<SwitchTitle v-bind:switch_title_head_right_text="i18n.switch_title_head_right_text" v-bind:isShowAll="isShowAll"
		 v-bind:switchtitletext="i18n.switchtitletext" v-on:sucFuc="sucFuc" />
		<ItemInventoryOutBodyInfo v-bind:ItemInventoryOutBodyInfo_data="GetOutSourcePickDetail_data"
		 v-on:ItemInventoryOutBodyInfoSuc="ItemInventoryOutBodyInfoSuc" />
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import ItemInventoryOutHeadInfo from "../components/ItemInventoryOutHeadInfo/ItemInventoryOutHeadInfo.vue"
	import ItemInventoryOutBodyInfo from "../components/ItemInventoryOutBodyInfo/ItemInventoryOutBodyInfo.vue"
	import SwitchTitle from "../components/SwitchTitle/SwitchTitle.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			ItemInventoryOutHeadInfo,
			ItemInventoryOutBodyInfo,
			SwitchTitle,
			loadingWait
		},

		data() {
			return {
				loading_wait_show: false,
				// switchtitletext: '单据信息清点操作',
				isShowAll: false,
				// switch_title_head_right_text: '显示全部',
				GetOutSourcePickDetail_data: '',
				GetOutSourcePickDetail_url: '',
				BillCodeDetail_send: ''

			};
		},
		// computed: mapState(['connect_url']),
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
			MAC() {
				return this.$store.state.MAC
			},
			i18n() {
				return this.$t('ItemInventoryOut')
			},
			// 			BillCodeDetail() {
			// 				return uni.getStorageSync('BillCodeDetail')
			// 			},
			BillCode() {
				return uni.getStorageSync('BillCodeDetail').billCode
			},
			OutgoingOperation_permissionCode() {
				return uni.getStorageSync('OutgoingOperation_permissionCode')
			}
		},
		methods: {
			...mapMutations(['initPosition']),
			...mapMutations(['ErrRequestShow']),
			sucFuc(e) {
				this.isShowAll = e
				this.GetOutSourcePickDetail()
			},
			ItemInventoryOutBodyInfoSuc(e) {
				let that = this
				console.log(e)
				let if_can_jump = false
				for (let i = 0; i < that.GetOutSourcePickDetail_data.length; i++) {
					if (e == that.GetOutSourcePickDetail_data[i].id) {
						uni.setStorageSync('GetOutSourcePickDetail_data_detail', that.GetOutSourcePickDetail_data[i])
						if (that.GetOutSourcePickDetail_data[i].prQty > that.GetOutSourcePickDetail_data[i].qty) {
							//只有当prQty小于qty 的时候才能跳转
							if_can_jump = true
						}
					}
				}
				if (if_can_jump == true) {
					uni.navigateTo({
						url: '../SpotScanOut/SpotScanOut'
					});
				}

			},
			GetOutSourcePickDetail() {
				let that = this
				that.loading_wait_show = true
				// 				let GetOutSourcePickDetail_url = ''
				// 				if(that.OutgoingOperation_permissionCode=='Pages.WPDA.OutStock.Outsource.OutsourcePick'){
				// 					GetOutSourcePickDetail_url = 'api/services/wmspda/OutSourcePick/GetOutSourcePickDetail'
				// 				}else if(that.OutgoingOperation_permissionCode=='Pages.WPDA.OutStock.Outsource.OutsourceFeed'){
				// 					GetOutSourcePickDetail_url = 'api/services/wmspda/OutSourceFeed/GetOutSourceFeedDetail'
				// 				}
				uni.request({
					url: that.connect_url + that.GetOutSourcePickDetail_url,
					data: {
						BillCode: that.BillCode,
						MAC: that.MAC,
						IsShowAll: that.isShowAll

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.GetOutSourcePickDetail_data = res.data.result
						}

					}

				});
			}


		},
		onLoad() {
			let that = this
			let title = '';
			if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/OutSourcePick/GetOutSourcePickDetail'
				title = this.i18n.page_title_pick
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/OutSourceFeed/GetOutSourceFeedDetail'
				title = this.i18n.page_title_feed
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductPick') { //生产领料
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/ProductPick/GetProductPickDetail'
				title = this.i18n.page_title_ProductPick
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductFeed') {
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/ProductFeed/GetProductFeedDetail'
				title = this.i18n.page_title_ProductFeed
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.OtherOutstock') { //其他出库
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/OtherOutstock/GetOtherOutstockDetail'
				title = this.i18n.page_title_OtherOutstock
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.PoReturn') { //采购退料
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/PoReturn/GetPoReturnDetail'
				title = this.i18n.page_title_PoReturn
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Sales.SalesOutstock') { //销售出库
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/SalesOutstock/GetSalesOutstockDetail'
				title = this.i18n.page_title_SalesOutstock
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') { //生产调拨入库
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/InTransfer/GetInTransferDetail'
				title = this.i18n.page_title_GetInTransferDetail
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.OutTransfer' || that.OutgoingOperation_permissionCode ==
				'Pages.WPDA.OutStock.Product.ProductTransferOut' || that.OutgoingOperation_permissionCode ==
				'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //调拨出库//生产调拨出库//委外调拨出库
				// console.log('调拨出库')
				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.OutTransfer') { //调拨出库
					title = this.i18n.page_title_OutTransfer_a
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductTransferOut') { //生产调拨出库
					title = this.i18n.page_title_OutTransfer_b
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //委外调拨出库
					title = this.i18n.page_title_OutTransfer_c
				}
				console.log(that.OutgoingOperation_permissionCode)
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/OutTransfer/GetOutTransferDetail'

			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.Convert.OutConvert') { //形态转换出库
				that.GetOutSourcePickDetail_url = 'api/services/wmspda/OutConvert/GetOutConvertDetail'
				title = that.i18n.page_title_OutConvert
			}

			uni.setNavigationBarTitle({
				title: title
			});

		},
		onShow() {
			this.GetOutSourcePickDetail()
			this.BillCodeDetail_send = uni.getStorageSync('BillCodeDetail')
		}
	}
</script>

<style>
</style>
