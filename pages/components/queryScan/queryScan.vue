<template>
	<view>
		<image class="query_scan" :src="query_scan" @tap="ScanCode" ></image>
	</view>
</template>

<script>
	export default {
	
		data(){
			return{
					query_scan:"../../static/img/query_scan.png",
			}
		},
		methods: {
			ScanCode() {
				let that = this
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						that.$emit('getCode',res.result)
					}
				});

			}
		}
	}
</script>

<style>
	.query_scan {
		width: 100upx;
		height: 100upx;
		position: fixed;
		bottom: 78upx;
		left: 325upx;
	}
</style>
