<template>
	<view>
		<PurchaseOrderInquiryHead v-bind:a_text="i18n.a_text" v-bind:b_text="i18n.b_text" v-bind:c_text="i18n.c_text" v-on:getAsnCode="getAsnCode" v-bind:input_focus="input_focus"/>
		<queryScan v-on:getCode="getCode" />
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import PurchaseOrderInquiryHead from "../components/PurchaseOrderInquiryHead/PurchaseOrderInquiryHead.vue"
	import queryScan from "../components/queryScan/queryScan.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			PurchaseOrderInquiryHead,
			queryScan,
			loadingWait
		},

		data() {
			return {
				BillCode: '',
				Asn_data: '',
				loading_wait_show:false,
				input_focus:true
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
				return this.$t('DeliveryOrderInquiry')
			},
		},

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			getAsnCode(e) {
				this.BillCode = e
				this.GetAsn()
				this.input_focus = false
			},
			getCode(e) {
				this.BillCode = e
				this.GetAsn()

			},
			GetAsn() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Asn/GetAsn', //仅为示例，并非真实接口地址。
					data: {
						MAC: that.MAC,
						BillCode: that.BillCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.Asn_data = res.data.result
							uni.setStorageSync('BillCode', that.BillCode)
							uni.setStorageSync('BillCodeDetail', that.Asn_data[0])
							uni.setStorageSync('BillId', that.Asn_data[0].id)
							uni.navigateTo({
								url: '../ItemInventoryAsn/ItemInventoryAsn'
							});
						}

					}

				});
			}

		},
		onLoad() {
		}
	}
</script>

<style>
	page {
		background: #e7e7e7;
	}
</style>
