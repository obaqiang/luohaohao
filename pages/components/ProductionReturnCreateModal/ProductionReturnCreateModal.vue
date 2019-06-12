<template>
	<view>
		<view class='MaterialInventoryModal_show_modal_mask'></view>
		<view class="MaterialInventoryModal_show_modal_area">
			<view class="MaterialInventoryModal_show_modal_header">
				<!-- 修改条码信息 -->
				{{i18n.modal_text_a}}
			</view>
			<view class="MaterialInventoryModal_show_modal_body">
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.BarCode}}:</text>
					<text>{{BarCode}}</text>
				</view>
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.materialCode}}:</text>
					<text>{{materialCode}}</text>
				</view>
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.materialName}}:</text>
					<text>{{materialName}}</text>

				</view>
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.modal_text_b}}:</text>
					<input class="MaterialInventoryModal_show_modal_body_list_input" type="text" :placeholder="outstockQty" v-model="modal_d"
					 @focus="focusInputD" @blur="blurInputD" @confirm="confirmInputD" :focus="focus_d">
				</view>

			</view>
			<input type="text">
			<view class="MaterialInventoryModal_show_modal_footer">
				<button class="MaterialInventoryModal_show_modal_footer_btn_left" @tap="closeModal">{{i18n.cho_modal_a}}</button>
				<button class="MaterialInventoryModal_show_modal_footer_btn_left" @tap="showModalBtn(false)">{{i18n.cho_modal_b}}</button>
				<button class="MaterialInventoryModal_show_modal_footer_btn_right" @tap="showModalBtn(true)">{{i18n.cho_modal_c}}</button>
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
		props: ['BarCode', 'materialCode', 'materialName', 'outstockQty'],
		components: {

		},

		data() {
			return {
				placeholder_a: '',
				modal_a: this.BarCode,
				focus_a: true,

				placeholder_b: '',
				modal_b: this.materialCode,
				focus_b: false,

				placeholder_c: '',
				modal_c: this.materialName,
				focus_c: false,

				placeholder_d: '',
				modal_d: this.outstockQty,
				focus_d: false
			};
		},
		computed: {
			i18n() {
				return this.$t('ProductionReturnCreate')
			},
		},

		methods: {
			...mapMutations(['initPosition']),
			focusInputA() {

			},
			focusInputB() {

			},
			focusInputC() {

			},
			focusInputD() {

			},
			blurInputA() {

			},
			blurInputB() {

			},
			blurInputC() {

			},
			blurInputD() {

			},
			confirmInputA() {

			},
			confirmInputB() {

			},
			confirmInputC() {

			},
			confirmInputD() {

			},
			closeModal() {
				this.$emit('closeModal', true)
			},
			showModalBtn(e) {
				let that = this
				let BarcodeInfo = uni.getStorageSync('BarcodeInfo')
				if (e == false) {
					for (let i = 0; i < BarcodeInfo.length; i++) {
						if (that.BarCode == BarcodeInfo[i].BarCode) {
							BarcodeInfo.splice(i, 1)
						}
					}
				} else if (e == true) {
					for (let i = 0; i < BarcodeInfo.length; i++) {
						if (that.BarCode == BarcodeInfo[i].BarCode) {
							BarcodeInfo[i].outstockQty = that.modal_d
						}
					}
				}
				uni.setStorageSync('BarcodeInfo', BarcodeInfo)
				console.log(uni.getStorageSync('BarcodeInfo'))
				this.$emit('closeModal', e)
			}

		},
		onLoad() {

		}
	}
</script>

<style>
	.MaterialInventoryModal_show_modal_mask {
		width: 100%;
		height: 100%;
		background: #000000;
		opacity: 0.2;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.MaterialInventoryModal_show_modal_area {
		position: fixed;
		width: 80%;
		left: 10%;
		z-index: 1001;
		background: #FFFFFF;
		top: 200upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10upx;
	}

	.MaterialInventoryModal_show_modal_header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100upx;
		font-size: 25upx;
	}

	.MaterialInventoryModal_show_modal_body {
		min-height: 100upx;
	}

	.MaterialInventoryModal_show_modal_footer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		margin-bottom: 20upx;
	}

	.MaterialInventoryModal_show_modal_footer_btn_right {
		background: #FF7200;
		color: #FFFFFF;
		font-size: 25upx;
		width: 150upx;
	}

	.MaterialInventoryModal_show_modal_footer_btn_left {
		font-size: 25upx;
		width: 150upx;
	}

	.MaterialInventoryModal_show_modal_body_list {
		display: flex;
		align-items: center;
		font-size: 25upx;
		line-height: 60upx;
		
	}

	.MaterialInventoryModal_show_modal_body_list text:nth-child(1) {
		width: 130upx;
		text-align: right;
	}

	.MaterialInventoryModal_show_modal_body_list text:nth-child(2) {
		margin-left: 50upx;
	}

	.MaterialInventoryModal_show_modal_body_list_input {
		margin-left: 50upx;
		border: 1px solid #dddddd;
		border-radius: 10upx;
		padding-left: 10upx;
	}

	.MaterialInventoryModal_show_modal_body_list_input:hover {
		border: 1px solid #FFB700 !important;
	}
</style>
