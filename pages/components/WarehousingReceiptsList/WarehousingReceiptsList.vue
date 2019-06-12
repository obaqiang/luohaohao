<template>
	<view class="mes_area">
		<view class="mes_area_in" v-if="scroll_items.length<0||scroll_items.length==0" v-for="(item,index) in WarehousingReceiptsList_data"
		 :key="index" @tap="gotoPage(item.billCode)">
			<!-- 这是WarehousingReceiptsList_data -->
			<view class="mes_list">
				<text>{{i18n.text_a}}:</text>
				<text>{{item.billCode}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.text_b}}:</text>
				<text>{{item.billDate}}</text>
			</view>
			<view class="bg_line">
			</view>
		</view>

		<view class="mes_area_in" v-if="scroll_items.length>0" v-for="(item,index) in scroll_items" :key="index" @tap="gotoPage(item.billCode)">
			<!-- 这是scroll_items -->
			<view class="mes_list">
				<text>{{i18n.text_a}}:</text>
				<text>{{item.billCode}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.text_b}}:</text>
				<text>{{item.billDate}}</text>
			</view>
			<view class="bg_line">
			</view>
		</view>

		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['scroll_items'],
		components: {

		},
		computed: {
			i18n() {
				return this.$t('WarehousingReceipts')
			},
			WarehousingReceiptsList_data() {

				let WarehousingReceiptsList_data = uni.getStorageSync('WarehousingReceiptsList_data')
				for (let i = 0; i < WarehousingReceiptsList_data.length; i++) {
					WarehousingReceiptsList_data[i].billDate.slice(0, 10)
				}
				return WarehousingReceiptsList_data
			}
		},
		data() {
			return {

			};
		},
		methods: {
			gotoPage(e) {
				this.$emit('gotoPage', e)
			}
		},
		onLoad() {
			// this.MacInfo();

		}
	}
</script>

<style>
	.mes_area {
		padding-top: 50upx;
	}

	.mes_area_in {
		padding-bottom: 50upx;
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
