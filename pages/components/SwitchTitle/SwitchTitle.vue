<template>
	<view>
		<view class="switch_title_head_area">
			<text class="switch_title_head_text">{{switchtitletext}}</text>
			<view class="switch_title_head_area_head_right">
				<text class="switch_title_head_right_text">{{switch_title_head_right_text}}</text>
				<switch  :checked="my_show_all" @change="switch1Change" />
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		props: ['switchtitletext','isShowAll','switch_title_head_right_text'],
		components: {
		},

		data() {
			return {
				my_show_all:this.isShowAll
			};
		},
		computed: {},

		methods: {
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				this.$emit('sucFuc',e.target.value)
			},

		},
		onLoad() {
			// this.MacInfo();

		}
	}
</script>

<style scoped="scoped">
	.switch_title_head_area {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750upx;
		align-items: center;
		height: 90upx;
		background: #FFFFFF;
	}


	.switch_title_head_right_text {
		margin-right: 10upx;
		font-size: 25upx;
	}

	.switch_title_head_text {
		margin-left: 20upx;
		font-weight: bold;
		font-size: 25upx;
	}
</style>
