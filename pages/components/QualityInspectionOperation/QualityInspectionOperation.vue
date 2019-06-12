<template>
	<view class="QualityInspectionOperation_area">
		<view class="QualityInspectionOperation_title">
			{{i18n.QualityInspectionOperation_a}}
		</view>
		<!-- <view class="QualityInspectionOperation_a">
			<text>{{i18n.QualityInspectionOperation_b}}:</text>
			<text>
				{{receiveQty}}
			</text>
		</view> -->
		<view class="QualityInspectionOperation_in">
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperation_c}}</text>
				<!-- 当前页面为普检1和高检1页面 只存在qcLevel==11或者qcLevel==21情况-->
				<!-- 普检1可修改 普检2根据“检验按钮”添加计算得出 高检1不可修改 高检2不需要计算直接带出且不可修改 -->
				<input v-if="qcLevel==11" class="QualityInspectionOperation_input" type="number" v-model="num_a" @input="calNumA">
				<text v-if="qcLevel==21" class="QualityInspectionOperation_in_list_text">{{num_a}}</text>
				<!-- <text v-if="qcLevel==21||qcLevel==11" class="QualityInspectionOperation_in_list_text">{{num_a}}</text> -->
				<!-- 	<input v-if="qcLevel==11||qcLevel==12" class="QualityInspectionOperation_input" type="number" v-model="num_a"
				 @input="calNumA"> -->
				<!-- <text class="QualityInspectionOperation_input_text" v-if="qcLevel==21||qcLevel==22">{{num_a}}</text> -->
				<!-- <input v-if="qcLevel==21||qcLevel==22" class="QualityInspectionOperation_input" type="number" v-model="num_a"
				 @readonly="readonly" @input="calNumA"> -->
			</view>
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperation_d}}</text>
				<input class="QualityInspectionOperation_input" type="number" v-model="num_b" @input="calNumB">

			</view>
		</view>
		<view class="QualityInspectionOperation_in">
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperation_e}}</text>
				<input class="QualityInspectionOperation_input" type="number" v-model="num_c" @input="calNumC">
			</view>
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperation_f}}</text>
				<!-- <input class="QualityInspectionOperation_input" type="text" v-model="num_d"> -->
				<text class="QualityInspectionOperation_in_list_text">{{num_d}}</text>
			</view>
		</view>
		<!-- <view class="QualityInspectionOperation_table">
			<view class="QualityInspectionOperation_table_head">
				<text>不良代码</text>
				<text>不良原因</text>
				<text>不良数</text>
			</view>
			<view class="QualityInspectionOperation_table_body">
				<text>001</text>
				<text>表面不平</text>
				<text>0</text>
			</view>
			<view class="QualityInspectionOperation_table_body">
				<text>001</text>
				<text>表面不平</text>
				<text>0</text>
			</view>
			<view class="QualityInspectionOperation_table_body">
				<text>001</text>
				<text>表面不平</text>
				<text>0</text>
			</view>
		</view> -->
		<view class="QualityInspectionOperation_foot">
			<text>{{i18n.QualityInspectionOperation_g}}</text>
			<text :class="{QualityInspectionOperation_foot_on:check_ok}" @tap="choCheck(true)">{{i18n.QualityInspectionOperation_h}}</text>
			<text :class="{QualityInspectionOperation_foot_on:check_ok==false}" @tap="choCheck(false)">{{i18n.QualityInspectionOperation_i}}</text>
		</view>
		<view class="common_bot_btn" v-if="qcResult==2" @tap="subMit">{{i18n.QualityInspectionOperation_j}}</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['default_result'],
		components: {},

		data() {
			return {
				num_a: '',
				num_b: '',
				num_c: '',
				num_d: '',
				check_ok: false,
				return_data: {}
			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			i18n() {
				return this.$t('IncomingQualityInspection')
			},
			receiveQty() {
				if (uni.getStorageSync('qualityInspection_data').receiveQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').receiveQty
				}
			},
			sampleQty() {
				// 				if (uni.getStorageSync('qcLevel') == 11 || uni.getStorageSync('qcLevel') == 12) { //普检1普检2得时候可以输入
				// 					return ''
				// 				} else {
				// 					if (uni.getStorageSync('qualityInspection_data').sampleQty == null) {
				// 						return 0
				// 					} else {
				// 						return uni.getStorageSync('qualityInspection_data').sampleQty
				// 					}
				// 				}
				if (uni.getStorageSync('qualityInspection_data').sampleQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').sampleQty
				}
			},
			// 			aql() {
			// 				if (uni.getStorageSync('qualityInspection_data').aql == null) {
			// 					return 0
			// 				} else {
			// 					return uni.getStorageSync('qualityInspection_data').aql
			// 				}
			// 			},
			qcLevel() {
				// return uni.getStorageSync('qcLevel')
				return uni.getStorageSync('qualityInspection_data').qcLevel

			},
			rejectQtyStand() { //通过aql请求接口返回得不良数最大值，用来进行比较
				return uni.getStorageSync('rejectQtyStand')
			},
			rejectQty() {
				if (uni.getStorageSync('qualityInspection_data').rejectQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').rejectQty
				}
			},
			qcResult() {
				return uni.getStorageSync('qualityInspection_data').qcResult
			},
			NGQty() {
				if (uni.getStorageSync('qualityInspection_data').ngQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').ngQty
				}
			}

		},
		watch: {
			sampleQty: {
				handler(new_val, old_val) {
					this.num_a = new_val
				},
				immediate: true
			},
			rejectQty: {
				handler(new_val, old_val) {
					this.num_b = new_val
				},
				immediate: true
			},
			NGQty: {
				handler(new_val, old_val) {
					// console.log('这里的不良数')
					// console.log(new_val)
					this.num_c = new_val
					this.num_d = this.Percentage(this.num_c, this.num_a)
					// console.log('计算得到的不良率'+this.num_d)
				},
				immediate: true
			},
			default_result: {
				handler(new_val, old_val) {
					if (new_val == 1) {
						this.check_ok = true
					} else if (new_val == 3) {
						this.check_ok = false
					}
				},
				immediate: true
			}
		},
		methods: {
			Percentage(num, total) {
				let that = this
				if (total < 0 || total == 0) {
					return 0 + '%'
				} else if (num < 0) {
					return 0 + '%'
				} else {
					return (Math.round(num / total * 10000) / 100.00 + "%"); // 小数点后两位百分比
				}
			},
			// <!-- 当前页面为普检1和高检1页面 只存在qcLevel==11或者qcLevel==21情况-->
			calNumA(e) {
				this.num_a = e.detail.value
				if (this.num_a == 0) {

				} else {
					this.num_d = this.Percentage(this.num_c, this.num_a)
				}
			},
			calNumB(e) {
				this.num_b = e.detail.value
			},
			calNumC(e) {
				this.num_c = e.detail.value
				// <!-- 当前页面为普检1和高检1页面 只存在qcLevel==11或者qcLevel==21情况-->
				//普检1 普检2 手动选择合格不合格
				//高检1 高检2 请求不合格接口数量 通过手填值和不良数量（接口返回）进行比较 如果不良数量大于等于aql返回值 自动为不合格 反之为合格   也可以i进行手动选择

				this.num_d = this.Percentage(this.num_c, this.num_a)
				if (this.qcLevel == 21) {
					if (this.rejectQtyStand > this.num_c || this.rejectQtyStand == this.num_c) {
						this.check_ok = true
					} else {
						this.check_ok = false
					}
				}

			},
			choCheck(e) {
				this.check_ok = e
			},
			subMit() {
				let that = this
				that.return_data.SampleQty = that.num_a
				that.return_data.NGQty = that.num_c
				that.return_data.RejectQty = that.num_b
				if (that.check_ok == true) {
					that.return_data.QCResult = 1
				} else {
					that.return_data.QCResult = 3
				}
				if (that.num_a == 0) {
					uni.showToast({
						icon: 'none',
						title: that.i18n.QualityInspectionOperation_m,
						duration: 2000
					});
				} else {
					that.$emit('subMit', that.return_data)
				}
				// that.$emit('subMit', that.return_data)
			}

		},
	}
