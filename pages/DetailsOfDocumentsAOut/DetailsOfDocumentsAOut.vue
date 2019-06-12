<template>
	<view>
		<SwitchTitle v-bind:switchtitletext="i18n.switchtitletext" v-bind:isShowAll="isShowAll" v-on:sucFuc="sucFuc"
		 v-bind:switch_title_head_right_text="i18n.switch_title_head_right_text" />
		<bgLine />
		<DetailsOfRejectionOrdersPurchaseList v-bind:data_list="data_list" v-bind:a_text="i18n.a_text" v-bind:b_text="i18n.b_text"
		 v-bind:c_text="i18n.c_text" v-bind:d_text="i18n.d_text" v-bind:e_text="i18n.e_text" />
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import bgLine from "../components/bgLine/bgLine.vue"
	import SwitchTitle from "../components/SwitchTitle/SwitchTitle.vue"
	import DetailsOfRejectionOrdersPurchaseList from "../components/DetailsOfRejectionOrdersPurchaseList/DetailsOfRejectionOrdersPurchaseList.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			bgLine,
			SwitchTitle,
			DetailsOfRejectionOrdersPurchaseList,
			loadingWait
		},

		data() {
			return {
				// 				switchtitletext: '',
				// 				switch_title_head_right_text:"",
				loading_wait_show: false,
				isShowAll: false,
				BillCode: '',
				data_list: ''
			};
		},
		computed: {
			i18n() {
				return this.$t('DetailsOfDocumentsAOut')
			},
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
		},

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			sucFuc(e) {
				this.isShowAll = e
				this.GetOutSourceReturnDetail()
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			GetOutSourceReturnDetail() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/OutSourceReturn/GetOutSourceReturnDetail',
					data: {
						MAC: that.MAC,
						BillCode: that.BillCode,
						isShowAll: that.isShowAll
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = false
						console.log(res.data)
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.data_list = res.data.result
							console.log(that.data_list)
						}

					}

				});
			}
		},
		onLoad() {
			// 			this.switchtitletext = this.i18n.switchtitletext
			// 			this.switch_title_head_right_text = this.i18n.switch_title_head_right_text
			this.receipts_data = uni.getStorageSync('OutsourcingReturnSheet_data')
			this.BillCode = this.receipts_data.billCode
			console.log(this.BillCode)
			this.GetOutSourceReturnDetail()
		}
	}
</script>

<style scoped="scoped">
	.DetailsOfDocumentsHead_head_area {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750upx;
		align-items: center;
		height: 80upx;
		background: #FFFFFF;
	}


	.head_right_text {
		margin-right: 10upx;
	}

	.DetailsOfDocumentsHead_head_text {
		margin-left: 10upx;
	}
</style>
