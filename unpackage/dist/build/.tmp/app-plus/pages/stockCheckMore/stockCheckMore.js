(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/stockCheckMore/stockCheckMore"],{"240f":function(e,t,i){"use strict";i("72e6");var _=o(i("b0ce")),s=o(i("b89c"));function o(e){return e&&e.__esModule?e:{default:e}}Page((0,_.default)(s.default))},"3cf7":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var _=i("2f62"),s=n(i("6bdc")),o=n(i("7b41")),a=n(i("85c5")),r=n(i("fbdb")),l=n(i("4794"));function n(e){return e&&e.__esModule?e:{default:e}}function c(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},_=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(_=_.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),_.forEach(function(t){u(e,t,i[t])})}return e}function u(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var v={components:{SearchTitle:s.default,StockCheckNav:o.default,StockCheckList:a.default,loadingWait:r.default,bottomCountArea:l.default},data:function(){return{materialCode:"",materialName:"",materialStandard:"",controlType:"",loading_wait_show:!1,warehouseId:"",GetStorageLotInfoDetails_data:[],permissionCode:"",a_show:!1,b_show:!1,c_show:!1,GetStorageLotInfoDetails_url:"",scrollTop:0,old:{scrollTop:0},count:"",bottomCountArea_show:!1,MaxResultCount:10,SkipCount:0}},onNavigationBarButtonTap:function(){},computed:{connect_url:function(){return this.$store.state.connect_url},current_language:function(){return this.$store.state.current_language},post_header:function(){return this.$store.state.post_header},i18n:function(){return this.$t("stockCheckMore")},i18n_modal:function(){return this.$t("modal_text")},MAC:function(){return this.$store.state.MAC},stock_check_more_data:function(){return e.getStorageSync("stock_check_more_data")}},watch:{stock_check_more_data:{handler:function(e,t){this.materialCode=e.materialCode,this.materialName=e.materialName,this.materialStandard=e.materialStandard,this.controlType=e.controlType,this.warehouseId=e.warehouseId},immediate:!0}},methods:c({},(0,_.mapMutations)(["MacInfo"]),(0,_.mapMutations)(["changeToken"]),(0,_.mapMutations)(["changeOrgId"]),(0,_.mapMutations)(["ErrRequestShow"]),{upper:function(e){console.log(e)},lower:function(e){this.SkipCount+=10,this.GetStorageLotInfoDetails()},scroll:function(e){this.old.scrollTop=e.detail.scrollTop},GetStorageLotInfoDetails:function(){var t=this;t.loading_wait_show=!0,e.request({url:t.connect_url+t.GetStorageLotInfoDetails_url,data:{MAC:t.MAC,MaterialCode:t.materialCode,WarehouseId:t.warehouseId,MaxResultCount:t.MaxResultCount,SkipCount:t.SkipCount},method:"POST",header:t.post_header,success:function(e){if(console.log(e.data),t.loading_wait_show=!1,t.ErrRequestShow(e),1==e.data.success){if("Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByMaterial"==t.permissionCode)t.GetStorageLotInfoDetails_data=e.data.result;else{t.GetStorageLotInfoDetails_data=t.GetStorageLotInfoDetails_data.concat(e.data.result.items);var i=e.data.result.totalCount,_=t.MaxResultCount+t.SkipCount;console.log(_),0==e.data.result.items.length?(t.count="",t.bottomCountArea_show=!0):_<i&&(t.count=i-_,t.bottomCountArea_show=!0)}for(var s in t.GetStorageLotInfoDetails_data)t.GetStorageLotInfoDetails_data[s].dateCode&&(t.GetStorageLotInfoDetails_data[s].dateCode=t.GetStorageLotInfoDetails_data[s].dateCode.slice(0,10)),t.GetStorageLotInfoDetails_data[s].creationTime&&(t.GetStorageLotInfoDetails_data[s].creationTime=t.GetStorageLotInfoDetails_data[s].creationTime.slice(0,10)),t.GetStorageLotInfoDetails_data[s].dateCode&&(t.GetStorageLotInfoDetails_data[s].dateCode=t.GetStorageLotInfoDetails_data[s].dateCode.slice(0,10))}}})}}),onLoad:function(){var t=this,i="";t.permissionCode=e.getStorageSync("WarehousingOperation_permissionCode"),"Pages.WPDA.IntegratedQuery.StorageQuery.StorageQueryByMaterial"==t.permissionCode?(t.GetStorageLotInfoDetails_url="api/services/wmspda/StorageQuery/GetStorageLotInfoDetails",t.a_show=!0,i=t.i18n.page_title):"Pages.WPDA.IntegratedQuery.InstockRecord.InstockRecordByMaterial"==t.permissionCode?(t.GetStorageLotInfoDetails_url="api/services/wmspda/InstockRecord/GetInstockRecordDetail",t.b_show=!0,i=t.i18n.page_title_a):"Pages.WPDA.IntegratedQuery.OutstockRecord.OutstockRecordByMaterial"==t.permissionCode&&(t.GetStorageLotInfoDetails_url="api/services/wmspda/OutstockRecord/GetOutstockRecordDetail",t.c_show=!0,i=t.i18n.page_title_b),e.setNavigationBarTitle({title:i}),this.GetStorageLotInfoDetails()}};t.default=v}).call(this,i("6e42")["default"])},"49d9":function(e,t,i){"use strict";var _=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("view",{staticClass:"stockCheckMore_area"},[i("view",{staticClass:"stockCheckMore_head_area"},[i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_h)+":")]),i("view",[e._v(e._s(e.materialCode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_i)+":")]),i("view",[e._v(e._s(e.materialName))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_j)+":")]),i("view",[e._v(e._s(e.materialStandard))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_g)+":")]),"Lot"==e.controlType?i("view",[e._v(e._s(e.i18n.purchase_list_c_title_g_a))]):e._e(),"KeyParts"==e.controlType?i("view",[e._v(e._s(e.i18n.purchase_list_c_title_g_b))]):e._e(),"NoControl"==e.controlType?i("view",[e._v(e._s(e.i18n.purchase_list_c_title_g_c))]):e._e()])]),i("scroll-view",{staticClass:"scroll-Y",attrs:{"scroll-top":e.scrollTop,"scroll-y":"true",eventid:"1ffbfe62-0"},on:{scrolltoupper:e.upper,scrolltolower:e.lower,scroll:e.scroll}},[e.a_show?i("view",{staticClass:"stockCheckMore_head_area"},e._l(e.GetStorageLotInfoDetails_data,function(t,_){return i("view",{key:_,staticClass:"stockCheckMore_list"},[i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_a)+":")]),i("view",[e._v(e._s(t.barcode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_h)+":")]),i("view",[e._v(e._s(t.locationCode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_c)+":")]),i("view",[e._v(e._s(t.dateCode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_d)+":")]),i("view",[e._v(e._s(t.qty))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_e)+":")]),1==t.barcodeStatus?i("view",[e._v(e._s(e.i18n.purchase_list_c_title_f_a))]):e._e(),9==t.barcodeStatus?i("view",[e._v(e._s(e.i18n.purchase_list_c_title_f_b))]):e._e()])])})):e._e(),e.b_show?i("view",{staticClass:"stockCheckMore_head_area"},e._l(e.GetStorageLotInfoDetails_data,function(t,_){return i("view",{key:_,staticClass:"stockCheckMore_list"},[i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_a)+":")]),i("view",[e._v(e._s(t.barcode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_c)+":")]),i("view",[e._v(e._s(t.dateCode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_d)+":")]),i("view",[e._v(e._s(t.qty))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.locationCode)+":")]),i("view",[e._v(e._s(t.locationCode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.creationTime)+":")]),i("view",[e._v(e._s(t.creationTime))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.inOutType)+":")]),1==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_a))]):e._e(),2==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_b))]):e._e(),4==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_c))]):e._e(),5==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_d))]):e._e(),6==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_e))]):e._e(),7==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_f))]):e._e(),8==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_g))]):e._e(),9==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_h))]):e._e(),10==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_i))]):e._e(),11==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_j))]):e._e(),12==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_k))]):e._e()]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.sourceBillType)+":")]),13==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_a))]):e._e(),15==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_b))]):e._e(),20==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_c))]):e._e(),21==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_d))]):e._e(),22==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_e))]):e._e(),23==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_f))]):e._e(),24==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_g))]):e._e(),25==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_h))]):e._e(),40==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_i))]):e._e(),42==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_j))]):e._e(),43==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_k))]):e._e(),50==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_l))]):e._e(),51==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_m))]):e._e(),52==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_o))]):e._e(),53==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_p))]):e._e(),60==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_q))]):e._e(),61==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_r))]):e._e()]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.sourceCode)+":")]),i("view",[e._v(e._s(t.sourceCode))])])])})):e._e(),e.c_show?i("view",{staticClass:"stockCheckMore_head_area"},e._l(e.GetStorageLotInfoDetails_data,function(t,_){return i("view",{key:_,staticClass:"stockCheckMore_list"},[i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_a)+":")]),i("view",[e._v(e._s(t.barcode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_c)+":")]),i("view",[e._v(e._s(t.dateCode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.purchase_list_c_title_d)+":")]),i("view",[e._v(e._s(t.qty))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.locationCode)+":")]),i("view",[e._v(e._s(t.locationCode))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.creationTime_b)+":")]),i("view",[e._v(e._s(t.creationTime))])]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.inOutType)+":")]),1==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_a))]):e._e(),2==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_b))]):e._e(),4==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_c))]):e._e(),5==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_d))]):e._e(),6==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_e))]):e._e(),7==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_f))]):e._e(),8==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_g))]):e._e(),9==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_h))]):e._e(),10==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_i))]):e._e(),11==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_j))]):e._e(),12==t.inOutType?i("view",[e._v(e._s(e.i18n.inOutType_k))]):e._e()]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.sourceBillType)+":")]),13==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_a))]):e._e(),15==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_b))]):e._e(),20==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_c))]):e._e(),21==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_d))]):e._e(),22==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_e))]):e._e(),23==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_f))]):e._e(),24==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_g))]):e._e(),25==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_h))]):e._e(),40==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_i))]):e._e(),42==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_j))]):e._e(),43==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_k))]):e._e(),50==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_l))]):e._e(),51==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_m))]):e._e(),52==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_o))]):e._e(),53==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_p))]):e._e(),60==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_q))]):e._e(),61==t.sourceBillType?i("view",[e._v(e._s(e.i18n.sourceBillType_r))]):e._e()]),i("view",{staticClass:"stockCheckMore_head_area_line"},[i("view",[e._v(e._s(e.i18n.sourceCode)+":")]),i("view",[e._v(e._s(t.sourceCode))])])])})):e._e(),e.bottomCountArea_show?i("bottomCountArea",{attrs:{count:e.count,mpcomid:"1ffbfe62-0"}}):e._e()],1),e.loading_wait_show?i("loadingWait",{attrs:{mpcomid:"1ffbfe62-1"}}):e._e()],1)},s=[];i.d(t,"a",function(){return _}),i.d(t,"b",function(){return s})},"8df9":function(e,t,i){"use strict";i.r(t);var _=i("3cf7"),s=i.n(_);for(var o in _)"default"!==o&&function(e){i.d(t,e,function(){return _[e]})}(o);t["default"]=s.a},af94:function(e,t,i){"use strict";var _=i("c923"),s=i.n(_);s.a},b89c:function(e,t,i){"use strict";i.r(t);var _=i("49d9"),s=i("8df9");for(var o in s)"default"!==o&&function(e){i.d(t,e,function(){return s[e]})}(o);i("af94");var a=i("2877"),r=Object(a["a"])(s["default"],_["a"],_["b"],!1,null,null,null);t["default"]=r.exports},c923:function(e,t,i){}},[["240f","common/runtime","common/vendor"]]]);