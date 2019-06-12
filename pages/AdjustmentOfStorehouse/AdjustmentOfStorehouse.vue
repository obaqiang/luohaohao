<template>
	<view>

		<bindScanInput v-bind:scan_input_text="i18n.scan_input_text_a" v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_a"
		 v-bind:placeholder_text='i18n.placeholder_text_a' @input="onInputA" @work="scanInputSucA" v-model="Barcode" />
		<bindScanInput v-if="BarcodeAllowMultiLocation_show" v-bind:scan_input_text="i18n.scan_input_text_b"
		 v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_b" v-bind:placeholder_text='i18n.placeholder_text_b'
		 @input="onInputB" @work="scanInputSucB" v-model="SourceLocationCode" />
		<bindScanInput v-if="BarcodeAllowMultiLocation_show" v-bind:scan_input_text="i18n.scan_input_text_c"
		 v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_c" v-bind:placeholder_text='i18n.placeholder_text_c'
		 @input="onInputC" @work="scanInputSucC" v-model="Qty" v-bind:input_type="'number'" />
		<bindScanInput v-bind:scan_input_text="i18n.scan_input_text_d" v-bind:scan_icon_show="true" v-bind:input_focus="input_focus_d"
		 v-bind:placeholder_text='i18n.placeholder_text_d' @input="onInputD" @work="scanInputSucD" v-model="TargetLocationCode" />
		<view v-if="BarcodeAllowMultiLocation_show==false" class="purchase_list" v-for="(item,index) in barcodeInfo" :key="index">
			<view class="purchase_list_a">
				<text>{{item.locationCode}}</text>
				<text>{{item.materialCode}}</text>
			</view>
			<view class="purchase_list_a">

				<text>
					{{item.materialName}}
				</text>
				<text>
					{{item.qty}}
				</text>
			</view>
		</view>
		<view v-if="BarcodeAllowMultiLocation_show" class="purchase_list" v-for="(item,index) in storageLotInfo" @tap="choLocation(item.locationCode,item.qty)"
		 :key="index">
			<view class="purchase_list_a">
				<text>{{item.locationCode}}</text>
				<text>{{item.materialCode}}</text>
			</view>
			<view class="purchase_list_a">

				<text>
					{{item.materialName}}
				</text>
				<text>
					{{item.qty}}
				</text>
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
			loadingWait,
			bindScanInput,
		},

		data() {
			return {
				// scan_input_text_a: '物料条码',
				input_focus_a: true,
				// placeholder_text_a: '请输入物料条码',

				// scan_input_text_b: '源库位码',
				input_focus_b: false,
				// placeholder_text_b: '请输入源库位码',

				// scan_input_text_c: '数量',
				input_focus_c: false,
				// placeholder_text_c: '请输入数量',

				// scan_input_text_d: '目的库位码',
				input_focus_d: false,
				// placeholder_text_d: '请输入目的库位码',

				Barcode: '',
				SourceLocationCode: '',
				Qty: '',
				TargetLocationCode: '',

				loading_wait_show: false,

				storageLotInfo: '',
				barcodeInfo: '',
				aa: 'wpq '

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
			i18n() {
				return this.$t('AdjustmentOfStorehouse')
			},
			i18n_modal() {
				return this.$t('modal_text')
			},
			MAC() {
				return this.$store.state.MAC

			},
			BarcodeAllowMultiLocation_show() {
				return uni.getStorageSync('BarcodeAllowMultiLocation_show')
			}
		},

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			initInputStatus() {
				this.input_focus_a = false
				this.input_focus_b = false
				this.input_focus_c = false
				this.input_focus_d = false
			},
			initData() {
				this.Barcode = ''
				this.SourceLocationCode = ''
				this.Qty = ''
				this.TargetLocationCode = ''
				this.storageLotInfo = ''
				this.barcodeInfo = ''
				this.input_focus_a = true
			},
			onInputA(val) {
				this.initInputStatus()
				this.input_focus_a = true
				this.Barcode = val;
			},
			scanInputSucA(e) {
				this.initInputStatus()
				this.ScanBarcode()
			},
			onInputB(val) {
				this.initInputStatus()
				this.input_focus_b = true
				this.SourceLocationCode = val;
			},
			scanInputSucB(e) {
				this.initInputStatus()
				this.input_focus_c = true
			},
			onInputC(val) {
				this.initInputStatus()
				this.input_focus_c = true
				this.Qty = val;
			},
			scanInputSucC(e) {
				this.initInputStatus()
				this.input_focus_d = true
			},
			onInputD(val) {
				this.initInputStatus()
				this.input_focus_d = true
				this.TargetLocationCode = val;
			},
			scanInputSucD(e) {
				this.initInputStatus()
				this.Adjust()
			},
			choLocation(location_code, qty) {
				let that = this

				that.SourceLocationCode = location_code
				that.Qty = qty
				// that.placeholder_text_b = location_code
				// qty+='' //将number类型的qty转为 字符串，是为了 防止发生报错 Invalid prop: type check failed for prop
				// that.placeholder_text_c = qty
				that.initInputStatus()
				that.input_focus_d = true

			},
			ScanBarcode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/LocationAdjust/ScanBarcode',
					data: {
						Barcode: that.Barcode,
						MAC: that.MAC,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.storageLotInfo = res.data.result.storageLotInfo
							let arr = []
							arr.push(res.data.result.barcodeInfo)
							that.barcodeInfo = arr
							if (that.BarcodeAllowMultiLocation_show) { //开启一码多库
								that.input_focus_b = true
							} else {
								that.input_focus_d = true
								// 								that.Qty = that.barcodeInfo.qty
								// 								that.SourceLocationCode = that.barcodeInfo.locationCode
							}
							console.log(that.barcodeInfo)
							console.log(that.BarcodeAllowMultiLocation_show)
						} else {
							that.Barcode = ''
							that.initInputStatus()
							that.input_focus_a = true
						}

					}

				});
			},
			Adjust() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/LocationAdjust/Adjust',
					data: {
						Barcode: that.Barcode,
						MAC: that.MAC,
						SourceLocationCode: that.SourceLocationCode,
						Qty: that.Qty,
						TargetLocationCode: that.TargetLocationCode
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
								// title: '库位调整成功',
								title: that.i18n.toast_text_a,
								duration: 3000
							});
							that.initInputStatus()
							that.initData()
						} else {
							that.TargetLocationCode = ''
							that.input_foc_d = true
						}

					}

				});
			}
		},
		onLoad() {
			let that = this
			console.log(this.BarcodeAllowMultiLocation_show)
			let title = ''
			let title_permissionName = uni.getStorageSync('title_permissionName')
			if (title_permissionName != '') {
				title = title_permissionName
			}
			uni.setNavigationBarTitle({
				title: title
			});
		}
	}
</script>

<style>
	.purchase_list {
		display: flex;
		flex-direction: column;
	}

	.purchase_list_a {
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		font-size: 25upx;
	}

	.purchase_list_b {
		padding-left: 20upx;
	}
</style>
