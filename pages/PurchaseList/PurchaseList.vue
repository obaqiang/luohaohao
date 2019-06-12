<template>
	<view>
		<!-- 	<scanInput v-bind:placeholder_text="order_text" v-bind:scan_input_text="order" v-bind:scan_icon_show="true"
		 v-on:scanInputSuc="scanAInputSuc" />
		<scanInput v-bind:placeholder_text="supplier_text" v-bind:scan_input_text="supplier" v-bind:scan_icon_show="false"
		 v-on:scanInputSuc="scanBInputSuc" /> -->
		<!-- 单号 -->
		<bindScanInput v-if="input_a_show" v-bind:scan_input_text="order" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_a"
		 v-bind:placeholder_text='order_text' @input="onInputA" @work="scanAInputSuc" v-model="BillCode" />
		<!-- 供应商 -->
		<bindScanInput v-if="input_b_show" v-bind:scan_input_text="supplier" v-bind:scan_icon_show="true" v-bind:input_focus="scan_input_foc_b"
		 v-bind:placeholder_text='supplier_text' @input="onInputB" @work="scanBInputSuc" v-model="SupplierCode" />
		<!-- 日期 -->
		<bindDateInput v-if="input_c_show" v-bind:date_text="i18n.date_text" v-on:choDate="choDate" />
		<!-- 箱号 -->
		<bindScanInput v-if="input_h_show" v-bind:scan_input_text="i18n.scan_input_text_h" v-bind:scan_icon_show="true"
		 v-bind:input_focus="scan_input_foc_h" v-bind:placeholder_text="i18n.placeholder_text_h" @input="onInputH" @work="scanHInputSuc"
		 v-model="Barcode" />
		<!-- 库位 -->
		<bindScanInput v-if="input_d_show" v-bind:scan_input_text="i18n.scan_input_text_d" v-bind:scan_icon_show="true"
		 v-bind:input_focus="scan_input_foc_d" v-bind:placeholder_text="i18n.placeholder_text_d" @input="onInputD" @work="scanDInputSuc"
		 v-model="LocationCode" />
		<!-- 条码 -->
		<bindScanInput v-if="input_f_show" v-bind:scan_input_text="i18n.scan_input_text_f" v-bind:scan_icon_show="true"
		 v-bind:input_focus="scan_input_foc_f" v-bind:placeholder_text="i18n.placeholder_text_f" @input="onInputF" @work="scanFInputSuc"
		 v-model="Barcode" />


		<!-- 物料 -->
		<bindScanInput v-if="input_g_show" v-bind:scan_input_text="i18n.scan_input_text_g" v-bind:scan_icon_show="true"
		 v-bind:input_focus="scan_input_foc_g" v-bind:placeholder_text="i18n.placeholder_text_g" @input="onInputG" @work="scanGInputSuc"
		 v-model="MaterialCode" />
		<!-- 门板条码 -->
		<bindScanInput v-if="input_i_show" v-bind:scan_input_text="i18n.scan_input_text_i" v-bind:scan_icon_show="true"
		 v-bind:input_focus="scan_input_foc_i" v-bind:placeholder_text="i18n.placeholder_text_i" @input="onInputI" @work="scanIInputSuc"
		 v-model="RCard" />
		<!-- 不良代码 -->
		<bindErrCodeInput v-bind:warehouse_data="err_code_data" v-if="input_j_show" v-bind:text_store="i18n.text_err_code"
		 v-on:choStore="choErrCode" />
		<!-- 仓库 -->
		<bindStoreInput v-bind:warehouse_data="warehouse_data" v-if="input_e_show" v-bind:text_store="i18n.text_store"
		 v-on:choStore="choStore" />

		<button class="common_btn_fb" @tap="goSearch">{{i18n.search}}</button>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll">
			<!-- 非综合查询 -->
			<view v-if="search_show_first" class="purchase_list" v-for="(item,index) in result_list" @tap="goDetail(item.billCode)"
			 :key="index">
				<view class="purchase_list_a">
					<text>{{item.billCode}}</text>
					<text>{{item.billDate}}{{item.creationTime}}</text>
				</view>
				<view class="purchase_list_b">
					{{item.supplierName}}
				</view>
			</view>
			<!-- 综合查询 -->
			<!-- 按库位查询 -->
			<!-- 按条码查询 -->
			<view v-if="search_show_a" class="purchase_list" v-for="(item,index) in result_list" :key="index">
				<view class="purchase_list_c">
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_a}}:</view>
						<view class="purchase_list_c_content">{{item.barcode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_b}}:</view>
						<view class="purchase_list_c_content">{{item.locationCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_c}}:</view>
						<view class="purchase_list_c_content">{{item.dateCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_d}}:</view>
						<view class="purchase_list_c_content">{{item.qty}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_e}}:</view>
						<view class="purchase_list_c_content" v-if="item.barcodeStatus==1">{{i18n.purchase_list_c_title_f_a}}</view>
						<view class="purchase_list_c_content" v-if="item.barcodeStatus==9">{{i18n.purchase_list_c_title_f_b}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_g}}:</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='Lot'">{{i18n.purchase_list_c_title_g_a}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='KeyParts'">{{i18n.purchase_list_c_title_g_b}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='NoControl'">{{i18n.purchase_list_c_title_g_c}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_h}}:</view>
						<view class="purchase_list_c_content">{{item.materialCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_i}}:</view>
						<view class="purchase_list_c_content">{{item.materialName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_j}}:</view>
						<view class="purchase_list_c_content">{{item.materialStandard}}</view>
					</view>
				</view>
			</view>
			<!-- 按物料查询 -->
			<view v-if="search_show_b" class="purchase_list" v-for="(item,index) in result_list" :key="index" @tap="gotoMore(item.warehouseId)">
				<view class="purchase_list_c">
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_k}}:</view>
						<view class="purchase_list_c_content">{{item.materialCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_i}}:</view>
						<view class="purchase_list_c_content">{{item.materialName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_d}}:</view>
						<view class="purchase_list_c_content">{{item.qty}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_j}}:</view>
						<view class="purchase_list_c_content">{{item.materialStandard}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_g}}:</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='Lot'">{{i18n.purchase_list_c_title_g_a}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='KeyParts'">{{i18n.purchase_list_c_title_g_b}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='NoControl'">{{i18n.purchase_list_c_title_g_c}}</view>
					</view>
				</view>
			</view>
			<!-- 入库记录查询按条码查询 -->
			<view v-if="search_show_c" class="purchase_list" v-for="(item,index) in result_list" :key="index">
				<view class="purchase_list_c">
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_k}}:</view>
						<view class="purchase_list_c_content">{{item.materialCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_i}}:</view>
						<view class="purchase_list_c_content">{{item.materialName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_j}}:</view>
						<view class="purchase_list_c_content">{{item.materialStandard}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.warehouseName}}:</view>
						<view class="purchase_list_c_content">{{item.warehouseName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.locationCode}}:</view>
						<view class="purchase_list_c_content">{{item.locationCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_d}}:</view>
						<view class="purchase_list_c_content">{{item.qty}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{creationTime_text}}:</view>
						<view class="purchase_list_c_content">{{item.creationTime}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.inOutType}}:</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==1">{{i18n.inOutType_a}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==2">{{i18n.inOutType_b}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==4">{{i18n.inOutType_c}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==5">{{i18n.inOutType_d}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==6">{{i18n.inOutType_e}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==7">{{i18n.inOutType_f}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==8">{{i18n.inOutType_g}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==9">{{i18n.inOutType_h}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==10">{{i18n.inOutType_i}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==11">{{i18n.inOutType_j}}</view>
						<view class="purchase_list_c_content" v-if="item.inOutType==12">{{i18n.inOutType_k}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.sourceBillType}}:</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==13">{{i18n.sourceBillType_a}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==15">{{i18n.sourceBillType_b}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==20">{{i18n.sourceBillType_c}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==21">{{i18n.sourceBillType_d}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==22">{{i18n.sourceBillType_e}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==23">{{i18n.sourceBillType_f}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==24">{{i18n.sourceBillType_g}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==25">{{i18n.sourceBillType_h}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==40">{{i18n.sourceBillType_i}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==42">{{i18n.sourceBillType_j}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==43">{{i18n.sourceBillType_k}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==50">{{i18n.sourceBillType_l}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==51">{{i18n.sourceBillType_m}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==52">{{i18n.sourceBillType_o}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==53">{{i18n.sourceBillType_p}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==60">{{i18n.sourceBillType_q}}</view>
						<view class="purchase_list_c_content" v-if="item.sourceBillType==61">{{i18n.sourceBillType_r}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.sourceCode}}:</view>
						<view class="purchase_list_c_content" v-if="item.sourceCode!=null">{{item.sourceCode}}</view>
					</view>
				</view>
			</view>

			<!-- 按入库记录按物料查询 -->
			<view v-if="search_show_d" class="purchase_list" v-for="(item,index) in result_list" :key="index" @tap="gotoMore(item.warehouseId)">
				<view class="purchase_list_c">
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_k}}:</view>
						<view class="purchase_list_c_content">{{item.materialCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_i}}:</view>
						<view class="purchase_list_c_content">{{item.materialName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_j}}:</view>
						<view class="purchase_list_c_content">{{item.materialStandard}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.warehouseName}}:</view>
						<view class="purchase_list_c_content">{{item.warehouseName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_d}}:</view>
						<view class="purchase_list_c_content">{{item.qty}}</view>
					</view>

					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_g}}:</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='Lot'">{{i18n.purchase_list_c_title_g_a}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='KeyParts'">{{i18n.purchase_list_c_title_g_b}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='NoControl'">{{i18n.purchase_list_c_title_g_c}}</view>
					</view>
				</view>
			</view>
			<!-- 出库记录按物料代码 -->
			<view v-if="search_show_e" class="purchase_list" v-for="(item,index) in result_list" :key="index" @tap="gotoMore(item.warehouseId)">
				<view class="purchase_list_c">
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_k}}:</view>
						<view class="purchase_list_c_content">{{item.materialCode}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_i}}:</view>
						<view class="purchase_list_c_content">{{item.materialName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_j}}:</view>
						<view class="purchase_list_c_content">{{item.materialStandard}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.warehouseName}}:</view>
						<view class="purchase_list_c_content">{{item.warehouseName}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_d}}:</view>
						<view class="purchase_list_c_content">{{item.qty}}</view>
					</view>
					<view class="purchase_list_c_line">
						<view class="purchase_list_c_title">{{i18n.purchase_list_c_title_g}}:</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='Lot'">{{i18n.purchase_list_c_title_g_a}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='KeyParts'">{{i18n.purchase_list_c_title_g_b}}</view>
						<view class="purchase_list_c_content" v-if="item.controlType=='NoControl'">{{i18n.purchase_list_c_title_g_c}}</view>
					</view>
				</view>
			</view>

			<bottomCountArea v-bind:count="count" v-if="bottomCountArea_show" />
		</scroll-view>

		<loadingWait v-if="loading_wait_show" />
	</view>
