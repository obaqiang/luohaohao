<template>
	<view class="ItemInventoryOutHeadInfo_area">
		<view class="ItemInventoryOutHeadInfo_list">
			<text>{{list_a}}</text>
			<text>{{billCode}}</text>
		</view>
		<view class="ItemInventoryOutHeadInfo_list" v-if="supplierName">
			<text>{{list_b}}</text>
			<text>{{supplierName}}</text>
		</view>
		<view class="ItemInventoryOutHeadInfo_list">
			<text>{{i18n.list_c}}</text>
			<text>{{creationTime}}{{billDate}}</text>
		</view>
		<view class="ItemInventoryOutHeadInfo_list" v-if="status">
			<text>{{i18n.status_text}}</text>
			<text v-if="status==1">{{i18n.status_a}}</text>
			<text v-if="status==2">{{i18n.status_b}}</text>
			<text v-if="status==7">{{i18n.status_c}}</text>
			<text v-if="status==8">{{i18n.status_d}}</text>
		</view>
		<view class="common_bg_line"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['BillCodeDetail_send'],
		components: {

		},
		computed: {
			billCode() {
				// return uni.getStorageSync('BillCodeDetail').billCode
				return this.BillCodeDetail_send.billCode
			},
			supplierName() {
				let that = this
				let OutgoingOperation_permissionCode = uni.getStorageSync('OutgoingOperation_permissionCode')
				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
					// return uni.getStorageSync('BillCodeDetail').supplierName
					return this.BillCodeDetail_send.supplierName
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
					// return uni.getStorageSync('BillCodeDetail').supplierName
					return this.BillCodeDetail_send.supplierName
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductPick' || that.OutgoingOperation_permissionCode ==
					'Pages.WPDA.OutStock.Product.ProductFeed') {
					// return uni.getStorageSync('BillCodeDetail').deptName
					return this.BillCodeDetail_send.deptName
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.OtherOutstock') { //其他出库
					// return uni.getStorageSync('BillCodeDetail').supplierName
					return this.BillCodeDetail_send.supplierName
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.PoReturn') { //采购退料
					// return uni.getStorageSync('BillCodeDetail').deptName
					return this.BillCodeDetail_send.deptName
				}

			},
			status(){
				// return uni.getStorageSync('BillCodeDetail').status
				return this.BillCodeDetail_send.status
			},
			creationTime() {
				// return uni.getStorageSync('BillCodeDetail').creationTime
				return this.BillCodeDetail_send.creationTime
			},
			billDate() {
				// return uni.getStorageSync('BillCodeDetail').billDate
				return this.BillCodeDetail_send.billDate
			},
			i18n() {
				return this.$t('ItemInventoryOut')
			},
			OutgoingOperation_permissionCode() {
				return uni.getStorageSync('OutgoingOperation_permissionCode')
			},
			list_a() {
				let that = this
				let OutgoingOperation_permissionCode = uni.getStorageSync('OutgoingOperation_permissionCode')
				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
					return that.i18n.list_a
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
					return that.i18n.list_a_feed
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductPick') {
					return that.i18n.list_a_ProductPick
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductFeed') {
					return that.i18n.list_a_ProductFeed
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.OtherOutstock') { //其他出库
					return that.i18n.list_a_OtherOutstock
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.PoReturn') { //采购退料
					return that.i18n.list_a_PoReturn
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Sales.SalesOutstock') { //销售出库
					return that.i18n.list_a_SalesOutstock
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') { //生产调拨入库
					return that.i18n.list_a_ProductTransferIn
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.OutTransfer' || that.OutgoingOperation_permissionCode ==
					'Pages.WPDA.OutStock.Product.ProductTransferOut' || that.OutgoingOperation_permissionCode ==
					'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //调拨出库
					return that.i18n.list_a_OutTransfer
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.Convert.OutConvert') { //形态转换出库
					return that.i18n.list_a
				}

			},
			list_b() {
				let that = this
				let OutgoingOperation_permissionCode = uni.getStorageSync('OutgoingOperation_permissionCode')
				if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourcePick') {
					return that.i18n.list_b
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Outsource.OutsourceFeed') {
					return that.i18n.list_b_feed
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductPick') {
					return that.i18n.list_b_ProductPick
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Product.ProductFeed') {
					return that.i18n.list_b_ProductFeed
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.OtherOutstock') { //其他出库
					return that.i18n.list_b_OtherOutstock
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.OutStock.Integrated.PoReturn') { //采购退料
					return that.i18n.list_b_OtherOutstock
				} else if (that.OutgoingOperation_permissionCode == 'Pages.WPDA.StockIn.Convert.OutConvert') { //形态转换出库
					return that.i18n.list_b
				}
			}
		},
		data() {
			return {};
		},
		methods: {},
		onLoad() {
			// this.MacInfo();

		}
	}
</script>

<style>
	.ItemInventoryOutHeadInfo_area {
		padding-top: 50upx;
	}

	.ItemInventoryOutHeadInfo_list {
		display: flex;
		font-size: 25upx;
	}

	.ItemInventoryOutHeadInfo_list text:nth-child(1) {
		width: 40%;
		text-align: center;
	}

	.ItemInventoryOutHeadInfo_list text:nth-child(2) {
		width: 60%;
		text-align: left;
	}
</style>
