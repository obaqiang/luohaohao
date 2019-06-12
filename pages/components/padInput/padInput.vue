<template>
	<view class="body_list">
		<text class="text_a">{{scan_input_text}}:</text>
		<view  v-bind:class="{ text_right_area_hover: input_focus, 'text_right_area': input_focus==false }">
			<input class="text_right_input" type="text" :value="value" :placeholder="placeholder_text" :focus="input_focus"
			 @input="updateVal($event.target.value)" 
			 @confirm="confirmInput" />
			<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanData" v-if="scan_icon_show"></image>
		</view>
	</view>
</template>

<script>
	import {} from 'vuex'
	export default {
		props: ['value', 'placeholder_text', 'input_focus', 'scan_input_text', 'scan_icon_show'],
		components: {

		},
		data() {
			return {
				text_right_area_icon: "../../static/img/text_right_area_icon.png",

			};
		},
		computed: {

		},
		watch: {

		},
		onNavigationBarButtonTap() {

		},
		computed: {},

		methods: {
			confirmInput(val) {
				this.$emit('work', val);
			},
			updateVal(val) {
				this.$emit('input', val);
			},
			scanData() {
				let that = this
				uni.scanCode({
					success: function(res) {
						console.log('进来的值：' + that.value)
						that.value = res.result
						console.log('进来的值2：' + that.value)
						that.updateVal(res.result)
						that.$emit('work', res.result);
					}
				});
			}
		},
		onLoad() {}
	}
</script>

<style>
	.body_list {
		display: flex;
		line-height: 60upx;
		padding-left: 30upx;
		align-items: center;
		margin-top: 20upx;
	}

	.text_a {
		width: 150upx;
		text-align: right;
	}

	.text_b {
		padding-left: 50upx;
	}

	.text_right_area {
		display: flex;
		border: 1px solid #DDDDDD;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}
	.text_right_area_hover {
		display: flex;
		border: 1px solid #ffb700;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}

	/* .text_right_area:hover {
		border: 1px solid #ffb700;
	} */
	.text_right_area:focus {
		border: 1px solid #ffb700;
	}

	.text_right_area_icon {
		width: 50upx;
		height: 50upx;
	}

	.text_right_input {
		width: 350upx;
		font-size: 20upx;
		/* background: red; */
	}
</style>
