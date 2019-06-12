<template>
	<view class="common_area" v-if="qcLevel==11||qcLevel==21||qcLevel==22">
		<view class="common_title">
			{{i18n.AcceptanceStandard_a}}
		</view>
		<view class="AcceptanceStandard_list">
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.AcceptanceStandard_b}}</view>
				<view>{{levelCode}}</view>
			</view>
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.AcceptanceStandard_c}}</view>
				<view>{{aql}}</view>
			</view>
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.AcceptanceStandard_d}}</view>
				<view>{{sampleCode}}</view>
			</view>
			<view class="AcceptanceStandard_bl">
				<view>{{i18n.AcceptanceStandard_e}}</view>
				<view>{{strictLevel}}</view>
			</view>
		</view>


	</view>

</template>

<script>
	export default {
		computed: {
			i18n() {
				return this.$t('IncomingQualityInspection')
			},
			sampleCode() { //试样半码
				if (uni.getStorageSync('qualityInspection_data').sampleCode == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').sampleCode
				}
			},
			qcLevel() {
				if (uni.getStorageSync('qualityInspection_data').qcLevel == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').qcLevel
				}
			},
			aql() {
				if (uni.getStorageSync('qualityInspection_data').aql == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').aql
				}
			},
			levelCode() {
				if (uni.getStorageSync('qualityInspection_data').levelCode == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').levelCode
				}
			},
			strictLevel() {
				if (uni.getStorageSync('qualityInspection_data').strictLevel == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').strictLevel
				}
			}
		}
	}
</script>

<style>
	.AcceptanceStandard_list {
		width: 650upx;
		margin: auto;
		overflow: hidden;
		
	}

	.AcceptanceStandard_bl {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #ededf3;
		width: 260upx;
		border-radius: 4upx;
		float: left;
		margin: 25upx;
		font-size: 25upx;
	}

	.AcceptanceStandard_bl view:nth-child(1) {
		background: #ededf3;
		display: flex;
		height: 54upx;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		width: 260upx;
	}

	.AcceptanceStandard_bl view:nth-child(2) {
		display: flex;
		height: 54upx;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		width: 260upx;
	}
</style>
