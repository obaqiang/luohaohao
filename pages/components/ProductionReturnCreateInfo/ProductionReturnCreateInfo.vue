<template>
	<view class="ItemInventoryOutHeadInfo_area" @tap="showModal(BarCode)">
		<view class="ItemInventoryOutHeadInfo_list">
			<text>{{i18n.BarCode}}</text>
			<text>{{BarCode}}</text>
		</view>
		<view class="ItemInventoryOutHeadInfo_list">
			<text>{{i18n.materialCode}}</text>
			<text>{{materialCode}}</text>
		</view>
		<view class="ItemInventoryOutHeadInfo_list">
			<text>{{i18n.materialName}}</text>
			<text>{{materialName}}</text>
		</view>
		<view class="ItemInventoryOutHeadInfo_list">
			<text>{{i18n.outstockQty}}</text>
			<text>{{outstockQty}}</text>
		</view>
		<!-- <view class="common_bg_line"></view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['BarCode','materialCode','materialName','outstockQty'],
		components: {

		},
		computed: {
			i18n() {
				return this.$t('ProductionReturnCreate')
			},
		},
		data() {
			return {};
		},
		methods: {
			showModal(e){
				this.$emit('showModal',e)
			}
		},
		onLoad() {
			// this.MacInfo();

		}
	}
</script>

<style>
	.ItemInventoryOutHeadInfo_area {
		padding-top: 20upx;
	}

	.ItemInventoryOutHeadInfo_list {
		display: flex;
		align-items: center;
		height: 50upx;
		font-size: 25upx;
	}

	.ItemInventoryOutHeadInfo_list text:nth-child(1) {
		width: 40%;
		text-align: center;
	}

	.ItemInventoryOutHeadInfo_list text:nth-child(2) {
		width: 60%;
		text-align: left;
	}
</style>
