<template>
	<view class="mes_area">
		<view v-for="(item,index) in detail_data" :key="index" class="check_detail_area">
			<view class="mes_list">
				<text>{{i18n.checkDetailMore_data_a}}:</text>
				<text>{{item.locationCode}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.checkDetailMore_data_b}}:</text>
				<text>{{item.barCode}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.checkDetailMore_data_c}}:</text>
				<text>{{item.materialCode}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.checkDetailMore_data_d}}:</text>
				<text>{{item.materialName}}</text>
			</view>
			<view class="mes_list">
				<text>{{i18n.checkDetailMore_data_e}}:</text>
				<text>
					<text v-if="item.checkQty==null">0</text>
					<text v-if="item.checkQty!=null">{{item.checkQty}}</text>
				</text>
			</view>
			<view class="bg_line">
			</view>
		</view>

		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			bindScanInput,
			loadingWait
		},
		computed: {
			connect_url() {
				return this.$store.state.connect_url
			},
			current_language() {
				return this.$store.state.current_language
			},
			post_header() {
				return this.$store.state.post_header
			},
			i18n() {
				return this.$t('checkDetailMore')
			},
			MAC() {
				return this.$store.state.MAC
			},
			detail_data() {
				return uni.getStorageSync('detail_more_data')
			}
		},
		data() {
			return {
				loading_wait_show: false
			};
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),

		},
		onLoad() {

		}
	}
</script>

<style>
	.mes_area {}

	.mes_list {
		display: flex;
		width: 750upx;
		line-height: 40upx;
	}

	.mes_list text:nth-child(1) {
		width: 200upx;
		text-align: right;
	}

	.mes_list text:nth-child(2) {
		padding-left: 60upx;
	}

	.bg_line {
		height: 20upx;
		background: #e7e7ed;
		margin-top: 50upx;
	}

	.check_detail_area {
		padding-top: 50upx;
	}
</style>
