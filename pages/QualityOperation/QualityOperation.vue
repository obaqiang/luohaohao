<template>
	<view>
		<view class="warehousingopration_bl" v-if="text_a_list!=''">
			<text class="warehousingopration_bl_text">{{text_a}}</text>
			<view class="warehousingopration_bl_bl" @tap="gotoPage(item.permissionCode,item.permissionName)" v-for="(item, index) in text_a_list"
			 :key="index">
				<image v-if="item.permissionCode=='Pages.WPDA.QualityJob.MaterialQuality.Inspection'" class="stock_in_sendpro_order"
				 :src="stock_out_out_check" mode=""></image>
				<image v-if="item.permissionCode=='Pages.WPDA.QualityJob.MaterialQuality.MRP'" class="stock_in_sendpro_order" :src="stock_out_out_add_materail"
				 mode=""></image>
				<text>{{item.permissionName}}</text>
			</view>

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
				return this.$t('QualityOperation')
			},
		},

		methods: {
			gotoPage(permissionCode,permissionName) {
				uni.setStorageSync('title_permissionName',permissionName)
				if (permissionCode == 'Pages.WPDA.QualityJob.MaterialQuality.Inspection') { //品质检验
					uni.setStorageSync('WarehousingOperation_permissionCode', permissionCode)
					uni.navigateTo({
						url: '../qualityInspection/qualityInspection'
					});
				} else if (permissionCode == 'Pages.WPDA.QualityJob.MaterialQuality.MRP') { //MRP评审
					uni.navigateTo({
						url: '../qualityInspectionMRP/qualityInspectionMRP'
					});
				}

			}
		},
		onLoad() {
			let that = this
			console.log(that.childPermissions[3])
			uni.setNavigationBarTitle({
				title: this.i18n.page_title
			});
			for (let i = 0; i < that.childPermissions.length; i++) {
				if (that.childPermissions[i].permissionCode == 'Pages.WPDA.QualityJob') { //质量作业
					that.childPermissions_child = that.childPermissions[i].childPermissions
				}
			}
			for (let i = 0; i < that.childPermissions_child.length; i++) {
				if (that.childPermissions_child[i].permissionCode == 'Pages.WPDA.QualityJob.MaterialQuality') { //"物料质检"
					that.text_a = that.childPermissions_child[i].permissionName
					that.text_a_list = that.childPermissions_child[i].childPermissions
					console.log(that.text_a)
					console.log(that.text_a_list)
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
		font-size: 25upx;
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
</style>