</script>

<style>
	.QualityInspectionOperation_area {
		background: #FFFFFF;
		width: 700upx;
		display: block;
		margin: 25upx;
		border-radius: 10upx;
		padding-bottom: 30upx;
	}

	.QualityInspectionOperation_title {
		font-size: 25upx;
		font-weight: bold;
		border-bottom: 1px solid #DDDDDD;
		line-height: 72upx;
		padding-left: 30upx;
	}

	.QualityInspectionOperation_a {
		display: flex;
		align-items: center;
		padding-left: 40upx;
		height: 72upx;
	}

	.QualityInspectionOperation_in {
		display: flex;
		height: 72upx;
		align-items: center;
	}

	.QualityInspectionOperation_input {
		border: 1px solid #DDDDDD;
		border-radius: 4upx;
		text-align: center;
		padding: 0;
		width: 150upx;
	}

	.QualityInspectionOperation_input_text {
		width: 250upx;
		border: 1px solid #DDDDDD;
		text-align: center;

	}

	.QualityInspectionOperation_in_list {
		display: flex;
		font-size: 25upx;
	}

	.QualityInspectionOperation_in_list_text {
		width: 150upx;
		text-align: center;
		border: 1px solid #DDDDDD;
		height: 52.5upx;
	}

	.QualityInspectionOperation_in_list text:nth-child(1) {
		text-align: right;
		width: 150upx;
		margin-right: 20upx;
	}

	.QualityInspectionOperation_table {
		width: 650upx;
		border: 1px solid #d7d7dd;
		margin: 20upx auto;
		border-radius: 4upx;

	}

	.QualityInspectionOperation_table_head {
		display: flex;
		background: #ededf3;
		height: 72upx;
		align-items: center;
	}

	.QualityInspectionOperation_table_head text {
		width: 210upx;
		text-align: center;
		font-size: 26upx;
	}

	.QualityInspectionOperation_table_body {
		display: flex;
		background: #ffffff;
		height: 72upx;
		align-items: center;
		border-bottom: 1px solid #DDDDDD;
	}

	.QualityInspectionOperation_table_body text {
		width: 210upx;
		text-align: center;
		font-size: 26upx;
	}

	.QualityInspectionOperation_foot {
		height: 100upx;
		display: flex;
		align-items: center;
		font-size: 25upx;
		margin-top: 50upx;
	}

	.QualityInspectionOperation_foot text:nth-child(1) {
		margin-left: 100upx;
	}

	.QualityInspectionOperation_foot text:nth-child(2) {

		padding: 20upx 40upx;
		border-radius: 10upx;
		margin-left: 30upx;

	}

	.QualityInspectionOperation_foot text:nth-child(3) {
		padding: 20upx 40upx;
		border-radius: 10upx;
		margin-left: 30upx;
		color: red !important;
	}

	.QualityInspectionOperation_foot_on {
		background: #FFB700;
	}
</style>
