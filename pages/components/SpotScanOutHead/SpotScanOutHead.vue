<template>
	<view class="mes_area">
		<view class="mes_list">
			<text>{{i18n.a_text}}:</text>
			<text>{{materialCode}}</text>
		</view>
		<view class="mes_list">
			<text>{{i18n.b_text}}:</text>
			<text>{{materialName}}</text>
		</view>
		<view class="mes_list">
			<text>{{i18n.c_text}}:</text>
			<text>{{prQty}}</text>
		</view>
		<view class="mes_list">
			<text>{{i18n.d_text}}:</text>
			<text>{{qty}}</text>
		</view>
		<view class="mes_list">
			<text>{{i18n.status_text}}:</text>
			<text v-if="status_send==1">{{i18n.status_a}}</text>
			<text v-if="status_send==2">{{i18n.status_b}}</text>
			<text v-if="status_send==7">{{i18n.status_c}}</text>
			<text v-if="status_send==8">{{i18n.status_d}}</text>
			<!-- <text>{{status}}</text> -->
		</view>

		<view class="mes_list" v-if="warehouseName">
			<text>{{i18n.e_text}}:</text>
			<text>{{warehouseName}}</text>
		</view>
	</view>

</template>

<script>
	export default {
		props: ['GetOutSourcePickDetail_data_detail_send','status_send'],
		computed: {
			// 			GetOutSourcePickDetail_data_detail() {
			// 			},
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
			status() {
				return this.GetOutSourcePickDetail_data_detail_send.status
			},
			i18n() {
				return this.$t('SplitBarcode')
			},
		},
		watch: {
			GetOutSourcePickDetail_data_detail_send: {
				handler(new_val, old_val) {
					console.log('进来')
					console.log(new_val)
				},
				immediate: true
			}
		},
		data() {
			return {
				// 				materialCode: "",
				// 				materialName: '',
				// 				prQty: "",
				// 				qty: '',
				// 				warehouseName: ""
				// 				a_text: '物料编码',
				// 				b_text: '物料名称',
				// 				c_text: '清点数量',
				// 				d_text: '发料数量',
				// 				e_text: '仓库名称',
			}
		}
	}
</script>

<style>
	.mes_area {
		padding-top: 50upx;
	}

	.mes_list {
		display: flex;
		width: 750upx;
		line-height: 40upx;
		font-size: 25upx;
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
