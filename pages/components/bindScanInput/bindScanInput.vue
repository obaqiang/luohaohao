<template>
	<view class="body_list">
		<text class="text_a">{{scan_input_text}}:</text>
		<view v-bind:class="{ text_right_area_hover: input_focus, 'text_right_area': input_focus==false }">
			<input class="text_right_input" :type="input_type_show" :value="value" :placeholder="placeholder_show" :focus="input_focus"
			 @input="updateVal($event.target.value)" @confirm="confirmInput" />
			<image class="text_right_area_icon" :src="text_right_area_icon" @tap="scanData" v-if="scan_icon_show"></image>
		</view>
	</view>
</template>

<script>
	import {} from 'vuex'
	export default {
		props: ['value', 'placeholder_text', 'input_focus', 'scan_input_text', 'scan_icon_show','input_type'],
		components: {

		},
		data() {
			return {
				text_right_area_icon: "../../static/img/text_right_area_icon.png",
				placeholder_show: this.placeholder_text,
				input_focus_show:'',
				input_type_show:''
			};
		},
		computed: {

		},
		watch: {
			input_focus: {
				handler(new_val, old_val) {
					// this.placeholder_show = newName
					this.input_focus_show = new_val
				},
				immediate: true
			},
			input_type:{
				handler(new_val, old_val) {
					if(new_val=='number'){
						console.log('我哦啊')
						this.input_type_show = 'number'
					}else{
						this.input_type_show = 'text'
					}
				},
				immediate: true
			}
			// 			placeholder_text: {
			// 				handler(newName, oldName) {
			// 					this.placeholder_show = newName
			// 				},
			// 				immediate: true
			// 			}
		},
		onNavigationBarButtonTap() {

		},
		computed: {},
		methods: {
			confirmInput(val) {
				// this.$refs.aaa.inputValue=''
				let that = this
				that.$emit('work', val);
				that.$hideKeyBoard()
				// 				setTimeout(function() {//PDA 变态处理
				// 					that.$emit('work', val);
				// 				}, 500)
			},
			updateVal(val) {
				let that = this
				that.$emit('input', val)

				// 				setTimeout(function() {//PDA 变态处理
				// 					that.$emit('input', val)
				// 				}, 500)

			},
			// 			changeInput(){
			// 				this.placeholder_show = 123
			// 			},
			scanData() {
				let that = this
				uni.scanCode({
					success: function(res) {
						that.placeholder_show = res.result //通过修改placeholder_show 来显示用户通过摄像头获取的数据 ，以此来完美匹配pda扫码的问题
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
		font-size: 25upx;
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
		font-size: 25upx !important;
		/* background: red; */
	}
</style>
