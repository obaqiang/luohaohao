(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/IncomingQualityInspection/IncomingQualityInspection"],{"4b99":function(t,e,n){"use strict";n.r(e);var a=n("a0bd"),o=n("bf1f");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("e168");var u=n("2877"),r=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},"5ac8":function(t,e,n){},"9b56":function(t,e,n){"use strict";n("72e6");var a=i(n("b0ce")),o=i(n("4b99"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(o.default))},a0bd:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",[n("MaterialInformation",{attrs:{mpcomid:"03432fde-0"}}),n("QualityInspectionOperation",{attrs:{default_result:t.default_result,eventid:"03432fde-0",mpcomid:"03432fde-1"},on:{subMit:t.subMit}}),t.loading_wait_show?n("loadingWait",{attrs:{mpcomid:"03432fde-2"}}):t._e()],1)},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},bf1f:function(t,e,n){"use strict";n.r(e);var a=n("c0e9"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},c0e9:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("99a6")),o=r(n("e817")),i=r(n("fbdb")),u=n("2f62");function r(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){s(t,e,n[e])})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l={components:{MaterialInformation:a.default,QualityInspectionOperation:o.default,loadingWait:i.default},data:function(){return{SampleQty_to_submit:this.SampleQty,RejectQty_to_submit:this.rejectQty,NGQty_to_submit:this.NGQty,QCResult:"",loading_wait_show:!1,default_result:""}},computed:{connect_url:function(){return this.$store.state.connect_url},post_header:function(){return this.$store.state.post_header},i18n:function(){return this.$t("IncomingQualityInspection")},MAC:function(){return this.$store.state.MAC},Id:function(){return t.getStorageSync("qualityInspection_data").id},SampleQty:function(){return t.getStorageSync("qualityInspection_data").sampleQty},NGQty:function(){return t.getStorageSync("qualityInspection_data").NGQty},rejectQty:function(){return null==t.getStorageSync("qualityInspection_data").rejectQty?0:t.getStorageSync("qualityInspection_data").rejectQty},qcLevel:function(){return t.getStorageSync("qualityInspection_data").qcLevel}},methods:c({},(0,u.mapMutations)(["MacInfo"]),(0,u.mapMutations)(["changeToken"]),(0,u.mapMutations)(["changeOrgId"]),(0,u.mapMutations)(["ErrRequestShow"]),{SaveIqcNormal1:function(){var e=this;e.loading_wait_show=!0,t.request({url:e.connect_url+"api/services/wmspda/Inspection/SaveIqcNormal1",data:{MAC:e.MAC,Id:e.Id,SampleQty:e.SampleQty_to_submit,NGQty:e.NGQty_to_submit,RejectQty:e.RejectQty_to_submit,QCResult:e.QCResult},method:"POST",header:e.post_header,success:function(n){console.log(n.data),e.loading_wait_show=!1,e.ErrRequestShow(n),1==n.data.success&&(t.showToast({icon:"none",title:e.i18n.alert_text_a,duration:2e3}),setTimeout(function(){t.navigateBack({})},2e3))}})},subMit:function(t){console.log(t);var e=this;e.RejectQty_to_submit=t.RejectQty,e.QCResult=t.QCResult,e.SampleQty_to_submit=t.SampleQty,e.NGQty_to_submit=t.NGQty,this.SaveIqcNormal1()}}),onLoad:function(){var e=this,n="";11==e.qcLevel?n=e.i18n.page_title_a:12==e.qcLevel?n=e.i18n.page_title_b:21==e.qcLevel?n=e.i18n.page_title_c:22==e.qcLevel&&(n=e.i18n.page_title_d),t.setNavigationBarTitle({title:n}),e.default_result=t.getStorageSync("qualityInspection_data").qcResult}};e.default=l}).call(this,n("6e42")["default"])},e168:function(t,e,n){"use strict";var a=n("5ac8"),o=n.n(a);o.a}},[["9b56","common/runtime","common/vendor"]]]);