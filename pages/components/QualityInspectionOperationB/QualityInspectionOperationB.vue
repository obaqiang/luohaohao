<template>
	<view class="QualityInspectionOperation_area">

		<view class="QualityInspectionOperation_title">
			{{i18n.QualityInspectionOperationB_a}}
		</view>
		<!-- <button @tap="woCao">卧槽</button> -->
		<!-- <view class="QualityInspectionOperation_a">
				<text>{{i18n.QualityInspectionOperationB_b}}:</text>
				<text>
					{{receiveQty}}
				</text>
			</view> -->
		<view class="QualityInspectionOperation_in">
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperationB_c}}</text>
				<!-- 当前页面为普检2和高检2页面 只存在qcLevel==12或者qcLevel==22情况-->
				<!-- 普检1可修改 普检2根据“检验按钮”添加计算得出可修改 高检1不可修改 高检2不需要计算直接带出且不可修改 -->

				<!-- <text class="QualityInspectionOperation_in_list_text">{{num_a}}</text> -->
				<input v-if="qcLevel==12" class="QualityInspectionOperation_input" type="number" v-model="num_a" @input="calNumA">
				<text v-if="qcLevel==22" class="QualityInspectionOperation_in_list_text">{{num_a}}</text>
				<!-- <input v-if="sampleQty!=''" class="QualityInspectionOperation_input" type="number" @readonly="readonly" :value="sampleQty"> -->
			</view>
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperationB_d}}</text>
				<!-- <text v-if="qcLevel==21||qcLevel==11" class="QualityInspectionOperation_in_list_text">{{rejectQty}}</text> -->
				<input class="QualityInspectionOperation_input" type="number" v-model="num_b" @input="calNumB">
			</view>
		</view>
		<view class="QualityInspectionOperation_in">
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperationB_e}}</text>
				<input class="QualityInspectionOperation_input" type="number" v-model="num_c" @input="calNumC">
			</view>
			<view class="QualityInspectionOperation_in_list">
				<text>{{i18n.QualityInspectionOperationB_f}}</text>
				<text class="QualityInspectionOperation_in_list_text">{{num_d}}</text>
			</view>
		</view>

		<view class="err_code_table">
			<view class="err_code_head">
				<text>不良代码</text>
				<text>不良名称</text>
				<text>不良数</text>
			</view>
			<view class="err_code_body" v-for="(item,index) in err_code_table_items" :key="index">
				<text style="text-align: center;">{{item.errorCode}}</text>
				<text style="text-align: center;">{{item.errorName}}</text>
				<!-- <input type="number" @input="intInput(item.errorCode)"> -->
				<errInput style="width: 30%;" v-bind:qcValue="item.qcValue" v-bind:err_code="item.errorCode" v-on:intInput="intInput"/>
				<!-- <text>ttrter</text> -->
				<!-- <input type="number" @input="intInput"> -->
			</view>
		</view>

		<!-- 
		<view class="AcceptanceStandard_list">
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.QualityInspectionOperationB_g}}</view>
				<view>{{fatalQty_all}}</view>
			</view>
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.QualityInspectionOperationB_h}}</view>
				<view>{{seriousQty_all}}</view>
			</view>
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.QualityInspectionOperationB_i}}</view>
				<view>{{commonlyQty_all}}</view>
			</view>
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.QualityInspectionOperationB_j}}</view>
				<view>{{slightQty_all}}</view>
			</view>
		</view> -->
		<!-- 只有待检的才能有按钮 -->
		<!-- 	<view v-if="qcResult==2" class="QualityInspectionOperationB_list">
			<view style="font-size: 25upx;">{{i18n.QualityInspectionOperationB_k}}:</view>
			<input type="number" v-model="seq">
			<view @tap="plusNewModal">{{i18n.QualityInspectionOperationB_l}}</view>
		</view>
		<IncomingQualityInspectionBTable v-bind:send_data="send_data" v-on:longPress="longPress" />-->
		<view class="QualityInspectionOperation_foot">
			<text>{{i18n.quality_result}}</text>
			<text :class="{QualityInspectionOperation_foot_on:send_choose_stand==1}" @tap="chooseStand(1)">{{i18n.QualityInspectionOperationB_m}}</text>
			<text :class="{QualityInspectionOperation_foot_on:send_choose_stand==3}" @tap="chooseStand(3)">{{i18n.QualityInspectionOperationB_o}}</text>
		</view>
		<!-- 只有待检的才能提交 -->
		<view v-if="qcResult==2" class="common_bot_btn" @tap="subMit">{{i18n.QualityInspectionOperationB_p}}</view>


	</view>

