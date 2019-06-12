<template>
	<view>

		<view class="qualityInspection_head">
			<text>{{i18n.qualityInspection_head_a}}</text>
			<text>{{i18n.qualityInspection_head_b}}</text>
			<text>{{i18n.qualityInspection_head_c}}</text>
			<text>{{i18n.qualityInspection_head_d}}</text>
			<text>{{i18n.qualityInspection_head_e}}</text>
			<text>{{i18n.qualityInspection_head_f}}</text>
		</view>
		<view class="qualityInspection_body">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">
				<view class="qualityInspection_body_list" v-for="(item,index) in items" :key="index" @tap="Check(item.qcLevel,item.id)">
					<view class="qualityInspection_body_list_a">
						<!-- <image class="qualityInspection_body_list_a_icon" :src="quality_wait_quality"></image> -->
						<text class="qualityInspection_text_a" style="background: green;" v-if="item.qcLevel==0">免</text>
						<text class="qualityInspection_text_a" style="background: #FFB700;" v-if="item.qcLevel==11">C1</text>
						<text class="qualityInspection_text_a" style="background: #FFB700;" v-if="item.qcLevel==12">C2</text>
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
						<view class="qualityInspection_text_f" v-if="item.qcResult==1">{{i18n.conformity}}</view>
						<view class="qualityInspection_text_f" v-if="item.qcResult==2">{{i18n.undetermined}}</view>
						<view class="qualityInspection_text_f" v-if="item.qcResult==3">{{i18n.non_conformity}}</view>
						<image class="qualityInspection_text_g" :src="quality_jiantou"></image>
					</view>
					<view class="qualityInspection_body_list_b">
						<view class="qualityInspection_body_list_b_bl">
							<text>{{item.materialName}}</text>
							<text>{{item.supplierName}}</text>
						</view>
						<view class="qualityInspection_body_list_b_bl">
							<text>{{i18n.arrival_date}}:{{item.billDate}}</text>
							<text>{{i18n.arrival_number}}:{{item.billCode}}</text>
						</view>
					</view>
				</view>
				<bottomCountArea v-bind:count="count" v-if="bottomCountArea_show" />
			</scroll-view>

		</view>
		<popupLayer v-if="show_pop" v-on:cancelPop="cancelPop" v-on:choDateA="choDateA" v-on:choDateB="choDateB" v-on:workA="workA"
		 v-on:workB="workB" v-on:workC="workC" v-on:workD="workD" v-on:workE="workE" v-on:work="work" v-bind:date_a_show="StartDate"
		 v-bind:date_b_show="EndDate" v-bind:input_data_a_show="ReceiptCode" v-bind:input_data_b_show="MaterialCode"
		 v-bind:input_data_c_show="MaterialName" v-bind:input_data_d_show="SupplierName" v-bind:input_data_e_show="SourceCode"
		 v-on:bindQcResultChange="bindQcResultChange" v-bind:QcResult_show="QcResult" />
		<loadingWait v-if="loading_wait_show" />

		<!-- <loadingWaitStyleA /> -->
	</view>
</template>

