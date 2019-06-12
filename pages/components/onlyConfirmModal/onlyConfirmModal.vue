<template>
	<view class="onlyConfirmModal_area">
		<view class="onlyConfirmModal_mask"></view>
		<view class="onlyConfirmModal_show">
			<text class="onlyConfirmModal_text_head">提示</text>
			<view class="onlyConfirmModal_text">{{onlyConfirmModal_text}}</view>
			<text @tap="onlyConfirmModalConfirm" class="onlyConfirmModal_confirm">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['onlyConfirmModal_text'],
		components: {

		},

		data() {
			return {

			};
		},


		methods: {
			onlyConfirmModalConfirm(){
				this.$emit('onlyConfirmModalConfirm',true)
			}
		},
		onLoad() {

		}
	}
</script>

<style>
	.onlyConfirmModal_mask{
		background: #000000;
		opacity: 0.2;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		
	}
	.onlyConfirmModal_show{
		width: 50%;
		background: #FFFFFF;
		position: fixed;
		left: 25%;
		text-align: center;
		border-radius: 10upx;
		top: 500upx;
		z-index: 2;
		padding-top: 20upx;
	}
	.onlyConfirmModal_text{
		display: flex;
		height: 150upx;
		align-items: center;
		justify-content: center;
		font-size: 25upx;
	}
	.onlyConfirmModal_confirm{
		color: #007AFF;
		border-top: 1px solid #DDDDDD;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		font-size: 25upx;
		/* background: #f2f2f2; */
		/* color: #FFFFFF; */
	}
	.onlyConfirmModal_text_head{
		font-size: 25upx;
	}
</style>
