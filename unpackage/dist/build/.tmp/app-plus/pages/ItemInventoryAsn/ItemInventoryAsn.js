(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ItemInventoryAsn/ItemInventoryAsn"],{"15b5":function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",[a("PurchaseOrderInquirybodyA",{attrs:{eventid:"62b3c73c-0",mpcomid:"62b3c73c-0"},on:{phead_choose:e.phead_choose}}),e.left_show?a("PurchaseOrderInquirybodyB",{attrs:{order_text:e.i18n.order_text,order_text_list:e.order_text_list,order_time:e.i18n.order_time,order_time_list:e.order_time_list,supplier:e.i18n.supplier,supplier_list:e.supplier_list,supplier_man:e.i18n.supplier_man,supplier_man_list:e.supplier_man_list,mpcomid:"62b3c73c-1"}}):e._e(),e.left_show?a("PurchaseOrderInquirybodyC",{attrs:{table_list:e.table_list,PurchaseOrderInquirybodyC_from:e.PurchaseOrderInquirybodyC_from,eventid:"62b3c73c-1",mpcomid:"62b3c73c-2"},on:{tapMater:e.tapMater}}):e._e(),e.MaterialInventoryModal_show?a("MaterialInventoryModal",{attrs:{PurchaseOrderInquirybodyC_from:e.PurchaseOrderInquirybodyC_from,data_a:e.data_a,data_b:e.data_b,data_c:e.data_c,data_d:e.data_d,data_e:e.data_e,data_f:e.data_f,data_g:e.data_g,show_modal_header:e.show_modal_header,show_modal_body:e.show_modal_body,show_modal_from:e.show_modal_from,eventid:"62b3c73c-2",mpcomid:"62b3c73c-3"},on:{showModalBtn:e.showModalBtn}}):e._e(),e.alertModal_show?a("alertModal",{attrs:{alert_modal:e.alert_modal,mpcomid:"62b3c73c-4"}}):e._e(),a("view",{staticClass:"common_bot_btn",attrs:{eventid:"62b3c73c-3"},on:{tap:e.SureSubmit}},[e._v("确认提交")]),0==e.left_show?a("InventoryList",{attrs:{InventoryList_data:e.InventoryList_data,eventid:"62b3c73c-4",mpcomid:"62b3c73c-5"},on:{modal_copyshow:e.modal_copyshow}}):e._e(),e.record_modal_show?a("RecordModal",{attrs:{InventoryList_data_detail:e.InventoryList_data_detail,data_a:e.InventoryList_data_detail.materialCode,data_b:e.InventoryList_data_detail.materialName,data_f:e.InventoryList_data_detail.countQty,data_g:e.InventoryList_data_detail.giveQty,show_modal_header:e.show_modal_header,show_modal_body:e.show_modal_body,show_modal_from:e.show_modal_from,eventid:"62b3c73c-5",mpcomid:"62b3c73c-6"},on:{showModalBtnA:e.showModalBtnA}}):e._e(),e.loading_wait_show?a("loadingWait",{attrs:{mpcomid:"62b3c73c-7"}}):e._e()],1)},r=[];a.d(t,"a",function(){return o}),a.d(t,"b",function(){return r})},"1f32":function(e,t,a){"use strict";a.r(t);var o=a("5c70"),r=a.n(o);for(var d in o)"default"!==d&&function(e){a.d(t,e,function(){return o[e]})}(d);t["default"]=r.a},"4cc8":function(e,t,a){"use strict";a("72e6");var o=d(a("b0ce")),r=d(a("9736"));function d(e){return e&&e.__esModule?e:{default:e}}Page((0,o.default)(r.default))},"5c70":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(a("3dbe")),r=u(a("1c14")),d=u(a("2103")),i=u(a("2d64")),n=u(a("2123")),l=u(a("57fd")),s=u(a("1a42")),c=u(a("fbdb")),_=a("2f62");function u(e){return e&&e.__esModule?e:{default:e}}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},o=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),o.forEach(function(t){f(e,t,a[t])})}return e}function f(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var m={components:{PurchaseOrderInquirybodyA:o.default,PurchaseOrderInquirybodyB:r.default,PurchaseOrderInquirybodyC:d.default,MaterialInventoryModal:i.default,alertModal:n.default,InventoryList:l.default,RecordModal:s.default,loadingWait:c.default},data:function(){return{order_text:"订单号",order_text_list:"",order_time:"采购日期",order_time_list:"",supplier:"供应商",supplier_list:"",supplier_man:"采购员",supplier_man_list:"",MaterialInventoryModal_show:!1,show_modal_header:"物料清点",show_modal_body:"",show_modal_from:"ItemInventory",alert_modal:"物料清点保存成功",alertModal_show:!1,left_show:!0,BillCode:"",BillCodeDetail:"",table_list:"",data_a:"",data_b:"",data_c:"",data_d:"",data_e:"",data_f:"",data_g:0,BizType:11,BillId:"",DetailId:"",CountQty:"",GiveQty:"",InventoryList_data:"",InventoryList_data_detail:"",record_modal_show:!1,record_data_f:"",record_data_g:"",ReceiveRecordId:"",positionTop:"",PurchaseOrderInquirybodyC_from:"ItemInventoryAsn",loading_wait_show:!1}},computed:{connect_url:function(){return this.$store.state.connect_url},current_language:function(){return this.$store.state.current_language},post_header:function(){return this.$store.state.post_header},MAC:function(){return this.$store.state.MAC},i18n:function(){return this.$t("ItemInventoryAsn")}},methods:h({},(0,_.mapMutations)(["initPosition"]),(0,_.mapMutations)(["ErrRequestShow"]),{showModalBtnA:function(t){var a=this;a.record_modal_show=!1,a.record_data_f=e.getStorageSync("record_data_f"),a.record_data_g=e.getStorageSync("record_data_g"),a.ReceiveRecordId=e.getStorageSync("ReceiveRecordId"),1==t?(console.log(1),a.DeleteReceiveRecord()):2==t?console.log(2):3==t&&(console.log(3),a.ModifyReceiveRecord())},phead_choose:function(e){console.log(e),this.left_show=e,1==e?this.GetAsnDetail():this.GetReceiveRecord()},modal_copyshow:function(t){var a=this;a.initPosition(),a.record_modal_show=!0,a.InventoryList_data_detail=e.getStorageSync("InventoryList_data_detail"),console.log(a.InventoryList_data_detail)},tapMater:function(t){var a=this;a.MaterialInventoryModal_show=!0,console.log(t),a.data_a=t.materialCode,a.data_b=t.materialName,a.data_f=t.asnQty-t.recvQty-t.countQty,console.log("清点数："+a.data_f),a.data_d=t.asnQty,a.data_e=t.recvQty,a.DetailId=t.id,a.BillId=e.getStorageSync("BillId")},showModalBtn:function(t){var a=this;a.initPosition(),console.log(t),a.MaterialInventoryModal_show=!1,1==t&&(a.CountQty=e.getStorageSync("data_f"),a.GiveQty=e.getStorageSync("data_g"),a.SaveReceive())},SaveReceive:function(){var t=this;t.loading_wait_show=!0,e.request({url:t.connect_url+"api/services/wmspda/Asn/SaveReceive",data:{BillCode:t.BillCode,MAC:t.MAC,BillId:t.BillId,DetailId:t.DetailId,CountQty:t.CountQty,GiveQty:t.GiveQty},method:"POST",header:t.post_header,success:function(a){t.loading_wait_show=!0,console.log(a.data),1!=a.data.success?t.ErrRequestShow(a):(e.showToast({icon:"none",title:"物料清点保存成功",duration:2e3}),t.GetAsnDetail())}})},DeleteReceiveRecord:function(){var t=this;t.loading_wait_show=!1,e.request({url:t.connect_url+"api/services/wmspda/asn/DeleteReceiveRecord",data:{MAC:t.MAC,ReceiveRecordId:t.ReceiveRecordId,CountQty:t.record_data_f,GiveQty:t.record_data_g},method:"POST",header:t.post_header,success:function(a){t.loading_wait_show=!1,console.log(a.data),a.data.success?(e.showToast({icon:"none",title:"记录删除成功",duration:2e3}),t.GetReceiveRecord()):t.ErrRequestShow(a)}})},ModifyReceiveRecord:function(){var t=this;t.loading_wait_show=!0,e.request({url:t.connect_url+"api/services/wmspda/asn/ModifyReceiveRecord",data:{MAC:t.MAC,ReceiveRecordId:t.ReceiveRecordId,CountQty:t.record_data_f,GiveQty:t.record_data_g},method:"POST",header:t.post_header,success:function(a){console.log(a.data),t.loading_wait_show=!1,a.data.success?(e.showToast({icon:"none",title:"记录修改成功",duration:2e3}),t.GetReceiveRecord()):t.ErrRequestShow(a)}})},GetAsnDetail:function(){var t=this;t.loading_wait_show=!0,e.request({url:t.connect_url+"api/services/wmspda/Asn/GetAsnDetail",data:{BillCode:t.BillCode,MAC:t.MAC},method:"POST",header:t.post_header,success:function(e){if(console.log(e),t.loading_wait_show=!1,e.data.success){for(var a=e.data.result,o=0;o<a.length;o++)for(var r in a[o])null==a[o][r]&&(a[o][r]=0);t.table_list=a}else t.ErrRequestShow(e)}})},SureSubmit:function(){this.SubmitByBillCode()},GetReceiveRecord:function(){var t=this;t.loading_wait_show=!0,e.request({url:t.connect_url+"api/services/wmspda/po/GetReceiveRecord",data:{BillCode:t.BillCode,MAC:t.MAC},method:"POST",header:t.post_header,success:function(e){if(t.loading_wait_show=!1,console.log(e.data),t.ErrRequestShow(e),1==e.data.success){var a=e.data.result;for(var o in a)a[o].createDateTime=a[o].createDateTime.slice(0,16).replace("T"," ");t.InventoryList_data=a}}})},SubmitByBillCode:function(){var t=this;t.loading_wait_show=!0,e.request({url:t.connect_url+"api/services/wmspda/Scan/SubmitByBillCode",data:{BillCode:t.BillCode,MAC:t.MAC},method:"POST",header:t.post_header,success:function(a){console.log(a.data),t.loading_wait_show=!1,t.ErrRequestShow(a),1==a.data.success&&(t.alert_modal="提交清点成功",t.alertModal_show=!0,setTimeout(function(){t.alertModal_show=!1,e.navigateBack({delta:1})},2e3))}})}}),onLoad:function(){var t=this;t.BillCodeDetail=e.getStorageSync("BillCodeDetail"),console.log(t.BillCodeDetail),t.BillCode=t.BillCodeDetail.billCode,t.order_text_list=t.BillCodeDetail.billCode,t.order_time_list=t.BillCodeDetail.billDate.slice(0,16).replace("T"," "),t.supplier_list=t.BillCodeDetail.supplierName,t.supplier_man_list=t.BillCodeDetail.createrName,t.GetAsnDetail()}};t.default=m}).call(this,a("6e42")["default"])},9736:function(e,t,a){"use strict";a.r(t);var o=a("15b5"),r=a("1f32");for(var d in r)"default"!==d&&function(e){a.d(t,e,function(){return r[e]})}(d);var i=a("2877"),n=Object(i["a"])(r["default"],o["a"],o["b"],!1,null,null,null);t["default"]=n.exports}},[["4cc8","common/runtime","common/vendor"]]]);