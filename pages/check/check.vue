<template>
	<view class="mes_area">

		<!-- <view class="mes_list"> -->
		<!-- <text>盘点单id:</text> -->
		<!-- <text>{{i18n.check_data_a}}</text> -->
		<!-- <text>{{id}}</text> -->
		<!-- </view> -->

		<view class="mes_list">
			<!-- <text>盘点单号:</text> -->
			<text>{{i18n.check_data_b}}</text>
			<text>{{billCode}}</text>
		</view>
		<!-- <view class="mes_list"> -->
		<!-- <text>仓库id:</text> -->
		<!-- <text>{{i18n.check_data_c}}</text> -->
		<!-- <text>{{warehouseId}}</text> -->
		<!-- </view> -->
		<!-- <view class="mes_list"> -->
		<!-- <text>仓库代码:</text> -->
		<!-- <text>{{i18n.check_data_d}}</text> -->
		<!-- <text>{{whCode}}</text> -->
		<!-- </view> -->
		<view class="mes_list">
			<!-- <text>仓库名称:</text> -->
			<text>{{i18n.check_data_e}}</text>
			<text>{{whName}}</text>
		</view>
		<view class="mes_list">
			<!-- <text>盘点类型:</text> -->
			<text>{{i18n.check_data_f}}</text>
			<text v-if="checkType==0">{{i18n.check_data_f_a}}</text>
			<text v-if="checkType==1">{{i18n.check_data_f_b}}</text>
		</view>
		<view class="mes_list">
			<!-- <text>盘点性质:</text> -->
			<text>{{i18n.check_data_g}}</text>
			<text v-if="checkNature==0">{{i18n.check_data_g_a}}</text>
			<text v-if="checkNature==1">{{i18n.check_data_g_b}}</text>
		</view>
		<view class="mes_list">
			<!-- <text>盘点状态:</text> -->
			<text>{{i18n.check_data_h}}</text>
			<text v-if="status==0">{{i18n.check_data_h_a}}</text>
			<text v-if="status==1">{{i18n.check_data_h_b}}</text>
			<text v-if="status==2">{{i18n.check_data_h_c}}</text>
			<text v-if="status==3">{{i18n.check_data_h_d}}</text>
			<text v-if="status==9">{{i18n.check_data_h_e}}</text>
		</view>
		<view class="mes_list">
			<!-- <text>制单时间:</text> -->
			<text>{{i18n.check_data_i}}</text>
			<text>{{creationTime}}</text>
		</view>
		<view class="mes_list">
			<!-- <text>制单人:</text> -->
			<text>{{i18n.check_data_j}}</text>
			<text>{{creatorFullName}}</text>
		</view>
		<view class="bg_line">
		</view>

		<bindScanInput v-bind:scan_input_text="scan_input_text_a" v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_a"
		 v-bind:placeholder_text='placeholder_text_a' @input="inputA" @work="workA" v-model="BarCode" />
		<bindScanInput v-bind:scan_input_text="scan_input_text_b" v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_b"
		 v-bind:placeholder_text='placeholder_text_b' @input="inputB" @work="workB" v-model="LocationCode" />
		<view class="body_list">
			<text class="text_a">{{i18n.check_num}}:</text>
			<view class="text_right_area">
				<input type="number" :focus="number_focus" v-model="qty" @input="changeInput">
			</view>
			<button class="in_btn" @tap="confirmQty">{{i18n.check_confirm_num}}</button>
		</view>
		<view class="check_down_area" v-if="down_area_show">
			<view class="mes_list">
				<text>{{i18n.check_info_a}}:</text>
				<text>{{materialCode}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.check_info_b}}:</text>
				<text>{{materialName}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.check_info_c}}:</text>
				<text>{{unitName}}</text>
			</view>
			<view class="mes_list" v-if="supportUnitName!=null">
				<text>{{i18n.check_info_d}}:</text>
				<text>{{supportUnitName}}</text>
			</view>
			<view class="mes_list" v-if="relationQty!=null">
				<text>{{i18n.check_info_e}}:</text>
				<text>{{relationQty}}</text>
			</view>
		</view>
		<view class="common_bot_btn" @tap="seeDetail">
			{{i18n.check_see_detail}}
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
				return this.$t('check')
			},
			MAC() {
				return this.$store.state.MAC
			},
			id() {
				return uni.getStorageSync('check_data')[0].id
			},
			billCode() {
				return uni.getStorageSync('check_data')[0].billCode
			},
			warehouseId() {
				return uni.getStorageSync('check_data')[0].warehouseId
			},
			whCode() {
				return uni.getStorageSync('check_data')[0].whCode
			},
			whName() {
				return uni.getStorageSync('check_data')[0].whName
			},
			checkType() {
				return uni.getStorageSync('check_data')[0].checkType
			},
			checkNature() {
				return uni.getStorageSync('check_data')[0].checkNature
			},
			status() {
				return uni.getStorageSync('check_data')[0].status
			},
			creationTime() {
				return uni.getStorageSync('check_data')[0].creationTime
			},
			creatorFullName() {
				return uni.getStorageSync('check_data')[0].creatorFullName
			},
		},
		data() {
			return {
				loading_wait_show: false,
				BarCode: '',
				materialCode: '',
				materialName: '',
				unitName: '',
				supportUnitName: '',
				relationQty: '',
				down_area_show: false,
				LocationCode: '',
				qty: '',
				CheckQty: '',

				scan_input_text_a: '',
				input_focus_a: true,
				placeholder_text_a: '',

				scan_input_text_b: '',
				input_focus_b: false,
				placeholder_text_b: '',

				number_focus: false
			};
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			initInputStatus() {
				this.input_focus_a = false
				this.input_focus_b = false
			},
			inputA(val) {
				this.initInputStatus()
				this.input_focus_a = true
				this.BarCode = val;
			},
			workA() {
				this.initInputStatus()

				this.CheckBarCodeRequired()
			},

			inputB(val) {
				this.initInputStatus()
				this.input_focus_b = true
				this.LocationCode = val;
			},
			workB() {
				this.initInputStatus()
				this.CheckLocationRequired()
			},
			changeInput(val) {

			},
			confirmQty() {
				console.log(this.qty)
				this.CheckQty = this.qty
				if (this.CheckQty != '') {
					this.UpdateCheckStock()
				}

			},
			seeDetail() {
				this.GetCheckStockDetail()
			},
			CheckBarCodeRequired() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inventory/CheckBarCodeRequired',
					data: {
						MAC: that.MAC,
						CheckStockId: that.id,
						WarehouseId: that.warehouseId,
						BarCode: that.BarCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							this.input_focus_b = true
							that.down_area_show = true
							that.materialCode = res.data.result.materialCode
							that.materialName = res.data.result.materialName
							that.unitName = res.data.result.unitName
							that.supportUnitName = res.data.result.supportUnitName
							that.relationQty = res.data.result.relationQty
						} else {
							this.BarCode = ''
							this.initInputStatus()
							this.input_focus_a = true
						}
					}
				});
			},
			CheckLocationRequired() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inventory/CheckLocationRequired',
					data: {
						MAC: that.MAC,
						LocationCode: that.LocationCode,
						BarCode: that.BarCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.number_focus = true
							that.qty = res.data.result.qty
							that.CheckQty = res.data.result.qty
						} else {
							this.LocationCode = ''
							this.initInputStatus()
							this.input_focus_b = true
						}
					}
				});
			},
			UpdateCheckStock() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inventory/UpdateCheckStock',
					data: {
						MAC: that.MAC,
						CheckStockId: that.id,
						WarehouseId: that.warehouseId,
						BarCode: that.BarCode,
						LocationCode: that.LocationCode,
						CheckQty: that.CheckQty
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
								title: that.i18n.check_toast_a,
								duration: 3000
							});
							that.initInputStatus()
							that.input_focus_a = true
							that.BarCode = ''
							that.LocationCode = ''
							that.CheckQtyCheckQty = ''
							that.qty = ''
							that.down_area_show = false
						}
					}
				});
			},
			GetCheckStockDetail() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inventory/GetCheckStockDetail',
					data: {
						MAC: that.MAC,
						CheckStockId: that.id,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.setStorageSync('detail_data', res.data.result)
							uni.navigateTo({
								url: '../checkDetail/checkDetail'
							});
						}
					}
				});
			}
		},
		onLoad() {
			// this.MacInfo();
			console.log(uni.getStorageSync('check_data'))
			this.scan_input_text_a = this.i18n.check_input_a
			this.placeholder_text_a = this.i18n.check_input_b
			this.scan_input_text_b = this.i18n.check_input_c
			this.placeholder_text_b = this.i18n.check_input_d
		}
	}
</script>

<style>
	.mes_area {
		padding-top: 50upx;
	}

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

	.body_list {
		display: flex;
		line-height: 60upx;
		padding-left: 30upx;
		align-items: center;
		margin-top: 20upx;
		font-size: 25upx;
	}

	.text_a {
		width: 150upx;
		text-align: right;
		font-size: 25upx;
	}

	.text_b {
		padding-left: 50upx;
	}

	.text_right_area {
		display: flex;
		border: 1px solid #DDDDDD;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 300upx;
		justify-content: space-between;
		font-size: 20upx;
	}

	.text_right_area_hover {
		display: flex;
		border: 1px solid #ffb700;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}

	/* .text_right_area:hover {
		border: 1px solid #ffb700;
	} */
	.text_right_area:focus {
		border: 1px solid #ffb700;
	}

	.text_right_area_icon {
		width: 50upx;
		height: 50upx;
	}

	.text_right_input {
		width: 350upx;
		font-size: 20upx;
		/* background: red; */
	}

	.in_btn {
		font-size: 25upx;
		background: #FFB700;
		color: #FFFFFF;
	}

	.check_down_area {
		padding-top: 50upx;
	}
</style>
