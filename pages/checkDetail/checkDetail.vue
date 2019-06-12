<template>
	<view class="mes_area">
		<view v-for="(item,index) in detail_data" :key="index" class="check_detail_area" @tap="seeDetail(item.materialId)">
			<view class="mes_list">
				<text>{{i18n.checkDetail_data_a}}:</text>
				<text>{{item.materialCode}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.checkDetail_data_b}}:</text>
				<text>
					<text v-if="item.checkQty==null">0</text>
					<text v-if="item.checkQty!=null">{{item.checkQty}}</text>
				</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.checkDetail_data_c}}:</text>
				<text>
					<text v-if="item.wmsQty==null">0</text>
					<text v-if="item.wmsQty!=null">{{item.wmsQty}}</text>

				</text>
			</view>
			<!-- <view class="mes_list">
				<text>{{i18n.checkDetail_data_d}}:</text>
				<text>{{item.materialId}}</text>
			</view> -->
			<view class="bg_line">
			</view>
		</view>

		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			bindScanInput,
			loadingWait
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
				return this.$t('checkDetail')
			},
			i18n_modal() {
				return this.$t('modal_text')
			},
			MAC() {
				return this.$store.state.MAC
			},
			detail_data() {
				return uni.getStorageSync('detail_data')
			},
			id() {
				return uni.getStorageSync('check_data')[0].id
			},
		},
		data() {
			return {
				loading_wait_show: false,
				MaterialId:''
			};
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			seeDetail(MaterialId){
				let that = this
				that.MaterialId = MaterialId
				that.GetCheckStockDetailBarcode()
			},
			GetCheckStockDetailBarcode(){
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inventory/GetCheckStockDetailBarcode',
					data: {
						MAC: that.MAC,
						CheckStockId: that.id,
						MaterialId:that.MaterialId
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.setStorageSync('detail_data',res.data.result)
							uni.navigateTo({
								url: '../checkDetailMore/checkDetailMore'
							});
							uni.setStorageSync('detail_more_data',res.data.result)
						}
					}
				});
			},
		},
		onLoad() {

		}
	}
</script>

<style>
	.mes_area {}

	.mes_list {
		display: flex;
		width: 750upx;
		line-height: 40upx;
		font-size: 25upx;
	}

	.mes_list text:nth-child(1) {
		width: 200upx;
		text-align: right;
	}

	.mes_list text:nth-child(2) {
		padding-left: 60upx;
	}

	.bg_line {
		height: 20upx;
		background: #e7e7ed;
		margin-top: 50upx;
	}

	.check_detail_area {
		padding-top: 50upx;
	}
</style>
