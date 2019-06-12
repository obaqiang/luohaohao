<template>
	<view>
		<view class='RecordModal_show_modal_mask'></view>
		<view class="RecordModal_show_modal_area">
			<view class="RecordModal_show_modal_header">
				设置
			</view>
			<view class="RecordModal_show_modal_body">
				<view class="RecordModal_show_modal_body_list">
					<text>样品编号:</text>
					<text>{{seq_show}}</text>
				</view>
				<view class="RecordModal_show_modal_body_list">
					<text>检验项目:</text>
					<text>{{checkItemName}}</text>
				</view>
				<view class="RecordModal_show_modal_body_list">
					<text>检验方式:</text>
					<text>{{judgeType}}</text>
				</view>
				<view v-if="resultType=='Value'" class="RecordModal_show_modal_body_list">
					<text>测量值:</text>
					<input class="RecordModal_show_modal_body_list_input" type="number" v-model="test_data" 
					 @input="testConfirm">
				</view>
				<view v-if="resultType=='Value'" class="RecordModal_show_modal_body_list">
					<text>范围:</text>
					<text>{{limitLow}}~{{limitHigh}}({{unit}})</text>
				</view>
				<view class="RecordModal_show_modal_body_list">
					<text>质检结果:</text>
					<view class="RecordModal_show_modal_body_list_new">
						<text :class="{IncomingQualityInspectionBPlusModal_ok:check_ok}" @tap="choCheck(true)">合格</text>
						<text :class="{IncomingQualityInspectionBPlusModal_ok:check_ok==false}" @tap="choCheck(false)">不合格</text>
					</view>

				</view>
				<view class="RecordModal_show_modal_body_list" v-if="check_ok==false">
					<text>不良原因:</text>
					<picker class="IncomingQualityInspectionBPlusModal_picker" v-if="reason!=''" @change="bindPickerChange" :value="index"
					 :range="reason" range-key="errorName">
						<view class="uni-input">{{reason[index].errorName}}</view>
					</picker>
				</view>

			</view>
			<!-- <input type="text"> -->
			<view class="RecordModal_show_modal_footer">
				<!-- <button class="RecordModal_show_modal_footer_btn_left_a" @tap="showModalBtnA(1)">{{i18n.delete_text}}</button> -->
				<button v-if="modal_index!=0" class="RecordModal_show_modal_footer_btn_left_b" @tap="showModalBtn(0)">上一步</button>
				<button v-if="modal_num>1" class="RecordModal_show_modal_footer_btn_left_b" @tap="showModalBtn(1)">下一步</button>
				<!-- 只有待检的才能进行保存，否则只能进行查看 -->
				<button v-if="qcResult==2" class="RecordModal_show_modal_footer_btn_left_c" @tap="showModalBtn(2)">保存</button>
			</view>
			<image class="ali_close_icon" @tap="closeModal" :src="ali_close_icon"></image>

		</view>
		<!-- <view class="common_bot_btn">确认提交</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['IncomingQualityInspectionBPlusModal_data_show', 'reason_send', 'seq', 'modal_index',
			'modal_num', 'change_result', 'change_errorCodeId', 'change_test_data', 'submit_status'
		],
		components: {

		},
		watch: {
			seq:{
				handler(new_val,old_val){
					console.log('得到的seq:'+new_val)
				},
				immediate:true
			},
			IncomingQualityInspectionBPlusModal_data_show: {
				handler(new_val, old_val) {
					console.log(new_val)
				},
				immediate: true
			},
			reason_send: {
				handler(new_val, old_val) {
					let arr = []
					let arr_one = {
						defectGrade: '',
						errorCode: '',
						errorName: '请选择',
						id: ''
					}
					arr.push(arr_one)
					for (let i = 0; i < new_val.length; i++) {
						let arr_list = new_val[i]
						arr.push(arr_list)
					}
					console.log(arr)
					this.reason = arr
				},
				immediate: true
			},
			change_result: {
				handler(new_val, old_val) {
					if (this.submit_status == 'change') {
						this.check_ok = new_val
					}


				},
				immediate: true
			},
			change_errorCodeId: {
				handler(new_val, old_val) {
					if (this.submit_status == 'change') {
						this.index = 0
						for (let i = 0; i < this.reason.length; i++) {
							if (new_val == this.reason[i].id) {
								this.index = i
							}
						}
					}


				},
				immediate: true
			},
			change_test_data: {
				handler(new_val, old_val) {
					if (this.submit_status == 'change') {
						this.test_data = new_val

					}
				},
				immediate: true
			}
		},
		data() {
			return {
				// 声明新的变量是为了防止报错
				ali_close_icon: "../../static/img/ali_close_icon.png",
				new_data_f: this.data_f,
				new_data_g: this.data_g,
				focus_a: false,
				focus_b: false,

				index: 0,
				check_ok: true,
				test_data: '',
				defectGrade: '',
				errorCodeId: '',
				errorName: '',
				checkItemId_show: this.checkItemId,
				seq_show: this.seq,
				reason: ''


			};
		},
		computed: {
			i18n() {
				return this.$t('RecordModal')
			},
			checkItemName() {
				return this.IncomingQualityInspectionBPlusModal_data_show.checkItemName
			},
			// 			seq() {
			// 				return this.IncomingQualityInspectionBPlusModal_data_show.seq
			// 			},
			judgeType() {
				if (this.IncomingQualityInspectionBPlusModal_data_show.judgeType == '1') {
					return '自动判断'
				} else if (this.IncomingQualityInspectionBPlusModal_data_show.judgeType == '2') {
					return '人工判断'
				}
			},
			unit() {
				return this.IncomingQualityInspectionBPlusModal_data_show.unit
			},
			limitHigh() {
				return this.IncomingQualityInspectionBPlusModal_data_show.limitHigh
			},
			limitLow() {
				return this.IncomingQualityInspectionBPlusModal_data_show.limitLow
			},
			checkItemId() {
				return this.IncomingQualityInspectionBPlusModal_data_show.checkItemId
			},
			resultType() {
				return this.IncomingQualityInspectionBPlusModal_data_show.resultType
			},
			qcResult(){
				return uni.getStorageSync('qualityInspection_data').qcResult
			}
			// 			modal_data_user_cho() { //此数据用来保存用户在弹框中的选择操作的数据用于下一步上一步保存操作时记录数据
			// 				return uni.getStorageSync('modal_data_user_cho')
			// 			}

		},
		methods: {
			...mapMutations(['initPosition']),
			testConfirm(e) {
				let that = this
				that.test_data = e.detail.value
				if (that.test_data == '' || that.test_data < that.limitLow || that.test_data > that.limitHigh) {
					that.choCheck(false)
				} else {
					that.choCheck(true)
				}
				that.$emit('testConfirm', that.test_data)
			},
			choCheck(e) {
				this.check_ok = e
				if (e == false) { //如果为不合格，将检验项目id传值用来获取不良原因接口
					this.$emit('choCheck', this.checkItemId)
				} else {
					this.$emit('choCheck', e)
				}
			},
			bindPickerChange(e) { //修改地址
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value

				this.$emit('bindPickerChange', this.reason[this.index])
			},
			initFocus() {
				this.focus_a = false
				this.focus_b = false
			},
			initModalData() { //初始化弹框中的选择类型数据
				console.log('进入初始化')
				this.test_data = ''
				this.check_ok = true
				this.index = 0
				this.defectGrade = ''
				this.errorCodeId = ''
				this.errorName = ''
			},
			calBindChangeInfo(index) { //将that.index对应的defectGrade errorCodeId errorName 更新到弹框保存的modal_data_user_cho中去
				let that = this
				let reason = this.reason
				console.log(reason)
				let info = {}
				for (let i in reason) {
					if (i == index) {
						info.defectGrade = reason[index].defectGrade
						info.errorCodeId = reason[index].id
						info.errorName = reason[index].errorName
						info.checkItemId = that.checkItemId
						info.seq = that.seq_show
					}

				}
				return info
			},
			showModalBtn(e) { //用户点击下一步或者保存
				let that = this
				if (e == 0) { //上一步
					that.initModalData()
					// 用户每次点击上一步,都需要将表格中数据进行更新
					let modal_data_user_cho = uni.getStorageSync('modal_data_user_cho')
					console.log('点击上一步')
					console.log(modal_data_user_cho)
					for (let i in modal_data_user_cho) {
						console.log(i)
						console.log(that.modal_index)
						if (i == that.modal_index - 1) {
							console.log(i)
							that.test_data = modal_data_user_cho[i].test_data
							that.check_ok = modal_data_user_cho[i].check_ok
							that.index = modal_data_user_cho[i].index
							that.info = that.calBindChangeInfo(that.index)
						}
					}
				} else if (e == 1) { //下一步
					console.log('点击下一步')
					console.log(that.submit_status)
					let modal_data_user_cho = []
					if (that.modal_index == 0) { //如果是第一次点击下一步
						// uni.setStorageSync('modal_data_user_cho')
					} else {
						modal_data_user_cho = uni.getStorageSync('modal_data_user_cho')
					}
					let modal_data_user_cho_list = {}
					modal_data_user_cho_list.test_data = that.test_data
					modal_data_user_cho_list.check_ok = that.check_ok
					modal_data_user_cho_list.index = that.index
					modal_data_user_cho_list.info = that.calBindChangeInfo(that.index)
					modal_data_user_cho.push(modal_data_user_cho_list)
					uni.setStorageSync('modal_data_user_cho', modal_data_user_cho)
					if (that.submit_status == 'change') {

					} else if (that.submit_status == 'submit') {
						that.initModalData() //每次点击下一步都需要将弹框中的用户选择类型数据初始化
					}
				} else if (e == 2) { //保存
					if (that.modal_index == 0) { //如果第一个弹框就直接点击保存
						let modal_data_user_cho = []
						let modal_data_user_cho_list = {}
						modal_data_user_cho_list.test_data = that.test_data
						modal_data_user_cho_list.check_ok = that.check_ok
						modal_data_user_cho_list.index = that.index
						modal_data_user_cho_list.info = that.calBindChangeInfo(that.index)
						modal_data_user_cho.push(modal_data_user_cho_list)
						uni.setStorageSync('modal_data_user_cho', modal_data_user_cho)
					} else {
						let modal_data_user_cho_save = []
						let modal_data_user_cho = uni.getStorageSync('modal_data_user_cho')
						// 将存储的数据保存起来
						for (let i in modal_data_user_cho) {
							if (i < that.modal_index + 1) {
								let modal_data_user_cho_save_list = {}
								modal_data_user_cho_save_list.test_data = modal_data_user_cho[i].test_data
								modal_data_user_cho_save_list.check_ok = modal_data_user_cho[i].check_ok
								modal_data_user_cho_save_list.index = modal_data_user_cho[i].index
								modal_data_user_cho_save_list.info = that.calBindChangeInfo(modal_data_user_cho_save_list.index)
								modal_data_user_cho_save.push(modal_data_user_cho_save_list)
							}
						}
						// 再记录最新一次的操作数据
						let modal_data_user_cho_last = {}
						modal_data_user_cho_last.test_data = that.test_data
						modal_data_user_cho_last.check_ok = that.check_ok
						modal_data_user_cho_last.index = that.index
						modal_data_user_cho_last.info = that.calBindChangeInfo(that.index)
						modal_data_user_cho.push(modal_data_user_cho_last)
						uni.setStorageSync('modal_data_user_cho', modal_data_user_cho)
						// console.log('这里保存')
						console.log(uni.getStorageSync('modal_data_user_cho'))
					}
				}
				that.$emit('showModalBtn', e);
			},

			focusInput() {
				this.new_data_f = ''
			},
			initInput() {
				this.initPosition()
			},
			confirmInput() {
				this.initFocus()
				this.focus_b = true
			},
			closeModal() {
				this.$emit('closeModal', true)
			}

		},
		onLoad() {

		}
	}
