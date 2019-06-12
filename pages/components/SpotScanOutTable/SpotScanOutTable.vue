<template>
	<view class="SpotScanOutTable_area">
		<view v-if="ifshow==true">
			<view class="SpotScanOutTable_th">
				<text class="SpotScanOutTable_line_a">{{i18n.line_a}}</text>
				<text class="SpotScanOutTable_line_b">{{i18n.line_b}}</text>
				<text class="SpotScanOutTable_line_c">{{i18n.line_c}}</text>
				<text class="SpotScanOutTable_line_d">{{i18n.line_d}}</text>
				<text class="SpotScanOutTable_line_e">{{i18n.line_e}}</text>
			</view>
			<view class="SpotScanOutTable_th" v-for="(item,index) in SpotScanOutTable_data" :key="index">
				<text class="SpotScanOutTable_line_a">{{index+1}}</text>
				<text class="SpotScanOutTable_line_b">{{item.barCode}}</text>
				<text class="SpotScanOutTable_line_c">{{item.locationCode}}</text>
				<text class="SpotScanOutTable_line_d">{{item.qty}}</text>
				<text class="SpotScanOutTable_line_e">{{item.outstockQty}}</text>
			</view>
		</view>
		<view v-if="ifshow==false">
			<view class="SpotScanOutTable_th">
				<text class="SpotScanOutTable_line_a">{{i18n.line_a}}</text>
				<!-- <text class="SpotScanOutTable_line_b">{{i18n.line_b}}</text> -->
				<text class="SpotScanOutTable_line_c">{{i18n.line_c}}</text>
				<text class="SpotScanOutTable_line_d">{{i18n.line_d}}</text>
				<text class="SpotScanOutTable_line_e">{{i18n.line_e}}</text>
			</view>
			<view class="SpotScanOutTable_th" v-for="(item,index) in SpotScanOutTable_data" :key="index">
				<text class="SpotScanOutTable_line_a">{{index+1}}</text>
				<!-- <text class="SpotScanOutTable_line_b">{{item.barCode}}</text> -->
				<text class="SpotScanOutTable_line_c">{{item.locationCode}}</text>
				<text class="SpotScanOutTable_line_d">{{item.qty}}</text>
				<text class="SpotScanOutTable_line_e">{{item.outstockQty}}</text>
			</view>
		</view>

		<!-- 这里{{ifshow}} -->
	</view>
</template>

<script>
	export default {
		props: ['SpotScanOutTable_data'],
		data() {
			return {};
		},
		computed: {
			i18n() {
				return this.$t('SpotScanOut')
			},
			ifshow() {
				if (this.SpotScanOutTable_data[0].barCode) {
					return true
				} else {
					return false
				}
			}

		},
		methods: {},
	}
</script>

<style>
	.SpotScanOutTable_th {
		display: flex;
		border-bottom: 1px solid #DDDDDD;
		height: 100upx;
		align-items: center;
		font-size: 25upx;
	}

	.SpotScanOutTable_line_a {
		width: 15%;
		text-align: center;
		font-size: 25upx;
	}

	.SpotScanOutTable_line_b {
		width: 35%;
		text-align: center;
		font-size: 25upx;
	}

	.SpotScanOutTable_line_c {
		width: 15%;
		text-align: center;
		font-size: 25upx;
	}

	.SpotScanOutTable_line_d {
		width: 15%;
		text-align: center;
		font-size: 25upx;
	}

	.SpotScanOutTable_line_e {
		width: 20%;
		text-align: center;
		font-size: 25upx;
	}
</style>