</template>

<script>
	import IncomingQualityInspectionBTable from "../IncomingQualityInspectionBTable/IncomingQualityInspectionBTable.vue"
	import errInput from "../errInput/errInput.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		// props: ['IncomingQualityInspectionB_table_data'],
		// 		props: {
		// 			IncomingQualityInspectionB_table_data: {
		// 				type: Object
		// 			}
		// 		},
		props: ['send_data', 'send_choose_stand', 'show_table_data', 'default_result', 'err_code_table_items'],
		components: {
			IncomingQualityInspectionBTable,
			errInput
		},

		data() {
			return {
				num_a: '',
				num_b: '',
				num_c: '',
				num_d: '',
				check_ok: false,
				return_data: {},
				seq: '',
				choose_stand: this.send_choose_stand,
				cal_err_code_table_items: this.err_code_table_items
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
				if (uni.getStorageSync('qualityInspection_data').qcLevel == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').qcLevel
				}
			},
			rejectQtyStand() { //通过aql请求接口返回得不良数最大值，用来进行比较
				return uni.getStorageSync('rejectQtyStand')
			},
			rejectQty() {
				// return uni.getStorageSync('rejectQty')
				if (uni.getStorageSync('qualityInspection_data').rejectQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').rejectQty
				}
			},
			NGQty() { //不良数
				if (uni.getStorageSync('qualityInspection_data').ngQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').ngQty
				}
				// 				let fatalQty_all = 0
				// 				let items = this.send_data
				// 				for (let i = 0; i < items.length; i++) {
				// 					fatalQty_all += items[i].fatalQty
				// 				}
				// 				let seriousQty_all = 0
				// 				for (let i = 0; i < items.length; i++) {
				// 					seriousQty_all += items[i].seriousQty
				// 				}
				// 				let commonlyQty_all = 0
				// 				for (let i = 0; i < items.length; i++) {
				// 					commonlyQty_all += items[i].commonlyQty
				// 				}
				// 				let slightQty_all = 0
				// 				for (let i = 0; i < items.length; i++) {
				// 					slightQty_all += items[i].slightQty
				// 				}
				// 				let ngQty = fatalQty_all + seriousQty_all + commonlyQty_all + slightQty_all
				// 				return ngQty

			},

			IncomingQualityInspectionB_table_data() {
				// return uni.getStorageSync('IncomingQualityInspectionB_table_data')
				return this.send_data
			},
			sampleQty_in_table() { //table数据得长度相当于抽检数
				return this.send_data.length
			},
			NGQty_in_table() { //table中所有得不合格数量
				let items = this.send_data
				let qty = 0
				for (let i = 0; i < items.length; i++) {
					if (items[i].result == 3) {
						qty += 1
					}
				}
				return qty
			},
			fatalQty_all() { //所有得致命缺陷数量
				// let items = uni.getStorageSync('IncomingQualityInspectionB_table_data')
				let items = this.send_data
				let fatalQty_all = 0
				for (let i = 0; i < items.length; i++) {
					fatalQty_all += items[i].fatalQty
				}
				return fatalQty_all
			},
			seriousQty_all() { //所有得严重缺陷数量
				// let items = uni.getStorageSync('IncomingQualityInspectionB_table_data')
				let items = this.send_data
				let seriousQty_all = 0
				for (let i = 0; i < items.length; i++) {
					seriousQty_all += items[i].seriousQty
				}
				return seriousQty_all
			},
			commonlyQty_all() { //所有得一般缺陷数量
				// let items = uni.getStorageSync('IncomingQualityInspectionB_table_data')
				let items = this.send_data
				let commonlyQty_all = 0
				for (let i = 0; i < items.length; i++) {
					commonlyQty_all += items[i].commonlyQty
				}
				return commonlyQty_all
			},
			slightQty_all() { //所有得轻微缺陷数量
				// let items = uni.getStorageSync('IncomingQualityInspectionB_table_data')
				let items = this.send_data
				let slightQty_all = 0
				for (let i = 0; i < items.length; i++) {
					slightQty_all += items[i].slightQty
				}
				return slightQty_all
			},

			qcResult() {
				return uni.getStorageSync('qualityInspection_data').qcResult
			}
		},
		watch: {
			default_result: {
				handler(new_val, old_val) {
					if (new_val == 1) {
						this.check_ok = true
					} else if (new_val == 3) {
						this.check_ok = false
					}
				},
				immediate: true
			},
			sampleQty: {
				handler(new_val, old_val) {
					// 普检2抽检数和不良数可以反写 高检2为固定不变
					if (this.show_table_data == false) {
						this.num_a = new_val
					}

				},
				immediate: true
			},
			rejectQty: {
				handler(new_val, old_val) {
					if (this.show_table_data == false) {
						this.num_b = new_val
					}

				},
				immediate: true
			},
			NGQty: {
				handler(new_val, old_val) {
					// 普检2抽检数和不良数可以反写 高检2为固定不变
					if (this.show_table_data == false) {
						this.num_c = new_val
					}

				},
				immediate: true
			},
			show_table_data: {
				handler(new_val, old_val) {
					// 					if (new_val == true) { //此处将4个input弹框中得数据更新为检测弹框下方列表中得数据
					// 						
					// 						this.num_a = this.sampleQty_in_table
					// 						console.log(this.num_a)
					// 						this.num_c = this.NGQty_in_table
					// 					}
					// 					//计算不良率
					// 					this.num_d = this.Percentage(this.num_c, this.num_a)
				},
				immediate: true
			},
			send_data: {
				handler(new_val, old_val) {
					if (this.show_table_data == true) { //只有当show_table_data为true而且send_data发生变化时才能反写抽检数和不良数
						if (this.qcLevel == 12) { //且只有普检2 更新6个 高检2 更新5个
							this.num_a = this.sampleQty_in_table
							this.num_c = this.NGQty_in_table

						} else if (this.qcLevel == 22) {
							this.num_c = this.NGQty_in_table
						}

					}
					//计算不良率
					this.num_d = this.Percentage(this.num_c, this.num_a)
				},
				immediate: true
			}
		},
		methods: {
			...mapMutations(['initPosition']),
			Percentage(num, total) {
				let that = this
				if (total < 0 || total == 0) {
					// 					uni.showToast({
					// 						icon: 'none',
					// 						title: that.i18n.QualityInspectionOperation_k,
					// 						duration: 2000
					// 					});
					return 0
				} else if (num < 0) {
					// 					uni.showToast({
					// 						icon: 'none',
					// 						title: that.i18n.QualityInspectionOperation_l,
					// 						duration: 2000
					// 					});
					return 0
				} else {
					return (Math.round(num / total * 10000) / 100.00 + "%"); // 小数点后两位百分比
				}
			},
			woCao() {
				console.log(this.IncomingQualityInspectionB_table_data)
			},
			longPress(e) {
				this.$emit('longPress', e)
			},
			calNumA(e) {
				this.num_a = e.detail.value
				// <!-- 当前页面为普检2和高检2页面 只存在qcLevel==12或者qcLevel==22情况-->
				// <!-- 普检1可修改 普检2根据“检验按钮”添加计算得出可修改 高检1不可修改 高检2不需要计算直接带出且不可修改 -->
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
				// <!-- 当前页面为普检2和高检2页面 只存在qcLevel==12或者qcLevel==22情况-->
				// <!-- 普检1可修改 普检2根据“检验按钮”添加计算得出可修改 高检1不可修改 高检2不需要计算直接带出且不可修改 -->
				//普检1 普检2 手动选择合格不合格
				//高检1 高检2 请求不合格接口数量 通过手填值和不良数量（接口返回）进行比较 如果不良数量大于等于aql返回值 自动为不合格 反之为合格   也可以i进行手动选择

				this.num_d = this.Percentage(this.num_c, this.num_a)
				if (this.qcLevel == 22) {
					if (this.rejectQtyStand > this.num_c || this.rejectQtyStand == this.num_c) {
						this.check_ok = true
					} else {
						this.check_ok = false
					}
				}
			},
			chooseStand(e) {
				this.choose_stand = e
				this.$emit("chooseStand", e)
			},
			intInput(e) {
				let that = this
				console.log('wocao ')
				console.log(e)
				console.log(that.err_code_table_items)
				that.cal_err_code_table_items = that.err_code_table_items
				for (let i = 0; i < that.cal_err_code_table_items.length; i++) {
					if (e.err_code == that.cal_err_code_table_items[i].errorCode) {
						that.cal_err_code_table_items[i].qcValue = e.value
						// console.log('近年来')
						that.$emit('intInput',that.cal_err_code_table_items)
					}
				}
			},
			plusNewModal() {
				let that = this
				let reg = /^[0-9]*[1-9][0-9]*$/
				if (reg.test(that.seq)) {
					let IncomingQualityInspectionB_table_data = that.IncomingQualityInspectionB_table_data
					let repeat = false
					for (let i = 0; i < IncomingQualityInspectionB_table_data.length; i++) { //检测样品序号是否重复
						if (that.seq == IncomingQualityInspectionB_table_data[i].seq) {
							repeat = true
						}
					}
					if (that.seq == '') { //样品序号不能为空
						uni.showToast({
							icon: 'none',
							title: that.i18n.QualityInspectionOperationB_q,
							duration: 2000
						});
					} else if (repeat == true) { //样品序号不能重复
						uni.showToast({
							icon: 'none',
							title: that.i18n.QualityInspectionOperationB_r,
							duration: 2000
						});
					} else {
						that.$emit('plusNewModal', that.seq)
						that.initPosition()
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: that.i18n.showToast_new,
						duration: 2000
					});
				}



			},
			subMit() {
				let that = this
				that.return_data.SampleQty = that.num_a
				that.return_data.RejectQty = that.num_b
				that.return_data.NGQty = that.num_c
				that.$emit('subMit', that.return_data)

			}

		},
	}
