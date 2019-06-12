<template>
	<view>
		<MaterialInformation />
		<QualityInspectionOperation v-on:subMit="subMit" v-bind:default_result = "default_result"/>
		<loadingWait v-if="loading_wait_show" />

	</view>
</template>

<script>
	import MaterialInformation from "../components/MaterialInformation/MaterialInformation.vue"
	import QualityInspectionOperation from "../components/QualityInspectionOperation/QualityInspectionOperation.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			MaterialInformation,
			QualityInspectionOperation,
			loadingWait
		},

		data() {
			return {
				SampleQty_to_submit: this.SampleQty,
				RejectQty_to_submit: this.rejectQty,
				NGQty_to_submit: this.NGQty,
				QCResult: '',
				loading_wait_show: false,
				default_result:""
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
				return this.$t('IncomingQualityInspection')
			},
			MAC() {
				return this.$store.state.MAC
			},
			Id() {
				return uni.getStorageSync('qualityInspection_data').id
			},
			SampleQty() {
				return uni.getStorageSync('qualityInspection_data').sampleQty
			},
			NGQty() {
				return uni.getStorageSync('qualityInspection_data').NGQty
			},
			rejectQty() {
				if (uni.getStorageSync('qualityInspection_data').rejectQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').rejectQty
				}
			},
			qcLevel() {
				return uni.getStorageSync('qualityInspection_data').qcLevel
			}
		},

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			SaveIqcNormal1() { //普检1提交
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/SaveIqcNormal1',
					data: {
						MAC: that.MAC,
						Id: that.Id,
						// SampleCode: that.SampleCode,
						SampleQty: that.SampleQty_to_submit,
						NGQty: that.NGQty_to_submit,
						RejectQty: that.RejectQty_to_submit,
						QCResult: that.QCResult
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
								title: that.i18n.alert_text_a,
								duration: 2000
							});
							setTimeout(function() { //使用  setTimeout（）方法设定定时2000毫秒
								uni.navigateBack({
								})
							}, 2000);
						}
					}
				});
			},
			subMit(e) {
				console.log(e)
				let that = this
				that.RejectQty_to_submit = e.RejectQty
				that.QCResult = e.QCResult
				that.SampleQty_to_submit = e.SampleQty
				that.NGQty_to_submit = e.NGQty
				this.SaveIqcNormal1()
			}


		},
		onLoad() {
			// this.MacInfo();
			//普检1 普检2 手动选择合格不合格
			//高检1 高检2 请求不合格接口数量 通过手填值和不良数量（接口返回）进行比较 如果不良数量大于等于aql返回值 自动为不合格 反之为合格   也可以i进行手动选择

			let that = this
			let title = ''
			if (that.qcLevel == 11) {
				title = that.i18n.page_title_a
			} else if (that.qcLevel == 12) {
				title = that.i18n.page_title_b
			} else if (that.qcLevel == 21) {
				title = that.i18n.page_title_c
			} else if (that.qcLevel == 22) {
				title = that.i18n.page_title_d
			}
			uni.setNavigationBarTitle({
				title: title
			});
			that.default_result = uni.getStorageSync('qualityInspection_data').qcResult
// 			console.log('默认的default_result'+that.default_result)
// 			console.log(that.default_result)

		}
	}
</script>

<style>
	page {
		background: #e7e7e7;
		padding-bottom: 150upx;
	}
</style>
