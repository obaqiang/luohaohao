<template>
	<view class="table_area">
		<view class="head_area">
			<text>{{i18n.tr_a}}</text>
			<text>{{i18n.tr_b}}</text>
			<text>{{i18n.tr_c}}</text>
			<text>{{i18n.tr_d}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventory'">{{i18n.tr_e}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventory'">{{i18n.tr_f}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventoryAsn'">{{i18n.tr_g}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventoryAsn'">{{i18n.tr_h}}</text>
			<text>{{i18n.tr_i}}</text>
		</view>
		<view class="head_area" v-for="(item,index) in table_list" :key="index" @tap="tapMater(item.id)">
			<text>{{index+1}}</text>
			<text>{{item.materialCode}}</text>
			<text>{{item.countQty}}</text>
			<text>{{item.giveQty}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventory'">{{item.poQty}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventory'">{{item.arrivalQty}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventoryAsn'">{{item.asnQty}}</text>
			<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventoryAsn'">{{item.recvQty}}</text>
			<text>{{item.inStockQty}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['table_list','PurchaseOrderInquirybodyC_from'],
		data() {
			return {
				
			};
		},
		computed:{
			i18n() {
				return this.$t('PurchaseOrderInquirybodyC')
			},
		},
		methods: {
			tapMater(e){
				let that = this
				for(let i =0;i<that.table_list.length;i++){
					if(e==that.table_list[i].id){
						this.$emit('tapMater', that.table_list[i]);
					}
				}
				
			}


		},
		onLoad() {
			
		}
	}
</script>

<style>
	.head_area {
		display: flex;
		width: 750upx;
		border-bottom: 1px solid #DDDDDD;
		line-height: 100upx;
		font-size: 25upx;
	}

	.head_area text {
		width: 90upx;
		text-align: center;
	}

	.head_area text:nth-child(2) {
		width: 210upx;
		text-align: center;
	}
	.table_area{
		margin-bottom: 200upx;
	}
</style>
