<template>
	<view class="QualityInspectionOperation_area">
		<view class="QualityInspectionOperation_title">
			质检操作
			<text v-if="qcLevel==11">(普检1)</text>
			<text v-if="qcLevel==12">(普检2)</text>
			<text v-if="qcLevel==21">(高检1)</text>
			<text v-if="qcLevel==22">(高检2)</text>
		</view>
		<view class="QualityInspectionOperation_in">
			<view class="QualityInspectionOperation_in_list">
				<text>实收数</text>
				<text class="QualityInspectionOperation_in_list_text">{{receiveQty}}</text>
			</view>
			<view class="QualityInspectionOperation_in_list">
				<text>送检数</text>
				<text class="QualityInspectionOperation_in_list_text">{{sampleQty}}</text>
			</view>
		</view>
		<view class="QualityInspectionOperation_in">
			<view class="QualityInspectionOperation_in_list">
				<text>合格数</text>
				<text class="QualityInspectionOperation_in_list_text">{{passQty}}</text>
			</view>
			<view class="QualityInspectionOperation_in_list">
				<text>不良数</text>
				<text class="QualityInspectionOperation_in_list_text">{{ngQty}}</text>
			</view>
		</view>
		<view class="QualityInspectionOperation_in">
			<view class="QualityInspectionOperation_in_list">
				<text>拒收数</text>
				<text class="QualityInspectionOperation_in_list_text">{{rejectQty}}</text>
			</view>
			<view class="QualityInspectionOperation_in_list">
				<text>不良率</text>
				<text class="QualityInspectionOperation_in_list_text">{{per}}</text>
			</view>
		</view>
		<view class="QualityInspectionOperatioMRP_result">
			<text>评审结果</text>
			<text :class="{QualityInspectionOperatioMRP_on:QCReview==2}" @tap="choQCReview(2)">挑选</text>
			<text :class="{QualityInspectionOperatioMRP_on:QCReview==3}" @tap="choQCReview(3)">特采</text>
			<text :class="{QualityInspectionOperatioMRP_on:QCReview==4}" @tap="choQCReview(4)">全退</text>
			<text :class="{QualityInspectionOperatioMRP_on:QCReview==1}" @tap="choQCReview(1)">正采</text>
		</view>
		<!-- // 挑选 合格数量 可修改
			// 特采  实收数 不可修改
			// 全退  0
			// 正采 合格数 -->
		<view class="QualityInspectionOperatioMRP_result_in">
			<text>挑选/特采</text>

			<input class="QualityInspectionOperatioMRP_result_in_input" v-if="QCReview==2" type="number" v-model="num_receiveQty"
			 placeholder="请输入挑选数量(或特采)" @input="confirmInput" @confirm="confirmInput">

			<!-- <view v-if="QCReview!=1">
				<text class="QualityInspectionOperatioMRP_result_in_text" v-if="QCReview==2">{{receiptQty}}</text>
				<text class="QualityInspectionOperatioMRP_result_in_text" v-if="QCReview==3">0</text>
				<text class="QualityInspectionOperatioMRP_result_in_text" v-if="QCReview==4">{{receiveQty}}</text>
			</view> -->
			<view v-if="QCReview!=2">
				<text class="QualityInspectionOperatioMRP_result_in_text" v-if="QCReview==3">{{receiptQty}}</text>
				<text class="QualityInspectionOperatioMRP_result_in_text" v-if="QCReview==4">0</text>
				<text class="QualityInspectionOperatioMRP_result_in_text" v-if="QCReview==1">{{num_new}}</text>
			</view>
			<text>数量</text>
		</view>
		<view class="QualityInspectionOperatioMRP_result_remark">
			<text>备注</text>
			<input type="text" placeholder="请输入备注信息" @confirm="confirmRemark">
		</view>
		<view v-if="qcLevel==11">

		</view>
		<view v-if="qcLevel==12||qcLevel==22">
			<view class="QualityInspectionOperation_title">
				不良原因
			</view>
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>致命不良</text>
					<text class="QualityInspectionOperation_in_list_text">
						<text v-if="fatalQty!=null">{{fatalQty}}</text>
						<text v-if="fatalQty==null">0</text>
					</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>严重不良</text>
					<text class="QualityInspectionOperation_in_list_text">
						<text v-if="seriousQty!=null">{{seriousQty}}</text>
						<text v-if="seriousQty==null">0</text>
					</text>
				</view>
			</view>
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>一般不良</text>
					<text class="QualityInspectionOperation_in_list_text">
						<text v-if="commonlyQty!=null">{{commonlyQty}}</text>
						<text v-if="commonlyQty==null">0</text>
					</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>轻微不良</text>
					<text class="QualityInspectionOperation_in_list_text">
						<text v-if="slightQty!=null">{{slightQty}}</text>
						<text v-if="slightQty==0">0</text>
					</text>
				</view>
			</view>
		</view>
		<view v-if="qcLevel==21||qcLevel==22">
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>标准水平</text>
					<text class="QualityInspectionOperation_in_list_text">{{levelCode}}</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>严格度</text>
					<text class="QualityInspectionOperation_in_list_text">{{strictLevel}}</text>
				</view>
			</view>
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>试样半码</text>
					<text class="QualityInspectionOperation_in_list_text">{{sampleCode}}</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>AQL数</text>
					<text class="QualityInspectionOperation_in_list_text">{{aql}}</text>
				</view>
			</view>
		</view>
		<!-- 	<view v-if="qcLevel==22">
			<view class="QualityInspectionOperation_title">
				不良原因
			</view>
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>致命不良</text>
					<text class="QualityInspectionOperation_in_list_text">{{fatalQty}}</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>严重不良</text>
					<text class="QualityInspectionOperation_in_list_text">{{seriousQty}}</text>
				</view>
			</view>
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>一般不良</text>
					<text class="QualityInspectionOperation_in_list_text">{{commonlyQty}}</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>轻微不良</text>
					<text class="QualityInspectionOperation_in_list_text">{{slightQty}}</text>
				</view>
			</view>
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>标准水平</text>
					<text class="QualityInspectionOperation_in_list_text">{{levelCode}}</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>严格度</text>
					<text class="QualityInspectionOperation_in_list_text">{{strictLevel}}</text>
				</view>
			</view>
			<view class="QualityInspectionOperation_in">
				<view class="QualityInspectionOperation_in_list">
					<text>试样半码</text>
					<text class="QualityInspectionOperation_in_list_text">{{sampleCode}}</text>
				</view>
				<view class="QualityInspectionOperation_in_list">
					<text>AQL数</text>
					<text class="QualityInspectionOperation_in_list_text">{{aql}}</text>
				</view>
			</view>
		</view> -->

	</view>

