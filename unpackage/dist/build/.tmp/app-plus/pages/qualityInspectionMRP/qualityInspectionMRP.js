(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/qualityInspectionMRP/qualityInspectionMRP"],{"0923":function(t,e,a){"use strict";a("72e6");var o=i(a("b0ce")),n=i(a("df83"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,o.default)(n.default))},"12fc":function(t,e,a){},"3b56":function(t,e,a){"use strict";var o=a("12fc"),n=a.n(o);n.a},"4e5c":function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{staticClass:"qualityInspection_head"},[a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_a))]),a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_b))]),a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_c))]),a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_d))]),a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_e))]),a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_f))])]),a("view",{staticClass:"qualityInspection_body"},[a("scroll-view",{staticClass:"scroll-Y",attrs:{"scroll-top":t.scrollTop,"scroll-y":"true",eventid:"6a25e882-1"},on:{scrolltoupper:t.upper,scrolltolower:t.lower,scroll:t.scroll}},[t._l(t.items,function(e,o){return a("view",{key:o,staticClass:"qualityInspection_body_list",attrs:{eventid:"6a25e882-0-"+o},on:{tap:function(a){t.Check(e.qcLevel,e.id)}}},[a("view",{staticClass:"qualityInspection_body_list_a"},[0==e.qcLevel?a("text",{staticClass:"qualityInspection_text_a"},[t._v(t._s(t.i18n.qualityInspectionMRP_g))]):t._e(),11==e.qcLevel?a("text",{staticClass:"qualityInspection_text_a"},[t._v("C1")]):t._e(),12==e.qcLevel?a("text",{staticClass:"qualityInspection_text_a"},[t._v("C2")]):t._e(),21==e.qcLevel?a("text",{staticClass:"qualityInspection_text_a"},[t._v("H1")]):t._e(),22==e.qcLevel?a("text",{staticClass:"qualityInspection_text_a"},[t._v("H2")]):t._e(),a("text",{staticClass:"qualityInspection_text_b"},[t._v(t._s(e.materialCode))]),a("text",{staticClass:"qualityInspection_text_c"},[null!=e.receiveQty?a("text",[t._v(t._s(e.receiveQty))]):t._e(),null==e.receiveQty?a("text",[t._v("0")]):t._e()]),a("text",{staticClass:"qualityInspection_text_d"},[null!=e.sampleQty?a("text",[t._v(t._s(e.sampleQty))]):t._e(),null==e.sampleQty?a("text",[t._v("0")]):t._e()]),a("text",{staticClass:"qualityInspection_text_e"},[null!=e.passQty?a("text",[t._v(t._s(e.passQty))]):t._e(),null==e.passQty?a("text",[t._v("0")]):t._e()]),a("text",{staticClass:"qualityInspection_text_f"},[t._v(t._s(e.per))]),a("image",{staticClass:"qualityInspection_text_g",attrs:{src:t.quality_jiantou}})]),a("view",{staticClass:"qualityInspection_body_list_b"},[a("view",{staticClass:"qualityInspection_body_list_b_bl"},[a("text",[t._v(t._s(e.materialName))]),a("text",[t._v(t._s(e.supplierName))])]),a("view",{staticClass:"qualityInspection_body_list_b_bl"},[a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_h)+":"+t._s(e.billDate))]),a("text",[t._v(t._s(t.i18n.qualityInspectionMRP_i)+":"+t._s(e.billCode))])])])])}),t.bottomCountArea_show?a("bottomCountArea",{attrs:{count:t.count,mpcomid:"6a25e882-0"}}):t._e()],2)],1),t.show_pop?a("popupLayer",{attrs:{eventid:"6a25e882-2",mpcomid:"6a25e882-1"},on:{cancelPop:t.cancelPop,choDateA:t.choDateA,choDateB:t.choDateB,workA:t.workA,workB:t.workB,workC:t.workC,workD:t.workD,workE:t.workE,work:t.work}}):t._e(),t.loading_wait_show?a("loadingWait",{attrs:{mpcomid:"6a25e882-2"}}):t._e()],1)},n=[];a.d(e,"a",function(){return o}),a.d(e,"b",function(){return n})},"6aa6":function(t,e,a){"use strict";a.r(e);var o=a("c7e7"),n=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);e["default"]=n.a},c7e7:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=l(a("0149")),n=l(a("fbdb")),i=l(a("4794")),s=a("2f62");function l(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},o=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),o.forEach(function(e){u(t,e,a[e])})}return t}function u(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var r={components:{popupLayer:o.default,loadingWait:n.default,bottomCountArea:i.default},data:function(){return{quality_wait_quality:"../../static/img/quality_wait_quality.png",quality_jiantou:"../../static/img/quality_jiantou.png",loading_wait_show:!1,StratDate:"",EndDate:"",ReceiptCode:"",MaterialCode:"",MaterialName:"",SupplierName:"",SourceCode:"",MaxResultCount:10,SkipCount:0,scrollTop:0,old:{scrollTop:0},items:[],show_pop:!1,id:"",SampleCode:"",Aql:"",count:"",bottomCountArea_show:!1}},computed:{connect_url:function(){return this.$store.state.connect_url},post_header:function(){return this.$store.state.post_header},i18n:function(){return this.$t("qualityInspectionMRP")},MAC:function(){return this.$store.state.MAC}},onNavigationBarButtonTap:function(t){console.log(t),this.show_pop=!0},methods:c({},(0,s.mapMutations)(["MacInfo"]),(0,s.mapMutations)(["changeToken"]),(0,s.mapMutations)(["changeOrgId"]),(0,s.mapMutations)(["ErrRequestShow"]),{work:function(){this.SkipCount=0,this.show_pop=!1,this.GetIqcHeaders(this.SkipCount,this.MaxResultCount)},cancelPop:function(){this.show_pop=!1},upper:function(t){console.log(t)},lower:function(t){this.MaxResultCount=10,this.SkipCount+=10,this.GetIqcHeaders(this.SkipCount,this.MaxResultCount)},scroll:function(t){this.old.scrollTop=t.detail.scrollTop},choDateA:function(t){this.StratDate=t},choDateB:function(t){this.EndDate=t},workA:function(t){console.log("A"),this.ReceiptCode=t},workB:function(t){console.log("B"),this.MaterialCode=t},workC:function(t){console.log("C"),this.MaterialName=t},workD:function(t){console.log("D"),this.SupplierName=t},workE:function(t){console.log("E"),this.SourceBillCode=t},Check:function(e,a){var o=this;t.setStorageSync("qcLevel",e),o.id=a;for(var n=0;n<o.items.length;n++)a==o.items[n].id&&t.setStorageSync("qualityInspection_data",o.items[n]);t.navigateTo({url:"../IncomingQualityInspectionMRP/IncomingQualityInspectionMRP"})},GetIqcHeaders:function(e,a){var o=this;o.loading_wait_show=!0,t.request({url:o.connect_url+"api/services/wmspda/Inspection/GetIqcHeaderForMrp",data:{MAC:o.MAC,StratDate:o.StratDate,EndDate:o.EndDate,ReceiptCode:o.ReceiptCode,MaterialCode:o.MaterialCode,MaterialName:o.MaterialName,SupplierName:o.SupplierName,SourceCode:o.SourceCode,MaxResultCount:a,SkipCount:e},method:"POST",header:o.post_header,success:function(t){if(console.log(t.data),o.loading_wait_show=!1,o.ErrRequestShow(t),1==t.data.success)if(0==o.SkipCount&&(o.items=[]),0==t.data.result.items.length)o.count="",o.bottomCountArea_show=!0;else{var e=t.data.result.totalCount,a=o.MaxResultCount+o.SkipCount;a<e&&(o.count=e-a,o.bottomCountArea_show=!0);for(var n=0;n<t.data.result.items.length;n++){t.data.result.items[n].billDate=t.data.result.items[n].billDate.slice(0,10);var i={};i.data_a=t.data.result.items[n].ngQty,i.data_b=t.data.result.items[n].sampleQty;var s=o.$Percentage(i.data_a,i.data_b);t.data.result.items[n].per=s}o.items=o.items.concat(t.data.result.items)}}})},calPercent:function(t){return Math.round(t.data_a/t.data_b*1e4)/100+"%"},IqcExemption:function(){var e=this;e.loading_wait_show=!0,t.request({url:e.connect_url+"api/services/wmspda/Inspection/IqcExemption",data:{MAC:e.MAC,Id:e.id},method:"POST",header:e.post_header,success:function(a){console.log(a.data),e.loading_wait_show=!1,e.ErrRequestShow(a),1==a.data.success&&t.showToast({icon:"none",title:e.i18n.qualityInspectionMRP_j,duration:2e3})}})},GetIqcAqlNgQty:function(){var e=this;e.loading_wait_show=!0,t.request({url:e.connect_url+"api/services/wmspda/Inspection/GetIqcAqlNgQty",data:{MAC:e.MAC,SampleCode:e.SampleCode,Aql:e.Aql},method:"POST",header:e.post_header,success:function(a){console.log(a.data),e.loading_wait_show=!1,e.ErrRequestShow(a),1==a.data.success&&t.setStorageSync("rejectQty",a.data.result.rejectQty)}})}}),onLoad:function(){var e="",a=t.getStorageSync("title_permissionName");""!=a&&(e=a),t.setNavigationBarTitle({title:e})},onShow:function(){this.items=[],this.count="",this.MaxResultCount=this.SkipCount+this.MaxResultCount,this.GetIqcHeaders(0,this.MaxResultCount)}};e.default=r}).call(this,a("6e42")["default"])},df83:function(t,e,a){"use strict";a.r(e);var o=a("4e5c"),n=a("6aa6");for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a("3b56");var s=a("2877"),l=Object(s["a"])(n["default"],o["a"],o["b"],!1,null,null,null);e["default"]=l.exports}},[["0923","common/runtime","common/vendor"]]]);