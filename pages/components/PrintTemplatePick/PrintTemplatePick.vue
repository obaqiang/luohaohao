<template>
	<!-- <div class="choose_language">
		<button @tap="bindChoLan('zh-CN')">中文</button>
		<button @tap="bindChoLan('en')">English</button>
		<button @tap="bindChoLan('zh-TW')">繁體</button>
	</div> -->
	<view>
		<view class="user_info_list">
			<text>{{i18n.printer_model}}:</text>
			<view class="pic_input">
				<picker  @change="bindPickerChange" :value="index" :range="range_data" range-key="labelTypeName" class="organize_picker">
					<view class="uni-input pic_input_in" >{{range_data[index].labelTypeName}}</view>
				</picker>
				<image class="down_hook" :src="down_hook"></image>
			</view>
			
		</view>
	</view>

</template>

<script>
	export default {
		props: ['picker_data'],
		computed: {
// 			range_data() {
// 				return uni.getStorageSync('picker_data')
// 			},
			i18n() {
				return this.$t('SplitBarcode')
			},

		},
		watch:{
			picker_data:{
				handler(new_val,old_val){
					console.log('得到的数据')
					console.log(new_val)
				},
				immediate:true
			}
		},
		data() {
			return {
				down_hook: "../../static/img/down_hook.png",
				index: 0,
				range_data:this.picker_data
			};
		},
		methods: {
			bindPickerChange(e) {
				this.index = e.target.value
				for (let i = 0; i < this.range_data.length; i++) {
					// uni.setStorageSync('PrintTemplate', this.range_data[this.index].labelTypeCode)
					this.$emit('bindPickerChange', this.range_data[this.index].labelTypeCode)
				}
			},
		},
		onLoad() {

		}
	}
</script>

<style>
	.user_info_list {
		width: 700upx;
		margin: 0upx 20upx;
		display: flex;
		align-items: center;
		height: 55upx;
	}

	.user_info_list text {
		margin-left: 60upx;
	}

	.user_info_list input {
		margin-left: 30upx;
	}

	.organize_picker {
		width: 300upx !important;
		padding-left: 30upx;

	}

	.organize_picker .uni-input {
		background: none;
	}

	.down_hook {
		width: 30upx;
		height: 30upx;
	}
	.pic_input{
		border: 1px solid #DDDDDD;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 50upx;
		padding: 0 5upx;
	}
	.pic_input_in{
		padding: 0;
	}
</style>
