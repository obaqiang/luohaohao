(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/WarehousingReceipts/WarehousingReceipts"],{"0613":function(t,e,o){"use strict";o.r(e);var n=o("5eab"),s=o("b2c8");for(var i in s)"default"!==i&&function(t){o.d(e,t,function(){return s[t]})}(i);o("8638");var a=o("2877"),r=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"079f":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o("2f62");var n={props:["scroll_items"],components:{},computed:{i18n:function(){return this.$t("WarehousingReceipts")},WarehousingReceiptsList_data:function(){for(var e=t.getStorageSync("WarehousingReceiptsList_data"),o=0;o<e.length;o++)e[o].billDate.slice(0,10);return e}},data:function(){return{}},methods:{gotoPage:function(t){this.$emit("gotoPage",t)}},onLoad:function(){}};e.default=n}).call(this,o("6e42")["default"])},"3b9b":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=l(o("1098")),s=l(o("8038")),i=l(o("fbdb")),a=l(o("0613")),r=l(o("4794")),c=o("2f62");function l(t){return t&&t.__esModule?t:{default:t}}function u(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),n.forEach(function(e){_(t,e,o[e])})}return t}function _(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var d={components:{PurchaseOrderInquiryHead:n.default,queryScan:s.default,loadingWait:i.default,WarehousingReceiptsList:a.default,bottomCountArea:r.default},data:function(){return{aa:"",focus_aa:!1,BillCode:"",Asn_data:"",loading_wait_show:!1,query_input_focus:!0,GetReceipt_url:"",a_text:"",b_text:"",c_text:"",permissionCode:"",WarehousingReceiptsList_show:!1,scrollTop:0,old:{scrollTop:0},count:"",bottomCountArea_show:!1,MaxResultCount:10,SkipCount:0,scroll_items:[]}},computed:{connect_url:function(){return this.$store.state.connect_url},current_language:function(){return this.$store.state.current_language},post_header:function(){return this.$store.state.post_header},MAC:function(){return this.$store.state.MAC},i18n:function(){return this.$t("WarehousingReceipts")}},methods:u({},(0,c.mapMutations)(["MacInfo"]),(0,c.mapMutations)(["changeToken"]),(0,c.mapMutations)(["changeOrgId"]),(0,c.mapMutations)(["ErrRequestShow"]),{confirmAA:function(){this.focus_aa=!0,this.aa=""},upper:function(t){console.log(t)},lower:function(t){this.SkipCount+=10,this.GetReceipt()},scroll:function(t){this.old.scrollTop=t.detail.scrollTop},onInput:function(t){this.BillCode=t},gotoPage:function(e){var o=this;console.log(e);for(var n=0;n<o.scroll_items.length;n++)e==o.scroll_items[n].billCode&&(t.setStorageSync("receipts_data",o.scroll_items[n]),t.navigateTo({url:"../Warehousing/Warehousing"}))},getAsnCode:function(t){this.query_input_focus=!1,this.GetReceipt()},getCode:function(t){this.BillCode=t,this.c_text=t,this.GetReceipt()},scrollResDo:function(t){var e=this;if(0==e.SkipCount&&(e.scroll_items=[]),0==t.data.result.items.length)e.count="",e.bottomCountArea_show=!0;else{var o=t.data.result.totalCount,n=e.MaxResultCount+e.SkipCount;for(var s in n<o&&(e.count=o-n,e.bottomCountArea_show=!0),e.scroll_items=e.scroll_items.concat(t.data.result.items),e.scroll_items)e.scroll_items[s].billDate&&(e.scroll_items[s].billDate=e.scroll_items[s].billDate.slice(0,10)),e.scroll_items[s].creationTime&&(e.scroll_items[s].creationTime=e.scroll_items[s].creationTime.slice(0,10))}},GetReceipt:function(){var e=this;e.loading_wait_show=!0,t.request({url:e.connect_url+e.GetReceipt_url,data:{MAC:e.MAC,BillCode:e.BillCode,MaxResultCount:e.MaxResultCount,SkipCount:e.SkipCount},method:"POST",header:e.post_header,success:function(o){console.log(o.data),e.loading_wait_show=!1,e.ErrRequestShow(o),1==o.data.success?"Pages.WPDA.Instock.Storage.PurInstock"==e.permissionCode?(t.setStorageSync("receipts_data",o.data.result),t.navigateTo({url:"../Warehousing/Warehousing"})):"Pages.WPDA.Instock.ReturnMaterial.ProductReturn"==e.permissionCode?(e.WarehousingReceiptsList_show=!0,e.scrollResDo(o)):"Pages.WPDA.Instock.Storage.PorductInstock"==e.permissionCode?(e.WarehousingReceiptsList_show=!0,e.scrollResDo(o)):"Pages.WPDA.Instock.Storage.OtherInstock"==e.permissionCode?(e.WarehousingReceiptsList_show=!0,e.scrollResDo(o)):"Pages.WPDA.Instock.ReturnMaterial.SalesReturn"==e.permissionCode?(e.WarehousingReceiptsList_show=!0,e.scrollResDo(o)):"Pages.WPDA.Instock.Receipt.Asn"==e.permissionCode&&(e.Asn_data=o.data.result,t.setStorageSync("BillCode",e.BillCode),t.setStorageSync("BillCodeDetail",e.Asn_data[0]),t.setStorageSync("BillId",e.Asn_data[0].id),t.navigateTo({url:"../ItemInventoryAsn/ItemInventoryAsn"})):(e.BillCode="",e.query_input_focus=!0,console.log(e.query_input_focus))}})}}),onLoad:function(){var e=this,o="";e.permissionCode=t.getStorageSync("WarehousingOperation_permissionCode"),"Pages.WPDA.Instock.Storage.PurInstock"==e.permissionCode?(o=e.i18n.page_title,e.GetReceipt_url="api/services/wmspda/PurInstock/GetReceipt",e.a_text=e.i18n.a_text,e.b_text=e.i18n.b_text,e.c_text=e.i18n.c_text):"Pages.WPDA.Instock.ReturnMaterial.ProductReturn"==e.permissionCode?(o=e.i18n.page_title_a,e.GetReceipt_url="api/services/wmspda/ProductReturn/GetProductReturn",e.a_text=e.i18n.a_text_a,e.b_text=e.i18n.b_text_a,e.c_text=e.i18n.c_text_a):"Pages.WPDA.Instock.Storage.PorductInstock"==e.permissionCode?(o=e.i18n.page_title_b,e.GetReceipt_url="api/services/wmspda/ProductInstock/GetProductInstock",e.a_text=e.i18n.a_text_b,e.b_text=e.i18n.b_text_b,e.c_text=e.i18n.c_text_b):"Pages.WPDA.Instock.Storage.OtherInstock"==e.permissionCode?(o=e.i18n.page_title_c,e.GetReceipt_url="api/services/wmspda/OtherInstock/GetOtherInstock",e.a_text=e.i18n.a_text_c,e.b_text=e.i18n.b_text_c,e.c_text=e.i18n.c_text_c):"Pages.WPDA.Instock.ReturnMaterial.SalesReturn"==e.permissionCode?(o=e.i18n.page_title_d,e.GetReceipt_url="api/services/wmspda/SalesReturn/GetSalesReturn",e.a_text=e.i18n.a_text_d,e.b_text=e.i18n.b_text_d,e.c_text=e.i18n.c_text_d):"Pages.WPDA.Instock.Receipt.Asn"==e.permissionCode&&(o=e.i18n.page_title_g,e.GetReceipt_url="api/services/wmspda/Asn/GetAsn",e.a_text=e.i18n.a_text_g,e.b_text=e.i18n.b_text_g,e.c_text=e.i18n.c_text_g);var n=t.getStorageSync("title_permissionName");""!=n&&(o=n),t.setNavigationBarTitle({title:o})}};e.default=d}).call(this,o("6e42")["default"])},"3fa7":function(t,e,o){},"5eab":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",{staticClass:"mes_area"},[t._l(t.WarehousingReceiptsList_data,function(e,n){return t.scroll_items.length<0||0==t.scroll_items.length?o("view",{key:n,staticClass:"mes_area_in",attrs:{eventid:"0522f6f7-0-"+n},on:{tap:function(o){t.gotoPage(e.billCode)}}},[o("view",{staticClass:"mes_list"},[o("text",[t._v(t._s(t.i18n.text_a)+":")]),o("text",[t._v(t._s(e.billCode))])]),o("view",{staticClass:"mes_list"},[o("text",[t._v(t._s(t.i18n.text_b)+":")]),o("text",[t._v(t._s(e.billDate))])]),o("view",{staticClass:"bg_line"})]):t._e()}),t._l(t.scroll_items,function(e,n){return t.scroll_items.length>0?o("view",{key:n,staticClass:"mes_area_in",attrs:{eventid:"0522f6f7-1-"+n},on:{tap:function(o){t.gotoPage(e.billCode)}}},[o("view",{staticClass:"mes_list"},[o("text",[t._v(t._s(t.i18n.text_a)+":")]),o("text",[t._v(t._s(e.billCode))])]),o("view",{staticClass:"mes_list"},[o("text",[t._v(t._s(t.i18n.text_b)+":")]),o("text",[t._v(t._s(e.billDate))])]),o("view",{staticClass:"bg_line"})]):t._e()})],2)},s=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return s})},8638:function(t,e,o){"use strict";var n=o("a5df"),s=o.n(n);s.a},"9d1d":function(t,e,o){"use strict";o.r(e);var n=o("e165"),s=o("b6dd");for(var i in s)"default"!==i&&function(t){o.d(e,t,function(){return s[t]})}(i);o("e047");var a=o("2877"),r=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},a5df:function(t,e,o){},b2c8:function(t,e,o){"use strict";o.r(e);var n=o("079f"),s=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);e["default"]=s.a},b6dd:function(t,e,o){"use strict";o.r(e);var n=o("3b9b"),s=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);e["default"]=s.a},e047:function(t,e,o){"use strict";var n=o("3fa7"),s=o.n(n);s.a},e165:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",[o("PurchaseOrderInquiryHead",{attrs:{a_text:t.a_text,b_text:t.b_text,c_text:t.c_text,input_focus:t.query_input_focus,eventid:"00c3510c-0",mpcomid:"00c3510c-0"},on:{confirmInput:t.getAsnCode,input:t.onInput},model:{value:t.BillCode,callback:function(e){t.BillCode=e},expression:"BillCode"}}),o("scroll-view",{staticClass:"scroll-Y",attrs:{"scroll-top":t.scrollTop,"scroll-y":"true",eventid:"00c3510c-2"},on:{scrolltoupper:t.upper,scrolltolower:t.lower,scroll:t.scroll}},[t.WarehousingReceiptsList_show?o("WarehousingReceiptsList",{attrs:{scroll_items:t.scroll_items,eventid:"00c3510c-1",mpcomid:"00c3510c-1"},on:{gotoPage:t.gotoPage}}):t._e(),t.bottomCountArea_show?o("bottomCountArea",{attrs:{count:t.count,mpcomid:"00c3510c-2"}}):t._e()],1),o("queryScan",{attrs:{eventid:"00c3510c-3",mpcomid:"00c3510c-3"},on:{getCode:t.getCode}}),t.loading_wait_show?o("loadingWait",{attrs:{mpcomid:"00c3510c-4"}}):t._e()],1)},s=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return s})},fd98:function(t,e,o){"use strict";o("72e6");var n=i(o("b0ce")),s=i(o("9d1d"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(s.default))}},[["fd98","common/runtime","common/vendor"]]]);