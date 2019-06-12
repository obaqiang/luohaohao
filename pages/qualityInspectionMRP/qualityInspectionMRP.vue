<template>
	<view>
		<view class="qualityInspection_head">
			<text>{{i18n.qualityInspectionMRP_a}}</text>
			<text>{{i18n.qualityInspectionMRP_b}}</text>
			<text>{{i18n.qualityInspectionMRP_c}}</text>
			<text>{{i18n.qualityInspectionMRP_d}}</text>
			<text>{{i18n.qualityInspectionMRP_e}}</text>
			<text>{{i18n.qualityInspectionMRP_f}}</text>
		</view>
		<view class="qualityInspection_body">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">
				<view class="qualityInspection_body_list" v-for="(item,index) in items" :key="index" @tap="Check(item.qcLevel,item.id)">
					<view class="qualityInspection_body_list_a">
						<!-- <image class="qualityInspection_body_list_a_icon" :src="quality_wait_quality"></image> -->
						<text class="qualityInspection_text_a" v-if="item.qcLevel==0">{{i18n.qualityInspectionMRP_g}}</text>
						<text class="qualityInspection_text_a" v-if="item.qcLevel==11">C1</text>
						<text class="qualityInspection_text_a" v-if="item.qcLevel==12">C2</text>
						<text class="qualityInspection_text_a" v-if="item.qcLevel==21">H1</text>
						<text class="qualityInspection_text_a" v-if="item.qcLevel==22">H2</text>
						<text class="qualityInspection_text_b">{{item.materialCode}}</text>
						<text class="qualityInspection_text_c">
							<text v-if="item.receiveQty!=null">{{item.receiveQty}}</text>
							<text v-if="item.receiveQty==null">0</text>
						</text>
						<text class="qualityInspection_text_d">
							<text v-if="item.sampleQty!=null">{{item.sampleQty}}</text>
							<text v-if="item.sampleQty==null">0</text>
						</text>
						<text class="qualityInspection_text_e">
							<text v-if="item.passQty!=null">{{item.passQty}}</text>
							<text v-if="item.passQty==null">0</text>
						</text>
						<!-- 						<view class="qualityInspection_text_f" v-if="item.qcResult==1">合格</view>
						<view class="qualityInspection_text_f" v-if="item.qcResult==2">待定</view>
						<view class="qualityInspection_text_f" v-if="item.qcResult==3">不合格</view> -->
						<text class="qualityInspection_text_f">{{item.per}}</text>
						<image class="qualityInspection_text_g" :src="quality_jiantou"></image>
					</view>
					<view class="qualityInspection_body_list_b">
						<view class="qualityInspection_body_list_b_bl">
							<text>{{item.materialName}}</text>
							<text>{{item.supplierName}}</text>
						</view>
						<view class="qualityInspection_body_list_b_bl">
							<text>{{i18n.qualityInspectionMRP_h}}:{{item.billDate}}</text>
							<text>{{i18n.qualityInspectionMRP_i}}:{{item.billCode}}</text>
						</view>
					</view>
				</view>
				<bottomCountArea v-bind:count="count" v-if="bottomCountArea_show" />
			</scroll-view>

		</view>
		<popupLayer v-if="show_pop" v-on:cancelPop="cancelPop" v-on:choDateA="choDateA" v-on:choDateB="choDateB" v-on:workA="workA"
		 v-on:workB="workB" v-on:workC="workC" v-on:workD="workD" v-on:workE="workE" v-on:work="work" />
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import popupLayer from "../components/popupLayer/popupLayer.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import bottomCountArea from "../components/bottomCountArea/bottomCountArea.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			popupLayer,
			loadingWait,
			bottomCountArea
		},

		data() {
			return {
				quality_wait_quality: "../../static/img/quality_wait_quality.png",
				quality_jiantou: "../../static/img/quality_jiantou.png",
				loading_wait_show: false,
				StratDate: '',
				EndDate: '',
				ReceiptCode: '',
				MaterialCode: '',
				MaterialName: '',
				SupplierName: '',
				SourceCode: '',
				MaxResultCount: 10,
				SkipCount: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				items: [],
				show_pop: false,
				id: '', //质检id
				SampleCode: '',
				Aql: '',
				count: '',
				// bottomCountArea_area_text: '',
				bottomCountArea_show: false
			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			connect_url() {
				return this.$store.state.connect_url
			},
			post_header() {
				return this.$store.state.post_header
			},
			i18n() {
				return this.$t('qualityInspectionMRP')
			},
			MAC() {
				return this.$store.state.MAC
			},
		},
		onNavigationBarButtonTap: function(e) {
			console.log(e)
			this.show_pop = true

		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			// ...mapMutations(['calPercent']),
			work() {
				let that = this
				this.SkipCount = 0
				this.show_pop = false
				this.GetIqcHeaders(this.SkipCount,this.MaxResultCount)
			},
			cancelPop() {
				this.show_pop = false
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				this.MaxResultCount = 10
				this.SkipCount += 10
				this.GetIqcHeaders(this.SkipCount,this.MaxResultCount)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			choDateA(e) {
				this.StratDate = e
			},
			choDateB(e) {
				this.EndDate = e
			},
			workA(e) { //到货单号赋值
				console.log('A')
				this.ReceiptCode = e
			},
			workB(e) { //到货单号赋值
				console.log('B')
				this.MaterialCode = e
			},
			workC(e) { //到货单号赋值
				console.log('C')
				this.MaterialName = e
			},
			workD(e) { //到货单号赋值
				console.log('D')
				this.SupplierName = e
			},
			workE(e) { //到货单号赋值
				console.log('E')
				this.SourceBillCode = e
			},
			Check(qcLevel, id) {
				let that = this
				uni.setStorageSync('qcLevel', qcLevel)
				that.id = id
				for (let i = 0; i < that.items.length; i++) {
					if (id == that.items[i].id) {
						uni.setStorageSync('qualityInspection_data', that.items[i])
					}
				}
				uni.navigateTo({
					url: '../IncomingQualityInspectionMRP/IncomingQualityInspectionMRP'
				});

			},
			GetIqcHeaders(data_SkipCount,data_MaxResultCount) { //查询
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetIqcHeaderForMrp',
					data: {
						MAC: that.MAC,
						StratDate: that.StratDate,
						EndDate: that.EndDate,
						ReceiptCode: that.ReceiptCode,
						MaterialCode: that.MaterialCode,
						MaterialName: that.MaterialName,
						SupplierName: that.SupplierName,
						SourceCode: that.SourceCode,
						MaxResultCount: data_MaxResultCount,
						SkipCount: data_SkipCount,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							if (that.SkipCount == 0) { //判断是否是第一次筛选
								that.items = []
							}
							if (res.data.result.items.length == 0) {
								// that.bottomCountArea_area_text = '所有数据已加载完'
								that.count=""
								that.bottomCountArea_show = true
							} else {
								let totalCount = res.data.result.totalCount
								let now_conut = that.MaxResultCount + that.SkipCount
								if (now_conut < totalCount) {
									that.count = totalCount - now_conut
									// that.bottomCountArea_area_text = '还有' + that.count + '数据没有加载'
									that.bottomCountArea_show = true
								} else {
									// that.bottomCountArea_show = false
								}
								for (let i = 0; i < res.data.result.items.length; i++) {
									res.data.result.items[i].billDate = res.data.result.items[i].billDate.slice(0, 10)
									let num = {}
									num.data_a = res.data.result.items[i].ngQty
									num.data_b = res.data.result.items[i].sampleQty
									//不良率为不良数/送检数
									let per = that.$Percentage(num.data_a,num.data_b)
									res.data.result.items[i].per = per
								}
								that.items = that.items.concat(res.data.result.items)
							}
						}
					}
				});
			},
			calPercent(num) {
				return (Math.round(num.data_a / num.data_b * 10000) / 100.00 + "%");
			},
			IqcExemption() { //免检检验提交
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/IqcExemption',
					data: {
						MAC: that.MAC,
						Id: that.id
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.showToast({
								icon: 'none',
								title: that.i18n.qualityInspectionMRP_j,
								duration: 2000
							});
						}
					}
				});
			},
			GetIqcAqlNgQty() { //获取不合格数量
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetIqcAqlNgQty',
					data: {
						MAC: that.MAC,
						SampleCode: that.SampleCode,
						Aql: that.Aql
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.setStorageSync('rejectQty', res.data.result.rejectQty)
						}
					}
				});
			}
		},
		onLoad() {
			// this.MacInfo();
			//普检1 高检1页面一样 普检2 和高检2页面一样
			let title = ''
			let title_permissionName = uni.getStorageSync('title_permissionName')
			if (title_permissionName != '') {
				title = title_permissionName
			}
			uni.setNavigationBarTitle({
				title: title
			});
		},
		onShow(){
			this.items = []
			this.count = ''
			this.MaxResultCount = this.SkipCount + this.MaxResultCount //用户每次进来都需要进行定位 多少条数据
			this.GetIqcHeaders(0,this.MaxResultCount)//每次进来先进数据加载 考虑返回到此页面时情况
		}
	}