</script>

<style>
	.QualityInspectionOperation_area {
		background: #FFFFFF;
		width: 700upx;
		display: block;
		margin: 0 25upx 125upx;
		border-radius: 10upx;
		padding-bottom: 30upx;
	}

	.QualityInspectionOperation_title {
		font-size: 28upx;
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

	.QualityInspectionOperation_in_list {
		display: flex;
		font-size: 25upx;
	}

	.QualityInspectionOperation_in_list text:nth-child(1) {
		text-align: right;
		width: 150upx;
		margin-right: 20upx;
		font-size: 25upx;
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
		color: red;
	}

	.QualityInspectionOperation_foot_on {
		background: #FFB700;
		font-size: 25upx;
	}

	.QualityInspectionOperation_in_list_text {
		width: 150upx;
		text-align: center;
		border: 1px solid #DDDDDD;
		height: 52.5upx;
		line-height: 50upx;
	}

	.AcceptanceStandard_list {
		width: 650upx;
		margin: auto;
		overflow: hidden;
	}

	.AcceptanceStandard_bl {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #ededf3;
		width: 260upx;
		border-radius: 4upx;
		float: left;
		margin: 25upx;
		font-size: 25upx;
	}

	.AcceptanceStandard_bl view:nth-child(1) {
		background: #ededf3;
		display: flex;
		height: 54upx;
		align-items: center;
		justify-content: center;
		font-size: 25upx;
		width: 260upx;
	}

	.AcceptanceStandard_bl view:nth-child(2) {
		display: flex;
		height: 54upx;
		align-items: center;
		justify-content: center;
		font-size: 25upx;
		width: 260upx;
	}

	.QualityInspectionOperationB_list {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: rgb(254, 239, 208);
		height: 100upx;
		font-size: 25upx;
	}

	.QualityInspectionOperationB_list input {
		border: 1px solid #DDDDDD;
		border-radius: 10upx;
		width: 200upx;
		background: #FFFFFF;
		height: 80upx;
		margin: 20upx;
		text-align: center;
		font-size: 25upx;
	}

	.QualityInspectionOperationB_list view:nth-child(3) {
		background: #FF7200;
		padding: 10upx 40upx;
		color: #FFFFFF;
		border-radius: 10upx;
		font-size: 25upx;
	}

	.err_code_table {
		width: 90%;
		margin: 20upx auto;
		border-radius: 5upx;
	}

	.err_code_head {
		background: #F2F2F2;
		display: flex;
		height: 70upx;
		align-items: center;
		/* justify-content: space-between; */

	}

	.err_code_head text {
		width: 33%;
		text-align: center;
	}

	.err_code_body {
		display: flex;
		border-bottom: 1px solid #DDDDDD;
		height: 70upx;
		align-items: center;
	}

	.err_code_body text {
		width: 33%;
		text-align: center;
	}

	.err_code_body input {
		text-align: center;
		
	}
</style>
