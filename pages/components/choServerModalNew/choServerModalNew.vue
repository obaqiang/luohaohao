<template>
	<view>
		<view class='choServerModal_mask' @tap="closeChoServerModal"></view>
		<view class="choServerModalNew_area">
			<view class="choServerModalNew_head">
				服务设置
			</view>
			<view class="choServerModalNew_body">
				<view class="choServerModalNew_list">
					<text>地址:</text>
					<view class="choServerModalNew_list_in">
						<!-- <picker class="choServerModalNew_picker" @change="bindPickerChangeA" :value="indexA" :range="connect_url_all">
							<view class="uni-input">{{connect_url_all[indexA]}}</view>
						</picker>
						<image class="down_hook" :src="down_hook"></image> -->
						<input class="choServerModalNew_list_input" type="text" v-model="connect_url_show">
					</view>
				</view>
				<view class="choServerModalNew_list">
					<text>租户:</text>
					<input class="choServerModalNew_input" type="text" v-model="tenancyName_show">
				</view>
				<view class="choServerModalNew_list">
					<text>语言:</text>
					<view class="choServerModalNew_list_in">
						<picker class="choServerModalNew_picker" @change="bindPickerChangeB" :value="indexB" :range="array">
							<view class="uni-input">{{array[indexB]}}</view>
						</picker>
						<image class="down_hook" :src="down_hook"></image>
					</view>

				</view>
			</view>
			<view class="choServerModalNew_foot">
				<button class="choServerModalNew_cancel" @tap="closeChoServerModal">取消</button>
				<button class="choServerModalNew_confirm" @tap="conFirmCho">设置</button>
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
		props: ['showchoservermodal', 'defaultA', 'defaultB', 'connect_url','tenancyName'],
		components: {

		},
		computed: {
			connect_url_all() {
				return this.$store.state.connect_url_all
			},
// 			tenancyName() {
// 				return this.$store.state.tenancyName
// 			},
			// 			connect_url() {
			// 				return this.$store.state.connect_url
			// 			},
			array() {
				return this.$store.state.language_all
			},
		},
		data() {
			return {
				indexA: this.defaultA,
				indexB: this.defaultB,
				down_hook: "../../static/img/down_hook.png",
				connect_url_show: this.connect_url,
				tenancyName_show:this.tenancyName
			};
		},
		methods: {
			...mapMutations(['changeServerUrl']),
			...mapMutations(['changeTenancyName']),
			changeConnectUrl() {

			},
			choServer(server_url) {
				this.changeServerUrl(server_url)
			},
			bindPickerChangeA: function(e) { //修改地址
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexA = e.target.value
			},
			bindPickerChangeB: function(e) { //修改语言
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexB = e.target.value

				console.log(this.$i18n.locale)
			},
			closeChoServerModal() {
				this.$emit('closeChoServerModal', true);
			},
			conFirmCho() {
				console.log(this.indexA)
				if (this.indexB == 0) {
					this.$i18n.locale = 'zh-CN'
				} else if (this.indexB == 1) {
					this.$i18n.locale = 'en'
				} else if (this.indexB == 2) {
					this.$i18n.locale = 'zh-TW'
				}
				// this.changeServerUrl(this.connect_url_all[this.indexA])
				uni.setStorageSync('connect_url', this.connect_url_show)
				uni.setStorageSync('current_language',this.$i18n.locale)
				uni.setStorageSync('tenancyName',this.tenancyName_show)
				this.changeServerUrl(this.connect_url_show)
				this.changeTenancyName(this.tenancyName_show)
				let send_arr = {
					'connect_url_show':this.connect_url_show,
					'tenancyName_show':this.tenancyName_show,
				}
				this.$emit('conFirmCho', send_arr)
			}
		},
		onLoad() {
			// this.MacInfo();

		}
	}
</script>

<style>
	.choServerModal_mask {
		width: 100%;
		height: 100%;
		background: #000000;
		opacity: 0.2;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.choServerModalNew_area {
		position: fixed;
		width: 80%;
		left: 10%;
		z-index: 100;
		background: #FFFFFF;
		top: 400upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10upx;
	}

	.choServerModalNew_head {
		height: 100upx;
		align-items: center;
		display: flex;
	}

	.choServerModalNew_foot {
		height: 150upx;
		align-items: center;
		display: flex;
	}

	.choServerModalNew_body {
		display: flex;
		flex-direction: column;
	}

	.choServerModalNew_list {
		display: flex;
		align-items: center;
		height: 100upx;
	}

	.choServerModalNew_cancel {
		background: #FFFfff;
		color: rgb(169, 169, 169);
		padding: 5upx 60upx !important;
		font-size: 30upx;
	}

	.choServerModalNew_confirm {
		background: #FFB700;
		padding: 5upx 60upx !important;
		font-size: 30upx;
		color: #FFFFFF;
		margin-left: 50upx;
	}

	.choServerModalNew_input {
		padding: 7upx 20upx;
	}

	.down_hook {
		width: 30upx;
		height: 30upx;
	}

	.choServerModalNew_list_in {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.choServerModalNew_picker {
		/* background: red; */
		width: 400upx;
	}

	.choServerModalNew_list_input {
		margin: 10upx;
		padding: 5upx 10upx;
		border: 1px solid #DDDDDD;
		border-radius: 10upx;
		width: 400upx;
	}
</style>
