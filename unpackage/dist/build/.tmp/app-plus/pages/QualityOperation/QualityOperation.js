(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/QualityOperation/QualityOperation"],{"3a14":function(t,i,e){"use strict";var o=e("3c3b"),s=e.n(o);s.a},"3c3b":function(t,i,e){},"5c0c":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;e("2f62");var o={components:{},data:function(){return{stock_in_bg:"../../static/img/stock_in_bg.png",stock_out_bg:"../../static/img/stock_out_bg.png",stock_in_buy_order:"../../static/img/stock_in_buy_order.png",stock_in_sendpro_order:"../../static/img/stock_in_sendpro_order.png",stock_in_check:"../../static/img/stock_in_check.png",stock_in_create_order:"../../static/img/stock_in_check.png",stock_in_other_check:"../../static/img/stock_in_other_check.png",stock_in_other_create_order:"../../static/img/stock_in_other_create_order.png",stock_in_out_return:"../../static/img/stock_in_out_return.png",stock_in_pro_come_in:"../../static/img/stock_in_pro_come_in.png",stock_in_produce_return:"../../static/img/stock_in_produce_return.png",stock_in_sale_return:"../../static/img/stock_in_sale_return.png",stock_out_out_check:"../../static/img/stock_out_out_check.png",stock_out_out_create_order:"../../static/img/stock_out_out_create_order.png",stock_out_out_add_materail:"../../static/img/stock_out_out_add_materail.png",childPermissions_child:"",text_a:"",text_b:"",text_c:"",text_d:"",text_a_list:"",text_b_list:"",text_c_list:"",text_d_list:""}},computed:{childPermissions:function(){return this.$store.state.childPermissions},i18n:function(){return this.$t("QualityOperation")}},methods:{gotoPage:function(i,e){t.setStorageSync("title_permissionName",e),"Pages.WPDA.QualityJob.MaterialQuality.Inspection"==i?(t.setStorageSync("WarehousingOperation_permissionCode",i),t.navigateTo({url:"../qualityInspection/qualityInspection"})):"Pages.WPDA.QualityJob.MaterialQuality.MRP"==i&&t.navigateTo({url:"../qualityInspectionMRP/qualityInspectionMRP"})}},onLoad:function(){var i=this;console.log(i.childPermissions[3]),t.setNavigationBarTitle({title:this.i18n.page_title});for(var e=0;e<i.childPermissions.length;e++)"Pages.WPDA.QualityJob"==i.childPermissions[e].permissionCode&&(i.childPermissions_child=i.childPermissions[e].childPermissions);for(var o=0;o<i.childPermissions_child.length;o++)"Pages.WPDA.QualityJob.MaterialQuality"==i.childPermissions_child[o].permissionCode&&(i.text_a=i.childPermissions_child[o].permissionName,i.text_a_list=i.childPermissions_child[o].childPermissions,console.log(i.text_a),console.log(i.text_a_list))}};i.default=o}).call(this,e("6e42")["default"])},6967:function(t,i,e){"use strict";e.r(i);var o=e("6b07"),s=e("b076");for(var n in s)"default"!==n&&function(t){e.d(i,t,function(){return s[t]})}(n);e("3a14");var a=e("2877"),c=Object(a["a"])(s["default"],o["a"],o["b"],!1,null,null,null);i["default"]=c.exports},"6b07":function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("view",[""!=t.text_a_list?e("view",{staticClass:"warehousingopration_bl"},[e("text",{staticClass:"warehousingopration_bl_text"},[t._v(t._s(t.text_a))]),t._l(t.text_a_list,function(i,o){return e("view",{key:o,staticClass:"warehousingopration_bl_bl",attrs:{eventid:"707b0502-0-"+o},on:{tap:function(e){t.gotoPage(i.permissionCode,i.permissionName)}}},["Pages.WPDA.QualityJob.MaterialQuality.Inspection"==i.permissionCode?e("image",{staticClass:"stock_in_sendpro_order",attrs:{src:t.stock_out_out_check,mode:""}}):t._e(),"Pages.WPDA.QualityJob.MaterialQuality.MRP"==i.permissionCode?e("image",{staticClass:"stock_in_sendpro_order",attrs:{src:t.stock_out_out_add_materail,mode:""}}):t._e(),e("text",[t._v(t._s(i.permissionName))])])})],2):t._e()])},s=[];e.d(i,"a",function(){return o}),e.d(i,"b",function(){return s})},"82f7":function(t,i,e){"use strict";e("72e6");var o=n(e("b0ce")),s=n(e("6967"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,o.default)(s.default))},b076:function(t,i,e){"use strict";e.r(i);var o=e("5c0c"),s=e.n(o);for(var n in o)"default"!==n&&function(t){e.d(i,t,function(){return o[t]})}(n);i["default"]=s.a}},[["82f7","common/runtime","common/vendor"]]]);