</template>

<script>
	import bindScanInput from "../components/bindScanInput/bindScanInput.vue"
	import bindDateInput from "../components/bindDateInput/bindDateInput.vue"
	import bindStoreInput from "../components/bindStoreInput/bindStoreInput.vue"
	import bindErrCodeInput from "../components/bindErrCodeInput/bindErrCodeInput.vue"
	import loadingWait from "../components/loadingWait/loadingWait.vue"
	import bottomCountArea from "../components/bottomCountArea/bottomCountArea.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			loadingWait,
			bindScanInput,
			bindDateInput,
			bottomCountArea,
			bindStoreInput,
			bindErrCodeInput
		},

		data() {
			return {
				order: '',
				order_text: '',
				supplier: '',
				supplier_text: '',
				BillCode: '',
				SupplierCode: '',
				Type: '',
				result_list: '',
				loading_wait_show: false,
				scan_input_foc_a: true,
				scan_input_foc_b: false,
				BillDate: '',
				input_a_show: true,
				input_b_show: true,
				input_c_show: false,

				GetPO_url: '',
				BizType: '',

				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				count: '',
				bottomCountArea_show: false,
				MaxResultCount: 10,
				SkipCount: 0,
				scroll_items: [],
				// 综合查询
				input_d_show: false,
				input_e_show: false,
				input_f_show: false,
				input_g_show: false,
				input_h_show: false,
				input_i_show: false,
				input_j_show: false,
				scan_input_foc_d: false,
				scan_input_foc_f: false,
				scan_input_foc_g: false,
				scan_input_foc_h: false,
				scan_input_foc_i: false,
				LocationCode: '',
				Barcode: '',
				MaterialCode: '',
				warehouse_data: '',
				search_show_first: true,
				search_show_a: false,
				search_show_b: false,
				search_show_c: false,
				search_show_d: false,
				search_show_e: false,
				creationTime_text: '',
				RCard: '',
				SNType: '',
				err_code_data: ''

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
			i18n() {
				return this.$t('PurchaseList')
			},
			i18n_modal() {
				return this.$t('modal_text')
			},
			MAC() {
				return this.$store.state.MAC
			},
		},

		methods: {
			...mapMutations(['MacInfo']),
			...mapMutations(['changeToken']),
			...mapMutations(['changeOrgId']),
			...mapMutations(['ErrRequestShow']),
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				this.SkipCount += 10
				this.GetPO()
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			initInputStatus() {
				this.scan_input_foc_a = false
				this.scan_input_foc_b = false
				this.scan_input_foc_d = false
				this.scan_input_foc_f = false
				this.scan_input_foc_h = false
			},
			onInputA(val) {
				this.initInputStatus()
				this.BillCode = val;
			},
			onInputB(val) {
				this.initInputStatus()
				this.SupplierCode = val;
			},
			onInputD(val) {
				this.scan_input_foc_d = true
			},
			onInputF(val) {
				this.Barcode = val;
			},
			onInputG(val) {
				this.MaterialCode = val;
			},
			onInputI(val) {
				this.RCard = val;
			},
			onInputH(val) {
				this.Barcode = val;
			},
			choDate(e) {
				this.BillDate = e
				// console.log(this.BillDate)
			},
			choStore(e) {
				this.WarehouseId = e
			},
			choErrCode(e) {
				this.SNType = e
			},
			CartonNoInstock() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/ProductInstock/CartonNoInstock',
					data: {
						LocationCode: that.LocationCode,
						Barcode: that.Barcode,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.showModal({
								title: this.i18n_modal.modal_title_text,
								content: this.i18n.alert_data_c
							})
						}
					}
				});
			},
			GetPO() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + that.GetPO_url,
					data: {
						BillCode: that.BillCode,
						SupplierCode: that.SupplierCode,
						Type: that.Type,
						MAC: that.MAC,
						BizType: that.BizType,
						BillDate: that.BillDate,
						MaxResultCount: that.MaxResultCount,
						SkipCount: that.SkipCount,
						LocationCode: that.LocationCode,
						WarehouseId: that.WarehouseId,
						Barcode: that.Barcode,
						MaterialCode: that.MaterialCode
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							if (that.SkipCount == 0) { //判断是否是第一次筛选
								that.scroll_items = []
							}
							if (res.data.result.items.length == 0) { //没有更多数据了
								that.count = ''
								that.bottomCountArea_show = true
							} else {
								let totalCount = res.data.result.totalCount
								let now_conut = that.MaxResultCount + that.SkipCount
								if (now_conut < totalCount) { //还没有滑倒底部
									that.count = totalCount - now_conut
									that.bottomCountArea_show = true
								} else {
									// that.bottomCountArea_show = false
								}
								that.scroll_items = that.scroll_items.concat(res.data.result.items)
								for (let key in that.scroll_items) {
									if (that.scroll_items[key].billDate) {
										that.scroll_items[key].billDate = that.scroll_items[key].billDate.slice(0, 10)
									}
									if (that.scroll_items[key].creationTime) {
										that.scroll_items[key].creationTime = that.scroll_items[key].creationTime.slice(0, 10)
									}
									if (that.scroll_items[key].dateCode) {
										that.scroll_items[key].dateCode = that.scroll_items[key].dateCode.slice(0, 10)
									}
								}
							}
							that.result_list = that.scroll_items
						} else {
							that.BillCode = ''
							that.SupplierCode = ''
						}
					}
				});
			},
			GetWarehouse() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/Warehouse/GetWarehouse',
					data: {
						MAC: that.MAC,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.warehouse_data = res.data.result
						} else {

						}
					}
				});
			},
			Carnstock() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/wmspda/ProductInstock/CarInstock',
					data: {
						BarCode: that.Barcode,
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.showModal({
								title: this.i18n_modal.modal_title_text,
								content: this.i18n.alert_data_c
							})
						}
					}
				});
			},
			GetPlankErrorCode() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/ProductionPlan/MO2RCard/GetPlankErrorCode',
					data: {

					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							that.err_code_data = res.data.result.items
						}

					}
				});
			},
			PlankError() {
				let that = this
				that.loading_wait_show = true
				uni.request({
					url: that.connect_url + 'api/services/ProductionPlan/MO2RCard/PlankError',
					data: {
						"RCard": that.RCard,
						"SNType": that.SNType
					},
					method: 'POST',
					header: that.post_header,
					success: (res) => {
						console.log(res.data)
						that.loading_wait_show = false
						that.ErrRequestShow(res)
						if (res.data.success == true) {
							uni.showModal({
								title: this.i18n_modal.modal_title_text,
								content: this.i18n.alert_data_c
							})
						}

					}
				});
			},
			gotoMore(id) { //warehouseId
				let that = this
				for (let i = 0; i < that.result_list.length; i++) {
					if (id == that.result_list[i].warehouseId) {
						uni.setStorageSync('stock_check_more_data', that.result_list[i])
						uni.navigateTo({
							url: '../stockCheckMore/stockCheckMore'
						});
					}
				}

			},
			goDetail(billCode) {
				let that = this
				for (let i = 0; i < that.result_list.length; i++) {
					if (billCode == that.result_list[i].billCode) {
						uni.setStorageSync('BillCodeDetail', that.result_list[i])
						uni.setStorageSync('BillId', that.result_list[i].id)
					}
				}
				uni.setStorageSync('BillCode', billCode)
				if (that.permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') { //生产调拨入库
					uni.setStorageSync('receipts_data', that.result_list[0])
					uni.navigateTo({
						url: '../Warehousing/Warehousing'
					});
				} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OutstouceTransferIn') { //委外调拨入库
					uni.setStorageSync('receipts_data', that.result_list[0])
					uni.navigateTo({
						url: '../Warehousing/Warehousing'
					});
				} else if (that.permissionCode == 'Pages.WPDA.OutStock.Product.ProductTransferOut' || that.permissionCode ==
					'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut' || that.permissionCode ==
					'Pages.WPDA.StockIn.TransferAdjust.OutTransfer') { //生产调拨出库//委外调拨出库//调拨出库
					uni.setStorageSync('receipts_data', that.result_list[0])
					uni.setStorageSync('OutgoingOperation_permissionCode', that.permissionCode)
					uni.navigateTo({
						url: '../ItemInventoryOut/ItemInventoryOut'
					});
				} else if (that.permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.InTransfer') { //调拨入库
					uni.setStorageSync('receipts_data', that.result_list[0])
					uni.navigateTo({
						url: '../Warehousing/Warehousing'
					});
				} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.OutSourcePoReturn') { //委外退料
					let that = this
					for (let i = 0; i < that.result_list.length; i++) {
						if (billCode == that.result_list[i].billCode) {
							uni.setStorageSync('OutsourcingReturnSheet_data', that.result_list[i])
							uni.setStorageSync('BillId', that.result_list[i].id)
						}
					}
					uni.navigateTo({
						url: '../WarehousingOut/WarehousingOut'
					});
				} else if (that.permissionCode == 'Pages.WPDA.StockIn.Convert.OutConvert') { //形态转换出库

					uni.setStorageSync('OutgoingOperation_permissionCode', that.permissionCode)
					uni.navigateTo({
						url: '../ItemInventoryOut/ItemInventoryOut'
					});
				} else if (that.permissionCode == 'Pages.WPDA.StockIn.Convert.InConvert') { //形态转换入库
					for (let i = 0; i < that.result_list.length; i++) {
						if (billCode == that.result_list[i].billCode) {
							uni.setStorageSync('receipts_data', that.result_list[i])
						}
					}
					uni.setStorageSync('OutgoingOperation_permissionCode', that.permissionCode)
					uni.navigateTo({
						url: '../Warehousing/Warehousing'
					});
				} else if (that.permissionCode == 'Pages.WPDA.StockIn.QuertInventory.Inventory') { //盘点
					uni.setStorageSync('check_data', that.result_list)
					uni.navigateTo({
						url: '../check/check'
					});
				} else {
					uni.navigateTo({
						url: '../ItemInventory/ItemInventory'
					});
				}

			},
			goSearch() {
				let that = this

				if (that.permissionCode == 'Pages.WPDA.Instock.Storage.CarInstock') { //小车入库
					that.Carnstock()
					return
				}
				if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PlankError') { //门板不良
					that.PlankError()
					return
				}
				if (that.input_h_show = true) { //产成品箱号入库
					if (that.Barcode == '' || that.LocationCode == '') {
						uni.showModal({
							title: this.i18n_modal.modal_title_text,
							// content: '请至少选填一项',
							content: this.i18n.alert_data_a
						})
					} else {
						that.CartonNoInstock()
					}
					return
				}
				if (that.input_d_show == false && that.input_f_show == false && that.input_g_show == false) { //非综合查询
					if (that.BillCode == '' && that.BillDate == '' && that.SupplierCode == '') {
						uni.showModal({
							title: this.i18n_modal.modal_title_text,
							// content: '请至少选填一项',
							content: this.i18n.alert_data_a
						})
					} else {
						that.GetPO()
					}
				} else if (that.input_d_show == true) { //按库位查询
					if (that.LocationCode == '' && that.WarehouseId == '') {
						uni.showModal({
							title: this.i18n_modal.modal_title_text,
							// content: '请至少选填一项',
							content: this.i18n.alert_data_a
						})
					} else {
						that.GetPO()
					}
				} else if (that.input_f_show == true) { //按条码查询
					if (that.Barcode == '' && that.WarehouseId == '') {
						uni.showModal({
							title: this.i18n_modal.modal_title_text,
							// content: '请至少选填一项',
							content: this.i18n.alert_data_a
						})
					} else {
						that.GetPO()
					}
				} else if (that.input_g_show = true) { //按物料查询
					if (that.MaterialCode == '' && that.WarehouseId == '') {
						uni.showModal({
							title: this.i18n_modal.modal_title_text,
							// content: '请至少选填一项',
							content: this.i18n.alert_data_a
						})
					} else {
						that.GetPO()
					}
				}
			},
			scanAInputSuc(e) {
				this.initInputStatus()
				// this.scan_input_foc_b = true
				this.goSearch()
			},
			scanBInputSuc(e) {
				this.initInputStatus()
				// this.scan_input_foc_a = true
				this.goSearch()
			},
			scanDInputSuc(e) {
				this.initInputStatus()
				this.goSearch()
			},
			scanFInputSuc(e) {
				this.initInputStatus()
				this.goSearch()
			},
			scanGInputSuc(e) {
				this.initInputStatus()
				this.goSearch()
			},

			scanHInputSuc() {
				this.initInputStatus()
				this.scan_input_foc_d = true
			},
			scanIInputSuc() {
				this.initInputStatus()
				// this.goSearch()
			},

		},
		onLoad() {
			// this.MacInfo();
			let that = this
			// 			this.Type = uni.getStorageSync('Type')
			// 			console.log(this.Type)
			let title = '';
			// 			if (this.Type == '11') {//采购单
			// 				title = this.i18n.page_title
			// 			} else if (this.Type == '12') {//委外单
			// 				title = this.i18n.page_title_out
			// 			}
			that.permissionCode = uni.getStorageSync('WarehousingOperation_permissionCode')
			if (that.permissionCode == 'Pages.WPDA.Instock.Receipt.Po') { //采购单
				this.Type = 11
				uni.setStorageSync('Type', this.Type)
				title = this.i18n.page_title
				this.GetPO_url = 'api/services/wmspda/PO/GetPO'
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Receipt.OutSourcePo') { //委外单
				this.Type = 12
				uni.setStorageSync('Type', this.Type)
				title = this.i18n.page_title_out
				this.GetPO_url = 'api/services/wmspda/PO/GetPO'
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.ProductTransferIn') { //生产调拨入库
				title = this.i18n.page_title_ProductTransferIn
				this.BizType = 1
				this.GetPO_url = 'api/services/wmspda/InTransfer/GetInTransfer'
				this.input_b_show = false
				this.input_c_show = true
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.OutstouceTransferIn') { //委外调拨入库
				title = this.i18n.page_title_OutstouceTransferIn
				this.BizType = 2
				this.GetPO_url = 'api/services/wmspda/InTransfer/GetInTransfer'
				this.input_b_show = false
				this.input_c_show = true
			} else if (that.permissionCode == 'Pages.WPDA.OutStock.Product.ProductTransferOut') { //生产调拨出库
				title = this.i18n.page_title_ProductTransferOut
				this.BizType = 1
				this.GetPO_url = 'api/services/wmspda/OutTransfer/GetOutTransfer'
				this.input_b_show = false
				this.input_c_show = true
			} else if (that.permissionCode == 'Pages.WPDA.OutStock.Outsource.OutstouceTransferOut') { //委外调拨出库
				title = this.i18n.page_title_OutstouceTransferOut
				this.BizType = 2
				this.GetPO_url = 'api/services/wmspda/OutTransfer/GetOutTransfer'
				this.input_b_show = false
				this.input_c_show = true
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.OutTransfer') { //调拨出库
				title = this.i18n.page_title_OutTransfer
				this.BizType = 9
				this.GetPO_url = 'api/services/wmspda/OutTransfer/GetOutTransfer'
				this.input_b_show = false
				this.input_c_show = true
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.TransferAdjust.InTransfer') { //调拨入库
				title = this.i18n.page_title_InTransfer
				this.BizType = 9
				this.GetPO_url = 'api/services/wmspda/InTransfer/GetInTransfer'
				this.input_b_show = false
				this.input_c_show = true
			} else if (that.permissionCode == 'Pages.WPDA.Instock.ReturnMaterial.OutSourcePoReturn') { //委外退料
				title = this.i18n.page_title_OutSourcePoReturn
				this.GetPO_url = 'api/services/wmspda/OutSourceReturn/GetOutSourceReturn'
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.Convert.OutConvert') { //形态转换出库
				title = this.i18n.page_title_OutConvert
				this.input_b_show = false
				this.input_c_show = true
				this.GetPO_url = 'api/services/wmspda/OutConvert/GetOutConvert'
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.Convert.InConvert') { //形态转换入库
				title = this.i18n.page_title_OutConvert
				this.input_b_show = false
				this.input_c_show = true
				this.BizType = 1
				this.GetPO_url = 'api/services/wmspda/InConvert/GetInConvert'
			} else if (that.permissionCode == 'Pages.WPDA.StockIn.QuertInventory.Inventory') { //盘点
				title = this.i18n.page_title_Inventory
				this.input_b_show = false
				this.input_c_show = false
				this.GetPO_url = 'api/services/wmspda/Inventory/QueryCheckStockHeaderDataByInput'
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByLocation') { //按库位查询
				title = this.i18n.page_title_store
				this.input_a_show = false
				this.input_b_show = false
				this.input_d_show = true
				this.input_e_show = true
				this.GetPO_url = 'api/services/wmspda/StorageQuery/QueryByLocationCode'
				this.GetWarehouse()
				this.search_show_a = true
				this.search_show_first = false
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByBarcode') { //按条码查询
				title = this.i18n.page_title_store
				this.input_a_show = false
				this.input_b_show = false
				this.input_f_show = true
				this.input_e_show = true
				this.GetPO_url = 'api/services/wmspda/StorageQuery/QueryByBarcode'
				this.GetWarehouse()
				this.search_show_a = true
				this.search_show_first = false
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByMaterial') { //按物料查询
				title = this.i18n.page_title_store
				this.input_a_show = false
				this.input_b_show = false
				this.input_g_show = true
				this.input_e_show = true
				this.GetPO_url = 'api/services/wmspda/StorageQuery/QueryByMaterialCode'
				this.search_show_b = true
				this.GetWarehouse()
				this.search_show_first = false
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByBarcode') { //入库记录按条码查询
				this.input_a_show = false
				this.input_b_show = false
				this.input_f_show = true
				this.input_e_show = true
				this.GetPO_url = 'api/services/wmspda/InstockRecord/GetInstockRecordByBarcode'
				this.search_show_c = true
				this.GetWarehouse()
				this.search_show_first = false
				this.scan_input_foc_f = true
				this.creationTime_text = this.i18n.creationTime
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByBarcode') { //出库记录按条码查询
				this.input_a_show = false
				this.input_b_show = false
				this.input_f_show = true
				this.input_e_show = true
				this.GetPO_url = 'api/services/wmspda/OutstockRecord/GetOutstockRecordByBarcode'
				this.search_show_c = true
				this.GetWarehouse()
				this.search_show_first = false
				this.scan_input_foc_f = true
				this.creationTime_text = this.i18n.creationTime_out
			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByMaterial') { //入库记录查询按物料查询
				this.input_a_show = false
				this.input_b_show = false
				this.input_g_show = true
				this.input_e_show = true
				this.GetPO_url = 'api/services/wmspda/InstockRecord/GetInstockRecordByMaterialCode'
				this.search_show_d = true
				this.GetWarehouse()
				this.search_show_first = false
				this.scan_input_foc_g = true

			} else if (that.permissionCode == 'Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByMaterial') { //出库记录查询按物料查询
				this.input_a_show = false
				this.input_b_show = false
				this.input_g_show = true
				this.input_e_show = true
				this.GetPO_url = 'api/services/wmspda/OutstockRecord/GetOutstockRecordByMaterialCode'
				this.search_show_e = true
				this.GetWarehouse()
				this.search_show_first = false
				this.scan_input_foc_g = true
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PorductCartonInstock') { //产成品箱号入库
				this.input_a_show = false
				this.input_b_show = false
				this.input_h_show = true
				this.input_d_show = true
				this.i18n.search = this.i18n.save_text
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.CarInstock') { //小车入库
				this.input_a_show = false
				this.input_b_show = false
				this.input_f_show = true
				console.log(this.i18n)
				// console.log(this.i18n.scan_input_text_f)
				// console.log(this.i18n.scan_input_text_f_co)
				this.i18n.scan_input_text_f = this.i18n.scan_input_text_f_co
				this.i18n.placeholder_text_f = this.i18n.placeholder_text_f_co
				this.i18n.search = this.i18n.save_text
			} else if (that.permissionCode == 'Pages.WPDA.Instock.Storage.PlankError') { //门板不良
				this.input_a_show = false
				this.input_b_show = false
				this.input_i_show = true
				this.input_j_show = true
				this.GetPlankErrorCode()
				this.i18n.scan_input_text_f = this.i18n.scan_input_text_f_co
				this.i18n.placeholder_text_f = this.i18n.placeholder_text_f_co
				this.i18n.search = this.i18n.save_text
			}
			let title_permissionName = uni.getStorageSync('title_permissionName')
			if (title_permissionName != '') {
				title = title_permissionName
			}
			uni.setNavigationBarTitle({
				title: title
			});
			this.order = this.i18n.order_numbers
			this.order_text = this.i18n.order_text
			this.supplier = this.i18n.supplier
			this.supplier_text = this.i18n.supplier_text

		},
		created() {}
	}
</script>

<style>
	.purchase_list {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #DDDDDD;
	}

	.purchase_list_a {
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		font-size: 25upx;
	}

	.purchase_list_b {
		padding-left: 20upx;
		font-size: 25upx;
	}

	.purchase_list_c {
		display: flex;
		flex-direction: column;
		padding: 20upx 50upx;
	}

	.scroll-Y {
		height: 800upx;
		/* background: red; */
	}

	.purchase_list_c_line {
		display: flex;
		flex-direction: flex-direction;

	}

	.purchase_list_c_title {
		width: 180upx;
		text-align: right;
		font-size: 25upx;
	}

	.purchase_list_c_content {
		width: 500upx;
		padding-left: 20upx;
		font-size: 25upx;
	}
</style>
