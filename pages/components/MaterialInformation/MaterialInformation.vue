<template>
	<view class="MaterialInformation_area">
		<view class="MaterialInformation_title">
			{{i18n.MaterialInformation_a}}
		</view>
		<view class="MaterialInformation_body">
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_b}}:</text>
				<text>{{billCode}}</text>
			</view>
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_c}}:</text>
				<text>{{billDate}}</text>
			</view>
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_d}}:</text>
				<text>{{sourceBillCode}}</text>
			</view>
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_e}}:</text>
				<text>{{supplierName}}</text>
			</view>
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_f}}:</text>
				<text>{{lastModifierFullName}}</text>
			</view>
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_g}}:</text>
				<text>{{lastModificationTime}}</text>
			</view>
		</view>

		<view class="MaterialInformation_foot">
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_billLine}}:</text>
				<text>{{billLine}}</text>
			</view>
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_h}}:</text>
				<text>{{materialCode}}</text>
			</view>
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_i}}:</text>
				<text>{{materialName}}</text>
			</view>
			<!-- <view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_j}}:</text>
				<text v-if="sourceBillType==10">{{i18n.MaterialInformation_k}}</text>
				<text v-if="sourceBillType==11">{{i18n.MaterialInformation_l}}</text>
				<text v-if="sourceBillType==12">{{i18n.MaterialInformation_m}}</text>
			</view> -->
			<view class="MaterialInformation_list">
				<text>{{i18n.MaterialInformation_receiveQty}}:</text>
				<text>{{receiptQty}}</text>
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
		components: {},

		data() {
			return {

			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			i18n() {
				return this.$t('IncomingQualityInspection')
			},
			qualityInspection_data() {
				return uni.getStorageSync('qualityInspection_data')
			},
			billCode() {
				return uni.getStorageSync('qualityInspection_data').billCode
			},
			billDate() {
				return uni.getStorageSync('qualityInspection_data').billDate
			},
			sourceBillCode() {
				return uni.getStorageSync('qualityInspection_data').sourceBillCode
			},
			supplierName() {
				return uni.getStorageSync('qualityInspection_data').supplierName
			},
			billLine() {
				return uni.getStorageSync('qualityInspection_data').billLine
			},
			materialCode() {
				return uni.getStorageSync('qualityInspection_data').materialCode
			},
			materialName() {
				console.log(uni.getStorageSync('qualityInspection_data'))
				return uni.getStorageSync('qualityInspection_data').materialName
			},
			sourceBillType() {
				return uni.getStorageSync('qualityInspection_data').sourceBillType
			},
			receiptQty() {
				return this.$ifQtyIsNull(uni.getStorageSync('qualityInspection_data').receiptQty)
			},
			receiveQty() {
				if (uni.getStorageSync('qualityInspection_data').receiveQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').receiveQty
				}
			},
			lastModifierFullName() {
				if (uni.getStorageSync('qualityInspection_data').lastModifierFullName) {
					return uni.getStorageSync('qualityInspection_data').lastModifierFullName
				} else {
					return ''
				}

			},
			lastModificationTime() {
				if (uni.getStorageSync('qualityInspection_data').lastModificationTime) {
					return uni.getStorageSync('qualityInspection_data').lastModificationTime.slice(0, 10)
				} else {
					return ''
				}

			}
		},

		methods: {


		},
	}
</script>

<style>
	.MaterialInformation_area {
		background: #FFFFFF;
		width: 700upx;
		display: block;
		margin: 25upx;
		border-radius: 10upx;
	}

	.MaterialInformation_title {
		font-size: 25upx;
		font-weight: bold;
		border-bottom: 1px solid #DDDDDD;
		line-height: 72upx;
		padding-left: 30upx;
	}

	.MaterialInformation_list {
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 25upx;
		height: 50upx;
	}

	.MaterialInformation_list text:nth-child(1) {
		width: 20%;
		text-align: right;
	}

	.MaterialInformation_list text:nth-child(2) {
		width: 70%;
		text-align: left;
	}

	.MaterialInformation_body {
		border-bottom: 1px solid #DDDDDD;
		padding: 20upx 0;
	}

	.MaterialInformation_foot {
		padding: 20upx 0;
	}
</style>
