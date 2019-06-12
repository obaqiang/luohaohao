<template>
	<view>
		<!-- 	<scanInput v-bind:placeholder_text="order_text" v-bind:scan_input_text="order" v-bind:scan_icon_show="true"
		 v-on:scanInputSuc="scanAInputSuc" />
		<scanInput v-bind:placeholder_text="supplier_text" v-bind:scan_input_text="supplier" v-bind:scan_icon_show="false"
		 v-on:scanInputSuc="scanBInputSuc" /> -->
		<bindScanInput v-bind:scan_input_text="order" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_a"
		 v-bind:placeholder_text='order_text' @input="onInputA" @work="scanAInputSuc" />

		<bindScanInput v-if="SupplierCode_show" v-bind:scan_input_text="supplier" v-bind:scan_icon_show="true"
		 v-bind:input_focus="scan_input_foc_b" v-bind:placeholder_text='supplier_text' @input="onInputB" @work="scanBInputSuc" />

		<bindScanInput v-if="DeptCode_show" v-bind:scan_input_text="dept" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_b"
		 v-bind:placeholder_text='dept_text' @input="onInputB" @work="scanBInputSuc" />
		<bindDateInput v-if="input_date_show" v-bind:date_text="i18n.date_text" v-on:choDate="choDate" />
		<button class="common_btn_fb" @tap="goSearch">{{i18n.search}}</button>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll">
			<view class="purchase_list" v-for="(item,index) in result_list" @tap="goDetail(item.billCode)" :key="index">
				<view class="purchase_list_a">
					<text>{{item.billCode}}</text>
					<text>{{item.creationTime}}</text>
					<text v-if="input_date_show">{{item.billDate}}</text>
				</view>
				<view v-if="SupplierCode_show" class="purchase_list_b">
					{{item.supplierName}}
				</view>
				<view v-if="DeptCode_show" class="purchase_list_b">
					{{item.deptName}}
				</view>
			</view>
			<bottomCountArea v-bind:count="count" v-if="bottomCountArea_show" />
		</scroll-view>
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import bindDateInput from "../components/bindDateInput/bindDateInput.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import bottomCountArea from "../components/bottomCountArea/bottomCountArea.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			loadingWait,
			bindScanInput,
			bindDateInput,
			bottomCountArea
		},

		data() {
			return {
				order: '',
				order_text: '',
				supplier: '',
				supplier_text: '',
				BillCode: '',
				SupplierCode: '',
				Type: '',
				result_list: '',
				loading_wait_show: false,
				scan_input_foc_a: true,
				scan_input_foc_b: false,
				GetOutSourcePick_url: '',
				DeptCode: '',
				SupplierCode_show: false,
				DeptCode_show: false,
				dept: '',
				dept_text: '',
				input_date_show: false,
				BillDate: '',
				BizType: '',

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
			i18n() {
				return this.$t('OutSourcingOrders')
			},
			i18n_modal() {
				return this.$t('modal_text')
			},
			MAC() {
				return this.$store.state.MAC
			},
			OutgoingOperation_permissionCode() {
				return uni.getStorageSync('OutgoingOperation_permissionCode')
			}
		},

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				this.SkipCount += 10
				this.GetOutSourcePick()
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			initInputStatus() {
				this.scan_input_foc_a = false
				this.scan_input_foc_b = false
			},
			onInputA(val) {
				this.initInputStatus()
				this.scan_input_foc_a = true
				this.BillCode = val;
			},
			onInputB(val) {
				this.initInputStatus()
				this.scan_input_foc_b = true
				if (this.SupplierCode_show) {
					this.SupplierCode = val;
				} else {
					this.DeptCode = val;
				}
			},
			choDate(e) {
				this.BillDate = e
				console.log(this.BillDate)
			},
			GetOutSourcePick() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.GetOutSourcePick_url,
					data: {
						BillCode: that.BillCode,
						SupplierCode: that.SupplierCode,
						DeptCode: that.DeptCode,
						// Type: that.Type,
						MAC: that.MAC,
						BillDate: that.BillDate,
						BizType: that.BizType,
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
							that.result_list = that.scroll_items

						}

					}

				});
			},
			goDetail(billCode) {
				let that = this
				for (let i = 0; i < that.result_list.length; i++) {
					if (billCode == that.result_list[i].billCode) {
						uni.setStorageSync('BillCodeDetail', that.result_list[i])
						uni.setStorageSync('BillId', that.result_list[i].id)
					}
				}
				uni.setStorageSync('BillCode', billCode)
				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') {
					uni.navigateTo({
						url: '../Warehousing/Warehousing'
					});
				} else {
					uni.navigateTo({
						url: '../ItemInventoryOut/ItemInventoryOut'
					});
				}

			},
			goSearch() {
				let that = this
				if (that.BillCode == ''&& that.SupplierCode == ''&&that.DeptCode=='') {
					uni.showModal({
						title: this.i18n_modal.modal_title_text,
						content: this.i18n.alert_data_a,
					})
				} else {
					that.GetOutSourcePick()
				}

			},
			scanAInputSuc(e) {
				this.initInputStatus()
				this.scan_input_foc_b = true
				this.goSearch()
			},
			scanBInputSuc(e) {
				this.initInputStatus()
				this.scan_input_foc_a = true
			}

		},
		onLoad() {
			let that = this
			let title = '';
			console.log(that.OutgoingOperation_permissionCode)
			if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') { //委外发料
				that.SupplierCode_show = true
				that.GetOutSourcePick_url = 'api/services/wmspda/OutSourcePick/GetOutSourcePick'
				title = this.i18n.page_title_pick
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') { //委外补料
				that.SupplierCode_show = true
				that.GetOutSourcePick_url = 'api/services/wmspda/OutSourceFeed/GetOutSourceFeed'
				title = this.i18n.page_title_feed
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductPick') { //生产领料
				that.DeptCode_show = true
				that.GetOutSourcePick_url = 'api/services/wmspda/ProductPick/GetProductPick'
				title = this.i18n.page_title_ProductPick
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductFeed') { //生产补料
				that.DeptCode_show = true
				that.GetOutSourcePick_url = 'api/services/wmspda/ProductFeed/GetProductFeed'
				title = this.i18n.page_title_ProductFeed
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.OtherOutstock') { //其他出库
				that.GetOutSourcePick_url = 'api/services/wmspda/OtherOutstock/GetOtherOutstock'
				title = this.i18n.page_title_OtherOutstock
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.PoReturn') { //采购退料
				that.GetOutSourcePick_url = 'api/services/wmspda/PoReturn/GetPoReturn'
				title = this.i18n.page_title_PoReturn
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Sales.SalesOutstock') { //销售出库
				that.GetOutSourcePick_url = 'api/services/wmspda/SalesOutstock/GetSalesOutstock'
				title = this.i18n.page_title_SalesOutstock
			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductTransferOut') { //生产调拨出库

			} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //委外调拨出库

			}
			let title_permissionName = uni.getStorageSync('title_permissionName')
			if (title_permissionName != '') {
				title = title_permissionName
			}
			uni.setNavigationBarTitle({
				title: title
			});
			this.order = this.i18n.order_numbers
			this.order_text = this.i18n.order_text
			this.supplier = this.i18n.supplier
			this.supplier_text = this.i18n.supplier_text
			this.dept = this.i18n.dept
			this.dept_text = this.i18n.dept_text

		}
	}
</script>

<style>
	.purchase_list {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #DDDDDD;
	}

	.purchase_list_a {
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		font-size: 25upx;
	}

	.purchase_list_b {
		padding-left: 20upx;
		font-size: 25upx;
	}
	.scroll-Y {
		height: 800upx;
		/* background: red; */
	}
</style>
