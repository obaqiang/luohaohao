<template>
	<view class="PurchaseOrderInquiryHead_head_list">

		<view class="PurchaseOrderInquiryHead_head_text">
			{{a_text}}
		</view>
		<view class="PurchaseOrderInquiryHead_head_input_area">
			{{b_text}}
			<input type="text" class="PurchaseOrderInquiryHead_uni-input"  :value="value" @input="updateVal($event.target.value)"
			 :focus="input_focus" :placeholder="c_text" @confirm="confirmInput" />
		</view>
		<!-- <image class="PurchaseOrderInquiryHead_query_scan_icon" :src="query_scan"></image> -->
	</view>
</template>

<script>
	export default {
		props: ['a_text', 'b_text', 'c_text', 'input_focus', 'value'],
		data() {
			return {
				query_scan: "../../static/img/query_scan.png",
				asn_code: '',
			};
		},
		methods: {
			confirmInput(val) {
				this.$emit('confirmInput', val)
				this.$hideKeyBoard()
			},
			updateVal(val) {
				let that = this
				that.$emit('input', val)
			},

		}
	}
</script>

<style scoped>
	.PurchaseOrderInquiryHead_head_list {
		display: flex;
		flex-direction: column;
		padding: 30upx;
		font-size: 25upx;
	}

	.PurchaseOrderInquiryHead_head_text {
		font-weight: bold;
		font-size: 25upx;
	}
	.PurchaseOrderInquiryHead_head_input_area {
		display: flex;
		align-items: center;
		margin-top: 20upx;
		font-size: 25upx ;
	}

	.PurchaseOrderInquiryHead_uni-input {
		border: 1px solid #999999;
		border-radius: 10upx;
		margin-left: 20upx;
		width: 550upx;
		background: #FFFFFF;
		padding: 10upx;
		font-size: 25upx ;
	}

	.PurchaseOrderInquiryHead_uni-input:hover {
		border: 1px solid #FFB700;
	}

	.PurchaseOrderInquiryHead_query_scan_icon {
		width: 100upx;
		height: 100upx;
		position: absolute;
		bottom: 78upx;
		left: 325upx;
	}
</style>
