<template>
	<view class="inventory_area">
		<view v-if="InventoryList_data.length<0||InventoryList_data.length==0" style="text-align: center;margin-top: 200upx;font-size: 25upx;">{{i18n.no_data_text}}</view>
		<view class="inventory_list" v-for="(item,index) in InventoryList_data" :key="index" @tap="modal_copyshow(item.id)">
			<text>{{index+1}}</text>
			<view class="list_in">
				<text>{{i18n.material_code}}:</text>
				<text>{{item.materialCode}}</text>
			</view>
			<view class="list_in">
				<text>{{i18n.material_name}}:</text>
				<text>{{item.materialName}}</text>
			</view>
			<view class="list_in">
				<text>{{i18n.check_num}}:</text>
				<text>{{item.countQty}}</text>
			</view>
			<view class="list_in">
				<text>{{i18n.already_num}}:</text>
				<text>{{item.giveQty}}</text>
			</view>
			<view class="list_in">
				<text>{{i18n.check_time}}:</text>
				<text>{{item.createDateTime}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['InventoryList_data'],
		data() {
			return {

			}
		},
		computed: {
			i18n() {
				return this.$t('InventoryList')
			},
		},
		methods: {
			modal_copyshow(id) {
				uni.setStorageSync('ReceiveRecordId', id)
				let that = this
				for (let i = 0; i < that.InventoryList_data.length; i++) {
					if (id == that.InventoryList_data[i].id) {
						uni.setStorageSync('InventoryList_data_detail', that.InventoryList_data[i])
						that.$emit('modal_copyshow', true);
					}
				}
			}

		},
		onLoad() {

		}
	}
</script>

<style>
	.list_in {
		color: #999999;
		font-size: 25upx;
	}

	.inventory_list {
		padding-left: 50upx;
		border-bottom: 1px solid #DDDDDD;
		padding-bottom: 20upx;
		font-size: 25upx;
	}

	.inventory_area {
		margin-bottom: 200upx;
		font-size: 25upx;
	}
</style>
