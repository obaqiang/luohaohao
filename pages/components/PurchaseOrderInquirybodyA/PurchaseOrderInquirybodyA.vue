<template>
	<view>
		<view class="PurchaseOrderInquirybodyA_head_area">
			<view class="PurchaseOrderInquirybodyA_head_list" @tap="changeAct(true)">
				<text v-bind:class="{ 'PurchaseOrderInquirybodyA_head_list_on': active }">
					{{i18n.PurchaseOrderInquirybodyA_left}}
				</text>

			</view>
			<view class="PurchaseOrderInquirybodyA_head_list" @tap="changeAct(false)">
				<text v-bind:class="{ 'PurchaseOrderInquirybodyA_head_list_on': active==false }">
					{{i18n.PurchaseOrderInquirybodyA_right}}
				</text>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				query_scan: "../../static/img/query_scan.png",
				active: true,
				isActive: 'PurchaseOrderInquirybodyA_head_list_on'
			};
		},
		computed:{
			i18n() {
				return this.$t('PurchaseOrderInquirybodyA')
			},
		},
		methods: {
			changeAct(e){
				this.active = e
				this.$emit('phead_choose', e);
			}
		
		
		},
	}
</script>

<style>
	.PurchaseOrderInquirybodyA_head_area {
		display: flex;
		align-items: center;
		width: 750upx;
	}

	.PurchaseOrderInquirybodyA_head_list {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100upx;
		line-height: 100upx;
		font-size: 25upx;
	}

	.PurchaseOrderInquirybodyA_head_list_on {
		color: #FFB700;
		border-bottom: 1px solid #FFB700;
	}
</style>
