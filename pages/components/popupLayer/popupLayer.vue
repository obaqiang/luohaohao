<template>
	<view class="popupLayer">
		<view class="popupLayer_mask" @tap="cancelPop"></view>
		<view class="popupLayer_area">
			<view class="popupLayer_area_a">
				<text>{{i18n.popupLayer_a}}</text>
				<!-- <bindDateInput  v-bind:date_text="'开始时间'" v-on:choDate="choDate" /> -->
				<view class="popupLayer_area_a_date">
					<text>{{i18n.popupLayer_b}}</text>
					<picker mode="date" :value="date_a" :start="startDate" :end="endDate" @change="bindDateChangeA">
						<view class="popupLayer_picker">{{date_a}}</view>
					</picker>
				</view>
				<view class="popupLayer_area_a_date">
					<text>{{i18n.popupLayer_c}}</text>
					<picker mode="date" :value="date_b" :start="startDate" :end="endDate" @change="bindDateChangeB">
						<view class="popupLayer_picker">{{date_b}}</view>
					</picker>
				</view>
			</view>
			<view class="popupLayer_area_a">
				<text>{{i18n.popupLayer_d}}</text>
				<bindScanInput v-bind:scan_input_text="scan_input_text_a" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_a"
				 v-bind:placeholder_text='order_text_a' @input="onInputA" @work="scanInputSucA" v-model="input_data_a" />
				<bindScanInput v-bind:scan_input_text="scan_input_text_b" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_b"
				 v-bind:placeholder_text='order_text_b' @input="onInputB" @work="scanInputSucB" v-model="input_data_b" />
				<bindScanInput v-bind:scan_input_text="scan_input_text_c" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_c"
				 v-bind:placeholder_text='order_text_c' @input="onInputC" @work="scanInputSucC" v-model="input_data_c" />
				<bindScanInput v-bind:scan_input_text="scan_input_text_d" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_d"
				 v-bind:placeholder_text='order_text_d' @input="onInputD" @work="scanInputSucD" v-model="input_data_d" />
				<bindScanInput v-bind:scan_input_text="scan_input_text_e" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_e"
				 v-bind:placeholder_text='order_text_e' @input="onInputE" @work="scanInputSucE" v-model="input_data_e" />
			</view>
			<view class="popupLayer_area_a">
				<view class="popupLayer_area_a_date">
					<text>{{i18n.quality_result}}</text>
					<picker :value="index" @change="bindQcResultChange" :range="array">
						<view class="popupLayer_picker">{{array[index]}}</view>
					</picker>
				</view>
			</view>

			<!-- <view class="popupLayer_area_a">
				<text>扫描条码</text>
				
			</view> -->
			<view class="popupLayer_footer">
				<view class="popupLayer_footer_left" @tap="initData">{{i18n.popupLayer_e}}</view>
				<view class="popupLayer_footer_right" @tap="confirmPop">{{i18n.popupLayer_f}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bindScanInput from "../bindScanInput/bindScanInput.vue"
	import bindDateInput from "../bindDateInput/bindDateInput.vue"
	import {} from 'vuex'
	export default {
		props: ['date_a_show', 'date_b_show', 'input_data_a_show', 'input_data_b_show', 'input_data_c_show',
			'input_data_d_show', 'input_data_e_show', 'QcResult_show'
		],
		components: {
			bindScanInput,
			bindDateInput
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				text_right_area_icon: "../../static/img/text_right_area_icon.png",
				date_a: this.$t('IncomingQualityInspection').popupLayer_r,
				date_b: this.$t('IncomingQualityInspection').popupLayer_s,
				// 				date_a: this.date_a_show,
				// 				date_b: this.date_b_show,
				scan_input_text_a: this.$t('IncomingQualityInspection').popupLayer_g,
				scan_input_foc_a: true,
				order_text_a: this.$t('IncomingQualityInspection').popupLayer_h,

				scan_input_text_b: this.$t('IncomingQualityInspection').popupLayer_i,
				scan_input_foc_b: false,
				order_text_b: this.$t('IncomingQualityInspection').popupLayer_j,

				scan_input_text_c: this.$t('IncomingQualityInspection').popupLayer_k,
				scan_input_foc_c: false,
				order_text_c: this.$t('IncomingQualityInspection').popupLayer_l,

				scan_input_text_d: this.$t('IncomingQualityInspection').popupLayer_m,
				scan_input_foc_d: false,
				order_text_d: this.$t('IncomingQualityInspection').popupLayer_o,

				scan_input_text_e: this.$t('IncomingQualityInspection').popupLayer_p,
				scan_input_foc_e: false,
				order_text_e: this.$t('IncomingQualityInspection').popupLayer_q,

				input_data_a: '',
				input_data_b: '',
				input_data_c: '',
				input_data_d: '',
				input_data_e: '',
				QcResult: '',
				array: this.$t('IncomingQualityInspection').array,
				index: 0

			};
		},
		computed: {
			i18n() {
				return this.$t('IncomingQualityInspection')
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
		},
		watch: {
			date_a_show: {
				handler(new_val, old_val) {
					if (new_val != '') {
						this.date_a = new_val
					}
				},
				immediate: true
			},
			date_b_show: {
				handler(new_val, old_val) {
					if (new_val != '') {
						this.date_b = new_val
					}
				},
				immediate: true
			},
			input_data_a_show: {
				handler(new_val, old_val) {
					this.input_data_a = new_val
				},
				immediate: true
			},
			input_data_b_show: {
				handler(new_val, old_val) {
					this.input_data_b = new_val
				},
				immediate: true
			},
			input_data_c_show: {
				handler(new_val, old_val) {
					this.input_data_c = new_val
				},
				immediate: true
			},
			input_data_d_show: {
				handler(new_val, old_val) {
					this.input_data_d = new_val
				},
				immediate: true
			},
			input_data_e_show: {
				handler(new_val, old_val) {
					this.input_data_e = new_val
				},
				immediate: true
			},
			QcResult_show: {
				handler(new_val, old_val) {
					console.log(new_val)
					this.QcResult = new_val
					if (new_val == 1) {
						this.index = 0
					} else if (new_val == 2) {
						this.index = 1
					} else if (new_val == 3) {
						this.index = 2
					} else if (new_val == '') {
						this.index = 3
					}
				},
				immediate: true
			}
		},
		onNavigationBarButtonTap() {

		},
		methods: {

			cancelPop() {
				this.initData()
				this.$emit('cancelPop', true)
			},
			confirmPop() {
				this.$emit('workA', this.input_data_a)
				this.$emit('workB', this.input_data_b)
				this.$emit('workC', this.input_data_c)
				this.$emit('workD', this.input_data_d)
				this.$emit('workE', this.input_data_e)
				this.$emit('work', true)
			},
			bindQcResultChange(e) {
				console.log(e)
				this.index = e.target.value
				if (this.index == 0) { //质检合格
					this.QcResult = 1
				} else if (this.index == 1) { //待定
					this.QcResult = 2
				} else if (this.index == 2) { //不合格
					this.QcResult = 3
				} else if (this.index == 3) { //所有
					this.QcResult = ''
				}
				this.$emit('bindQcResultChange', this.QcResult)
			},
			bindDateChangeA(e) {
				this.date_a = e.target.value
				this.$emit('choDateA', e.target.value)
			},
			bindDateChangeB(e) {
				this.date_b = e.target.value
				this.$emit('choDateB', e.target.value)
			},
			initData() {
				this.date_a = this.$t('IncomingQualityInspection').popupLayer_r
				this.date_b = this.$t('IncomingQualityInspection').popupLayer_s
				this.input_data_a = ''
				this.input_data_b = ''
				this.input_data_c = ''
				this.input_data_d = ''
				this.input_data_e = ''
				this.index = 3
				this.QcResult = ''
			},
			initInputStatus() {
				this.scan_input_foc_a = false
				this.scan_input_foc_b = false
				this.scan_input_foc_c = false
				this.scan_input_foc_d = false
				this.scan_input_foc_e = false
			},
			onInputA(val) {
				this.initInputStatus()
				this.scan_input_foc_a = true
				this.input_data_a = val
			},
			onInputB(val) {
				this.initInputStatus()
				this.scan_input_foc_b = true
				this.input_data_b = val
			},
			onInputC(val) {
				this.initInputStatus()
				this.scan_input_foc_c = true
				this.input_data_c = val
			},
			onInputD(val) {
				this.initInputStatus()
				this.scan_input_foc_d = true
				this.input_data_d = val
			},
			onInputE(val) {
				this.initInputStatus()
				this.scan_input_foc_e = true
				this.input_data_e = val
			},
			scanInputSucA(e) { //用户点击完成按钮
				this.initInputStatus()
				this.scan_input_foc_b = true
			},
			scanInputSucB(e) { //用户点击完成按钮
				this.initInputStatus()
				this.scan_input_foc_c = true
				// this.$emit('workB', e.target.value)
			},
			scanInputSucC(e) { //用户点击完成按钮
				this.initInputStatus()
				this.scan_input_foc_d = true
				// this.$emit('workC', e.target.value)
			},
			scanInputSucD(e) { //用户点击完成按钮
				this.initInputStatus()
				this.scan_input_foc_e = true
				// this.$emit('workD', e.target.value)
			},
			scanInputSucE(e) { //用户点击完成按钮
				this.initInputStatus()
				// this.$emit('workE', e.target.value)
			},

			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
		},
		onLoad() {}
	}
</script>

<style>
	.popupLayer_mask {
		background: #000000;
		opacity: 0.2;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.popupLayer_area {
		position: absolute;
		width: 85%;
		z-index: 2;
		height: 150%;
		right: 0;
		top: 0;
		background: #FFFFFF;
		padding-bottom: 100upx;
	}

	.popupLayer_area_a {
		border-bottom: 1px solid #DDDDDD;
		padding-bottom: 20upx;
		font-size: 25upx;
	}

	.popupLayer_area_a text:nth-child(1) {
		margin: 20upx 30upx;
		display: block;
	}

	.popupLayer_area_a_date {
		display: flex;
		width: 100%;
		align-items: center;
		font-size: 25upx;
	}

	.popupLayer_picker {
		background: #f2f2f2;
		width: 250upx !important;
		text-align: center;
		border-radius: 10upx;
		font-size: 25upx;
	}

	.popupLayer_footer {
		position: fixed;
		width: 85%;
		display: flex;
		bottom: 0;
		right: 0;
		align-items: center;
		z-index: 3;
	}

	.popupLayer_footer_left {
		width: 50%;
		text-align: center;
		background: rgb(238, 238, 238);
		line-height: 100upx;
		color: rgb(160, 160, 160);
		font-size: 25upx;
	}

	.popupLayer_footer_right {
		width: 50%;
		text-align: center;
		line-height: 100upx;
		background: #FFB700;
		color: #FFFFFF;
		font-size: 25upx;
	}
</style>