<script>
	import popupLayer from "../components/popupLayer/popupLayer.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import loadingWaitStyleA from "../components/loadingWaitStyleA/loadingWaitStyleA.vue"
	import bottomCountArea from "../components/bottomCountArea/bottomCountArea.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			popupLayer,
			loadingWait,
			loadingWaitStyleA,
			bottomCountArea
		},

		data() {
			return {
				quality_wait_quality: "../../static/img/quality_wait_quality.png",
				quality_jiantou: "../../static/img/quality_jiantou.png",
				loading_wait_show: false,
				StartDate: '',
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
				QcResult: '',
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
				return this.$t('qualityInspection')
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
			bindQcResultChange(e) {
				this.QcResult = e
			},
			work() {
				let that = this
				this.SkipCount = 0
				this.MaxResultCount = 10
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
				// console.log(this.items.length)
				// console.log(this.SkipCount)
				// console.log(this.MaxResultCount)
				this.GetIqcHeaders(this.SkipCount,this.MaxResultCount)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			choDateA(e) {
				this.StartDate = e
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
				this.SourceCode = e
			},
			Check(qcLevel, id) {
				let that = this
				// that.loading_wait_show = true
				uni.setStorageSync('qcLevel', qcLevel)
				that.id = id

				if (qcLevel == 0) { //免检产品
					let QcResult = ''
					for (let i = 0; i < that.items.length; i++) {
						if (id == that.items[i].id) {
							QcResult = that.items[i].qcResult
							// that.loading_wait_show = false
						}
					}
					if (QcResult == 2) { //只有待定情况才出现弹框
						uni.showModal({
							title: that.i18n.show_modal_title,
							content: that.i18n.show_modal_content,
							success: function(res) {
								if (res.confirm) {
									that.IqcExemption()
								} else if (res.cancel) {

								}
							}
						});
					}

				} else if (qcLevel == 11) { //普检1 高检1 页面一样
					for (let i = 0; i < that.items.length; i++) {
						if (id == that.items[i].id) {
							uni.setStorageSync('qualityInspection_data', that.items[i])
							that.Aql = that.items[i].aql
							that.SampleCode = that.items[i].sampleCode
							// that.loading_wait_show = false
						}
					}
					uni.navigateTo({
						url: '../IncomingQualityInspection/IncomingQualityInspection'
					});

				} else if (qcLevel == 12) { //普检2 高检2页面一样
					//检验标准只有高检2才有
					for (let i = 0; i < that.items.length; i++) {
						if (id == that.items[i].id) {
							uni.setStorageSync('qualityInspection_data', that.items[i])
							that.Aql = that.items[i].aql
							that.SampleCode = that.items[i].sampleCode
							// that.loading_wait_show = false
						}
					}
					uni.navigateTo({
						url: '../IncomingQualityInspectionB/IncomingQualityInspectionB'
					});

				} else if (qcLevel == 21) {
					for (let i = 0; i < that.items.length; i++) {
						if (id == that.items[i].id) {
							uni.setStorageSync('qualityInspection_data', that.items[i])
							that.Aql = that.items[i].aql
							that.SampleCode = that.items[i].sampleCode
							that.GetIqcAqlNgQty()
							// that.loading_wait_show = false
						}
					}

				} else if (qcLevel == 22) {
					//检验标准只有高检2才有
					for (let i = 0; i < that.items.length; i++) {
						if (id == that.items[i].id) {
							// console.log('进来')
							uni.setStorageSync('qualityInspection_data', that.items[i])
							that.Aql = that.items[i].aql
							that.SampleCode = that.items[i].sampleCode
							that.GetIqcAqlNgQty()
						}
					}

				}


			},
			GetIqcHeaders(data_SkipCount,data_MaxResultCount) { //查询
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetIqcHeaders',
					data: {
						MAC: that.MAC,
						StartDate: that.StartDate,
						EndDate: that.EndDate,
						ReceiptCode: that.ReceiptCode,
						MaterialCode: that.MaterialCode,
						MaterialName: that.MaterialName,
						SupplierName: that.SupplierName,
						SourceCode: that.SourceCode,
						MaxResultCount: data_MaxResultCount,
						SkipCount: data_SkipCount,
						QcResult: that.QcResult
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						// console.log(JSON.stringify(res.data))
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							if (that.SkipCount == 0) { //判断是否是第一次筛选
								that.items = []
								that.count = ''
							}
							if (res.data.result.items.length == 0) { //没有更多数据了
								that.count = ''
								that.bottomCountArea_show = true
							} else {
								let totalCount = res.data.result.totalCount
								let now_conut = that.MaxResultCount + that.SkipCount
								if (now_conut < totalCount) {
									that.count = totalCount - now_conut
									that.bottomCountArea_show = true
								} else {
									// that.bottomCountArea_show = false
								}
								for (let i = 0; i < res.data.result.items.length; i++) {
									// console.log(JSON.stringify(res.data.result.items[i]))
									res.data.result.items[i].billDate = res.data.result.items[i].billDate.slice(0, 10)
								}
								that.items = that.items.concat(res.data.result.items)
							}
						}
					}
				});
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
							// 提交成功后刷新数据
							uni.showToast({
								icon: 'none',
								title: that.i18n.show_modal_exemptions,
								duration: 2000
							});
							that.SkipCount = 0
							that.GetIqcHeaders(this.SkipCount,this.MaxResultCount)
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
						console.log('获取不合格数量')
						// console.log(JSON.stringify(res.data))
						console.log(res.data)
						that.loading_wait_show = false
						console.log('接口里的' + that.loading_wait_show)
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.setStorageSync('rejectQtyStand', res.data.result.rejectQty)
							let qcLevel = uni.getStorageSync('qcLevel')
							if (qcLevel == 21) {
								uni.navigateTo({
									url: '../IncomingQualityInspection/IncomingQualityInspection'
								});
							} else if (qcLevel == 22) {
								uni.navigateTo({
									url: '../IncomingQualityInspectionB/IncomingQualityInspectionB'
								});
							}
						}
					}
				});
			}
		},
		onLoad() {
			// this.MacInfo();
			//普检1 高检1页面一样 普检2 和高检2页面一样
			// this.GetIqcHeaders()
			let title = ''
			let title_permissionName = uni.getStorageSync('title_permissionName')
			if (title_permissionName != '') {
				title = title_permissionName
			}
			uni.setNavigationBarTitle({
				title: title
			});
		},
		onShow() {
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
		font-size: 25upx;
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
		font-size: 25upx;
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
		font-size: 25upx;
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
