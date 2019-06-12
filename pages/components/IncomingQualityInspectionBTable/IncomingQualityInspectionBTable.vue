<template>
	<view class="SpotScanOutTable_area">
		<view >
			<view class="SpotScanOutTable_th">
				<text class="SpotScanOutTable_line_a">{{i18n.IncomingQualityInspectionBTable_a}}</text>
				<text class="SpotScanOutTable_line_b">{{i18n.IncomingQualityInspectionBTable_b}}</text>
				<text class="SpotScanOutTable_line_c">{{i18n.IncomingQualityInspectionBTable_c}}</text>
				<text class="SpotScanOutTable_line_d">{{i18n.IncomingQualityInspectionBTable_d}}</text>
				<text class="SpotScanOutTable_line_e">{{i18n.IncomingQualityInspectionBTable_e}}</text>
			</view>
			<view class="SpotScanOutTable_th" v-for="(item,index) in IncomingQualityInspectionB_table_data" :key="index" @longpress="longPress(item.id)"> 
				<text class="SpotScanOutTable_line_a">{{item.seq}}</text>
				<text class="SpotScanOutTable_line_b">{{item.fatalQty}}</text>
				<text class="SpotScanOutTable_line_c">{{item.seriousQty}}</text>
				<text class="SpotScanOutTable_line_d">{{item.commonlyQty}}</text>
				<text class="SpotScanOutTable_line_e">{{item.slightQty}}</text>
			</view>
		</view>

		<!-- 这里{{ifshow}} -->
	</view>
</template>

<script>
	export default {
		props:['send_data'],
		data() {
			return {};
		},
		computed: {
			i18n() {
				return this.$t('IncomingQualityInspection')
			},
			IncomingQualityInspectionB_table_data(){
				return this.send_data
			}

		},
		methods: {
			longPress(id){
				console.log('wo le ')
				console.log(id)
				for(let i in this.send_data){
					if(id == this.send_data[i].id){
						console.log(this.send_data[i].seq)
					}
				}
				this.$emit('longPress',id)
			}
		},
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
		width: 20%;
		text-align: center;
	}

	.SpotScanOutTable_line_b {
		width: 20%;
		text-align: center;
	}

	.SpotScanOutTable_line_c {
		width: 20%;
		text-align: center;
	}

	.SpotScanOutTable_line_d {
		width: 20%;
		text-align: center;
	}

	.SpotScanOutTable_line_e {
		width: 20%;
		text-align: center;
	}
</style>
