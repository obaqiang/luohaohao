<template>
	<view>
		<ProductionReturnCreateHead v-on:phead_choose="phead_choose" v-bind:left_text="left_text" v-bind:right_text="right_text" />
		<view class="left_area" v-if="left_show">
			<!-- 生产退料单号 -->
			<!-- <bindScanInput v-bind:scan_icon_show="true" v-bind:scan_input_text="scan_input_text_a" v-bind:placeholder_text="placeholder_text_a"
			 v-bind:input_focus="input_focus_a" /> -->
			<view class="body_list">
				<!-- <text class="text_a">生产退料单号:</text> -->
				<text class="text_a">{{i18n.data_a}}:</text>
				<view class="text_right_area">
					<view>{{billCode}}</view>
				</view>
			</view>
			<!-- 生产工单号 -->
			<view class="body_list" v-if="permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateProductReturn'">
				<text class="text_a">{{scan_input_text_b}}:</text>
				<view v-bind:class="{ text_right_area_hover: input_focus_b, 'text_right_area': input_focus_b==false }">
					<input class="text_right_input" type="text" :placeholder="placeholder_text_b" :focus="input_focus_b" @confirm="confirmInputB"
					 v-model="MoCode" />
					<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanDataB"></image>
				</view>
			</view>

			<!-- 客户代码 -->
			<bindScanInput v-if="input_f_show" v-bind:scan_input_text="i18n.scan_input_text_f" v-bind:scan_icon_show="true"
			 v-bind:input_focus="input_focus_f" v-bind:placeholder_text="i18n.placeholder_text_f" @work="scanFInputSuc" v-model="customerCode" />
			<!-- 客户名称 -->
			<bindScanInput v-if="input_g_show" v-bind:scan_input_text="i18n.scan_input_text_g" v-bind:scan_icon_show="true"
			 v-bind:input_focus="input_focus_g" v-bind:placeholder_text="i18n.placeholder_text_g" @work="scanGInputSuc" v-model="customerName" />

			<!-- 仓库编号 -->
			<view class="body_list">
				<text class="text_a">{{scan_input_text_c}}:</text>
				<view v-bind:class="{ text_right_area_hover: input_focus_c, 'text_right_area': input_focus_c==false }">
					<input class="text_right_input" type="text" :placeholder="placeholder_text_c" :focus="input_focus_c" @confirm="confirmInputC"
					 v-model="WarehouseCode" />
					<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanDataC"></image>
				</view>
			</view>
			<!-- 物料条码 -->
			<view class="body_list">
				<text class="text_a">{{scan_input_text_d}}:</text>
				<view v-bind:class="{ text_right_area_hover: input_focus_d, 'text_right_area': input_focus_d==false }">
					<input class="text_right_input" type="text" :placeholder="placeholder_text_d" :focus="input_focus_d" @confirm="confirmInputD"
					 v-model="BarCode" />
					<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanDataD"></image>
				</view>
			</view>
			<!-- 退料数量 -->
			<view class="body_list">
				<text class="text_a">{{scan_input_text_e}}:</text>
				<view v-bind:class="{ text_right_area_hover: input_focus_e, 'text_right_area': input_focus_e==false }">
					<input class="text_right_input" type="number" :placeholder="placeholder_text_e" :focus="input_focus_e" v-model="outstockQty"
					 @confirm="confirmInputE" />
				</view>
			</view>
			<view class="common_bg_line"></view>
			<view v-if="BarCode!=''">
				<view class="common_title" style="margin-top: 20upx;">
					<!-- 条码信息 -->
					{{i18n.data_e}}
				</view>
				<ProductionReturnCreateInfo v-bind:BarCode="BarCode" v-bind:materialCode="materialCode" v-bind:materialName="materialName"
				 v-bind:outstockQty="outstockQty" />
			</view>

			<view class="common_bot_area">
				<view class="common_bot_area_left" @tap="plusProductionReturnCreate_info">
					<!-- 添加 -->
					{{i18n.data_f}}
				</view>
				<view class="common_bot_area_right" @tap="submitProductionReturnCreate">
					<!-- 提交 -->
					{{i18n.data_g}}
				</view>
			</view>
		</view>
		<view class="right_area" v-if="left_show==false">
			<ProductionReturnCreateInfoList v-bind:BarcodeInfo="BarcodeInfo_show" />

		</view>
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import ProductionReturnCreateHead from "../components/ProductionReturnCreateHead/ProductionReturnCreateHead.vue"
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import ProductionReturnCreateInfo from "../components/ProductionReturnCreateInfo/ProductionReturnCreateInfo.vue"
	import ProductionReturnCreateInfoList from "../components/ProductionReturnCreateInfoList/ProductionReturnCreateInfoList.vue"

	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			ProductionReturnCreateHead,
			bindScanInput,
			ProductionReturnCreateInfo,
			loadingWait,
			ProductionReturnCreateInfoList
		},

		data() {
			return {
				text_right_area_icon: "../../static/img/text_right_area_icon.png",
				loading_wait_show: false,
				billCode: '',
				MoCode: '',
				WarehouseCode: '',
				BarCode: '',
				materialCode: '',
				materialName: '',
				outstockQty: '',
				BarcodeInfo_show: '',
				BarcodeInfo: '',
				ProductionReturnCreate_return_num: 1,
				customerCode: '',
				customerName: '',

				left_text: '',
				right_text: '',
				left_show: true,

				scan_input_text_a: '',
				placeholder_text_a: '',
				input_focus_a: false,

				scan_input_text_b: '', //供应你上
				placeholder_text_b: '',
				input_focus_b: true,

				scan_input_text_c: '',
				placeholder_text_c: '',
				input_focus_c: false,

				scan_input_text_d: '',
				placeholder_text_d: '',
				input_focus_d: false,

				scan_input_text_e: '',
				placeholder_text_e: '',
				input_focus_e: false,


				scan_input_text_f: '',
				placeholder_text_f: '',
				input_focus_f: false,
				input_f_show: false,

				scan_input_text_g: '',
				placeholder_text_g: '',
				input_focus_g: false,
				input_g_show: false,

				GetNewBillCode_url: '',
				VerifyMoCode_url: '',
				VreifyWarehouseCode_url: '',
				VreifyBarcode_url: '',
				Generate_url: ''

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
			MAC() {
				return this.$store.state.MAC
			},
			i18n() {
				return this.$t('ProductionReturnCreate')
			},
			permissionCode() {
				return uni.getStorageSync('WarehousingOperation_permissionCode')
			}
		},
		onBackPress(options) {
			// 			if (options.from === 'navigateBack') {
			// 				return false;
			// 			}
			// 			this.back();
			// 			return true;
			uni.setStorageSync('BarcodeInfo','')
		},
		methods: {
			...mapMutations(['initPosition']),
			...mapMutations(['ErrRequestShow']),
			back() {
				uni.navigateBack({
					delta: this.ProductionReturnCreate_return_num
				});
			},
			phead_choose(e) {
				console.log(e)
				this.left_show = e
				if (e == true) {

				} else {
					this.BarcodeInfo_show = uni.getStorageSync('BarcodeInfo')
					console.log(this.BarcodeInfo_show)
				}
			},
			initInputStatus() {
				this.input_focus_b = false
				this.input_focus_c = false
				this.input_focus_d = false
				this.input_focus_e = false
				this.input_focus_f = false
				this.input_focus_g = false
			},
			// 			initInput() {
			// 				let that = this
			// 				BarCode = ''
			// 				materialCode = ''
			// 				materialName = ''
			// 				outstockQty = ''
			// 			},
			initDataPlus() { //用户添加成功之后清空input数据等操作
				this.MoCode = ''
				this.customerCode = ''
				this.customerName = ''
				this.WarehouseCode = ''
				this.BarCode = ''
				this.outstockQty = ''
				this.initInputStatus()
				this.input_focus_d = true
			},
			initData() { //用户提交成功之后清空input数据等操作
				this.MoCode = ''
				this.customerCode = ''
				this.WarehouseCode = ''
				this.BarCode = ''
				this.outstockQty = ''
				this.customerName = ''
				this.GetNewBillCode()

			},
			initNoAllData(){
				this.MoCode = ''
				// this.customerCode = ''
				// this.WarehouseCode = ''
				this.BarCode = ''
				this.outstockQty = ''
				// this.customerName = ''
				this.GetNewBillCode()
			},
			confirmInputB(e) {
				console.log(e)
				let that = this
				that.MoCode = e.detail.value
				that.customerCode = e.detail.value
				that.initInputStatus()
				that.VerifyMoCode()
				that.$hideKeyBoard()
			},
			confirmInputC(e) {
				console.log(e)
				let that = this
				that.WarehouseCode = e.detail.value
				that.initInputStatus()
				that.VreifyWarehouseCode()
				that.$hideKeyBoard()
			},
			confirmInputD(e) {
				console.log(e)
				let that = this
				that.BarCode = e.detail.value
				that.initInputStatus()
				that.VreifyBarcode()
				that.$hideKeyBoard()
			},
			confirmInputE(e) {
				let that = this
				that.outstockQty = e.detail.value
			},
			scanFInputSuc(e) {
				let that = this
				that.VerifyMoCode()
			},
			scanGInputSuc(e) {
				let that = this
				that.VerifyMoCode()
			},
			plusProductionReturnCreate_info() {
				let that = this
				let BarcodeInfo = uni.getStorageSync('BarcodeInfo')
				let canbe_plus = true
				if (BarcodeInfo.length == 0) {
					BarcodeInfo = []
				}
				console.log(BarcodeInfo)
				if (that.BarCode == '') {
					uni.showToast({
						icon: 'none',
						// title: '物料条码不能为空',
						title: that.i18n.alert_text_a,
						duration: 3000
					});
				} else {
					for (let i = 0; i < BarcodeInfo.length; i++) {
						if (that.BarCode == BarcodeInfo[i].BarCode) {
							canbe_plus = false
						}
					}
					if (canbe_plus == true) {
						let BarcodeInfo_list = {}
						BarcodeInfo_list.BarCode = that.BarCode
						BarcodeInfo_list.materialCode = that.materialCode
						BarcodeInfo_list.materialName = that.materialName
						BarcodeInfo_list.outstockQty = that.outstockQty
						BarcodeInfo.push(BarcodeInfo_list)
						uni.setStorageSync('BarcodeInfo', BarcodeInfo)
						that.BarcodeInfo = BarcodeInfo
						uni.showToast({
							icon: 'none',
							// title: '添加成功',
							title: that.i18n.alert_text_b,
							duration: 3000
						});
						// that.initDataPlus()
						that.initNoAllData()
						that.initInputStatus()
						that.input_focus_d = true


					} else {
						uni.showToast({
							icon: 'none',
							// title: '物料条码已存在，添加失败',
							title: that.i18n.alert_text_c,
							duration: 3000
						});
					}

				}

			},
			submitProductionReturnCreate() {
				let that = this
				let BarcodeInfo = uni.getStorageSync('BarcodeInfo')
				console.log(BarcodeInfo)
				let items = []
				for (let i = 0; i < BarcodeInfo.length; i++) {
					let BarcodeInfo_list = {}
					BarcodeInfo_list.Barcode = BarcodeInfo[i].BarCode
					BarcodeInfo_list.Qty = BarcodeInfo[i].outstockQty
					items.push(BarcodeInfo_list)
				}
				that.BarcodeInfo = items
				that.Generate()
			},
			GetNewBillCode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.GetNewBillCode_url,
					data: {
						MAC: that.MAC
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.ErrRequestShow(res)
						that.loading_wait_show = false
						if (res.data.success) {
							that.billCode = res.data.result.billCode
							that.input_focus_b = true
						}
					}
				});
			},
			VerifyMoCode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.VerifyMoCode_url,
					data: {
						MAC: that.MAC,
						MoCode: that.MoCode,
						customerCode: that.customerCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.ErrRequestShow(res)
						that.loading_wait_show = false
						if (res.data.success) {
							that.MoCode = res.data.result.moCode
							that.customerCode = res.data.result.customerCode
							that.customerName = res.data.result.customerName

							that.input_focus_c = true
						} else {
							that.MoCode = ''
							that.customerCode = ''
							that.customerName = ''
							that.input_focus_b = true
						}
					}
				});
			},
			VreifyWarehouseCode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.VreifyWarehouseCode_url,
					data: {
						MAC: that.MAC,
						WarehouseCode: that.WarehouseCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.ErrRequestShow(res)
						that.loading_wait_show = false
						if (res.data.success) {
							that.WarehouseCode = res.data.result.warehouseCode
							that.initInputStatus()
							that.input_focus_d = true
						} else {
							that.WarehouseCode = ''
							that.input_focus_c = true
						}
					}
				});
			},
			VreifyBarcode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.VreifyBarcode_url,
					data: {
						MAC: that.MAC,
						BarCode: that.BarCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.ErrRequestShow(res)
						that.loading_wait_show = false
						if (res.data.success) {
							that.BarCode = res.data.result.barcode
							that.materialCode = res.data.result.materialCode
							that.outstockQty = res.data.result.outstockQty
							that.materialName = res.data.result.materialName
							that.initInputStatus()
							that.input_focus_e = true
						} else {
							that.BarCode = ''
							that.input_focus_d = true
						}
					}
				});
			},
			Generate() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.Generate_url,
					data: {
						MAC: that.MAC,
						BillCode: that.billCode,
						MoCode: that.MoCode,
						WarehouseCode: that.WarehouseCode,
						BarcodeInfo: that.BarcodeInfo,
						customerCode: that.customerCode,
						// customerCode: that.customerCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.ErrRequestShow(res)
						that.loading_wait_show = false
						if (res.data.success) {
							uni.setStorageSync('BarcodeInfo', '')
							// that.ProductionReturnCreate_return_num += 1
							that.initData()
							that.initInputStatus()
							if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateProductReturn') { //生产退料（生单）
								// that.left_text = '生产退料(生单)'
								that.input_focus_b = true//生产工单号
							} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateOutSourceReturn') { //委外退料（生单）
								// that.left_text = '委外退料(生单)'
								that.input_focus_c = true // 仓库编号
							} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateSalesReturn') { //销售退料（生单）
								// that.left_text = '销售退料(生单)'
								that.input_focus_f = true // 客户编号
							}
							uni.showToast({
								icon: 'none',
								// title: '提交成功',
								title: that.i18n.alert_text_d,
								duration: 3000
							});
							
						}
					}
				});
			}

		},
		onLoad() {
			let that = this
			let title = ''
			let ProductionReturnCreate_return_num = uni.getStorageSync('ProductionReturnCreate_return_num')
			if (ProductionReturnCreate_return_num) {
				that.ProductionReturnCreate_return_num = parseInt(ProductionReturnCreate_return_num)
			} else {
				that.ProductionReturnCreate_return_num = 1
			}
			if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateProductReturn') { //生产退料（生单）
				// that.left_text = '生产退料(生单)'
				that.input_focus_b = true//生产工单号
				that.left_text = that.i18n.left_text_a
				title = that.i18n.page_title_a
				that.GetNewBillCode_url = 'api/services/wmspda/GenerateProductReturn/GetNewBillCode'
				that.VerifyMoCode_url = 'api/services/wmspda/GenerateProductReturn/VerifyMoCode'
				that.VreifyWarehouseCode_url = 'api/services/wmspda/GenerateProductReturn/VreifyWarehouseCode'
				that.VreifyBarcode_url = 'api/services/wmspda/GenerateProductReturn/VreifyBarcode'
				that.Generate_url = 'api/services/wmspda/GenerateProductReturn/Generate'
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateOutSourceReturn') { //委外退料（生单）
				// that.left_text = '委外退料(生单)'
				that.input_focus_c = true // 仓库编号
				that.left_text = that.i18n.left_text_b
				title = that.i18n.page_title_b
				that.GetNewBillCode_url = 'api/services/wmspda/GenerateProductReturn/GetNewBillCode'
				that.VreifyWarehouseCode_url = 'api/services/wmspda/GenerateOutSourceReturn/VreifyWarehouseCode'
				that.VreifyBarcode_url = 'api/services/wmspda/GenerateOutSourceReturn/VreifyBarcode'
				that.Generate_url = 'api/services/wmspda/GenerateOutSourceReturn/Generate'
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.CreateSalesReturn') { //销售退料（生单）
				// that.left_text = '销售退料(生单)'
				that.input_focus_f = true // 客户编号
				that.input_f_show = true
				that.input_g_show = true
				that.left_text = that.i18n.left_text_c
				title = that.i18n.page_title_c
				that.GetNewBillCode_url = 'api/services/wmspda/GenerateSalesReturn/GetNewBillCode'
				that.VerifyMoCode_url = 'api/services/wmspda/GenerateSalesReturn/VreifyCustomerCode'
				that.VreifyWarehouseCode_url = 'api/services/wmspda/GenerateSalesReturn/VreifyWarehouseCode'
				that.VreifyBarcode_url = 'api/services/wmspda/GenerateSalesReturn/VreifyBarcode'
				that.Generate_url = 'api/services/wmspda/GenerateSalesReturn/Generate'
			}
			let title_permissionName = uni.getStorageSync('title_permissionName')
			if (title_permissionName != '') {
				title = title_permissionName
			}
			uni.setNavigationBarTitle({
				title: title
			});
			// that.left_text = that.i18n.left_text
			that.right_text = that.i18n.right_text
			that.scan_input_text_a = that.i18n.scan_input_text_a
			that.placeholder_text_a = that.i18n.placeholder_text_a
			that.scan_input_text_b = that.i18n.scan_input_text_b
			that.placeholder_text_b = that.i18n.placeholder_text_b
			that.scan_input_text_c = that.i18n.scan_input_text_c
			that.placeholder_text_c = that.i18n.placeholder_text_c
			that.scan_input_text_d = that.i18n.scan_input_text_d
			that.placeholder_text_d = that.i18n.placeholder_text_d
			that.scan_input_text_e = that.i18n.scan_input_text_e
			that.placeholder_text_e = that.i18n.placeholder_text_e
			that.GetNewBillCode()
		}
	}
</script>

<style>
	.body_list {
		display: flex;
		line-height: 60upx;
		padding-left: 30upx;
		align-items: center;
		margin-top: 20upx;
	}

	.text_a {
		width: 150upx;
		text-align: right;
		font-size: 25upx;
	}

	.text_b {
		padding-left: 50upx;
		font-size: 25upx;
	}

	.text_right_area {
		display: flex;
		border: 1px solid #DDDDDD;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
		font-size: 25upx;

	}

	.text_right_area view {
		font-size: 25upx !important;
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

	.ProductionReturnCreate_read {
		border: 1px solid #DDDDDD;
		width: 520upx !important;
		border-radius: 10upx;
		margin: 10upx;
		height: 70upx;
		display: flex;
		align-items: center;
		padding: 0 5upx;
	}

	.ProductionReturnCreate_result {
		display: flex;
		color: #999999;
		font-size: 20upx;
		flex-direction: column;
		padding-left: 100upx;
	}
</style>