</template>

<script>
	import IncomingQualityInspectionBTable from "../IncomingQualityInspectionBTable/IncomingQualityInspectionBTable.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['send_QCReview'],
		components: {
			IncomingQualityInspectionBTable
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
				QCReview: this.send_QCReview,
				num_receiveQty: ''
			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			receiveQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').receiveQty)
			},
			rejectQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').rejectQty)
			},
			sampleQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').sampleQty)
			},
			passQty() {

				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').passQty)
			},
			ngQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').ngQty)
			},
			per() {
				return uni.getStorageSync('qualityInspection_data').per
			},
			fatalQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').fatalQty)
				// return uni.getStorageSync('qualityInspection_data').fatalQty
			},
			seriousQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').seriousQty)
				// return uni.getStorageSync('qualityInspection_data').seriousQty
			},
			commonlyQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').commonlyQty)
				// return uni.getStorageSync('qualityInspection_data').commonlyQty
			},
			slightQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').slightQty)
				// return uni.getStorageSync('qualityInspection_data').slightQty
			},
			levelCode() {
				return uni.getStorageSync('qualityInspection_data').levelCode
			},
			strictLevel() {
				return uni.getStorageSync('qualityInspection_data').strictLevel
			},
			sampleCode() {
				return uni.getStorageSync('qualityInspection_data').sampleCode
			},
			aql() {
				return uni.getStorageSync('qualityInspection_data').aql
			},
			qcLevel() {
				return uni.getStorageSync('qcLevel')
			},
			receiptQty() {
				return uni.getStorageSync('qualityInspection_data').receiptQty
			},
			num_receiveQty_get() { //挑选数量
				//挑选 数量=到货数-拒收数量
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').receiptQty) - this.$ifQtyIsNull(uni.getStorageSync(
					'qualityInspection_data').rejectQty)
			},
			num_new() { //正采数量
				//正采数量=到货数-拒收数量
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').receiptQty) - this.$ifQtyIsNull(uni.getStorageSync(
					'qualityInspection_data').rejectQty)

			}
		},
		watch: {
			num_receiveQty_get: {
				handler(new_val, old_val) {
					//挑选 数量=实收数-不良数	
					this.num_receiveQty = new_val
				},
				immediate: true
			}
			// 			receiveQty: {
			// 				handler(new_val, old_val) {
			// 					this.num_receiveQty = this.receiveQty
			// 				},
			// 				immediate: true
			// 			}
			// 			receiveQty: {
			// 				//挑选 数量=实收数-不良数	
			// 				handler(new_val, old_val) {
			// 					this.num_receiveQty = this.new_val - this.ngQty
			// 				},
			// 				immediate: true
			// 			},
			// 			passQty: {
			// 				handler(new_val, old_val) {
			// 					this.num_receiveQty = new_val
			// 				},
			// 				immediate: true
			// 			}
		},
		methods: {
			...mapMutations(['initPosition']),
			...mapMutations(['ifQtyIsNull']),
			choQCReview(e) {
				this.QCReview = e
				this.$emit('choQCReview', e)
			},
			confirmInput(e) {
				console.log(e.detail.value)
				this.$emit('confirmInput', e.detail.value)
			},
			confirmRemark(e) {
				this.$emit('confirmRemark', e.detail.value)
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
	}

	.QualityInspectionOperation_in_list {
		display: flex;
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
		font-size: 28upx;
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
	}

	.QualityInspectionOperation_foot_on {
		background: #FFB700;
	}

	.QualityInspectionOperation_in_list_text {
		width: 150upx;
		text-align: center;
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
		width: 160upx;
		border-radius: 4upx;
		float: left;
		margin: 25upx;
	}

	.AcceptanceStandard_bl view:nth-child(1) {
		background: #ededf3;
		display: flex;
		height: 54upx;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		width: 160upx;
	}

	.AcceptanceStandard_bl view:nth-child(2) {
		display: flex;
		height: 54upx;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		width: 160upx;
	}

	.QualityInspectionOperationB_list {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: rgb(254, 239, 208);
		height: 100upx;
	}

	.QualityInspectionOperationB_list input {
		border: 1px solid #DDDDDD;
		border-radius: 10upx;
		width: 200upx;
		background: #FFFFFF;
		height: 80upx;
		margin: 20upx;
		text-align: center;
	}

	.QualityInspectionOperationB_list view:nth-child(3) {
		background: #FF7200;
		padding: 10upx 40upx;
		color: #FFFFFF;
		border-radius: 10upx;
	}

	.QualityInspectionOperatioMRP_result {
		display: flex;
		justify-content: space-between;
		padding: 0 50upx;
		border-top: 1px solid #DDDDDD;
		border-bottom: 1px solid #DDDDDD;
		align-items: center;
		height: 100upx;
	}

	.QualityInspectionOperatioMRP_result text:not(:first-child) {
		border: 1px solid #DDDDDD;
		padding: 10upx 20upx;
		border-radius: 10upx;
	}

	.QualityInspectionOperatioMRP_result_in {
		display: flex;
		justify-content: space-between;
		padding: 0 50upx;
		align-items: center;
		height: 100upx;
	}

	.QualityInspectionOperatioMRP_result_remark {
		display: flex;
		padding: 0 50upx;
		align-items: center;
		height: 100upx;
	}

	.QualityInspectionOperatioMRP_result_remark text {
		width: 100upx;
		text-align: right;
		padding-right: 50upx;
	}

	.QualityInspectionOperatioMRP_result_remark input {
		border: 1px solid #DDDDDD;
		border-radius: 10upx;
		padding: 5upx 10upx;
	}

	.QualityInspectionOperatioMRP_on {
		border-color: #FFB700 !important;
		color: #FFB700 !important;
	}

	.QualityInspectionOperatioMRP_result_in_input {
		text-align: center;
		border: 1px solid #DDDDDD;
		width: 300upx;
		border-radius: 5upx;
		padding: 5upx 0;
	}

	.QualityInspectionOperatioMRP_result_in_input input {
		text-align: center;
		border: 1px solid #DDDDDD !important;
		width: 300upx;
		border-radius: 5upx;
		height: 52.5upx;
		line-height: 52.5upx;
		padding: 0;
	}

	.QualityInspectionOperatioMRP_result_in_text {
		border: 1px solid #DDDDDD !important;
		width: 300upx !important;
		display: block;
		text-align: center;
		border-radius: 5upx;
		height: 52.5upx;
		line-height: 52.5upx;
		padding: 0 !important;
	}
</style>
