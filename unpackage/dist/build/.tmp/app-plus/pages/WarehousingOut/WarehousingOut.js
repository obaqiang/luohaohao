(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/WarehousingOut/WarehousingOut"],{"050e":function(t,a,n){},"34bd":function(t,a,n){"use strict";n.r(a);var s=n("ba92"),i=n("4395");for(var e in i)"default"!==e&&function(t){n.d(a,t,function(){return i[t]})}(e);n("c42e");var o=n("2877"),c=Object(o["a"])(i["default"],s["a"],s["b"],!1,null,null,null);a["default"]=c.exports},4395:function(t,a,n){"use strict";n.r(a);var s=n("800b"),i=n.n(s);for(var e in s)"default"!==e&&function(t){n.d(a,t,function(){return s[t]})}(e);a["default"]=i.a},"4bde":function(t,a,n){"use strict";n.r(a);var s=n("5d3d"),i=n("6eaa");for(var e in i)"default"!==e&&function(t){n.d(a,t,function(){return i[t]})}(e);n("ecd1");var o=n("2877"),c=Object(o["a"])(i["default"],s["a"],s["b"],!1,null,null,null);a["default"]=c.exports},5096:function(t,a,n){"use strict";(function(t){var s;function i(t,a,n){return a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n,t}Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,n("2f62");var e=(s={props:["placeholder_text","scan_input_text","scan_icon_show","scan_input_from","scan_input_val","scan_input_foc"],components:{},data:function(){return{text_right_area_icon:"../../static/img/text_right_area_icon.png",scan_input_value:this.scan_input_val}},computed:{},watch:{scan_input_val:function(t,a){this.scan_input_value=t}},onNavigationBarButtonTap:function(){}},i(s,"computed",{}),i(s,"methods",{focusInput:function(){},blurInput:function(t){var a=this;console.log(123),a.$emit("scanInputSuc",t.detail.value)},scanData:function(){var a=this;t.scanCode({success:function(t){a.scan_input_value=t.result,a.$emit("scanInputSuc",t.result)}})}}),i(s,"onLoad",function(){}),s);a.default=e}).call(this,n("6e42")["default"])},"5d3d":function(t,a,n){"use strict";var s=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("view",{staticClass:"body_list"},[n("text",{staticClass:"text_a"},[t._v(t._s(t.scan_input_text)+":")]),n("view",{staticClass:"text_right_area"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.scan_input_value,expression:"scan_input_value"}],staticClass:"text_right_input",attrs:{type:"text",placeholder:t.placeholder_text,focus:t.scan_input_foc,eventid:"5b5b64c2-0"},domProps:{value:t.scan_input_value},on:{confirm:t.blurInput,focus:t.focusInput,input:function(a){a.target.composing||(t.scan_input_value=a.target.value)}}}),t.scan_icon_show?n("image",{staticClass:"text_right_area_icon",attrs:{src:t.text_right_area_icon,eventid:"5b5b64c2-1"},on:{tap:t.scanData}}):t._e()])])},i=[];n.d(a,"a",function(){return s}),n.d(a,"b",function(){return i})},"6eaa":function(t,a,n){"use strict";n.r(a);var s=n("5096"),i=n.n(s);for(var e in s)"default"!==e&&function(t){n.d(a,t,function(){return s[t]})}(e);a["default"]=i.a},"800b":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=c(n("4bde")),i=c(n("1ea7")),e=c(n("fbdb")),o=n("2f62");function c(t){return t&&t.__esModule?t:{default:t}}function _(t){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{},s=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),s.forEach(function(a){u(t,a,n[a])})}return t}function u(t,a,n){return a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n,t}var r={components:{scanInput:s.default,loadingWait:e.default,bindScanInput:i.default},data:function(){return{scan_a:"",scan_b:"",scan_c:"",scan_d:"",scan_e:"",scan_f:"",billCode:"",billDate:"",id:"",instockQty:"",passQty:"",qty:"",scanQty:"",waitQty:"",receipts_data:"",BarCode:"",scan_input_value:"",scan_input_foc:!1,LocationCode:"",InstockQty:"",status:"",maxAllowQty:"",materialCode:"",materialName:"",barcodeInitQty:"",barcodeInstockQty:"",loading_wait_show:!1,scan_info_area_show:!1,scan_input_foc_a:!0,scan_input_foc_b:!1,scan_input_foc_c:!1,scan_input_value_a:"",scan_input_value_b:"",scan_input_value_c:"",text_right_area_icon:"../../static/img/text_right_area_icon.png"}},computed:{i18n:function(){return this.$t("WarehousingOut")},connect_url:function(){return this.$store.state.connect_url},current_language:function(){return this.$store.state.current_language},post_header:function(){return this.$store.state.post_header},MAC:function(){return this.$store.state.MAC}},onNavigationBarButtonTap:function(a){t.navigateTo({url:"../DetailsOfDocumentsAOut/DetailsOfDocumentsAOut"})},methods:_({},(0,o.mapMutations)(["MacInfo"]),(0,o.mapMutations)(["changeToken"]),(0,o.mapMutations)(["changeOrgId"]),(0,o.mapMutations)(["ErrRequestShow"]),{initInputStatus:function(){this.scan_input_foc_a=!1,this.scan_input_foc_b=!1},onInputA:function(t){this.initInputStatus(),this.scan_input_foc_a=!0,this.scan_input_value_a=t},onInputB:function(t){this.initInputStatus(),this.scan_input_foc_b=!0,this.scan_input_value_b=t},onInputC:function(t){this.initInputStatus(),this.scan_input_foc_c=!0,this.scan_input_value_c=t},workA:function(){this.GetMaxAllowInstockQty(),this.initInputStatus()},workB:function(){this.initInputStatus(),this.scan_input_foc_c=!0},workC:function(){var t=this;t.Instock()},initData:function(){var t=this;t.scan_input_value="",t.materialCode="",t.materialName="",t.barcodeInitQty="",t.barcodeInstockQty="",t.scan_info_area_show=!1,t.scan_input_foc_a=!0,t.scan_input_foc_b=!1,t.scan_input_foc_c=!1,t.scan_input_value_a="",t.scan_input_value_b="",t.scan_input_value_c=""},NoMaxAllowQty:function(){var a=this;a.scan_input_foc_b=!0,a.scan_input_foc_c=!1,t.showToast({icon:"none",title:"不可大于最大入库数量且不能小于0",duration:2e3})},GetMaxAllowInstockQty:function(){var a=this;a.loading_wait_show=!0,t.request({url:a.connect_url+"api/services/wmspda/OutSourceReturn/GetMaxAllowInstockQty",data:{MAC:a.MAC,BillCode:a.billCode,BarCode:a.scan_input_value_a},method:"POST",header:a.post_header,success:function(t){a.loading_wait_show=!1,console.log(t.data),a.ErrRequestShow(t),1==t.data.success&&(a.scan_input_foc_c=!0,a.scan_input_value_b=t.data.result.maxAllowQty,console.log(a.scan_input_value),a.scan_info_area_show=!0,a.maxAllowQty=t.data.result.maxAllowQty,a.materialCode=t.data.result.materialCode,a.materialName=t.data.result.materialName,a.barcodeInitQty=t.data.result.barcodeInitQty,a.barcodeInstockQty=t.data.result.barcodeInstockQty)}})},Instock:function(){var a=this;a.maxAllowQty>a.scan_input_value_b-1&&a.scan_input_value_b>0?(a.loading_wait_show=!0,t.request({url:a.connect_url+"api/services/wmspda/OutSourceReturn/Instock",data:{MAC:a.MAC,BillCode:a.billCode,LocationCode:a.scan_input_value_c,BarCode:a.scan_input_value_a,InstockQty:a.scan_input_value_b},method:"POST",header:a.post_header,success:function(n){a.loading_wait_show=!1,console.log(n.data),a.ErrRequestShow(n),1==n.data.success&&(console.log(n),a.initData(),t.showToast({icon:"none",title:"物品扫码入库上架成功",duration:2e3}),console.log(a.BarCode))},fail:function(t){console.log(t)}})):a.NoMaxAllowQty()}}),onLoad:function(){this.scan_a=this.i18n.scan_a,this.scan_b=this.i18n.scan_b,this.scan_c=this.i18n.scan_c,this.scan_d=this.i18n.scan_d,this.scan_e=this.i18n.scan_e,this.scan_f=this.i18n.scan_f,this.receipts_data=t.getStorageSync("OutsourcingReturnSheet_data"),console.log(this.receipts_data),this.billDate=this.receipts_data.billDate,this.billCode=this.receipts_data.billCode,this.id=this.receipts_data.id,this.instockQty=this.receipts_data.instockQty,this.passQty=this.receipts_data.passQty,this.qty=this.receipts_data.qty,this.scanQty=this.receipts_data.scanQty,this.waitQty=this.receipts_data.waitQty,this.status=this.receipts_data.status}};a.default=r}).call(this,n("6e42")["default"])},a0e3:function(t,a,n){"use strict";n("72e6");var s=e(n("b0ce")),i=e(n("34bd"));function e(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},ba92:function(t,a,n){"use strict";var s=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("view",[n("view",{staticClass:"warehousing_info_area"},[n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v(t._s(t.i18n.order_num))]),n("text",{staticClass:"warehousing_info_list_b"},[t._v(t._s(t.billCode))])]),n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v(t._s(t.i18n.order_date))]),n("text",{staticClass:"warehousing_info_list_b"},[t._v(t._s(t.billDate))])]),n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v(t._s(t.i18n.order_status))]),1==t.status?n("text",{staticClass:"warehousing_info_list_b"},[t._v("新增")]):t._e(),2==t.status?n("text",{staticClass:"warehousing_info_list_b"},[t._v("待检")]):t._e(),3==t.status?n("text",{staticClass:"warehousing_info_list_b"},[t._v("检验中")]):t._e(),8==t.status?n("text",{staticClass:"warehousing_info_list_b"},[t._v("完成")]):t._e()])]),n("view",{staticClass:"warehousing_scan_area"},[n("view",{staticClass:"common_title"},[t._v(t._s(t.i18n.material_info))]),n("bindScanInput",{attrs:{scan_input_text:t.scan_b,scan_icon_show:!0,input_focus:t.scan_input_foc_a,eventid:"79433f82-0",mpcomid:"79433f82-0"},on:{input:t.onInputA,work:t.workA},model:{value:t.scan_input_value_a,callback:function(a){t.scan_input_value_a=a},expression:"scan_input_value_a"}}),n("bindScanInput",{attrs:{scan_input_text:t.scan_f,scan_icon_show:!1,input_focus:t.scan_input_foc_b,eventid:"79433f82-1",mpcomid:"79433f82-1"},on:{input:t.onInputB,work:t.workB},model:{value:t.scan_input_value_b,callback:function(a){t.scan_input_value_b=a},expression:"scan_input_value_b"}}),n("bindScanInput",{attrs:{scan_input_text:t.scan_d,scan_icon_show:!0,input_focus:t.scan_input_foc_c,eventid:"79433f82-2",mpcomid:"79433f82-2"},on:{input:t.onInputC,work:t.workC},model:{value:t.scan_input_value_c,callback:function(a){t.scan_input_value_c=a},expression:"scan_input_value_c"}})],1),t.scan_info_area_show?n("view",{staticClass:"scan_info_area"},[n("view",{staticClass:"common_title"},[t._v("扫描信息")]),n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v("最大允许数量")]),n("text",{staticClass:"warehousing_info_list_b"},[t._v(t._s(t.maxAllowQty))])]),n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v("物料代码")]),n("text",{staticClass:"warehousing_info_list_b"},[t._v(t._s(t.materialCode))])]),n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v("物料名称")]),n("text",{staticClass:"warehousing_info_list_b"},[t._v(t._s(t.materialName))])]),n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v("应退数量")]),n("text",{staticClass:"warehousing_info_list_b"},[t._v(t._s(t.barcodeInitQty))])]),n("view",{staticClass:"warehousing_info_list"},[n("text",{staticClass:"warehousing_info_list_a"},[t._v("入库数量")]),n("text",{staticClass:"warehousing_info_list_b"},[t._v(t._s(t.barcodeInstockQty))])])]):t._e(),t.loading_wait_show?n("loadingWait",{attrs:{mpcomid:"79433f82-3"}}):t._e()],1)},i=[];n.d(a,"a",function(){return s}),n.d(a,"b",function(){return i})},c42e:function(t,a,n){"use strict";var s=n("e571"),i=n.n(s);i.a},e571:function(t,a,n){},ecd1:function(t,a,n){"use strict";var s=n("050e"),i=n.n(s);i.a}},[["a0e3","common/runtime","common/vendor"]]]);