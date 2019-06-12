<template>
	<view class="mes_area">
		<view class="mes_list">
			<text>{{i18n.mes_list_b}}:</text>
			<text>{{storageQty}}</text>
		</view>
<!-- 		<view class="mes_list">
			<text>拆分条码:</text>
			<text>{{SpitBarcode}}</text>
		</view> -->
	</view>

</template>

<script>
	export default {
		props:['GetOutSourcePickDetail_data_detail_send','SpitBarcode'],
		computed:{
			materialCode() {
				return this.GetOutSourcePickDetail_data_detail_send.materialCode
			},
			materialName() {
				return this.GetOutSourcePickDetail_data_detail_send.materialName
			},
			prQty() {
				return this.GetOutSourcePickDetail_data_detail_send.prQty
			},
			qty() {
				return this.GetOutSourcePickDetail_data_detail_send.qty
			},
			warehouseName() {
				return this.GetOutSourcePickDetail_data_detail_send.warehouseName
			},
			DetailId() {
				return this.GetOutSourcePickDetail_data_detail_send.DetailId
			},
			storageQty() {
				return this.GetOutSourcePickDetail_data_detail_send.storageQty
			},
			i18n() {
				return this.$t('SplitBarcode')
			},
		},
		data() {
			return {
			
			}
		}
	}
</script>

<style>
	.mes_area {
		padding-top: 0upx;
	}

	.mes_list {
		display: flex;
		width: 750upx;
		/* line-height: 40upx; */
	}

	.mes_list text:nth-child(1) {
		width: 200upx;
		text-align: right;
	}

	.mes_list text:nth-child(2) {
		padding-left: 60upx;
	}

	.bg_line {
		height: 20upx;
		background: #e7e7ed;
		margin-top: 50upx;
	}
</style>
