<template>
	<view>
		<MaterialInformation />
		<!-- <QualityInspectionOperation v-on:subMit="subMit" /> -->
		<AcceptanceStandard />
		<!-- <view @tap="changengQty">改变不良数</view> -->
		<QualityInspectionOperationB v-on:longPress="longPress" v-on:subMit="subMit" v-on:plusNewModal="plusNewModal"
		 v-bind:send_data="IncomingQualityInspectionB_table_data" v-bind:send_choose_stand="QCResult" v-on:errList="errList"
		 v-on:chooseStand="chooseStand" v-bind:show_table_data="show_table_data" v-bind:detault_result="detault_result"
		 v-on:intInput="intInput" v-bind:err_code_table_items="err_code_table_items" />
		<IncomingQualityInspectionBPlusModal v-bind:modal_index="modal_index" v-bind:modal_num="modal_num" v-on:closeModal="closeModal"
		 v-bind:seq="seq" v-bind:reason_send="reason" v-if="modal_show" v-on:showModalBtn="showModalBtn"
		 v-bind:IncomingQualityInspectionBPlusModal_data_show="IncomingQualityInspectionBPlusModal_data_show" v-on:choCheck="choCheck"
		 v-on:bindPickerChange="bindPickerChange" v-on:testConfirm="testConfirm" v-bind:change_result="change_result"
		 v-bind:change_errorCodeId="change_errorCodeId" v-bind:submit_status="submit_status" v-bind:change_test_data="change_test_data" />
		<loadingWait v-if="loading_wait_show" />
		<!-- 
		 -->
	</view>
</template>

