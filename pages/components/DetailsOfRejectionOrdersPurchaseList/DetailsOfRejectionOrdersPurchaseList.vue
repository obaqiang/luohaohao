<template>
	<view class="DetailsOfRejectionOrdersPurchaseList_area">
		<view class="DetailsOfRejectionOrdersPurchaseList_list" v-for="(item,index) in data_list" :key="index" >
			<view class="DetailsOfRejectionOrdersPurchaseList_listA" >
				<view>#{{index+1}}</view>								
				<view>
					<text>{{a_text}}：</text><text>{{item.waitQty}}</text>
				</view>
				<view>
					<text>{{b_text}}：</text><text>{{item.scanQty}}</text>
				</view>
				<view>
					<text>{{c_text}}：</text><text>{{item.passQty}}</text>
				</view>
			</view>
			<view class="DetailsOfRejectionOrdersPurchaseList_listB">
				<text>{{d_text}}：{{item.materialName}}</text>
				<text>{{e_text}}：{{item.materialCode}}</text>
			</view>
			<bgLine />
		</view>
	</view>
</template>

<script>
	import bgLine from "../bgLine/bgLine.vue"
	export default {
		props: ['data_list','a_text','b_text','c_text','d_text','e_text'],
		components: {
			bgLine,
		},

		data() {
			return {};
		},
		computed: {},

		methods: {

		},
		onLoad() {
			// this.MacInfo();

		}
	}
</script>

<style>
	.DetailsOfRejectionOrdersPurchaseList_list {
		border-left: 5upx solid #FFB700;
		padding-bottom: 20upx;
	}

	.DetailsOfRejectionOrdersPurchaseList_listA {
		display: flex;
		height: 100upx;
		align-items: center;
		font-size: 25upx;
	}

	.DetailsOfRejectionOrdersPurchaseList_listA view:nth-child(1) {
		margin-left: 20upx;
		font-size: 25upx;
	}

	.DetailsOfRejectionOrdersPurchaseList_listA view:nth-child(2) {
		margin-left: 30upx;
		font-size: 25upx;
	}

	.DetailsOfRejectionOrdersPurchaseList_listA view:nth-child(3) {
		margin-left: 40upx;
	}

	.DetailsOfRejectionOrdersPurchaseList_listA view:nth-child(4) {
		margin-left: 40upx;
	}

	.DetailsOfRejectionOrdersPurchaseList_listB {
		display: flex;
		flex-direction: column;
		padding-left: 100upx;
		font-size: 25upx;
	}

	.DetailsOfRejectionOrdersPurchaseList_listB view {
		width: 200upx;
		display: block;
	}
</style>
