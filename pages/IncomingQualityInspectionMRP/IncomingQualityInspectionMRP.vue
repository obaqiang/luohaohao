<template>
	<view>
		<MaterialInformation />
		<QualityInspectionOperatioMRP v-bind:send_QCReview="QCReview" v-on:choQCReview="choQCReview" v-on:confirmInput="confirmInput"
		 v-on:confirmRemark="confirmRemark" />
		<view class="common_bot_btn" @tap="goWork">
			确认评审
		</view>
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import MaterialInformation from "../components/MaterialInformation/MaterialInformation.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import QualityInspectionOperatioMRP from "../components/QualityInspectionOperatioMRP/QualityInspectionOperatioMRP.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			MaterialInformation,
			QualityInspectionOperatioMRP,
			loadingWait
		},

		data() {
			return {
				loading_wait_show: false,
				QCReview: '',
				ReviewQty: '',
				Remark: ''
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
				return this.$t('PurchaseList')
			},
			MAC() {
				return this.$store.state.MAC
			},
			qualityInspection_data() {
				return uni.getStorageSync('qualityInspection_data')
			},
			Id() {
				return uni.getStorageSync('qualityInspection_data').id
			},
			SampleQty() {
				return uni.getStorageSync('qualityInspection_data').sampleQty
			},
			// 			NGQty() {
			// 				return uni.getStorageSync('qualityInspection_data').NGQty
			// 			},
			billDetailId() {
				return uni.getStorageSync('qualityInspection_data').billDetailId
			},
			materialId() {
				return uni.getStorageSync('qualityInspection_data').materialId
			},
			SampleCode() {
				return uni.getStorageSync('qualityInspection_data').sampleCode
			},
			rejectQtyStand() { //这是通过aql值请求接口返回的不良数判定值
				return uni.getStorageSync('rejectQty')
			},
			receiptQty() {
				return uni.getStorageSync('qualityInspection_data').receiptQty
			}
		},
		watch: {},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			SendMrpWorkFlow() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/SendMrpWorkFlow',
					data: {
						MAC: that.MAC,
						QCReview: that.QCReview,
						ReviewQty: that.ReviewQty,
						Remark: that.Remark,
						Id: that.Id
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
								title: '确认评审成功',
								duration: 3000
							});
							setTimeout(function() {
								uni.navigateBack({

								})
							}, 1000)

						}
					}
				});
			},
			goWork() {
				this.SendMrpWorkFlow()
			},
			choQCReview(e) { //选择评审结果
				console.log(e)
				this.QCReview = e
				if (e == 2) {

				} else if (e == 3) {
					this.ReviewQty = this.receiptQty
				} else if (e == 4) {
					this.ReviewQty = 0
				} else if (e == 1) {
					this.ReviewQty = this.passQty
				}
			},
			confirmInput(e) {
				this.ReviewQty = e
			},
			confirmRemark(e) {
				this.Remark = e
			}

		},
		onLoad() {
			this.choQCReview(2)
		}
	}
</script>

<style>
	page {
		background: #e7e7e7;
	}
</style>
