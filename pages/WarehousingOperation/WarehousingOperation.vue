<template>
	<view>
		<image class="stock_in_bg" :src="stock_in_bg"></image>
		<view class="warehousingopration_bl" v-if="text_a_list!=''">
			<text class="warehousingopration_bl_text">{{text_a}}</text>
			<view class="warehousingopration_bl_bl" v-for="(item,index) in text_a_list" :key="index" @tap="gotoPage(item.permissionCode,item.permissionName)">
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Receipt.Po'" class="stock_in_sendpro_order" :src="stock_in_sendpro_order"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Receipt.Asn'" class="stock_in_sendpro_order" :src="stock_in_buy_order"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Receipt.OutSourcePo'" class="stock_in_sendpro_order" :src="stock_in_buy_order"
				 mode=""></image>
				<text>{{item.permissionName}}</text>
			</view>
			<!-- <view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_buy_order" mode=""></image>
				<text>采购单</text>
			</view>
			<view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_buy_order" mode=""></image>
				<text>采购单</text>
			</view> -->
		</view>
		<!-- <view @tap="gotoWarehousingReceipts">假的入库作业</view> -->
		<view class="warehousingopration_bl" v-if="text_b_list!=''">
			<text class="warehousingopration_bl_text">{{text_b}}</text>
			<view class="warehousingopration_bl_bl" v-for="(item,index) in text_b_list" :key="index" @tap="gotoPage(item.permissionCode,item.permissionName)">
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.PurInstock'" class="stock_in_sendpro_order" :src="stock_in_pro_come_in"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.PorductInstock'" class="stock_in_sendpro_order" :src="stock_in_check"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.OtherInstock'" class="stock_in_sendpro_order" :src="stock_in_create_order"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.QualityJob'" class="stock_in_sendpro_order" :src="stock_in_other_check"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery'" class="stock_in_sendpro_order" :src="stock_in_other_create_order"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.ProductTransferIn'" class="stock_in_sendpro_order"
				 :src="stock_in_other_create_order" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.OutstouceTransferIn'" class="stock_in_sendpro_order"
				 :src="stock_in_other_create_order" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.PorductCartonInstock'" class="stock_in_sendpro_order"
				 :src="stock_in_other_create_order" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.CarInstock'" class="stock_in_sendpro_order" :src="stock_in_other_create_order"
				 mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.Storage.PlankError'" class="stock_in_sendpro_order" :src="stock_in_other_create_order"
				 mode=""></image>
				<text>{{item.permissionName}}</text>
			</view>

		</view>
		<view class="warehousingopration_bl" v-if="text_c_list!=''">
			<text class="warehousingopration_bl_text">{{text_c}}</text>
			<view class="warehousingopration_bl_bl" v-for="(item,index) in text_c_list" :key="index" @tap="gotoPage(item.permissionCode,item.permissionName)">
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.ReturnMaterial.OutSourcePoReturn'" class="stock_in_sendpro_order"
				 :src="stock_in_out_return" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.ReturnMaterial.ProductReturn'" class="stock_in_sendpro_order"
				 :src="stock_in_out_return" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.ReturnMaterial.SalesReturn'" class="stock_in_sendpro_order"
				 :src="stock_in_out_return" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.ReturnMaterial.CreateOutSourceReturn'" class="stock_in_sendpro_order"
				 :src="stock_in_out_return" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.ReturnMaterial.CreateProductReturn'" class="stock_in_sendpro_order"
				 :src="stock_in_out_return" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.Instock.ReturnMaterial.CreateSalesReturn'" class="stock_in_sendpro_order"
				 :src="stock_in_out_return" mode=""></image>

				<text>{{item.permissionName}}</text>
			</view>
			<!-- <view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_out_return" mode=""></image>
				<text>意外退料</text>
			</view>
			<view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_produce_return" mode=""></image>
				<text>生产退料</text>
			</view>
			<view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_sale_return" mode=""></image>
				<text>销售退货</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	// import DetailsOfDocumentsHead from "../components/DetailsOfDocumentsHead/DetailsOfDocumentsHead.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {

		},

		data() {
			return {
				stock_in_bg: "../../static/img/stock_in_bg.png",
				stock_in_buy_order: "../../static/img/stock_in_buy_order.png",
				stock_in_sendpro_order: "../../static/img/stock_in_sendpro_order.png",
				stock_in_check: "../../static/img/stock_in_check.png",
				stock_in_create_order: "../../static/img/stock_in_check.png",
				stock_in_other_check: "../../static/img/stock_in_other_check.png",
				stock_in_other_create_order: "../../static/img/stock_in_other_create_order.png",
				stock_in_out_return: "../../static/img/stock_in_out_return.png",
				stock_in_pro_come_in: "../../static/img/stock_in_pro_come_in.png",
				stock_in_produce_return: "../../static/img/stock_in_produce_return.png",
				stock_in_sale_return: "../../static/img/stock_in_sale_return.png",
				// childPermissions: '',
				childPermissions_child: '',
				text_a: '',
				text_b: '',
				text_c: '',
				text_a_list: '',
				text_b_list: '',
				text_c_list: '',
			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			i18n() {
				return this.$t('WarehousingOperation')
			},
			childPermissions() {
				return this.$store.state.childPermissions
			}
		},

		methods: {
			// 			gotoWarehousingReceipts(){
			// 				uni.navigateTo({
			// 					url: '../WarehousingReceipts/WarehousingReceipts'
			// 				});
			// 			},
			gotoPage(permissionCode, permissionName) {
				let that = this
				uni.setStorageSync('title_permissionName', permissionName)
				uni.setStorageSync('WarehousingOperation_permissionCode', permissionCode)
				if (permissionCode == 'Pages.WPDA.Instock.Receipt.Po') { //采购单
					// uni.setStorageSync('Type', 11)
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Receipt.OutSourcePo') { // 委外单
					// uni.setStorageSync('Type', 12)
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Receipt.Asn') { //送货单
					uni.navigateTo({
						url: '../WarehousingReceipts/WarehousingReceipts'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.PurInstock') { //来料入库
					uni.navigateTo({
						url: '../WarehousingReceipts/WarehousingReceipts'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.OutSourcePoReturn') { //委外退料
					// 					uni.navigateTo({
					// 						url: '../OutsourcingReturnSheet/OutsourcingReturnSheet'
					// 					});
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.ProductReturn') { //生产退料
					uni.navigateTo({
						url: '../WarehousingReceipts/WarehousingReceipts'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.PorductInstock') { //产成品入库
					uni.navigateTo({
						url: '../WarehousingReceipts/WarehousingReceipts'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.OtherInstock') { //其他入库
					uni.navigateTo({
						url: '../WarehousingReceipts/WarehousingReceipts'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.SalesReturn') { //销售退货
					uni.navigateTo({
						url: '../WarehousingReceipts/WarehousingReceipts'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') { //生产调拨入库
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.OutstouceTransferIn') { //委外调拨入库
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateProductReturn') { //生产退料（生单）
					uni.navigateTo({
						url: '../ProductionReturnCreate/ProductionReturnCreate'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateOutSourceReturn') { //委外退料（生单）
					uni.navigateTo({
						url: '../ProductionReturnCreate/ProductionReturnCreate'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateSalesReturn') { //销售退料（生单）
					uni.navigateTo({
						url: '../ProductionReturnCreate/ProductionReturnCreate'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.PorductCartonInstock') { //产成品箱号入库
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.CarInstock') { //产成品箱号入库
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.Instock.Storage.PlankError') {//门板不良
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				}
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.i18n.page_title
			});
			let that = this
			// that.childPermissions = uni.getStorageSync('childPermissions')
			// console.log(that.childPermissions)
			for (let i = 0; i < that.childPermissions.length; i++) {
				if (that.childPermissions[i].permissionCode == 'Pages.WPDA.InStock') { //入库作业
					that.childPermissions_child = that.childPermissions[i].childPermissions
				}

			}
			console.log(that.childPermissions_child)
			for (let i = 0; i < that.childPermissions_child.length; i++) {
				if (that.childPermissions_child[i].permissionCode == 'Pages.WPDA.Instock.Receipt') { //收获
					that.text_a = that.childPermissions_child[i].permissionName
					that.text_a_list = that.childPermissions_child[i].childPermissions
				} else if (that.childPermissions_child[i].permissionCode == 'Pages.WPDA.Instock.Storage') { //入库
					that.text_b = that.childPermissions_child[i].permissionName
					that.text_b_list = that.childPermissions_child[i].childPermissions
					console.log(that.text_b)
					console.log(that.text_b_list)
				} else if (that.childPermissions_child[i].permissionCode == 'Pages.WPDA.Instock.ReturnMaterial') { //退料
					that.text_c = that.childPermissions_child[i].permissionName
					that.text_c_list = that.childPermissions_child[i].childPermissions
					console.log(that.text_c)
					console.log(that.text_c_list)
				}
			}

		}
	}
</script>

<style>
	page {
		background: #f2f2f2;
	}

	.stock_in_bg {
		width: 750upx;
		height: 350upx;
	}

	.stock_in_sendpro_order {
		width: 100upx;
		height: 100upx;
	}

	.warehousingopration_bl {
		background: #FFFFFF;
		border-radius: 10upx;
		width: 700upx;
		margin: 50upx auto;
		padding-bottom: 20upx;
		padding-top: 100upx;
		border: 1px solid #FFB700;
		position: relative;
		overflow: hidden;
	}

	.warehousingopration_bl_bl {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 233upx;
		float: left;
		margin-bottom: 50upx;
		font-size: 25upx;
	}

	.warehousingopration_bl_bl text {
		width: 200upx;
		word-break: break-word;
		text-align: center;
	}

	.warehousingopration_bl_text {
		background: #FFB700;
		position: absolute;
		top: 0;
		left: 50upx;
		border-radius: 10upx;
		padding: 5upx 20upx;
		font-size: 25upx;
	}
</style>
