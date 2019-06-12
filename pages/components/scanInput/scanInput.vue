<template>
	<view class="body_list">
		<text class="text_a">{{scan_input_text}}:</text>
		<view class="text_right_area">
			<input class="text_right_input" type="text" :placeholder="placeholder_text" :focus="scan_input_foc" @confirm="blurInput"
			 @focus="focusInput" v-model="scan_input_value" />
			<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanData" v-if="scan_icon_show"></image>
		</view>
	</view>
</template>

<script>
	import {} from 'vuex'
	export default {
		props: ['placeholder_text', 'scan_input_text', 'scan_icon_show', 'scan_input_from', 'scan_input_val',
			'scan_input_foc'
		],
		components: {

		},
		data() {
			return {
				text_right_area_icon: "../../static/img/text_right_area_icon.png",
				scan_input_value: this.scan_input_val,
				// scan_input_focus:this.scan_input_foc

			};
		},
		computed: {

		},
		watch: {
			scan_input_val(newVal, oldVal) { //props传值
				this.scan_input_value = newVal;
			},
// 			scan_input_foc(newVal, oldVal) {
// 				this.scan_input_foc = newVal
// 			}
			// 			scan_input_value(newVal, oldVal) { //
			// 				this.scan_input_value = newVal
			// 				this.$emit("update:scan_input_val", newVal);
			// 			}
		},
		onNavigationBarButtonTap() {

		},
		computed: {},

		methods: {
			// 			onKeyInput(e){
			// 				let that = this
			// 				that.$emit('scanInputSuc', e.detail.value);
			// 			},
			focusInput() {
				// this.select()
			},
			blurInput(e) {
				let that = this
				console.log(123)
				that.$emit('scanInputSuc', e.detail.value);
			},
			scanData() {
				let that = this
				uni.scanCode({
					success: function(res) {
						// console.log('需要的:' + res.result)
						that.scan_input_value = res.result
						that.$emit('scanInputSuc', res.result);
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

	.text_right_area:hover {
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
