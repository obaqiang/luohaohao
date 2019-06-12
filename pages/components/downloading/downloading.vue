<!-- 酷炫加载页面链接：https://www.tuicool.com/articles/fUjYjm2 -->
<template>
	<view class="loading_wait_area">
		<view class="loading_text">
			<text>正在下载中</text>
			<text>{{remark}}</text>
		</view>
		<view class="loading_area">
			<div class="loading">
				<div><span></span></div>
				<div><span></span></div>
				<div><span></span></div>
			</div>
		</view>
		
		<view class="loading_mask"></view>
	</view>
</template>

<script>
	export default {
		props: ['remark'],
		data() {
			return {

			}
		}
	}
</script>

<style>
	.loading_text {
		color: #666666;
		position: fixed;
		top: 600upx;
		background: #FFFfff;
		border-radius: 10upx;
		width: 500upx;
		left: 125upx;
		z-index: 2;
		display: flex;
		flex-direction: column;
		padding: 20upx;
	}

	.loading_wait_area {
		text-align: center;
	}

	.loading_mask {
		width: 100%;
		height: 100%;
		background: #000000;
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0.1;
		z-index: 1;
	}
	.loading_area{
		position: fixed;
		width: 100%;
		top: 300upx;
		z-index: 2;
	}




	.loading {
		width: 60px;
		height: 60px;
		margin: 0 auto;
		margin-top: 100px;
		position: relative;
		-webkit-animation: load 3s linear infinite;
	}

	.loading div {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.loading span {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #99CC66;
		position: absolute;
		left: 50%;
		margin-top: -10px;
		margin-left: -10px;
		-webkit-animation: changeBgColor 3s ease infinite;
	}

	@-webkit-keyframes load {
		0% {
			-webkit-transform: rotate(0deg);
		}

		33.3% {
			-webkit-transform: rotate(120deg);
		}

		66.6% {
			-webkit-transform: rotate(240deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@-webkit-keyframes changeBgColor {

		0%,
		100% {
			background: #99CC66;
		}

		33.3% {
			background: #FFFF66;
		}

		66.6% {
			background: #FF6666;
		}
	}

	.loading div:nth-child(2) {
		-webkit-transform: rotate(120deg);
	}

	.loading div:nth-child(3) {
		-webkit-transform: rotate(240deg);
	}

	.loading div:nth-child(2) span {
		-webkit-animation-delay: 1s;
	}

	.loading div:nth-child(3) span {
		-webkit-animation-delay: 2s;
	}
</style>