</script>

<style>
	page {
		background: #e7e7e7;
	}

	.qualityInspection_head {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 750upx;
		background: #FFFFFF;
		height: 100upx;
	}

	.qualityInspection_body_list {
		width: 720upx;
		margin: 10upx auto;
		border-radius: 10upx;
		overflow: hidden;
		height: 290upx;
	}

	.qualityInspection_body_list_a {
		background: #FFFFFF;
		display: flex;
		align-items: center;
		height: 100upx;
	}

	.qualityInspection_body_list_a text {
		font-size: 20upx;
	}

	.qualityInspection_body_list_a_icon {
		width: 50upx;
		height: 50upx;
	}

	.qualityInspection_body_list_a_icon_b {
		width: 20upx;
		height: 30upx;
	}

	.qualityInspection_body_list_a_in {
		width: 120upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.qualityInspection_body_list_b {
		width: 720upx;
		display: flex;
		background: #e9f1fa;
	}

	.qualityInspection_body_list_b_bl {
		display: flex;
		flex-direction: column;
		width: 50%;
		justify-content: center;
		padding-left: 20upx;
		font-size: 22upx;
		height: 150upx;
		line-height: 50upx;
	}

	.qualityInspection_text_a {
		width: 50upx;
		height: 50upx;
		background: red;
		border-radius: 50%;
		color: #FFFFFF;
		align-items: center;
		display: flex;
		justify-content: center;
		margin: 10upx;
	}

	.qualityInspection_text_b {
		width: 190upx;
		text-align: center;
	}

	.qualityInspection_text_c {
		width: 100upx;
		text-align: center;
	}

	.qualityInspection_text_d {
		width: 100upx;
		text-align: center;
	}

	.qualityInspection_text_e {
		width: 120upx;
		text-align: center;
	}

	.qualityInspection_text_f {
		width: 100upx;
		text-align: center;
	}

	.qualityInspection_text_g {
		text-align: center;
		width: 20upx;
		height: 30upx;
	}

	.scroll-Y {
		height: 1000upx;
		/* background: red; */
	}
</style>
