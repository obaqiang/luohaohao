<template>
	<view>
		<!-- <scanInput v-bind:placeholder_text="order_text" v-bind:scan_input_text="order" v-bind:scan_icon_show="true"
		 v-on:scanInputSuc="scanAInputSuc" />
		<scanInput v-bind:placeholder_text="supplier_text" v-bind:scan_input_text="supplier" v-bind:scan_icon_show="false"
		 v-on:scanInputSuc="scanBInputSuc" /> -->

		<bindScanInput v-bind:scan_input_text="order" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_a"
		 v-bind:placeholder_text='order_text' v-model="BillCode" @input="onInputA" @work="scanAInputSuc" />

		<bindScanInput v-bind:scan_input_text="supplier" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_b"
		 v-bind:placeholder_text='supplier_text' v-model="SupplierCode" @input="onInputB" @work="scanBInputSuc" />

		<button class="common_btn_fb" @tap="goSearch">{{i18n.search}}</button>
		<view class="purchase_list" v-for="(item,index) in result_list" @tap="goDetail(item.billCode)" :key="index">
			<view class="purchase_list_a">
				<text>{{item.billCode}}</text>
				<text>{{item.billDate}}</text>
			</view>
			<view class="purchase_list_b">
				{{item.supplierName}}
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
			bindScanInput
		},

		data() {
			return {
				order: '',
				order_text: '',
				supplier: '',
				supplier_text: '',
				BillCode: '',
				SupplierCode: '',
				Type: '',
				result_list: [],
				loading_wait_show: false,
				scan_input_foc_a: true,
				scan_input_foc_b: false

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
				return this.$t('OutsourcingReturnSheet')
			},
			i18n_modal() {
				return this.$t('modal_text')
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
			initInputStatus(){
				this.scan_input_foc_a = false
				this.scan_input_foc_b = false
			},
			onInputA(val) {
				this.initInputStatus()
				this.scan_input_foc_a = true
				this.BillCode = val;
			},
			onInputB(val) {
				this.initInputStatus()
				this.scan_input_foc_b = true
				this.SupplierCode = val;
			},
			GetOutSourceReturn() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/OutSourceReturn/GetOutSourceReturn',
					data: {
						BillCode: that.BillCode,
						// 						SupplierCode: that.SupplierCode,
						// 						Type: that.Type,
						MAC: that.MAC

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data);
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							for (let i = 0; i < res.data.result.length; i++) {
								// 								let date = res.data.result[i].billDate
								// 								date.slice(0, 10).replace('T', '')
								res.data.result[i].billDate = res.data.result[i].billDate.slice(0, 19).replace('T', ' ')
							}
							that.result_list = res.data.result
							// 							uni.navigateTo({
							// 								url: '../WarehousingOut/WarehousingOut'
							// 							});
						}

					}

				});
			},
			goDetail(billCode) {
				let that = this
				for (let i = 0; i < that.result_list.length; i++) {
					if (billCode == that.result_list[i].billCode) {
						uni.setStorageSync('OutsourcingReturnSheet_data', that.result_list[i])
						uni.setStorageSync('BillId', that.result_list[i].id)
					}
				}
				uni.navigateTo({
					url: '../WarehousingOut/WarehousingOut'
				});
			},
			goSearch() {
				let that = this
				if (that.BillCode == '') {
					uni.showModal({
						title: this.i18n_modal.modal_title_text,
						content: this.i18n_modal.modal_title_content,
					})
				} else {
					that.GetOutSourceReturn()
				}

			},
			scanAInputSuc(e) {
				this.initInputStatus()
				this.scan_input_foc_b = true
			},
			scanBInputSuc(e) {
				this.initInputStatus()
				this.scan_input_foc_a = true
			}

		},
		onLoad() {
			// this.MacInfo();
			uni.setNavigationBarTitle({
				title: this.i18n.page_title
			});
			this.order = this.i18n.order_numbers
			this.order_text = this.i18n.order_text
			this.supplier = this.i18n.supplier
			this.supplier_text = this.i18n.supplier_text
			let that = this
			that.Type = uni.getStorageSync('Type')
			console.log(that.Type)
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

	}

	.purchase_list_b {
		padding-left: 20upx;
	}
</style>
