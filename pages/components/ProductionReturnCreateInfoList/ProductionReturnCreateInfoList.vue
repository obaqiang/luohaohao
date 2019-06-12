<template>
	<view>
		<ProductionReturnCreateInfo v-for="(item,index) in BarcodeInfo_show" :key="index" v-bind:BarCode="item.BarCode"
		 v-bind:materialCode="item.materialCode" v-bind:materialName="item.materialName" v-bind:outstockQty="item.outstockQty"
		 v-on:showModal="showModal" />
		<ProductionReturnCreateModal v-if="modal_show" v-on:closeModal="closeModal" v-bind:BarCode="BarCode"
		 v-bind:materialCode="materialCode" v-bind:materialName="materialName" v-bind:outstockQty="outstockQty" />
	</view>
</template>

<script>
	import ProductionReturnCreateInfo from "../ProductionReturnCreateInfo/ProductionReturnCreateInfo.vue"
	import ProductionReturnCreateModal from "../ProductionReturnCreateModal/ProductionReturnCreateModal.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['BarcodeInfo'],
		components: {
			ProductionReturnCreateInfo,
			ProductionReturnCreateModal
		},
		computed: {
			// 			BarcodeInfo() {
			// 				return uni.getStorageSync('BarcodeInfo')
			// 			}
		},
		watch: {
			BarcodeInfo() {
				console.log(213)
			}
		},
		data() {
			return {
				modal_show: false,
				BarCode: '',
				materialCode: '',
				materialName: '',
				outstockQty: '',
				BarcodeInfo_show: this.BarcodeInfo
			};
		},
		methods: {
			showModal(e) {
				let that = this
				let choosed_barcode = e
				for (let i = 0; i < that.BarcodeInfo.length; i++) {
					if (choosed_barcode == that.BarcodeInfo[i].BarCode) {
						that.BarCode = that.BarcodeInfo[i].BarCode
						that.materialCode = that.BarcodeInfo[i].materialCode
						that.materialName = that.BarcodeInfo[i].materialName
						that.outstockQty = that.BarcodeInfo[i].outstockQty
					}
				}
				that.modal_show = true
			},
			closeModal() {
				let that = this
				that.modal_show = false
				that.BarcodeInfo_show = uni.getStorageSync('BarcodeInfo')
			}
		},
		onLoad() {
			// this.MacInfo();

		}
	}
</script>

<style>
</style>