<script>
	// 特别备注:凡夫俗子请不要随意修改本页面代码逻辑
	// 如有修改本页面逻辑,个人建议重新绘制本页面
	// 如若十分自信自身实力,请忽略本段备注
	import MaterialInformation from "../components/MaterialInformation/MaterialInformation.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import AcceptanceStandard from "../components/AcceptanceStandard/AcceptanceStandard.vue"
	import QualityInspectionOperationB from "../components/QualityInspectionOperationB/QualityInspectionOperationB.vue"
	import IncomingQualityInspectionBPlusModal from "../components/IncomingQualityInspectionBPlusModal/IncomingQualityInspectionBPlusModal.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			MaterialInformation,
			QualityInspectionOperationB,
			AcceptanceStandard,
			IncomingQualityInspectionBPlusModal,
			loadingWait
		},

		data() {
			return {
				// RejectQty: '',
				QCResult: '',
				fatalQty_all: '',
				seriousQty_all: '',
				commonlyQty_all: '',
				slightQty_all: '',
				modal_num: 0,
				modal_num_max: '', //此数据用来记录最大弹框数，每次重置时用到
				modal_index: 0,
				modal_show: false,
				IncomingQualityInspectionBPlusModal_data_show: '',
				IncomingQualityInspectionBPlusModal_data: '',
				CheckItemId: '',
				reason: '',
				detault_result: '',

				Items: [],

				seq: '',
				test_data: '',
				errorCodeId: '',
				errorName: '',
				defectGrade: '',
				Result: 1, //默认为合格

				IncomingQualityInspectionB_table_data: '',
				SampleId: '',
				ngQty: 0,
				submit_status: 'submit',
				//当用户点击检验按钮 弹框出现后 需告知组件QualityInspectionOperationB 四个input中得数据进行更新
				//抽检数，拒收数 不良数 不良率四个更新为IncomingQualityInspectionB_table_data中得数据，此时不考虑前一个列表页面带过去得数据
				show_table_data: false,
				SampleQty_to_submit: this.SampleQty,
				NGQty_to_submit: this.NGQty,
				RejectQty_to_submit: this.rejectQty,
				//这个Items_change用来操作 修改
				Items_change: '',
				//用户点击修改时将列表中的是否合格数据带入modal中
				change_result: '',
				//用户点击修改时将列表中下拉不良原因数据带入modal中
				change_errorCodeId: '',
				//用户点击修改时将列表中测量值数据带入modal中
				change_test_data: '',
				// 罗浩浩
				err_code_table_items: '',
				loading_wait_show:false


			};
		},
		// computed: mapState(['connect_url']),
		computed: {
			connect_url() {
				return this.$store.state.connect_url
			},
			post_header() {
				return this.$store.state.post_header
			},
			i18n() {
				return this.$t('IncomingQualityInspection')
			},
			MAC() {
				return this.$store.state.MAC
			},
			Id() {
				return uni.getStorageSync('qualityInspection_data').id
			},
			SampleQty() {
				return uni.getStorageSync('qualityInspection_data').sampleQty
			},
			// 			NGQty() {
			// 				return uni.getStorageSync('qualityInspection_data').NGQty
			// 			},
			billDetailId() {
				return uni.getStorageSync('qualityInspection_data').billDetailId
			},
			materialId() {
				return uni.getStorageSync('qualityInspection_data').materialId
			},
			SampleCode() {
				return uni.getStorageSync('qualityInspection_data').sampleCode
			},
			rejectQtyStand() { //这是通过aql值请求接口返回的不良数判定值
				return uni.getStorageSync('rejectQtyStand')
			},
			qcLevel() {
				return uni.getStorageSync('qualityInspection_data').qcLevel
			},

			rejectQty() {
				if (uni.getStorageSync('qualityInspection_data').rejectQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').rejectQty
				}
			},
			qcResult() {
				return uni.getStorageSync('qualityInspection_data').qcResult
			},
			NGQty() {
				if (uni.getStorageSync('qualityInspection_data').NGQty == null) {
					return 0
				} else {
					return uni.getStorageSync('qualityInspection_data').NGQty
				}
			}

		},
		watch: {
			ngQty: {
				handler(new_val, old_val) {
					let that = this
					// 进行是否合格得判断
					if (that.rejectQtyStand > new_val || that.rejectQtyStand == new_val) { //合格
						that.QCResult = 1
						console.log(that.QCResult)
					} else { //不合格
						that.QCResult = 3
						console.log(that.QCResult)
					}
				},
				immediate: true
			},
		},
		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['initPosition']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			closeModal() {
				// 每次关闭操作都将保存的Items Items_change modal_data_user_cho清空
				this.modal_show = false
				this.Items = ''
				this.Items_change = ''
				uni.setStorageSync('modal_data_user_cho', '')
				this.modal_index = 0
				this.modal_num = this.modal_num_max
			},
			changengQty() {
				this.ngQty += 10
			},
			calngQty() { //计算不良数
				let items = this.IncomingQualityInspectionB_table_data
				let fatalQty_all = 0

				for (let i = 0; i < items.length; i++) {
					fatalQty_all += items[i].fatalQty
				}
				let seriousQty_all = 0
				for (let i = 0; i < items.length; i++) {
					seriousQty_all += items[i].seriousQty
				}
				let commonlyQty_all = 0
				for (let i = 0; i < items.length; i++) {
					commonlyQty_all += items[i].commonlyQty
				}
				let slightQty_all = 0
				for (let i = 0; i < items.length; i++) {
					slightQty_all += items[i].slightQty
				}
				this.ngQty = fatalQty_all + seriousQty_all + commonlyQty_all + slightQty_all
			},
			chooseStand(e) {
				console.log(e)
				this.QCResult = e
			},

			longPress(e) {
				console.log(e)
				let that = this
				that.SampleId = e
				// 每次修改都需要初始化Items_change的值
				that.initItemsChangeData()
				that.GetIqcDetails()
				// console.log('dacao')
				console.log(that.IncomingQualityInspectionB_table_data)
				for (let i in that.IncomingQualityInspectionB_table_data) {
					if (e == that.IncomingQualityInspectionB_table_data[i].id) {
						that.seq = that.IncomingQualityInspectionB_table_data[i].seq
						console.log(that.seq)
					}
				}
				// uni.showModal({
				// 	title: '提示',
				// 	content: ' ',
				// 	cancelText: '删除',
				// 	confirmText: '修改',
				// 	success: function(res) {
				// 		if (res.confirm) { //用户点击修改
				// 			that.modal_show = true
				// 			that.submit_status = 'change'
				// 		} else if (res.cancel) { //用户点击删除
				// 			that.DeleteIqcSamples()
				// 		}
				// 	}
				// });
				if (that.qcResult == 2) { //只有待检的才能进行删除和修改
					uni.showActionSheet({
						// itemList: ['删除', '修改'],
						itemList: that.i18n.itemList,
						success: function(res) {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							if (res.tapIndex == 0) { //删除
								// that.initPosition()
								uni.showModal({
									// 									title: '提示',
									// 									content: '是否确认删除',
									title: that.i18n.modal_text_a,
									content: that.i18n.modal_text_b,
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											that.DeleteIqcSamples()
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							} else if (res.tapIndex == 1) { //修改

								that.modal_show = true
								that.submit_status = 'change'
								// that.initPosition()
								that.changeShowModalData()
							}
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					});
				} else { //不是待检的只能进行查看
					uni.showActionSheet({
						itemList: ['查看'],
						success: function(res) {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							if (res.tapIndex == 0) { //查看
								that.modal_show = true
								that.submit_status = 'change'
								// that.initPosition()
								that.changeShowModalData()
							}
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					});
				}


			},
			SaveIqcNormal1() { //普检1提交
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/SaveIqcNormal1',
					data: {
						MAC: that.MAC,
						Id: that.Id,
						// SampleCode: that.SampleCode,
						SampleQty: that.SampleQty_to_submit,
						NGQty: that.NGQty_to_submit,
						RejectQty: that.RejectQty_to_submit,
						QCResult: that.QCResult
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.showToast({
								icon: 'none',
								title: '提交成功',
								duration: 2000
							});
							setTimeout(function() { //使用  setTimeout（）方法设定定时2000毫秒
								uni.navigateBack({})
							}, 2000);
						}
					}
				});
			},
			GetIqcSamples() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetIqcSamples',
					data: {
						MAC: that.MAC,
						BillDetailId: that.billDetailId
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log('wocao ')
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) { //将样品编码下方数据绑定到界面
							that.IncomingQualityInspectionB_table_data = res.data.result.items
							that.calngQty()
							// uni.setStorageSync('IncomingQualityInspectionB_table_data', res.data.result.items)

						}
					}
				});
			},

			GetMaterialCheckItems2() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetMaterialCheckItems2',
					data: {
						MAC: that.MAC,
						MaterialId: that.materialId
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log('获取到的检验项目')
						console.log(res.data)
						console.log(JSON.stringify(res.data))
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							let items = res.data.result.items
							for (let i = 0; i < items.length; i++) {
								items[i].ERRQTY = ''
							}
							that.err_code_table_items = items
						}
					}
				});
			},


			GetMaterialCheckItems() { //获取物料质检检验项目。
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetMaterialCheckItems',
					data: {
						MAC: that.MAC,
						MaterialId: that.materialId
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log('获取到的检验项目')
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.CheckItemId = res.data.result.items[0].checkItemId
							that.GetItemErrorCode()
							// 							that.modal_num_max = res.data.result.items.length
							// 							that.modal_num = that.modal_num_max
							// 							console.log('需要的modal_num:' + that.modal_num)
							// 
							// 							that.IncomingQualityInspectionBPlusModal_data = res.data.result.items
							// 							that.IncomingQualityInspectionBPlusModal_data_show = res.data.result.items[0]
							// uni.setStorageSync('IncomingQualityInspectionBPlusModal_data', res.data.result.items[0])

						}
					}
				});
			},
			GetItemErrorCode() { //不良原因下拉框
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetItemErrorCode',
					data: {
						MAC: that.MAC,
						CheckItemId: that.CheckItemId,
						billDetailId:uni.getStorageSync('qualityInspection_data').billDetailId
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						console.log(JSON.stringify(res.data))
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.reason = res.data.result.items
							that.err_code_table_items = res.data.result.items
							let items = res.data.result.items
							// for (let i = 0; i < items.length; i++) {
							// 	items[i].ERRQTY = ''
							// }
							that.err_code_table_items = items

							// if (that.submit_status == 'change') {
							// 	that.change_errorCodeId = '' //默认定位到请选择
							// 	for (let i = 0; i < that.Items_change.length; i++) {
							// 		if (i == that.modal_index) {
							// 			that.change_errorCodeId = that.Items_change[i].errorCodeId
							// 		}
							// 	}
							// }
						}
					}
				});
			},
			CreateIqcSamples() {
				let that = this
				that.loading_wait_show = true
				that.show_table_data = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/CreateIqcSamples',
					data: {
						MAC: that.MAC,
						BillDetailId: that.billDetailId,
						Seq: that.seq,
						Result: that.Result,
						Items: that.Items
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						let aa = {
							MAC: that.MAC,
							BillDetailId: that.billDetailId,
							Seq: that.seq,
							Result: that.Result,
							Items: that.Items
						}
						console.log(JSON.stringify(aa))
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.SaveIqcNormal1()
							// that.modal_index = 0 //每次保存都需要将modal_index 重置为0
							// that.modal_num = that.modal_num_max //每次保存都需要将modal_num 重置为最大弹框数
							// that.GetIqcSamples()
							// uni.showToast({
							// 	icon: 'none',
							// 	// title: '保存成功',
							// 	title: that.i18n.toast_text_a,
							// 	duration: 2000
							// });
							// // 每次保存或者修改都必须将缓存中的modal_data_user_cho清空
							// that.Items = ''
							// uni.setStorageSync('modal_data_user_cho', '')
							// console.log('清空操作')
						}
					}
				});
			},
			GetIqcDetails() { //获取样品物料检验明细
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/GetIqcDetails',
					data: {
						MAC: that.MAC,
						SampleId: that.SampleId,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						// console.log('获取物料样品检验明细GetIqcDetails')
						// console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							// that.Items_change = res.data.result.items
							// 							let arr = []
							let res_items = res.data.result.items
							// 							for (let i = 0; i < res_items.length; i++) {
							// 								let list = {}
							// 								list.id = res_items[i].id
							// 								list.qcValue = res_items[i].qcValue
							// 								list.result = res_items[i].result
							// 								list.errorCodeId = res_items[i].errorCodeId
							// 								list.defectGrade = res_items[i].defectGrade
							// 								arr.push(list)
							// 							}
							// 							that.Items_change = arr
							for (let i = 0; i < that.Items_change.length; i++) {
								for (let j = 0; j < res_items.length; j++) {
									if (i == j) {
										that.Items_change[i].id = res_items[j].id
										that.Items_change[i].qcValue = res_items[j].qcValue
										that.Items_change[i].result = res_items[j].result
										that.Items_change[i].errorCodeId = res_items[j].errorCodeId
										that.Items_change[i].defectGrade = res_items[j].defectGrade
									}
								}
							}
							// 							console.log('完全体')
							// 							console.log(that.Items_change)

						}
					}
				});
			},
			DeleteIqcSamples() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/DeleteIqcSamples',
					data: {
						MAC: that.MAC,
						Id: that.SampleId,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.GetIqcSamples()
						}
					}
				});
			},
			UpdateIqcSamples() { //更新修改
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Inspection/UpdateIqcSamples',
					data: {
						MAC: that.MAC,
						// BillDetailId: that.billDetailId,
						SampleId: that.SampleId,
						Result: that.Result,
						Items: that.Items_change
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						let aa = {
							MAC: that.MAC,
							SampleId: that.SampleId,
							Result: that.Result,
							Items: that.Items_change
						}
						console.log(JSON.stringify(aa))
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.modal_index = 0 //每次保存都需要将modal_index 重置为0
							that.modal_num = that.modal_num_max //每次保存都需要将modal_num 重置为最大弹框数
							that.GetIqcSamples()
							uni.showToast({
								icon: 'none',
								// title: '保存成功',
								title: that.i18n.toast_text_a,
								duration: 2000
							});
							// 每次保存或者修改都必须将缓存中的modal_data_user_cho清空
							uni.setStorageSync('modal_data_user_cho', '')
						}
					}
				});
			},
			intInput(e) {
				console.log('这里')
				console.log(e)
				this.err_code_table_items = e
			},
			subMit(e) {
				console.log(e)
				let that = this
				that.SampleQty_to_submit = e.SampleQty
				that.RejectQty_to_submit = e.RejectQty
				that.NGQty_to_submit = e.NGQty
				// QCResult再选择合格不合格时已经考虑,此处无需再赋值
				let qualityInspection_data = uni.getStorageSync('qualityInspection_data')
				console.log(qualityInspection_data)

				console.log(that.err_code_table_items)
				that.seq = 1
				let arr = []
				for (let i = 0; i < that.err_code_table_items.length; i++) {
					let list = {
						"billId": qualityInspection_data.billId,
						"billDetailId": qualityInspection_data.billDetailId,
						"billLine": i,
						"materialId": qualityInspection_data.materialId,
						"materialCode": qualityInspection_data.materialCode,
						"seq": i,
						"checkItemId": qualityInspection_data.checkItemId,
						"qcValue": that.err_code_table_items[i].qcValue,
						"result": that.Result,
						"errorCodeId": '',
						"errorName": that.err_code_table_items[i].errorName,
						"defectGrade": that.err_code_table_items[i].defectGrade
					}
					arr.push(list)
				}
				that.Items = arr
				that.CreateIqcSamples()
				// that.SaveIqcNormal1()
				that.submit_status = 'submit'
			},
			plusNewModal(e) { //显示添加序号弹框
				console.log(e)
				this.submit_status = 'submit'
				this.modal_show = true
				this.seq = e

				// 并且把弹框中的数据初始化 默认初始化为合格
				this.Result = 1
				this.IncomingQualityInspectionBPlusModal_data_show = this.IncomingQualityInspectionBPlusModal_data[0]
			},
			choCheck(e) {
				console.log(e)
				console.log(typeof(e))
				if (typeof(e) == 'number') { //分辨当e==1时e会自动转为true的bug当为number 传过来的肯定是不合格
					this.Result = 3
					this.CheckItemId = e
					this.GetItemErrorCode()
				}
				if (typeof(e) == 'boolean') { //当为boolean 传过来的只可能是checkItemId 肯定是合格
					this.Result = 1
				}
				// 				if (e == true) {
				// 					this.Result = 1
				// 				} else {
				// 					this.Result = 3
				// 					this.CheckItemId = e
				// 					this.GetItemErrorCode()
				// 				}


			},
			testConfirm(e) {
				let that = this
				that.test_data = e
			},
			bindPickerChange(e) {
				this.defectGrade = e.defectGrade
				this.errorCodeId = e.id
				this.errorName = e.errorName

			},
			initItemsData() { //初始化每个that.Items的值
				let that = this
				let arr = []
				for (var i = 0; i < that.IncomingQualityInspectionBPlusModal_data.length; i++) {
					let items_list = {}
					items_list.billId = uni.getStorageSync('qualityInspection_data').billId
					items_list.billDetailId = uni.getStorageSync('qualityInspection_data').billDetailId
					items_list.billLine = uni.getStorageSync('qualityInspection_data').billLine
					items_list.materialId = uni.getStorageSync('qualityInspection_data').materialId
					items_list.materialCode = uni.getStorageSync('qualityInspection_data').materialCode
					items_list.seq = ''
					items_list.qcValue = ''
					items_list.result = 1
					items_list.errorCodeId = ''
					items_list.errorName = ''
					items_list.defectGrade = ''
					items_list.checkItemId = that.IncomingQualityInspectionBPlusModal_data[i].checkItemId
					arr.push(items_list)
				}
				that.Items = arr
				// console.log('初始化后的Items')
				// console.log(that.Items)
			},
			initItemsChangeData() { //初始化每个Items_change的值
				let that = this
				let arr = []
				console.log(that.IncomingQualityInspectionBPlusModal_data)
				for (let i = 0; i < that.IncomingQualityInspectionBPlusModal_data.length; i++) {
					let list = {}
					list.id = ''
					list.qcValue = ''
					list.result =
						list.errorCodeId = ''
					list.defectGrade = ''
					arr.push(list)
				}
				that.Items_change = arr
				// console.log('初始化后的Items_change')
				// console.log(that.Items_change)
			},
			changeShowModalData() { //用户点击修改时将列表中的数据填到modal弹框中
				let that = this
				// 				console.log('弹框数据处理')
				// 				console.log(that.IncomingQualityInspectionBPlusModal_data)
				// 				console.log('modal_index:' + that.modal_index)
				// 				console.log('modal_num:' + that.modal_num)
				// 				console.log(that.Items_change)

				that.change_result = true //默认为合格
				that.change_test_data = '' //默认为空
				for (let i = 0; i < that.Items_change.length; i++) {
					if (i == that.modal_index) {
						that.change_test_data = that.Items_change[i].qcValue
						if (that.Items_change[i].result == 1) { //1为合格
							that.change_result = true
						} else if (that.Items_change[i].result == 3) { //3为不合格
							that.change_result = false
						}
					}
				}
				//更新modal中不良原因下拉框
				for (let i = 0; i < that.IncomingQualityInspectionBPlusModal_data.length; i++) {
					if (i == that.modal_index) {
						that.IncomingQualityInspectionBPlusModal_data_show = that.IncomingQualityInspectionBPlusModal_data[i]
						that.CheckItemId = that.IncomingQualityInspectionBPlusModal_data[i].checkItemId
						// that.seq = that.IncomingQualityInspectionBPlusModal_data[i].seq
					}
				}

				// console.log('需要的checkItemId：' + that.CheckItemId)
				that.GetItemErrorCode()
			},
			doChange() { //修改动作
				let that = this
				let modal_data_user_cho = uni.getStorageSync('modal_data_user_cho')
				let Items = that.Items_change
				// 				console.log('需要的上面的Items_change')
				// 				console.log(Items)
				// 				console.log('需要的modal_data_user_cho')
				// 				console.log(modal_data_user_cho)
				// 
				// 				console.log('长度:' + that.Items_change.length)
				// 				let arr = []
				// 				for (let i in modal_data_user_cho) {
				// 					let list = {}
				// 					list.id = modal_data_user_cho[i].info.checkItemId
				// 					list.qcValue = modal_data_user_cho[i].test_data
				// 					if (modal_data_user_cho[i].check_ok == true) {
				// 						list.result = 1
				// 					} else {
				// 						list.result = 3
				// 					}
				// 					list.errorCodeId = modal_data_user_cho[i].info.errorCodeId
				// 					list.defectGrade = modal_data_user_cho[i].info.defectGrade
				// 					arr.push(list)
				// 				}
				for (let i in Items) {
					for (let j in modal_data_user_cho) {
						if (i == j) {
							// Items[i].id = modal_data_user_cho[j].id
							Items[i].qcValue = modal_data_user_cho[j].test_data
							if (modal_data_user_cho[j].check_ok == true) {
								Items[i].result = 1
							} else {
								Items[i].result = 3
							}
							Items[i].errorCodeId = modal_data_user_cho[i].info.errorCodeId
							Items[i].defectGrade = modal_data_user_cho[i].info.defectGrade
						}
					}
				}
				that.Items_change = Items
				// 				console.log('需要的Items_change')
				// 				console.log(that.Items_change)
			},
			doSave() { //保存动作
				let that = this
				//每次保存动作之前都初始化Items的值
				that.initItemsData()
				let modal_data_user_cho = uni.getStorageSync('modal_data_user_cho')
				//质检检验项目
				let IncomingQualityInspectionBPlusModal_data = that.IncomingQualityInspectionBPlusModal_data
				let Items = that.Items
				for (let i in modal_data_user_cho) {
					for (let j in Items) {
						if (i == j) {
							Items[j].qcValue = modal_data_user_cho[i].test_data
							Items[j].errorCodeId = modal_data_user_cho[i].info.errorCodeId
							Items[j].errorName = modal_data_user_cho[i].info.errorName
							if (Items[j].errorName == '请选择') {
								Items[j].errorName = ''
							}
							Items[j].defectGrade = modal_data_user_cho[i].info.defectGrade
							Items[j].checkItemId = modal_data_user_cho[i].info.checkItemId
							Items[j].seq = modal_data_user_cho[i].info.seq
							if (modal_data_user_cho[i].check_ok == true) {
								Items[j].result = 1
							} else if (modal_data_user_cho[i].check_ok == false) {
								Items[j].result = 3
							}
						}
					}
				}
				that.Items = Items
				console.log(that.Items)
			},
			errList(e) {
				console.log(2222)
				console.log(e)
			},
			showModalBtn(e) { //弹框点击上一步或者下一步或者保存
				let that = this


				if (e == 2) { //点击保存

					// that.intModalData()
					that.modal_show = false
					if (that.submit_status == 'submit') {
						that.doSave()
						that.CreateIqcSamples()
					} else if (that.submit_status == 'change') {
						that.doChange()

						that.UpdateIqcSamples()
					}
				} else if (e == 1) { //点击下一步
					that.modal_index += 1
					that.modal_num -= 1
					if (that.submit_status == 'submit') {
						that.IncomingQualityInspectionBPlusModal_data_show = that.IncomingQualityInspectionBPlusModal_data[that.modal_index]
					} else if (that.submit_status == 'change') {
						that.changeShowModalData()
					}

				} else if (e == 0) { //点击上一步
					that.modal_index -= 1
					that.modal_num += 1
					if (that.submit_status == 'submit') {
						that.IncomingQualityInspectionBPlusModal_data_show = that.IncomingQualityInspectionBPlusModal_data[that.modal_index]
					} else if (that.submit_status == 'change') {
						that.changeShowModalData()
					}

				}

			}


		},
		onLoad() {
			// this.MacInfo();
			//普检1 高检1 手动选择合格不合格
			//普检2 高检2 请求不合格接口数量 通过手填值和不良数量（接口返回）进行比较 如果不良数量大于等于aql返回值 自动为不合格 反之为合格   也可以i进行手动选择
			let that = this
			let title = ''
			if (that.qcLevel == 11) {
				title = that.i18n.page_title_a
			} else if (that.qcLevel == 12) {
				title = that.i18n.page_title_b
			} else if (that.qcLevel == 21) {
				title = that.i18n.page_title_c
			} else if (that.qcLevel == 22) {
				title = that.i18n.page_title_d
			}
			uni.setNavigationBarTitle({
				title: title
			});
			if (that.rejectQtyStand > that.ngQty || that.rejectQtyStand == that.ngQty) {
				that.QCResult = 1
			} else {
				that.QCResult = 3
			}
			// that.GetIqcSamples()
			that.GetMaterialCheckItems()

			that.default_result = uni.getStorageSync('qualityInspection_data').qcResult


		}
	}
</script>

<style>
	page {
		background: #e7e7e7;
		padding-bottom: 150upx;
	}
</style>
