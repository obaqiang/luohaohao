<template>
	<view>
		<SwitchTitle v-bind:switchtitletext="switchtitletext" v-bind:isShowAll="isShowAll" v-on:sucFuc="sucFuc"
		 v-bind:switch_title_head_right_text="i18n.switch_title_head_right_text" />
		<bgLine />
		<DetailsOfRejectionOrdersPurchaseList v-bind:data_list="data_list" v-bind:a_text="i18n.a_text" v-bind:b_text="i18n.b_text"
		 v-bind:c_text="i18n.c_text" v-bind:d_text="i18n.d_text" v-bind:e_text="i18n.e_text" />
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import bgLine from "../components/bgLine/bgLine.vue"
	import SwitchTitle from "../components/SwitchTitle/SwitchTitle.vue"
	import DetailsOfRejectionOrdersPurchaseList from "../components/DetailsOfRejectionOrdersPurchaseList/DetailsOfRejectionOrdersPurchaseList.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			bgLine,
			SwitchTitle,
			DetailsOfRejectionOrdersPurchaseList,
			loadingWait
		},

		data() {
			return {
				switchtitletext: '',
				// switch_title_head_right_text: '',
				loading_wait_show: false,
				isShowAll: false,
				BillCode: '',
				data_list: '',
				GetReceiptDetail_url: ''
			};
		},
		computed: {
			i18n() {
				return this.$t('DetailsOfDocumentsA')
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

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			sucFuc(e) {
				this.isShowAll = e
				this.GetReceiptDetail()
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			GetReceiptDetail() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.GetReceiptDetail_url,
					data: {
						MAC: that.MAC,
						BillCode: that.BillCode,
						isShowAll: that.isShowAll
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = false
						console.log(res.data)
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.data_list = res.data.result
							console.log(that.data_list)
						}

					}

				});
			}
		},
		onLoad() {
			let that = this
			that.permissionCode = uni.getStorageSync('WarehousingOperation_permissionCode')
			if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PurInstock') { //来料入库
				that.GetReceiptDetail_url = 'api/services/wmspda/PurInstock/GetReceiptDetail'
				that.switchtitletext = that.i18n.switchtitletext_a
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.ProductReturn') { //生产退料
				that.GetReceiptDetail_url = 'api/services/wmspda/ProductReturn/GetProductReturnDetail'
				that.switchtitletext = that.i18n.switchtitletext_b
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PorductInstock') { //产成品入库
				that.GetReceiptDetail_url = 'api/services/wmspda/ProductInstock/GetProductInstockDetail'
				that.switchtitletext = that.i18n.switchtitletext_c
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OtherInstock') { //其他入库
				that.GetReceiptDetail_url = 'api/services/wmspda/OtherInstock/GetOtherInstockDetail'
				that.switchtitletext = that.i18n.switchtitletext_d
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.SalesReturn') { //销售退货
				that.GetReceiptDetail_url = 'api/services/wmspda/SalesReturn/GetSalesReturnDetail'
				that.switchtitletext = that.i18n.switchtitletext_e
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') { //生产调拨入库
				that.GetReceiptDetail_url = 'api/services/wmspda/InTransfer/GetInTransferDetail'
				that.switchtitletext = that.i18n.switchtitletext_f
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OutstouceTransferIn') { //委外调拨入库
				that.GetReceiptDetail_url = 'api/services/wmspda/InTransfer/GetInTransferDetail'
				that.switchtitletext = that.i18n.switchtitletext_g
			} else if (that.permissionCode == 'Pages.WPDA.OutStock.Product.ProductTransferOut') { //生产调拨出库
				that.GetReceiptDetail_url = 'api/services/wmspda/InTransfer/GetInTransferDetail'
				that.switchtitletext = that.i18n.switchtitletext_h
			} else if (that.permissionCode == 'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //委外调拨出库
				that.GetReceiptDetail_url = 'api/services/wmspda/InTransfer/GetInTransferDetail'
				that.switchtitletext = that.i18n.switchtitletext_i
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.InTransfer') { //调拨入库
				that.GetReceiptDetail_url = 'api/services/wmspda/InTransfer/GetInTransferDetail'
				that.switchtitletext = that.i18n.switchtitletext_j
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.Convert.InConvert') { //形态转换入库
				that.GetReceiptDetail_url = 'api/services/wmspda/InConvert/GetInConvertDetail'
				that.switchtitletext = that.i18n.switchtitletext_k
			}

			this.receipts_data = uni.getStorageSync('receipts_data')
			this.BillCode = this.receipts_data.billCode
			this.GetReceiptDetail()
		}
	}
</script>

<style scoped="scoped">
	.DetailsOfDocumentsHead_head_area {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750upx;
		align-items: center;
		height: 80upx;
		background: #FFFFFF;
	}


	.head_right_text {
		margin-right: 10upx;
	}

	.DetailsOfDocumentsHead_head_text {
		margin-left: 10upx;
	}
</style>
