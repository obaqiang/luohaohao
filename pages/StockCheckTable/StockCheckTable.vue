<template>
	<view>
		<view class="warehousingopration_bl" v-if="text_a_list!=''">
			<text class="warehousingopration_bl_text">{{text_a}}</text>
			<view class="warehousingopration_bl_bl" @tap="gotoPage(item.permissionCode,item.permissionName)" v-for="(item, index) in text_a_list"
			 :key="index">
				<image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByLocation'" class="stock_in_sendpro_order"
				 :src="stock_out_out_check" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByBarcode'" class="stock_in_sendpro_order"
				 :src="stock_out_out_add_materail" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByMaterial'" class="stock_in_sendpro_order"
				 :src="stock_out_out_add_materail" mode=""></image>
				<text>{{item.permissionName}}</text>
			</view>

		</view>
		<view class="warehousingopration_bl" v-if="text_b_list!=''">
			<text class="warehousingopration_bl_text">{{text_b}}</text>
			<view class="warehousingopration_bl_bl" @tap="gotoPage(item.permissionCode,item.permissionName)" v-for="(item, index) in text_b_list"
			 :key="index">
				<image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByBarcode'" class="stock_in_sendpro_order"
				 :src="stock_in_pro_come_in" mode=""></image>
				 <image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByMaterial'" class="stock_in_sendpro_order"
				  :src="stock_in_pro_come_in" mode=""></image>
				 
				<text>{{item.permissionName}}</text>
			</view>
			<!-- <view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_check" mode=""></image>
				<text>产成品入库</text>
			</view>
			<view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_create_order" mode=""></image>
				<text>产成品入库</text>
			</view>
			<view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_other_check" mode=""></image>
				<text>其他入库</text>
			</view>
			<view class="warehousingopration_bl_bl">
				<image class="stock_in_sendpro_order" :src="stock_in_other_create_order" mode=""></image>
				<text>其他入库</text>
			</view> -->
		</view>


		<view class="warehousingopration_bl" v-if="text_c_list!=''">
			<text class="warehousingopration_bl_text">{{text_c}}</text>
			<view class="warehousingopration_bl_bl" @tap="gotoPage(item.permissionCode,item.permissionName)" v-for="(item, index) in text_c_list"
			 :key="index">
				<image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByBarcode'" class="stock_in_sendpro_order"
				 :src="stock_in_pro_come_in" mode=""></image>
				 <image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByMaterial'" class="stock_in_sendpro_order"
				  :src="stock_in_pro_come_in" mode=""></image>
				<text>{{item.permissionName}}</text>
			</view>
			<!-- <text class="warehousingopration_bl_text">综合</text>
			<view class="warehousingopration_bl_bl">
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
		<view class="warehousingopration_bl" v-if="text_d_list!=''">
			<text class="warehousingopration_bl_text">{{text_d}}</text>
			<view class="warehousingopration_bl_bl" @tap="gotoPage(item.permissionCode,item.permissionName)" v-for="(item, index) in text_d_list"
			 :key="index">
				<image v-if="item.permissionCode=='Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByBarcode'" class="stock_in_sendpro_order"
				 :src="stock_in_pro_come_in" mode=""></image>
				<text>{{item.permissionName}}</text>
			</view>
			<!-- <text class="warehousingopration_bl_text">综合</text>
			<view class="warehousingopration_bl_bl">
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
				stock_out_bg: "../../static/img/stock_out_bg.png",
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
				stock_out_out_check: "../../static/img/stock_out_out_check.png",
				stock_out_out_create_order: "../../static/img/stock_out_out_create_order.png",
				stock_out_out_add_materail: "../../static/img/stock_out_out_add_materail.png",
				// childPermissions: '',
				childPermissions_child: '',
				text_a: '',
				text_b: '',
				text_c: '',
				text_d: '',
				text_a_list: '',
				text_b_list: '',
				text_c_list: '',
				text_d_list: '',
			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			childPermissions() {
				return this.$store.state.childPermissions
			},
			i18n() {
				return this.$t('StockCheckTable')
			},
		},

		methods: {
			gotoPage(permissionCode, permissionName) {
				uni.setStorageSync('title_permissionName', permissionName)
				uni.setStorageSync('WarehousingOperation_permissionCode', permissionCode)
				if (permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByLocation') { //按库位查询
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByBarcode') { //按条码查询
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByMaterial') { //按物料查询
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				} else if (permissionCode == 'Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByBarcode') { //入库记录按条码查询
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				}else if(permissionCode == 'Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByBarcode'){//出口记录按条码查询
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				}else if(permissionCode=='Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByMaterial'){//入库记录查询按物料查询
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				}else if(permissionCode=='Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByMaterial'){//出库记录查询按物料查询
					uni.navigateTo({
						url: '../PurchaseList/PurchaseList'
					});
				}

			}
		},
		onLoad() {
			let that = this
			// that.childPermissions = uni.getStorageSync('childPermissions')
			uni.setNavigationBarTitle({
				title: this.i18n.page_title
			});
			console.log(that.childPermissions[4])
			for (let i = 0; i < that.childPermissions.length; i++) {
				if (that.childPermissions[i].permissionCode == 'Pages.WPDA.IntegratedQuery') { //综合查询
					that.childPermissions_child = that.childPermissions[i].childPermissions
				}

			}

			for (let i = 0; i < that.childPermissions_child.length; i++) {
				if (that.childPermissions_child[i].permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery') { //库存查询
					that.text_a = that.childPermissions_child[i].permissionName
					that.text_a_list = that.childPermissions_child[i].childPermissions
					console.log(that.text_a)
					console.log(that.text_a_list)
				} else if (that.childPermissions_child[i].permissionCode == 'Pages.WPDA.IntegratedQuery.InstockRecord') { //入库记录查询
					that.text_b = that.childPermissions_child[i].permissionName
					that.text_b_list = that.childPermissions_child[i].childPermissions
					console.log(that.text_b)
					console.log(that.text_b_list)
				} else if (that.childPermissions_child[i].permissionCode == 'Pages.WPDA.IntegratedQuery.OutstockRecord') { //出口记录查询
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
		height: 300upx;
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
		left: 25upx;
	}

	.warehousingopration_bl_bl {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 175upx;
		float: left;
		margin-bottom: 50upx;
		font-size: 25upx;
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

	.warehousingopration_bl_bl text {
		width: 170upx;
		word-break: break-word;
		text-align: center;
	}
</style>
