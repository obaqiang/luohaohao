<template>
	<view class="stockCheckMore_area">
		<view class="stockCheckMore_head_area">
			<view class="stockCheckMore_head_area_line">
				<view>{{i18n.purchase_list_c_title_h}}:</view>
				<view>{{materialCode}}</view>
			</view>
			<view class="stockCheckMore_head_area_line">
				<view>{{i18n.purchase_list_c_title_i}}:</view>
				<view>{{materialName}}</view>
			</view>
			<view class="stockCheckMore_head_area_line">
				<view>{{i18n.purchase_list_c_title_j}}:</view>
				<view>{{materialStandard}}</view>
			</view>
			<view class="stockCheckMore_head_area_line">
				<view>{{i18n.purchase_list_c_title_g}}:</view>
				<view v-if="controlType=='Lot'">{{i18n.purchase_list_c_title_g_a}}</view>
				<view v-if="controlType=='KeyParts'">{{i18n.purchase_list_c_title_g_b}}</view>
				<view v-if="controlType=='NoControl'">{{i18n.purchase_list_c_title_g_c}}</view>
			</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll">

			<view class="stockCheckMore_head_area" v-if="a_show">
				<view class="stockCheckMore_list" v-for="(item,index) in GetStorageLotInfoDetails_data" :key="index">
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_a}}:</view>
						<view>{{item.barcode}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_h}}:</view>
						<view>{{item.locationCode}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_c}}:</view>
						<view>{{item.dateCode}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_d}}:</view>
						<view>{{item.qty}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_e}}:</view>
						<view v-if="item.barcodeStatus==1">{{i18n.purchase_list_c_title_f_a}}</view>
						<view v-if="item.barcodeStatus==9">{{i18n.purchase_list_c_title_f_b}}</view>
					</view>
				</view>
			</view>
			<view class="stockCheckMore_head_area" v-if="b_show">
				<view class="stockCheckMore_list" v-for="(item,index) in GetStorageLotInfoDetails_data" :key="index">
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_a}}:</view>
						<view>{{item.barcode}}</view>
					</view>

					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_c}}:</view>
						<view>{{item.dateCode}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_d}}:</view>
						<view>{{item.qty}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.locationCode}}:</view>
						<view>{{item.locationCode}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.creationTime}}:</view>
						<view>{{item.creationTime}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.inOutType}}:</view>
						<view v-if="item.inOutType==1">{{i18n.inOutType_a}}</view>
						<view v-if="item.inOutType==2">{{i18n.inOutType_b}}</view>
						<view v-if="item.inOutType==4">{{i18n.inOutType_c}}</view>
						<view v-if="item.inOutType==5">{{i18n.inOutType_d}}</view>
						<view v-if="item.inOutType==6">{{i18n.inOutType_e}}</view>
						<view v-if="item.inOutType==7">{{i18n.inOutType_f}}</view>
						<view v-if="item.inOutType==8">{{i18n.inOutType_g}}</view>
						<view v-if="item.inOutType==9">{{i18n.inOutType_h}}</view>
						<view v-if="item.inOutType==10">{{i18n.inOutType_i}}</view>
						<view v-if="item.inOutType==11">{{i18n.inOutType_j}}</view>
						<view v-if="item.inOutType==12">{{i18n.inOutType_k}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.sourceBillType}}:</view>
						<view v-if="item.sourceBillType==13">{{i18n.sourceBillType_a}}</view>
						<view v-if="item.sourceBillType==15">{{i18n.sourceBillType_b}}</view>
						<view v-if="item.sourceBillType==20">{{i18n.sourceBillType_c}}</view>
						<view v-if="item.sourceBillType==21">{{i18n.sourceBillType_d}}</view>
						<view v-if="item.sourceBillType==22">{{i18n.sourceBillType_e}}</view>
						<view v-if="item.sourceBillType==23">{{i18n.sourceBillType_f}}</view>
						<view v-if="item.sourceBillType==24">{{i18n.sourceBillType_g}}</view>
						<view v-if="item.sourceBillType==25">{{i18n.sourceBillType_h}}</view>
						<view v-if="item.sourceBillType==40">{{i18n.sourceBillType_i}}</view>
						<view v-if="item.sourceBillType==42">{{i18n.sourceBillType_j}}</view>
						<view v-if="item.sourceBillType==43">{{i18n.sourceBillType_k}}</view>
						<view v-if="item.sourceBillType==50">{{i18n.sourceBillType_l}}</view>
						<view v-if="item.sourceBillType==51">{{i18n.sourceBillType_m}}</view>
						<view v-if="item.sourceBillType==52">{{i18n.sourceBillType_o}}</view>
						<view v-if="item.sourceBillType==53">{{i18n.sourceBillType_p}}</view>
						<view v-if="item.sourceBillType==60">{{i18n.sourceBillType_q}}</view>
						<view v-if="item.sourceBillType==61">{{i18n.sourceBillType_r}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.sourceCode}}:</view>
						<view>{{item.sourceCode}}</view>
					</view>
				</view>
			</view>
			<view class="stockCheckMore_head_area" v-if="c_show">
				<view class="stockCheckMore_list" v-for="(item,index) in GetStorageLotInfoDetails_data" :key="index">
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_a}}:</view>
						<view>{{item.barcode}}</view>
					</view>

					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_c}}:</view>
						<view>{{item.dateCode}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.purchase_list_c_title_d}}:</view>
						<view>{{item.qty}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.locationCode}}:</view>
						<view>{{item.locationCode}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.creationTime_b}}:</view>
						<view>{{item.creationTime}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.inOutType}}:</view>
						<view v-if="item.inOutType==1">{{i18n.inOutType_a}}</view>
						<view v-if="item.inOutType==2">{{i18n.inOutType_b}}</view>
						<view v-if="item.inOutType==4">{{i18n.inOutType_c}}</view>
						<view v-if="item.inOutType==5">{{i18n.inOutType_d}}</view>
						<view v-if="item.inOutType==6">{{i18n.inOutType_e}}</view>
						<view v-if="item.inOutType==7">{{i18n.inOutType_f}}</view>
						<view v-if="item.inOutType==8">{{i18n.inOutType_g}}</view>
						<view v-if="item.inOutType==9">{{i18n.inOutType_h}}</view>
						<view v-if="item.inOutType==10">{{i18n.inOutType_i}}</view>
						<view v-if="item.inOutType==11">{{i18n.inOutType_j}}</view>
						<view v-if="item.inOutType==12">{{i18n.inOutType_k}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.sourceBillType}}:</view>
						<view v-if="item.sourceBillType==13">{{i18n.sourceBillType_a}}</view>
						<view v-if="item.sourceBillType==15">{{i18n.sourceBillType_b}}</view>
						<view v-if="item.sourceBillType==20">{{i18n.sourceBillType_c}}</view>
						<view v-if="item.sourceBillType==21">{{i18n.sourceBillType_d}}</view>
						<view v-if="item.sourceBillType==22">{{i18n.sourceBillType_e}}</view>
						<view v-if="item.sourceBillType==23">{{i18n.sourceBillType_f}}</view>
						<view v-if="item.sourceBillType==24">{{i18n.sourceBillType_g}}</view>
						<view v-if="item.sourceBillType==25">{{i18n.sourceBillType_h}}</view>
						<view v-if="item.sourceBillType==40">{{i18n.sourceBillType_i}}</view>
						<view v-if="item.sourceBillType==42">{{i18n.sourceBillType_j}}</view>
						<view v-if="item.sourceBillType==43">{{i18n.sourceBillType_k}}</view>
						<view v-if="item.sourceBillType==50">{{i18n.sourceBillType_l}}</view>
						<view v-if="item.sourceBillType==51">{{i18n.sourceBillType_m}}</view>
						<view v-if="item.sourceBillType==52">{{i18n.sourceBillType_o}}</view>
						<view v-if="item.sourceBillType==53">{{i18n.sourceBillType_p}}</view>
						<view v-if="item.sourceBillType==60">{{i18n.sourceBillType_q}}</view>
						<view v-if="item.sourceBillType==61">{{i18n.sourceBillType_r}}</view>
					</view>
					<view class="stockCheckMore_head_area_line">
						<view>{{i18n.sourceCode}}:</view>
						<view>{{item.sourceCode}}</view>
					</view>
				</view>
			</view>
			<bottomCountArea v-bind:count="count" v-if="bottomCountArea_show" />
		</scroll-view>
		<loadingWait v-if="loading_wait_show" />
	</view>