</script>

<style>
	.RecordModal_show_modal_mask {
		width: 100%;
		height: 100%;
		background: #000000;
		opacity: 0.2;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.RecordModal_show_modal_area {
		position: fixed;
		width: 80%;
		left: 10%;
		z-index: 2;
		background: #FFFFFF;
		top: 300upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10upx;
	}

	.RecordModal_show_modal_header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100upx;
	}

	.RecordModal_show_modal_body {
		min-height: 100upx;
	}

	.RecordModal_show_modal_footer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		margin-bottom: 20upx;
		margin-top: 20upx;
	}

	.RecordModal_show_modal_footer_btn_right {
		background: #FF7200;
		color: #FFFFFF;
		font-size: 25upx;
		width: 200upx;
	}

	.RecordModal_show_modal_footer_btn_left_a {
		font-size: 25upx;
		width: 150upx;
		background: #cb2920;
		color: #ffffff;
	}

	.RecordModal_show_modal_footer_btn_left_b {
		font-size: 25upx;
		width: 150upx;
	}

	.RecordModal_show_modal_footer_btn_left_c {
		background: #FF7200;
		color: #FFFFFF;
		font-size: 25upx;
		width: 150upx;
	}

	.RecordModal_show_modal_footer_btn_left {
		font-size: 25upx;
		width: 200upx;
	}

	.RecordModal_show_modal_body_list {
		display: flex;
		align-items: center;
		font-size: 25upx;
		line-height: 60upx;
	}

	.RecordModal_show_modal_body_list_new {
		padding-left: 30upx;
	}

	.RecordModal_show_modal_body_list_new text {
		border: 1px solid #DDDDDD;
		border-radius: 10upx;
		padding: 10upx 20upx;
		margin: 10upx;
	}

	.IncomingQualityInspectionBPlusModal_ok {
		background: #FFB700;
		color: #FFFFFF;
	}

	.RecordModal_show_modal_body_list text:nth-child(1) {
		width: 130upx;
		text-align: right;
	}

	.RecordModal_show_modal_body_list text:nth-child(2) {
		margin-left: 50upx;
	}

	.RecordModal_show_modal_body_list_input {
		margin-left: 50upx;
		border: 1px solid #dddddd;
		border-radius: 10upx;
		padding-left: 10upx;
	}

	.RecordModal_show_modal_body_list_input:hover {
		border: 1px solid #FFB700 !important;
	}

	.IncomingQualityInspectionBPlusModal_picker {
		padding-left: 20upx;
	}

	.ali_close_icon {
		position: absolute;
		top: 10upx;
		right: 10upx;
		width: 50upx;
		height: 50upx;
	}
</style>
