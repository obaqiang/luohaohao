<template>
	<view>
		
		<PurchaseOrderInquiryHead v-bind:a_text="a_text" v-bind:b_text="b_text" v-bind:c_text="c_text" v-on:confirmInput="getAsnCode"
		 v-bind:input_focus="query_input_focus" v-model="BillCode" @input="onInput" />
		 <!-- <input stlye="border:1px solid #dddddd;" placeholder="我的个填啊" type="text" :focus="focus_aa" v-model="aa" @confirm="confirmAA"> -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll">
			<WarehousingReceiptsList v-if="WarehousingReceiptsList_show" v-on:gotoPage="gotoPage" v-bind:scroll_items="scroll_items" />
			<bottomCountArea v-bind:count="count" v-if="bottomCountArea_show" />
		</scroll-view>

		<queryScan v-on:getCode="getCode" />
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import PurchaseOrderInquiryHead from "../components/PurchaseOrderInquiryHead/PurchaseOrderInquiryHead.vue"
	import queryScan from "../components/queryScan/queryScan.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import WarehousingReceiptsList from "../components/WarehousingReceiptsList/WarehousingReceiptsList.vue"
	import bottomCountArea from "../components/bottomCountArea/bottomCountArea.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			PurchaseOrderInquiryHead,
			queryScan,
			loadingWait,
			WarehousingReceiptsList,
			bottomCountArea
		},

		data() {
			return {
				aa:'',
				focus_aa:false,
				BillCode: '',
				Asn_data: '',
				loading_wait_show: false,
				query_input_focus: true,
				GetReceipt_url: '',
				a_text: '',
				b_text: '',
				c_text: '',
				permissionCode: '',
				WarehousingReceiptsList_show: false,
				// WarehousingReceiptsList_data:'',

				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				count: '',
				bottomCountArea_show: false,
				MaxResultCount: 10,
				SkipCount: 0,
				scroll_items: []
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
				return this.$t('WarehousingReceipts')
			},
		},

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			confirmAA() {
				this.focus_aa = true
				this.aa = ''
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				this.SkipCount += 10
				this.GetReceipt()
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			onInput(val) {
				this.BillCode = val
			},
			gotoPage(e) {
				let that = this
				console.log(e)
				// 				for (let i = 0; i < that.WarehousingReceiptsList_data.length; i++) {
				// 					if (e == that.WarehousingReceiptsList_data[i].billCode) {
				// 						uni.setStorageSync('receipts_data', that.WarehousingReceiptsList_data[i])
				// 						uni.navigateTo({
				// 							url: '../Warehousing/Warehousing'
				// 						});
				// 					}
				// 				}
				for (let i = 0; i < that.scroll_items.length; i++) {
					if (e == that.scroll_items[i].billCode) {
						uni.setStorageSync('receipts_data', that.scroll_items[i])
						uni.navigateTo({
							url: '../Warehousing/Warehousing'
						});
					}
				}
			},
			getAsnCode(e) {
				this.query_input_focus = false
				this.GetReceipt()

			},
			getCode(e) {
				this.BillCode = e
				this.c_text = e
				this.GetReceipt()

			},

			scrollResDo(res) {
				let that = this
				if (that.SkipCount == 0) { //判断是否是第一次筛选
					that.scroll_items = []
				}
				if (res.data.result.items.length == 0) { //没有更多数据了
					that.count = ''
					that.bottomCountArea_show = true
				} else {
					let totalCount = res.data.result.totalCount
					let now_conut = that.MaxResultCount + that.SkipCount
					if (now_conut < totalCount) { //还没有滑倒底部
						that.count = totalCount - now_conut
						that.bottomCountArea_show = true
					} else {
						// that.bottomCountArea_show = false
					}
					that.scroll_items = that.scroll_items.concat(res.data.result.items)
					for (let key in that.scroll_items) {
						if (that.scroll_items[key].billDate) {
							that.scroll_items[key].billDate = that.scroll_items[key].billDate.slice(0, 10)
						}
						if (that.scroll_items[key].creationTime) {
							that.scroll_items[key].creationTime = that.scroll_items[key].creationTime.slice(0, 10)
						}
					}
				}
			},
			GetReceipt() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.GetReceipt_url, //仅为示例，并非真实接口地址。
					data: {
						MAC: that.MAC,
						BillCode: that.BillCode,
						MaxResultCount: that.MaxResultCount,
						SkipCount: that.SkipCount,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PurInstock') { //来料入库
								uni.setStorageSync('receipts_data', res.data.result)
								uni.navigateTo({
									url: '../Warehousing/Warehousing'
								});
							} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.ProductReturn') { //生产退料
								that.WarehousingReceiptsList_show = true
								// 								that.WarehousingReceiptsList_data = res.data.result
								// 								for (let i = 0; i < that.WarehousingReceiptsList_data.length; i++) {
								// 									that.WarehousingReceiptsList_data[i].billDate = that.WarehousingReceiptsList_data[i].billDate.slice(0, 10)
								// 								}
								that.scrollResDo(res)
								// that.result_list = that.scroll_items
								// uni.setStorageSync('WarehousingReceiptsList_data', that.scroll_items)
							} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PorductInstock') { //产成品入库
								that.WarehousingReceiptsList_show = true
								// that.WarehousingReceiptsList_data = res.data.result
								that.scrollResDo(res)
								// 								for (let i = 0; i < that.WarehousingReceiptsList_data.length; i++) {
								// 									that.WarehousingReceiptsList_data[i].billDate = that.WarehousingReceiptsList_data[i].billDate.slice(0, 10)
								// 								}
								// 								uni.setStorageSync('WarehousingReceiptsList_data', that.WarehousingReceiptsList_data)
							} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OtherInstock') { //其他入库
								that.WarehousingReceiptsList_show = true
								that.scrollResDo(res)
								// 								that.WarehousingReceiptsList_data = res.data.result
								// 								for (let i = 0; i < that.WarehousingReceiptsList_data.length; i++) {
								// 									that.WarehousingReceiptsList_data[i].billDate = that.WarehousingReceiptsList_data[i].billDate.slice(0, 10)
								// 								}
								// 								uni.setStorageSync('WarehousingReceiptsList_data', that.WarehousingReceiptsList_data)
							} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.SalesReturn') { //销售退货
								that.WarehousingReceiptsList_show = true
								that.scrollResDo(res)
								// 								that.WarehousingReceiptsList_data = res.data.result
								// 								for (let i = 0; i < that.WarehousingReceiptsList_data.length; i++) {
								// 									that.WarehousingReceiptsList_data[i].billDate = that.WarehousingReceiptsList_data[i].billDate.slice(0, 10)
								// 								}
								// 								uni.setStorageSync('WarehousingReceiptsList_data', that.WarehousingReceiptsList_data)
							} else if (that.permissionCode == 'Pages.WPDA.Instock.Receipt.Asn') { //送货单
								that.Asn_data = res.data.result
								uni.setStorageSync('BillCode', that.BillCode)
								uni.setStorageSync('BillCodeDetail', that.Asn_data[0])
								uni.setStorageSync('BillId', that.Asn_data[0].id)
								uni.navigateTo({
									url: '../ItemInventoryAsn/ItemInventoryAsn'
								});
							}

						} else {
							that.BillCode = ''
							that.query_input_focus = true
							console.log(that.query_input_focus)
						}

					}

				});
			}

		},
		onLoad() {
			let that = this
			let title = ''
			that.permissionCode = uni.getStorageSync('WarehousingOperation_permissionCode')
			if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PurInstock') { //来料入库
				title = that.i18n.page_title
				that.GetReceipt_url = 'api/services/wmspda/PurInstock/GetReceipt'
				that.a_text = that.i18n.a_text
				that.b_text = that.i18n.b_text
				that.c_text = that.i18n.c_text
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.ProductReturn') { //生产退料
				title = that.i18n.page_title_a
				that.GetReceipt_url = 'api/services/wmspda/ProductReturn/GetProductReturn'
				that.a_text = that.i18n.a_text_a
				that.b_text = that.i18n.b_text_a
				that.c_text = that.i18n.c_text_a
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PorductInstock') { //产成品入库
				title = that.i18n.page_title_b
				that.GetReceipt_url = 'api/services/wmspda/ProductInstock/GetProductInstock'
				that.a_text = that.i18n.a_text_b
				that.b_text = that.i18n.b_text_b
				that.c_text = that.i18n.c_text_b
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OtherInstock') { //其他入库
				title = that.i18n.page_title_c
				that.GetReceipt_url = 'api/services/wmspda/OtherInstock/GetOtherInstock'
				that.a_text = that.i18n.a_text_c
				that.b_text = that.i18n.b_text_c
				that.c_text = that.i18n.c_text_c
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.SalesReturn') { //销售退货
				title = that.i18n.page_title_d
				that.GetReceipt_url = 'api/services/wmspda/SalesReturn/GetSalesReturn'
				that.a_text = that.i18n.a_text_d
				that.b_text = that.i18n.b_text_d
				that.c_text = that.i18n.c_text_d
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Receipt.Asn') { //送货单
				title = that.i18n.page_title_g
				that.GetReceipt_url = 'api/services/wmspda/Asn/GetAsn'
				that.a_text = that.i18n.a_text_g
				that.b_text = that.i18n.b_text_g
				that.c_text = that.i18n.c_text_g
			}
			let title_permissionName = uni.getStorageSync('title_permissionName')
			if (title_permissionName != '') {
				title = title_permissionName
			}
			uni.setNavigationBarTitle({
				title: title
			});

		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.scroll-Y {
		height: 800upx;
		/* background: red; */
	}
</style>
