<template>
	<view>
		<PurchaseOrderInquirybodyA v-on:phead_choose="phead_choose" />
		<PurchaseOrderInquirybodyB v-bind:order_text="i18n.order_text" v-bind:order_text_list="order_text_list" v-bind:order_time="i18n.order_time"
		 v-bind:order_time_list="order_time_list" v-bind:supplier="i18n.supplier" v-bind:supplier_list="supplier_list"
		 v-bind:supplier_man="i18n.supplier_man" v-bind:supplier_man_list="supplier_man_list" v-if="left_show" />
		<PurchaseOrderInquirybodyC v-bind:table_list="table_list" v-bind:PurchaseOrderInquirybodyC_from="PurchaseOrderInquirybodyC_from"
		 v-if="left_show" v-on:tapMater="tapMater" />
		<MaterialInventoryModal v-bind:PurchaseOrderInquirybodyC_from="PurchaseOrderInquirybodyC_from" v-bind:data_a="data_a"
		 v-bind:data_b="data_b" v-bind:data_c="data_c" v-bind:data_d="data_d" v-bind:data_e="data_e" v-bind:data_f="data_f"
		 v-bind:data_g="data_g" v-bind:show_modal_header="show_modal_header" v-bind:show_modal_body="show_modal_body"
		 v-bind:show_modal_from="show_modal_from" v-on:showModalBtn="showModalBtn" v-if="MaterialInventoryModal_show" />
		<alertModal v-bind:alert_modal="alert_modal" v-if="alertModal_show" />
		<view class="common_bot_btn" @tap="SureSubmit" >确认提交</view>
		<InventoryList v-bind:InventoryList_data="InventoryList_data" v-on:modal_copyshow="modal_copyshow" v-if="left_show==false" />
		<RecordModal v-bind:InventoryList_data_detail="InventoryList_data_detail" v-bind:data_a="InventoryList_data_detail.materialCode"
		 v-bind:data_b="InventoryList_data_detail.materialName" v-bind:data_f="InventoryList_data_detail.countQty"
		 v-bind:data_g="InventoryList_data_detail.giveQty" v-bind:show_modal_header="show_modal_header"
		 v-bind:show_modal_body="show_modal_body" v-bind:show_modal_from="show_modal_from" v-on:showModalBtnA="showModalBtnA"
		 v-if="record_modal_show" />
		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import PurchaseOrderInquirybodyA from "../components/PurchaseOrderInquirybodyA/PurchaseOrderInquirybodyA.vue"
	import PurchaseOrderInquirybodyB from "../components/PurchaseOrderInquirybodyB/PurchaseOrderInquirybodyB.vue"
	import PurchaseOrderInquirybodyC from "../components/PurchaseOrderInquirybodyC/PurchaseOrderInquirybodyC.vue"
	import MaterialInventoryModal from "../components/MaterialInventoryModal/MaterialInventoryModal.vue"
	import alertModal from "../components/alertModal/alertModal.vue"
	import InventoryList from "../components/InventoryList/InventoryList.vue"
	import RecordModal from "../components/RecordModal/RecordModal.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			PurchaseOrderInquirybodyA,
			PurchaseOrderInquirybodyB,
			PurchaseOrderInquirybodyC,
			MaterialInventoryModal,
			alertModal,
			InventoryList,
			RecordModal,
			loadingWait
		},

		data() {
			return {
				order_text: '订单号',
				order_text_list: '',
				order_time: '采购日期',
				order_time_list: '',
				supplier: '供应商',
				supplier_list: '',
				supplier_man: '采购员',
				supplier_man_list: '',
				MaterialInventoryModal_show: false,
				show_modal_header: '物料清点',
				show_modal_body: '',
				show_modal_from: "ItemInventory",
				alert_modal: '物料清点保存成功',
				alertModal_show: false,
				left_show: true,
				BillCode: '',
				// MAC: '00-50-56-C0-00-01',
				BillCodeDetail: '',
				table_list: '',
				data_a: '',
				data_b: '',
				data_c: '',
				data_d: '',
				data_e: '',
				data_f: '',
				//弹出框中的备品数量默认为0
				data_g: 0,
				BizType: 11,
				BillId: '',
				DetailId: '',
				CountQty: '',
				GiveQty: '',
				InventoryList_data: '',
				InventoryList_data_detail: '',
				record_modal_show: false,
				// 清点记录中的清点数
				record_data_f: '',
				// 清点记录中的备品数
				record_data_g: '',
				ReceiveRecordId: '',
				positionTop: '',
				PurchaseOrderInquirybodyC_from: 'ItemInventoryAsn',
				loading_wait_show: false
			};
		},
		// computed: mapState(['connect_url']),
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
			MAC() {
				return this.$store.state.MAC
			},
			i18n() {
				return this.$t('ItemInventoryAsn')
			},
		},
		methods: {
			...mapMutations(['initPosition']),
			...mapMutations(['ErrRequestShow']),

			showModalBtnA(e) {
				let that = this
				that.record_modal_show = false
				that.record_data_f = uni.getStorageSync('record_data_f')
				that.record_data_g = uni.getStorageSync('record_data_g')
				that.ReceiveRecordId = uni.getStorageSync('ReceiveRecordId')
				if (e == 1) {
					console.log(1)
					that.DeleteReceiveRecord()
				} else if (e == 2) {
					console.log(2)
				} else if (e == 3) {
					console.log(3)
					that.ModifyReceiveRecord()
				}
			},

			// 头部物料清点和清点记录按钮
			phead_choose(e) {
				console.log(e)
				this.left_show = e
				if (e == true) { //物料清点
					this.GetAsnDetail()
				} else { //清点记录
					this.GetReceiveRecord()
				}
			},
			modal_copyshow(e) {
				let that = this
				that.initPosition()
				that.record_modal_show = true
				that.InventoryList_data_detail = uni.getStorageSync('InventoryList_data_detail')
				console.log(that.InventoryList_data_detail)
			},
			tapMater(e) {
				let that = this
				that.MaterialInventoryModal_show = true
				console.log(e)
				// 物料编码
				that.data_a = e.materialCode
				// 物料名称
				that.data_b = e.materialName

				// 清点数为采购减去到货减去清点(ItemInventory进来)
				// that.data_f = e.poQty - e.arrivalQty - e.countQty

				// 清点数为送货减去已收减去清点(ItemInventoryAsn送货进来)
				that.data_f = e.asnQty - e.recvQty - e.countQty
				console.log('清点数：' + that.data_f)
				// 采购数
				// that.data_d = e.poQty
				// 到货数
				// that.data_e = e.arrivalQty
				// 送货数
				that.data_d = e.asnQty
				// 已收数
				that.data_e = e.recvQty
				// 单据明细id
				that.DetailId = e.id
				// 单据id
				that.BillId = uni.getStorageSync('BillId')


			},
			showModalBtn(e) {
				let that = this
				that.initPosition()
				console.log(e)
				that.MaterialInventoryModal_show = false
				if (e == true) {
					that.CountQty = uni.getStorageSync('data_f')
					that.GiveQty = uni.getStorageSync('data_g')
					// 					console.log('计算后的清点数:' + that.CountQty)
					// 					console.log('计算后的备品数:' + that.GiveQty)
					that.SaveReceive()
				}
			},
			SaveReceive() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Asn/SaveReceive', //仅为示例，并非真实接口地址。
					data: {
						BillCode: that.BillCode,
						MAC: that.MAC,
						// Type: that.Type,
						BillId: that.BillId,
						DetailId: that.DetailId,
						CountQty: that.CountQty,
						GiveQty: that.GiveQty

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = true
						console.log(res.data)
						if (res.data.success != true) {
							that.ErrRequestShow(res)
						} else {
							uni.showToast({
								icon: 'none',
								title: '物料清点保存成功',
								duration: 2000
							})
							that.GetAsnDetail()
						}

					}

				});
			},
			DeleteReceiveRecord() {
				let that = this
				that.loading_wait_show = false
				uni.request({
					url: that.connect_url + 'api/services/wmspda/asn/DeleteReceiveRecord',
					data: {
						MAC: that.MAC,
						ReceiveRecordId: that.ReceiveRecordId,
						CountQty: that.record_data_f,
						GiveQty: that.record_data_g

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = false
						console.log(res.data)
						if (res.data.success) {
							uni.showToast({
								icon: 'none',
								title: '记录删除成功',
								duration: 2000
							})
							that.GetReceiveRecord()
						} else {
							that.ErrRequestShow(res)
						}

					}

				});
			},
			ModifyReceiveRecord() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/asn/ModifyReceiveRecord',
					data: {
						MAC: that.MAC,
						ReceiveRecordId: that.ReceiveRecordId,
						CountQty: that.record_data_f,
						GiveQty: that.record_data_g

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						if (res.data.success) {
							uni.showToast({
								icon: 'none',
								title: '记录修改成功',
								duration: 2000
							})
							that.GetReceiveRecord()
						} else {
							that.ErrRequestShow(res)
						}

					}

				});
			},
			GetAsnDetail() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Asn/GetAsnDetail', //仅为示例，并非真实接口地址。
					data: {
						BillCode: that.BillCode,
						// Type: that.Type,
						MAC: that.MAC
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res)
						that.loading_wait_show = false
						if (res.data.success) {
							let arr = res.data.result
							for (let i = 0; i < arr.length; i++) {
								for (let key in arr[i]) {
									if (arr[i][key] == null) {
										arr[i][key] = 0
									}
								}
							}
							that.table_list = arr
						} else {
							that.ErrRequestShow(res)
						}
					}

				});
			},
			SureSubmit() {
				this.SubmitByBillCode()
			},
			GetReceiveRecord() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/po/GetReceiveRecord',
					data: {
						BillCode: that.BillCode,
						MAC: that.MAC,
						// Type: that.Type

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						that.loading_wait_show = false
						console.log(res.data)
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							let res_data = res.data.result
							for (let key in res_data) {
								res_data[key].createDateTime = res_data[key].createDateTime.slice(0, 16).replace('T', ' ')
							}
							that.InventoryList_data = res_data

						}
					}
				});
			},
			SubmitByBillCode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Scan/SubmitByBillCode',
					data: {
						BillCode: that.BillCode,
						MAC: that.MAC

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.alert_modal = '提交清点成功'
							that.alertModal_show = true
							setTimeout(function() {
								that.alertModal_show = false
								// 								uni.navigateTo({
								// 									url: '../DeliveryOrderInquiry/DeliveryOrderInquiry'
								// 								});
								uni.navigateBack({
									delta: 1
								})
							}, 2000);
						}
					}
				});
			}

		},
		onLoad() {
			// this.MacInfo();
			let that = this
			that.BillCodeDetail = uni.getStorageSync('BillCodeDetail')
			console.log(that.BillCodeDetail)
			that.BillCode = that.BillCodeDetail.billCode
			that.order_text_list = that.BillCodeDetail.billCode
			that.order_time_list = that.BillCodeDetail.billDate.slice(0, 16).replace('T', ' ')
			that.supplier_list = that.BillCodeDetail.supplierName
			that.supplier_man_list = that.BillCodeDetail.createrName
			that.GetAsnDetail()
		}
	}
</script>

<style>
</style>
