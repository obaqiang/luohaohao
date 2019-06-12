<template>
	<view>
		<view class='RecordModal_show_modal_mask'></view>
		<view class="RecordModal_show_modal_area">
			<view class="RecordModal_show_modal_header">
				{{show_modal_header}}
			</view>
			<view class="RecordModal_show_modal_body">
				{{show_modal_body}}
				<view class="RecordModal_show_modal_body_list">
					<text>{{i18n.material_code}}:</text>
					<text>{{data_a}}</text>
				</view>
				<view class="RecordModal_show_modal_body_list">
					<text>{{i18n.material_name}}:</text>
					<text>{{data_b}}</text>
				</view>
				<view class="RecordModal_show_modal_body_list">
					<text>{{i18n.check_num}}:</text>
					<input class="RecordModal_show_modal_body_list_input" type="number" :placeholder="i18n.check_place" @confirm="confirmInput" :focus="focus_a" v-model="new_data_f" @focus="focusInput" @blur="initInput">
				</view>
				<view class="RecordModal_show_modal_body_list">
					<text>{{i18n.already_num}}:</text>
					<input class="RecordModal_show_modal_body_list_input" type="number" :placeholder="i18n.already_num_place" v-model="new_data_g" :focus="focus_b"  @blur="initInput">
				</view>

			</view>
			<input type="text">
			<view class="RecordModal_show_modal_footer">
				<button class="RecordModal_show_modal_footer_btn_left_a" @tap="showModalBtnA(1)">{{i18n.delete_text}}</button>
				<button class="RecordModal_show_modal_footer_btn_left_b" @tap="showModalBtnA(2)">{{i18n.cancel_text}}</button>
				<button class="RecordModal_show_modal_footer_btn_left_c" @tap="showModalBtnA(3)">{{i18n.save_text}}</button>
			</view>
		</view>
		<!-- <view class="common_bot_btn">确认提交</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['show_modal_header', 'show_modal_body', 'show_modal_from', 'updata_url', 'data_a', 'data_b', 'data_c',
			'data_d', 'data_e', 'data_f', 'data_g'
		],
		components: {

		},

		data() {
			return {
				// 声明新的变量是为了防止报错
				new_data_f: this.data_f,
				new_data_g: this.data_g,
				focus_a: false,
				focus_b: false
			};
		},
		computed:{
			i18n() {
				return this.$t('RecordModal')
			},
		},
		methods: {
			...mapMutations(['initPosition']),
			showModalBtn(e) {
				// 将清点数和备品的input数据保存起来
				if(this.new_data_f==''){
					this.new_data_f = 0
				}
				if(this.new_data_g==''){
					this.new_data_g = 0
				}
				uni.setStorageSync('data_f', this.new_data_f)
				uni.setStorageSync('data_g', this.new_data_g)
				
				this.$emit('showModalBtn', e);
			},
			initFocus() {
				this.focus_a = false
				this.focus_b = false
			},
			showModalBtnA(e){
				uni.setStorageSync('record_data_f', this.new_data_f)
				uni.setStorageSync('record_data_g', this.new_data_g)
				
				this.$emit('showModalBtnA', e);
			},
			
			focusInput(){
				this.new_data_f=''
			},
			initInput(){
				this.initPosition()
			},
			confirmInput() {
				this.initFocus()
				this.focus_b = true
			}

		},
		onLoad() {

		}
	}
</script>

<style>
	.RecordModal_show_modal_mask {
		width: 100%;
		height: 100%;
		background: #000000;
		opacity: 0.2;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.RecordModal_show_modal_area {
		position: fixed;
		width: 80%;
		left: 10%;
		z-index: 1001;
		background: #FFFFFF;
		top: 400upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10upx;
	}

	.RecordModal_show_modal_header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100upx;
	}

	.RecordModal_show_modal_body {
		min-height: 100upx;
	}

	.RecordModal_show_modal_footer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		margin-bottom: 20upx;
	}

	.RecordModal_show_modal_footer_btn_right {
		background: #FF7200;
		color: #FFFFFF;
		font-size: 25upx;
		width: 200upx;
	}
	.RecordModal_show_modal_footer_btn_left_a{
		font-size: 25upx;
		width: 150upx;
		background: #cb2920;
		color: #ffffff;
	}
	.RecordModal_show_modal_footer_btn_left_b{
		font-size: 25upx;
		width: 150upx;
	}
	.RecordModal_show_modal_footer_btn_left_c{
		background: #FF7200;
		color: #FFFFFF;
		font-size: 25upx;
		width: 150upx;
	}

	.RecordModal_show_modal_footer_btn_left {
		font-size: 25upx;
		width: 200upx;
	}

	.RecordModal_show_modal_body_list {
		display: flex;
		align-items: center;
		font-size: 25upx;
		line-height: 60upx;
	}

	.RecordModal_show_modal_body_list text:nth-child(1) {
		width: 130upx;
		text-align: right;
	}

	.RecordModal_show_modal_body_list text:nth-child(2) {
		margin-left: 50upx;
	}

	.RecordModal_show_modal_body_list_input {
		margin-left: 50upx;
		border: 1px solid #dddddd;
		border-radius: 10upx;
		padding-left: 10upx;
	}

	.RecordModal_show_modal_body_list_input:hover {
		border: 1px solid #FFB700 !important;
	}
</style>
