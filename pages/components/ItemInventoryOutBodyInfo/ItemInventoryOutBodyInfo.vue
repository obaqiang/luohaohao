<template>
	<view class="ItemInventoryOutBodyInfo_table">
		<view class="ItemInventoryOutBodyInfo_th">
			<text class="ItemInventoryOutBodyInfo_line_a">{{i18n.line_a}}</text>
			<text class="ItemInventoryOutBodyInfo_line_b">{{i18n.line_b}}</text>
			<text class="ItemInventoryOutBodyInfo_line_c">{{i18n.line_c}}</text>
			<text class="ItemInventoryOutBodyInfo_line_d">{{i18n.line_d}}</text>
		</view>
		<view class="ItemInventoryOutBodyInfo_tb" v-for="(item,index) in ItemInventoryOutBodyInfo_data" :key="index" @tap="gotoPage(item.id)">
			<view class="ItemInventoryOutBodyInfo_tb_a">
				<text class="ItemInventoryOutBodyInfo_line_a">{{index+1}}</text>
				<text class="ItemInventoryOutBodyInfo_line_b">{{item.materialCode}}</text>
				<text class="ItemInventoryOutBodyInfo_line_c">{{item.qty}}</text>
				<text class="ItemInventoryOutBodyInfo_line_d">{{item.prQty}}</text>
			</view>
			<view class="ItemInventoryOutBodyInfo_tb_b">{{item.materialName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['ItemInventoryOutBodyInfo_data'],
		data() {
			return {};
		},
		computed: {
			i18n() {
				return this.$t('ItemInventoryOut')
			},
		},
		methods: {
			gotoPage(id) {
				this.$emit('ItemInventoryOutBodyInfoSuc', id);
			}
		},
	}
</script>

<style>
	.ItemInventoryOutBodyInfo_th {
		display: flex;
		align-items: center;
		
	}

	.ItemInventoryOutBodyInfo_line_a {
		width: 15%;
		text-align: center;
		font-size: 25upx;
	}

	.ItemInventoryOutBodyInfo_line_b {
		width: 35%;
		text-align: center;
		font-size: 25upx;
	}

	.ItemInventoryOutBodyInfo_line_c {
		width: 25%;
		text-align: center;
		font-size: 25upx;
	}

	.ItemInventoryOutBodyInfo_line_d {
		width: 25%;
		text-align: center;
		font-size: 25upx;
	}

	.ItemInventoryOutBodyInfo_tb {
		display: flex;
		flex-direction: column;
		line-height: 100upx;
	}

	.ItemInventoryOutBodyInfo_tb_a {
		display: flex;
	}

	.ItemInventoryOutBodyInfo_tb_b {
		background: #fbfbfb;
		padding-left: 50upx;
		font-size: 25upx;
	}
</style>
