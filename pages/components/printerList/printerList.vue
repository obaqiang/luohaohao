<template>
	<view class="printer_list_area">
		<view class="printer_list" @tap="Print">
			打印机1
		</view>
		<view class="printer_list" @tap="Print">
			打印机2
		</view>
		<view class="printer_list" @tap="Print">
			打印机3
		</view>
	</view>

</template>

<script>
	export default {
		computed:{
			GetOutSourcePickDetail_data_detail() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail')
			},
			materialCode() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail').materialCode
			},
			materialName() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail').materialName
			},
			prQty() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail').prQty
			},
			qty() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail').qty
			},
			warehouseName() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail').warehouseName
			},
			DetailId() {
				return uni.getStorageSync('GetOutSourcePickDetail_data_detail').id
			}
		},
		data() {
			return {
			
			}
		},
		methods:{
			Print(){
				this.$emit('printer_suc', true);
			}
		}
	}
</script>

<style>
.printer_list{
	height: 100upx;
	display: flex;
	align-items: center;
	margin-left: 50upx;
}
</style>