</template>

<script>
	import {} from 'vuex'
	import SearchTitle from "../components/SearchTitle/SearchTitle.vue"
	import StockCheckNav from "../components/StockCheckNav/StockCheckNav.vue"
	import StockCheckList from "../components/StockCheckList/StockCheckList.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import bottomCountArea from "../components/bottomCountArea/bottomCountArea.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			SearchTitle,
			StockCheckNav,
			StockCheckList,
			loadingWait,
			bottomCountArea
		},

		data() {
			return {
				materialCode: '',
				materialName: '',
				materialStandard: '',
				controlType: '',
				loading_wait_show: false,
				warehouseId: '',
				GetStorageLotInfoDetails_data: [],
				permissionCode: '',
				a_show: false,
				b_show: false,
				c_show: false,
				GetStorageLotInfoDetails_url: '',

				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				count: '',
				bottomCountArea_show: false,
				MaxResultCount: 10,
				SkipCount: 0,
			};
		},
		onNavigationBarButtonTap() {

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
				return this.$t('stockCheckMore')
			},
			i18n_modal() {
				return this.$t('modal_text')
			},
			MAC() {
				return this.$store.state.MAC
			},
			stock_check_more_data() {
				return uni.getStorageSync('stock_check_more_data')
			}
		},
		watch: {
			stock_check_more_data: {
				handler(new_val, old_val) {
					this.materialCode = new_val.materialCode
					this.materialName = new_val.materialName
					this.materialStandard = new_val.materialStandard
					this.controlType = new_val.controlType
					this.warehouseId = new_val.warehouseId

				},
				immediate: true
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
				this.GetStorageLotInfoDetails()
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			GetStorageLotInfoDetails() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.GetStorageLotInfoDetails_url,
					data: {
						MAC: that.MAC,
						MaterialCode: that.materialCode,
						WarehouseId: that.warehouseId,
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
							if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByMaterial') {
								that.GetStorageLotInfoDetails_data = res.data.result
							} else {
								that.GetStorageLotInfoDetails_data = that.GetStorageLotInfoDetails_data.concat(res.data.result.items)
								let totalCount = res.data.result.totalCount
								let now_conut = that.MaxResultCount + that.SkipCount
								console.log(now_conut)
								if (res.data.result.items.length == 0) { //没有更多数据了
									that.count = ''
									that.bottomCountArea_show = true
								} else {
									if (now_conut < totalCount) { //还没有滑倒底部
										that.count = totalCount - now_conut
										that.bottomCountArea_show = true
									} else {
										// that.bottomCountArea_show = false
									}
								}

							}
							for (let key in that.GetStorageLotInfoDetails_data) {
								if (that.GetStorageLotInfoDetails_data[key].dateCode) {
									that.GetStorageLotInfoDetails_data[key].dateCode = that.GetStorageLotInfoDetails_data[key].dateCode.slice(0,
										10)
								}
								if (that.GetStorageLotInfoDetails_data[key].creationTime) {
									that.GetStorageLotInfoDetails_data[key].creationTime = that.GetStorageLotInfoDetails_data[key].creationTime
										.slice(0, 10)
								}
								if (that.GetStorageLotInfoDetails_data[key].dateCode) {
									that.GetStorageLotInfoDetails_data[key].dateCode = that.GetStorageLotInfoDetails_data[key].dateCode.slice(0,
										10)
								}
							}
						} else {

						}
					}
				});
			},
		},
		onLoad() {
			let that = this
			let title = ''
			that.permissionCode = uni.getStorageSync('WarehousingOperation_permissionCode')
			if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByMaterial') { //按物料查询
				that.GetStorageLotInfoDetails_url = 'api/services/wmspda/StorageQuery/GetStorageLotInfoDetails'
				that.a_show = true
				title = that.i18n.page_title
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByMaterial') { //入库记录查询按物料查询
				that.GetStorageLotInfoDetails_url = 'api/services/wmspda/InstockRecord/GetInstockRecordDetail'
				that.b_show = true
				title = that.i18n.page_title_a
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByMaterial') { //出库记录查询按物料查询
				that.GetStorageLotInfoDetails_url = 'api/services/wmspda/OutstockRecord/GetOutstockRecordDetail'
				that.c_show = true
				title = that.i18n.page_title_b
			}
			uni.setNavigationBarTitle({
				title: title
			});
			this.GetStorageLotInfoDetails()
		}
	}
</script>

<style>
	.stockCheckMore_head_area {
		display: flex;
		flex-direction: column;
		border: 1px solid #DDDDDD;
		border-radius: 10upx;
		margin: 25upx;
		width: 700upx;
	}

	.stockCheckMore_head_area_line {
		display: flex;

	}

	.stockCheckMore_head_area_line view:nth-child(1) {
		width: 180upx;
		text-align: right;
		font-size: 25upx;
	}

	.stockCheckMore_head_area_line view:nth-child(2) {
		padding-left: 20upx;
		width: 500upx;
		font-size: 25upx;
	}

	.stockCheckMore_list {
		border-bottom: 1px solid #DDDDDD;
	}

	.scroll-Y {
		height: 800upx;
		/* background: red; */
	}
</style>
