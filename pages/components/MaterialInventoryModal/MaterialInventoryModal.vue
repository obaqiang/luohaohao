<template>
	<view>
		<view class='MaterialInventoryModal_show_modal_mask'></view>
		<view class="MaterialInventoryModal_show_modal_area">
			<view class="MaterialInventoryModal_show_modal_header">
				{{show_modal_header}}
			</view>
			<view class="MaterialInventoryModal_show_modal_body">
				{{show_modal_body}}
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.material_code}}:</text>
					<text>{{data_a}}</text>
				</view>
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.material_name}}:</text>
					<text>{{data_b}}</text>
				</view>
				<!-- <view class="show_modal_body_list">
					<text>规格型号:</text>
					<text>{{data_c}}</text>
				</view> -->
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventory'">{{i18n.purchase_num}}:</text>
					<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventoryAsn'">{{i18n.send_num}}:</text>
					<text>{{data_d}}</text>
				</view>
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventory'">{{i18n.send_ok_num}}:</text>
					<text v-if="PurchaseOrderInquirybodyC_from=='ItemInventoryAsn'">{{i18n.get_num}}:</text>
					<text>{{data_e}}</text>
				</view>
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.check_num}}:</text>
					<input class="MaterialInventoryModal_show_modal_body_list_input" type="number" :placeholder="i18n.check_place" v-model="new_data_f"
					 @focus="focusInput" @blur="initInput" @confirm="confirmInput" :focus="focus_a">
				</view>
				<view class="MaterialInventoryModal_show_modal_body_list">
					<text>{{i18n.already_num}}:</text>
					<input class="MaterialInventoryModal_show_modal_body_list_input" type="number" :placeholder="i18n.already_num_place" v-model="new_data_g"
					 @blur="initInput" :focus="focus_b">
				</view>

			</view>
			<input type="text">
			<view class="MaterialInventoryModal_show_modal_footer">
				<button class="MaterialInventoryModal_show_modal_footer_btn_left" @tap="showModalBtn(false)">{{i18n.cancel_text}}</button>
				<button class="MaterialInventoryModal_show_modal_footer_btn_right" @tap="showModalBtn(true)">{{i18n.save_text}}</button>
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
			'data_d', 'data_e', 'data_f', 'data_g', 'PurchaseOrderInquirybodyC_from'
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
		computed: {
			i18n() {
				return this.$t('MaterialInventoryModal')
			},
		},

		methods: {
			...mapMutations(['initPosition']),
			showModalBtn(e) {
				// 将清点数和备品的input数据保存起来
				if (this.new_data_f == '') {
					this.new_data_f = 0
				}
				if (this.new_data_g == '') {
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
			focusInput() {
				this.new_data_f = ''
			},
			initInput() {
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
		font-size: 25upx;
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
		width: 200upx;
	}

	.MaterialInventoryModal_show_modal_footer_btn_left {
		font-size: 25upx;
		width: 200upx;
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
		margin-top: 10upx;
	}

	.MaterialInventoryModal_show_modal_body_list_input:hover {
		border: 1px solid #FFB700 !important;
	}
</style>
