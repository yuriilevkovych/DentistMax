/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/*! jQuery UI - v1.10.4 - 2021-12-09
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.button.js, jquery.ui.dialog.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
!function(a,u){var t,e,n=0,i=/^ui-id-\d+$/;function s(t,e){var n,i,s=t.nodeName.toLowerCase();return"area"===s?(i=(n=t.parentNode).name,!(!t.href||!i||"map"!==n.nodeName.toLowerCase())&&(!!(i=a("img[usemap=#"+i+"]")[0])&&r(i))):(/input|select|textarea|button|object/.test(s)?!t.disabled:"a"===s&&t.href||e)&&r(t)}function r(t){return a.expr.filters.visible(t)&&!a(t).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}a.ui=a.ui||{},a.extend(a.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),a.fn.extend({focus:(t=a.fn.focus,function(e,n){return"number"==typeof e?this.each(function(){var t=this;setTimeout(function(){a(t).focus(),n&&n.call(t)},e)}):t.apply(this,arguments)}),scrollParent:function(){var t=(a.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.css(this,"position"))&&/(auto|scroll)/.test(a.css(this,"overflow")+a.css(this,"overflow-y")+a.css(this,"overflow-x"))}):this.parents().filter(function(){return/(auto|scroll)/.test(a.css(this,"overflow")+a.css(this,"overflow-y")+a.css(this,"overflow-x"))})).eq(0);return/fixed/.test(this.css("position"))||!t.length?a(document):t},zIndex:function(t){if(t!==u)return this.css("zIndex",t);if(this.length)for(var e,n,i=a(this[0]);i.length&&i[0]!==document;){if(("absolute"===(e=i.css("position"))||"relative"===e||"fixed"===e)&&(n=parseInt(i.css("zIndex"),10),!isNaN(n)&&0!==n))return n;i=i.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){i.test(this.id)&&a(this).removeAttr("id")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(e){return function(t){return!!a.data(t,e)}}):function(t,e,n){return!!a.data(t,n[3])},focusable:function(t){return s(t,!isNaN(a.attr(t,"tabindex")))},tabbable:function(t){var e=a.attr(t,"tabindex"),n=isNaN(e);return(n||0<=e)&&s(t,!n)}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(t,n){var s="Width"===n?["Left","Right"]:["Top","Bottom"],i=n.toLowerCase(),r={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};function o(t,e,n,i){return a.each(s,function(){e-=parseFloat(a.css(t,"padding"+this))||0,n&&(e-=parseFloat(a.css(t,"border"+this+"Width"))||0),i&&(e-=parseFloat(a.css(t,"margin"+this))||0)}),e}a.fn["inner"+n]=function(t){return t===u?r["inner"+n].call(this):this.each(function(){a(this).css(i,o(this,t)+"px")})},a.fn["outer"+n]=function(t,e){return"number"!=typeof t?r["outer"+n].call(this,t):this.each(function(){a(this).css(i,o(this,t,!0,e)+"px")})}}),a.fn.addBack||(a.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),a("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(a.fn.removeData=(e=a.fn.removeData,function(t){return arguments.length?e.call(this,a.camelCase(t)):e.call(this)})),a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),a.support.selectstart="onselectstart"in document.createElement("div"),a.fn.extend({disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.extend(a.ui,{plugin:{add:function(t,e,n){var i,s=a.ui[t].prototype;for(i in n)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([e,n[i]])},call:function(t,e,n){var i,s=t.plugins[e];if(s&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(i=0;i<s.length;i++)t.options[s[i][0]]&&s[i][1].apply(t.element,n)}},hasScroll:function(t,e){if("hidden"===a(t).css("overflow"))return!1;var n=e&&"left"===e?"scrollLeft":"scrollTop",e=!1;return 0<t[n]||(t[n]=1,e=0<t[n],t[n]=0,e)}})}(jQuery);!function(d,r){var i=0,u=Array.prototype.slice,n=d.cleanData;d.cleanData=function(t){for(var e,i=0;null!=(e=t[i]);i++)try{d(e).triggerHandler("remove")}catch(t){}n(t)},d.widget=function(t,i,e){var n,s,o,a,r={},u=t.split(".")[0];t=t.split(".")[1],n=u+"-"+t,e||(e=i,i=d.Widget),d.expr[":"][n.toLowerCase()]=function(t){return!!d.data(t,n)},d[u]=d[u]||{},s=d[u][t],o=d[u][t]=function(t,e){if(!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},d.extend(o,s,{version:e.version,_proto:d.extend({},e),_childConstructors:[]}),(a=new i).options=d.widget.extend({},a.options),d.each(e,function(e,n){function s(){return i.prototype[e].apply(this,arguments)}function o(t){return i.prototype[e].apply(this,t)}d.isFunction(n)?r[e]=function(){var t,e=this._super,i=this._superApply;return this._super=s,this._superApply=o,t=n.apply(this,arguments),this._super=e,this._superApply=i,t}:r[e]=n}),o.prototype=d.widget.extend(a,{widgetEventPrefix:s&&a.widgetEventPrefix||t},r,{constructor:o,namespace:u,widgetName:t,widgetFullName:n}),s?(d.each(s._childConstructors,function(t,e){var i=e.prototype;d.widget(i.namespace+"."+i.widgetName,o,e._proto)}),delete s._childConstructors):i._childConstructors.push(o),d.widget.bridge(t,o)},d.widget.extend=function(t){for(var e,i,n=u.call(arguments,1),s=0,o=n.length;s<o;s++)for(e in n[s])i=n[s][e],n[s].hasOwnProperty(e)&&i!==r&&(d.isPlainObject(i)?t[e]=d.isPlainObject(t[e])?d.widget.extend({},t[e],i):d.widget.extend({},i):t[e]=i);return t},d.widget.bridge=function(o,e){var a=e.prototype.widgetFullName||o;d.fn[o]=function(i){var t="string"==typeof i,n=u.call(arguments,1),s=this;return i=!t&&n.length?d.widget.extend.apply(null,[i].concat(n)):i,t?this.each(function(){var t,e=d.data(this,a);return e?d.isFunction(e[i])&&"_"!==i.charAt(0)?(t=e[i].apply(e,n))!==e&&t!==r?(s=t&&t.jquery?s.pushStack(t.get()):t,!1):void 0:d.error("no such method '"+i+"' for "+o+" widget instance"):d.error("cannot call methods on "+o+" prior to initialization; attempted to call method '"+i+"'")}):this.each(function(){var t=d.data(this,a);t?t.option(i||{})._init():d.data(this,a,new e(i,this))}),s}},d.Widget=function(){},d.Widget._childConstructors=[],d.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,e){e=d(e||this.defaultElement||this)[0],this.element=d(e),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=d.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=d(),this.hoverable=d(),this.focusable=d(),e!==this&&(d.data(e,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===e&&this.destroy()}}),this.document=d(e.style?e.ownerDocument:e.document||e),this.window=d(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:d.noop,_getCreateEventData:d.noop,_create:d.noop,_init:d.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(d.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:d.noop,widget:function(){return this.element},option:function(t,e){var i,n,s,o=t;if(0===arguments.length)return d.widget.extend({},this.options);if("string"==typeof t)if(o={},t=(i=t.split(".")).shift(),i.length){for(n=o[t]=d.widget.extend({},this.options[t]),s=0;s<i.length-1;s++)n[i[s]]=n[i[s]]||{},n=n[i[s]];if(t=i.pop(),1===arguments.length)return n[t]===r?null:n[t];n[t]=e}else{if(1===arguments.length)return this.options[t]===r?null:this.options[t];o[t]=e}return this._setOptions(o),this},_setOptions:function(t){for(var e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(s,o,t){var a,r=this;"boolean"!=typeof s&&(t=o,o=s,s=!1),t?(o=a=d(o),this.bindings=this.bindings.add(o)):(t=o,o=this.element,a=this.widget()),d.each(t,function(t,e){function i(){if(s||!0!==r.options.disabled&&!d(this).hasClass("ui-state-disabled"))return("string"==typeof e?r[e]:e).apply(r,arguments)}"string"!=typeof e&&(i.guid=e.guid=e.guid||i.guid||d.guid++);var n=t.match(/^(\w+)\s*(.*)$/),t=n[1]+r.eventNamespace,n=n[2];n?a.delegate(n,t,i):o.bind(t,i)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){var i=this;return setTimeout(function(){return("string"==typeof t?i[t]:t).apply(i,arguments)},e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){d(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){d(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){d(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){d(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,e,i){var n,s,o=this.options[t];if(i=i||{},(e=d.Event(e)).type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],s=e.originalEvent)for(n in s)n in e||(e[n]=s[n]);return this.element.trigger(e,i),!(d.isFunction(o)&&!1===o.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},d.each({show:"fadeIn",hide:"fadeOut"},function(o,a){d.Widget.prototype["_"+o]=function(e,t,i){var n=(t="string"==typeof t?{effect:t}:t)?!0!==t&&"number"!=typeof t&&t.effect||a:o,s=!d.isEmptyObject(t="number"==typeof(t=t||{})?{duration:t}:t);t.complete=i,t.delay&&e.delay(t.delay),s&&d.effects&&d.effects.effect[n]?e[o](t):n!==o&&e[n]?e[n](t.duration,t.easing,i):e.queue(function(t){d(this)[o](),i&&i.call(e[0]),t()})}})}(jQuery);!function(i){var u=!1;i(document).mouseup(function(){u=!1}),i.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(e){if(!0===i.data(e.target,t.widgetName+".preventClickEvent"))return i.removeData(e.target,t.widgetName+".preventClickEvent"),e.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&i(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!u){this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var t=this,s=1===e.which,o=!("string"!=typeof this.options.cancel||!e.target.nodeName)&&i(e.target).closest(this.options.cancel).length;return s&&!o&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){t.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=!1!==this._mouseStart(e),!this._mouseStarted)?(e.preventDefault(),!0):(!0===i.data(e.target,this.widgetName+".preventClickEvent")&&i.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return t._mouseMove(e)},this._mouseUpDelegate=function(e){return t._mouseUp(e)},i(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),u=!0)):!0}},_mouseMove:function(e){return i.ui.ie&&(!document.documentMode||document.documentMode<9)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,e),this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return i(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&i.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}(jQuery);!function(H){H.ui=H.ui||{};var o,x=Math.max,T=Math.abs,L=Math.round,l=/left|center|right/,n=/top|center|bottom/,s=/[\+\-]\d+(\.[\d]+)?%?/,f=/^\w+/,h=/%$/,e=H.fn.position;function P(t,i,e){return[parseFloat(t[0])*(h.test(t[0])?i/100:1),parseFloat(t[1])*(h.test(t[1])?e/100:1)]}function D(t,i){return parseInt(H.css(t,i),10)||0}H.position={scrollbarWidth:function(){if(void 0!==o)return o;var t,i=H("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),e=i.children()[0];return H("body").append(i),t=e.offsetWidth,i.css("overflow","scroll"),t===(e=e.offsetWidth)&&(e=i[0].clientWidth),i.remove(),o=t-e},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),e=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),i="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth;return{width:"scroll"===e||"auto"===e&&t.height<t.element[0].scrollHeight?H.position.scrollbarWidth():0,height:i?H.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=H(t||window),t=H.isWindow(i[0]);return{element:i,isWindow:t,isDocument:!!i[0]&&9===i[0].nodeType,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:t?i.width():i.outerWidth(),height:t?i.height():i.outerHeight()}}},H.fn.position=function(c){if(!c||!c.of)return e.apply(this,arguments);c=H.extend({},c);var a,d,g,m,u,t,w=H(c.of),W=H.position.getWithinInfo(c.within),v=H.position.getScrollInfo(W),y=(c.collision||"flip").split(" "),b={},i=9===(t=(i=w)[0]).nodeType?{width:i.width(),height:i.height(),offset:{top:0,left:0}}:H.isWindow(t)?{width:i.width(),height:i.height(),offset:{top:i.scrollTop(),left:i.scrollLeft()}}:t.preventDefault?{width:0,height:0,offset:{top:t.pageY,left:t.pageX}}:{width:i.outerWidth(),height:i.outerHeight(),offset:i.offset()};return w[0].preventDefault&&(c.at="left top"),d=i.width,g=i.height,u=H.extend({},m=i.offset),H.each(["my","at"],function(){var t,i,e=(c[this]||"").split(" ");(e=1===e.length?l.test(e[0])?e.concat(["center"]):n.test(e[0])?["center"].concat(e):["center","center"]:e)[0]=l.test(e[0])?e[0]:"center",e[1]=n.test(e[1])?e[1]:"center",t=s.exec(e[0]),i=s.exec(e[1]),b[this]=[t?t[0]:0,i?i[0]:0],c[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),1===y.length&&(y[1]=y[0]),"right"===c.at[0]?u.left+=d:"center"===c.at[0]&&(u.left+=d/2),"bottom"===c.at[1]?u.top+=g:"center"===c.at[1]&&(u.top+=g/2),a=P(b.at,d,g),u.left+=a[0],u.top+=a[1],this.each(function(){var e,t,s=H(this),f=s.outerWidth(),h=s.outerHeight(),i=D(this,"marginLeft"),o=D(this,"marginTop"),l=f+i+D(this,"marginRight")+v.width,n=h+o+D(this,"marginBottom")+v.height,r=H.extend({},u),p=P(b.my,s.outerWidth(),s.outerHeight());"right"===c.my[0]?r.left-=f:"center"===c.my[0]&&(r.left-=f/2),"bottom"===c.my[1]?r.top-=h:"center"===c.my[1]&&(r.top-=h/2),r.left+=p[0],r.top+=p[1],H.support.offsetFractions||(r.left=L(r.left),r.top=L(r.top)),e={marginLeft:i,marginTop:o},H.each(["left","top"],function(t,i){H.ui.position[y[t]]&&H.ui.position[y[t]][i](r,{targetWidth:d,targetHeight:g,elemWidth:f,elemHeight:h,collisionPosition:e,collisionWidth:l,collisionHeight:n,offset:[a[0]+p[0],a[1]+p[1]],my:c.my,at:c.at,within:W,elem:s})}),c.using&&(t=function(t){var i=m.left-r.left,e=i+d-f,o=m.top-r.top,l=o+g-h,n={target:{element:w,left:m.left,top:m.top,width:d,height:g},element:{element:s,left:r.left,top:r.top,width:f,height:h},horizontal:e<0?"left":0<i?"right":"center",vertical:l<0?"top":0<o?"bottom":"middle"};d<f&&T(i+e)<d&&(n.horizontal="center"),g<h&&T(o+l)<g&&(n.vertical="middle"),x(T(i),T(e))>x(T(o),T(l))?n.important="horizontal":n.important="vertical",c.using.call(this,t,n)}),s.offset(H.extend(r,{using:t}))})},H.ui.position={fit:{left:function(t,i){var e=i.within,o=e.isWindow?e.scrollLeft:e.offset.left,l=e.width,n=t.left-i.collisionPosition.marginLeft,s=o-n,f=n+i.collisionWidth-l-o;i.collisionWidth>l?0<s&&f<=0?(e=t.left+s+i.collisionWidth-l-o,t.left+=s-e):t.left=!(0<f&&s<=0)&&f<s?o+l-i.collisionWidth:o:0<s?t.left+=s:0<f?t.left-=f:t.left=x(t.left-n,t.left)},top:function(t,i){var e=i.within,o=e.isWindow?e.scrollTop:e.offset.top,l=i.within.height,n=t.top-i.collisionPosition.marginTop,s=o-n,f=n+i.collisionHeight-l-o;i.collisionHeight>l?0<s&&f<=0?(e=t.top+s+i.collisionHeight-l-o,t.top+=s-e):t.top=!(0<f&&s<=0)&&f<s?o+l-i.collisionHeight:o:0<s?t.top+=s:0<f?t.top-=f:t.top=x(t.top-n,t.top)}},flip:{left:function(t,i){var e=i.within,o=e.offset.left+e.scrollLeft,l=e.width,n=e.isWindow?e.scrollLeft:e.offset.left,s=t.left-i.collisionPosition.marginLeft,f=s-n,h=s+i.collisionWidth-l-n,r="left"===i.my[0]?-i.elemWidth:"right"===i.my[0]?i.elemWidth:0,e="left"===i.at[0]?i.targetWidth:"right"===i.at[0]?-i.targetWidth:0,s=-2*i.offset[0];f<0?((o=t.left+r+e+s+i.collisionWidth-l-o)<0||o<T(f))&&(t.left+=r+e+s):0<h&&(0<(n=t.left-i.collisionPosition.marginLeft+r+e+s-n)||T(n)<h)&&(t.left+=r+e+s)},top:function(t,i){var e=i.within,o=e.offset.top+e.scrollTop,l=e.height,n=e.isWindow?e.scrollTop:e.offset.top,s=t.top-i.collisionPosition.marginTop,f=s-n,h=s+i.collisionHeight-l-n,r="top"===i.my[1]?-i.elemHeight:"bottom"===i.my[1]?i.elemHeight:0,e="top"===i.at[1]?i.targetHeight:"bottom"===i.at[1]?-i.targetHeight:0,s=-2*i.offset[1];f<0?(o=t.top+r+e+s+i.collisionHeight-l-o,t.top+r+e+s>f&&(o<0||o<T(f))&&(t.top+=r+e+s)):0<h&&(n=t.top-i.collisionPosition.marginTop+r+e+s-n,t.top+r+e+s>h&&(0<n||T(n)<h)&&(t.top+=r+e+s))}},flipfit:{left:function(){H.ui.position.flip.left.apply(this,arguments),H.ui.position.fit.left.apply(this,arguments)},top:function(){H.ui.position.flip.top.apply(this,arguments),H.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i=document.getElementsByTagName("body")[0],e=document.createElement("div"),o=document.createElement(i?"div":"body"),l={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};for(t in i&&H.extend(l,{position:"absolute",left:"-1000px",top:"-1000px"}),l)o.style[t]=l[t];o.appendChild(e),(i=i||document.documentElement).insertBefore(o,i.firstChild),e.style.cssText="position: absolute; left: 10.7432222px;",e=H(e).offset().left,H.support.offsetFractions=10<e&&e<11,o.innerHTML="",i.removeChild(o)}()}(jQuery);!function(b){b.widget("ui.draggable",b.ui.mouse,{version:"1.10.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var e=this.options;return!(this.helper||e.disabled||0<b(t.target).closest(".ui-resizable-handle").length)&&(this.handle=this._getHandle(t),!!this.handle&&(b(!0===e.iframeFix?"iframe":e.iframeFix).each(function(){b("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(b(this).offset()).appendTo("body")}),!0))},_mouseStart:function(t){var e=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),b.ui.ddmanager&&(b.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,b.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this._setContainment(),!1===this._trigger("start",t)?(this._clear(),!1):(this._cacheHelperProportions(),b.ui.ddmanager&&!e.dropBehaviour&&b.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),b.ui.ddmanager&&b.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,e){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!e){e=this._uiHash();if(!1===this._trigger("drag",t,e))return this._mouseUp({}),!1;this.position=e.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),b.ui.ddmanager&&b.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var e=this,s=!1;return b.ui.ddmanager&&!this.options.dropBehaviour&&(s=b.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),("original"!==this.options.helper||b.contains(this.element[0].ownerDocument,this.element[0]))&&("invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||!0===this.options.revert||b.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?b(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){!1!==e._trigger("stop",t)&&e._clear()}):!1!==this._trigger("stop",t)&&this._clear()),!1},_mouseUp:function(t){return b("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),b.ui.ddmanager&&b.ui.ddmanager.dragStop(this,t),b.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return!this.options.handle||!!b(t.target).closest(this.element.find(this.options.handle)).length},_createHelper:function(t){var e=this.options,t=b.isFunction(e.helper)?b(e.helper.apply(this.element[0],[t])):"clone"===e.helper?this.element.clone().removeAttr("id"):this.element;return t.parents("body").length||t.appendTo("parent"===e.appendTo?this.element[0].parentNode:e.appendTo),t[0]===this.element[0]||/(fixed|absolute)/.test(t.css("position"))||t.css("position","absolute"),t},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),"left"in(t=b.isArray(t)?{left:+t[0],top:+t[1]||0}:t)&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&b.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),{top:(t=this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&b.ui.ie?{top:0,left:0}:t).top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,s,i=this.options;i.containment?"window"!==i.containment?"document"!==i.containment?i.containment.constructor!==Array?("parent"===i.containment&&(i.containment=this.helper[0].parentNode),(s=(e=b(i.containment))[0])&&(t="hidden"!==e.css("overflow"),this.containment=[(parseInt(e.css("borderLeftWidth"),10)||0)+(parseInt(e.css("paddingLeft"),10)||0),(parseInt(e.css("borderTopWidth"),10)||0)+(parseInt(e.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(e.css("borderRightWidth"),10)||0)-(parseInt(e.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(e.css("borderBottomWidth"),10)||0)-(parseInt(e.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=e)):this.containment=i.containment:this.containment=[0,0,b(document).width()-this.helperProportions.width-this.margins.left,(b(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=[b(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,b(window).scrollLeft()+b(window).width()-this.helperProportions.width-this.margins.left,b(window).scrollTop()+(b(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=null},_convertPositionTo:function(t,e){e=e||this.position;var s="absolute"===t?1:-1,t="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&b.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:t.scrollTop(),left:t.scrollLeft()}),{top:e.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*s,left:e.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*s}},_generatePosition:function(t){var e,s=this.options,i="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&b.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=t.pageX,n=t.pageY;return this.offset.scroll||(this.offset.scroll={top:i.scrollTop(),left:i.scrollLeft()}),this.originalPosition&&(this.containment&&(e=this.relative_container?(e=this.relative_container.offset(),[this.containment[0]+e.left,this.containment[1]+e.top,this.containment[2]+e.left,this.containment[3]+e.top]):this.containment,t.pageX-this.offset.click.left<e[0]&&(o=e[0]+this.offset.click.left),t.pageY-this.offset.click.top<e[1]&&(n=e[1]+this.offset.click.top),t.pageX-this.offset.click.left>e[2]&&(o=e[2]+this.offset.click.left),t.pageY-this.offset.click.top>e[3]&&(n=e[3]+this.offset.click.top)),s.grid&&(t=s.grid[1]?this.originalPageY+Math.round((n-this.originalPageY)/s.grid[1])*s.grid[1]:this.originalPageY,n=!e||t-this.offset.click.top>=e[1]||t-this.offset.click.top>e[3]?t:t-this.offset.click.top>=e[1]?t-s.grid[1]:t+s.grid[1],t=s.grid[0]?this.originalPageX+Math.round((o-this.originalPageX)/s.grid[0])*s.grid[0]:this.originalPageX,o=!e||t-this.offset.click.left>=e[0]||t-this.offset.click.left>e[2]?t:t-this.offset.click.left>=e[0]?t-s.grid[0]:t+s.grid[0])),{top:n-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,e,s){return s=s||this._uiHash(),b.ui.plugin.call(this,t,[e,s]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),b.Widget.prototype._trigger.call(this,t,e,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),b.ui.plugin.add("draggable","connectToSortable",{start:function(e,t){var s=b(this).data("ui-draggable"),i=s.options,o=b.extend({},t,{item:s.element});s.sortables=[],b(i.connectToSortable).each(function(){var t=b.data(this,"ui-sortable");t&&!t.options.disabled&&(s.sortables.push({instance:t,shouldRevert:t.options.revert}),t.refreshPositions(),t._trigger("activate",e,o))})},stop:function(t,e){var s=b(this).data("ui-draggable"),i=b.extend({},e,{item:s.element});b.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,i))})},drag:function(s,i){var o=b(this).data("ui-draggable"),n=this;b.each(o.sortables,function(){var t=!1,e=this;this.instance.positionAbs=o.positionAbs,this.instance.helperProportions=o.helperProportions,this.instance.offset.click=o.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(t=!0,b.each(o.sortables,function(){return this.instance.positionAbs=o.positionAbs,this.instance.helperProportions=o.helperProportions,this.instance.offset.click=o.offset.click,t=this!==e&&this.instance._intersectsWith(this.instance.containerCache)&&b.contains(e.instance.element[0],this.instance.element[0])?!1:t})),t?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=b(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},s.target=this.instance.currentItem[0],this.instance._mouseCapture(s,!0),this.instance._mouseStart(s,!0,!0),this.instance.offset.click.top=o.offset.click.top,this.instance.offset.click.left=o.offset.click.left,this.instance.offset.parent.left-=o.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=o.offset.parent.top-this.instance.offset.parent.top,o._trigger("toSortable",s),o.dropped=this.instance.element,o.currentItem=o.element,this.instance.fromOutside=o),this.instance.currentItem&&this.instance._mouseDrag(s)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",s,this.instance._uiHash(this.instance)),this.instance._mouseStop(s,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),o._trigger("fromSortable",s),o.dropped=!1)})}}),b.ui.plugin.add("draggable","cursor",{start:function(){var t=b("body"),e=b(this).data("ui-draggable").options;t.css("cursor")&&(e._cursor=t.css("cursor")),t.css("cursor",e.cursor)},stop:function(){var t=b(this).data("ui-draggable").options;t._cursor&&b("body").css("cursor",t._cursor)}}),b.ui.plugin.add("draggable","opacity",{start:function(t,e){var s=b(e.helper),e=b(this).data("ui-draggable").options;s.css("opacity")&&(e._opacity=s.css("opacity")),s.css("opacity",e.opacity)},stop:function(t,e){var s=b(this).data("ui-draggable").options;s._opacity&&b(e.helper).css("opacity",s._opacity)}}),b.ui.plugin.add("draggable","scroll",{start:function(){var t=b(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var e=b(this).data("ui-draggable"),s=e.options,i=!1;e.scrollParent[0]!==document&&"HTML"!==e.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(e.overflowOffset.top+e.scrollParent[0].offsetHeight-t.pageY<s.scrollSensitivity?e.scrollParent[0].scrollTop=i=e.scrollParent[0].scrollTop+s.scrollSpeed:t.pageY-e.overflowOffset.top<s.scrollSensitivity&&(e.scrollParent[0].scrollTop=i=e.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(e.overflowOffset.left+e.scrollParent[0].offsetWidth-t.pageX<s.scrollSensitivity?e.scrollParent[0].scrollLeft=i=e.scrollParent[0].scrollLeft+s.scrollSpeed:t.pageX-e.overflowOffset.left<s.scrollSensitivity&&(e.scrollParent[0].scrollLeft=i=e.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(t.pageY-b(document).scrollTop()<s.scrollSensitivity?i=b(document).scrollTop(b(document).scrollTop()-s.scrollSpeed):b(window).height()-(t.pageY-b(document).scrollTop())<s.scrollSensitivity&&(i=b(document).scrollTop(b(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(t.pageX-b(document).scrollLeft()<s.scrollSensitivity?i=b(document).scrollLeft(b(document).scrollLeft()-s.scrollSpeed):b(window).width()-(t.pageX-b(document).scrollLeft())<s.scrollSensitivity&&(i=b(document).scrollLeft(b(document).scrollLeft()+s.scrollSpeed)))),!1!==i&&b.ui.ddmanager&&!s.dropBehaviour&&b.ui.ddmanager.prepareOffsets(e,t)}}),b.ui.plugin.add("draggable","snap",{start:function(){var s=b(this).data("ui-draggable"),t=s.options;s.snapElements=[],b(t.snap.constructor!==String?t.snap.items||":data(ui-draggable)":t.snap).each(function(){var t=b(this),e=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:e.top,left:e.left})})},drag:function(t,e){for(var s,i,o,n,r,a,l,h,c,p=b(this).data("ui-draggable"),f=p.options,d=f.snapTolerance,g=e.offset.left,u=g+p.helperProportions.width,m=e.offset.top,v=m+p.helperProportions.height,P=p.snapElements.length-1;0<=P;P--)a=(r=p.snapElements[P].left)+p.snapElements[P].width,h=(l=p.snapElements[P].top)+p.snapElements[P].height,u<r-d||a+d<g||v<l-d||h+d<m||!b.contains(p.snapElements[P].item.ownerDocument,p.snapElements[P].item)?(p.snapElements[P].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,t,b.extend(p._uiHash(),{snapItem:p.snapElements[P].item})),p.snapElements[P].snapping=!1):("inner"!==f.snapMode&&(s=Math.abs(l-v)<=d,i=Math.abs(h-m)<=d,o=Math.abs(r-u)<=d,n=Math.abs(a-g)<=d,s&&(e.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),i&&(e.position.top=p._convertPositionTo("relative",{top:h,left:0}).top-p.margins.top),o&&(e.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),n&&(e.position.left=p._convertPositionTo("relative",{top:0,left:a}).left-p.margins.left)),c=s||i||o||n,"outer"!==f.snapMode&&(s=Math.abs(l-m)<=d,i=Math.abs(h-v)<=d,o=Math.abs(r-g)<=d,n=Math.abs(a-u)<=d,s&&(e.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),i&&(e.position.top=p._convertPositionTo("relative",{top:h-p.helperProportions.height,left:0}).top-p.margins.top),o&&(e.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),n&&(e.position.left=p._convertPositionTo("relative",{top:0,left:a-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[P].snapping&&(s||i||o||n||c)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,t,b.extend(p._uiHash(),{snapItem:p.snapElements[P].item})),p.snapElements[P].snapping=s||i||o||n||c)}}),b.ui.plugin.add("draggable","stack",{start:function(){var e,t=this.data("ui-draggable").options,t=b.makeArray(b(t.stack)).sort(function(t,e){return(parseInt(b(t).css("zIndex"),10)||0)-(parseInt(b(e).css("zIndex"),10)||0)});t.length&&(e=parseInt(b(t[0]).css("zIndex"),10)||0,b(t).each(function(t){b(this).css("zIndex",e+t)}),this.css("zIndex",e+t.length))}}),b.ui.plugin.add("draggable","zIndex",{start:function(t,e){var s=b(e.helper),e=b(this).data("ui-draggable").options;s.css("zIndex")&&(e._zIndex=s.css("zIndex")),s.css("zIndex",e.zIndex)},stop:function(t,e){var s=b(this).data("ui-draggable").options;s._zIndex&&b(e.helper).css("zIndex",s._zIndex)}})}(jQuery);!function(a){function d(e,t,i){return t<e&&e<t+i}a.widget("ui.droppable",{version:"1.10.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,t=this.options,i=t.accept;this.isover=!1,this.isout=!0,this.accept=a.isFunction(i)?i:function(e){return e.is(i)},this.proportions=function(){if(!arguments.length)return e=e||{width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};e=arguments[0]},a.ui.ddmanager.droppables[t.scope]=a.ui.ddmanager.droppables[t.scope]||[],a.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){for(var e=0,t=a.ui.ddmanager.droppables[this.options.scope];e<t.length;e++)t[e]===this&&t.splice(e,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,t){"accept"===e&&(this.accept=a.isFunction(t)?t:function(e){return e.is(t)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(e){var t=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),t&&this._trigger("activate",e,this.ui(t))},_deactivate:function(e){var t=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),t&&this._trigger("deactivate",e,this.ui(t))},_over:function(e){var t=a.ui.ddmanager.current;t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(t)))},_out:function(e){var t=a.ui.ddmanager.current;t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(t)))},_drop:function(e,t){var i=t||a.ui.ddmanager.current,s=!1;return!(!i||(i.currentItem||i.element)[0]===this.element[0])&&(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var e=a.data(this,"ui-droppable");if(e.options.greedy&&!e.options.disabled&&e.options.scope===i.options.scope&&e.accept.call(e.element[0],i.currentItem||i.element)&&a.ui.intersect(i,a.extend(e,{offset:e.element.offset()}),e.options.tolerance))return!(s=!0)}),!s&&(!!this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(i)),this.element)))},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),a.ui.intersect=function(e,t,i){if(!t.offset)return!1;var s,o=(e.positionAbs||e.position.absolute).left,n=(e.positionAbs||e.position.absolute).top,r=o+e.helperProportions.width,a=n+e.helperProportions.height,l=t.offset.left,p=t.offset.top,h=l+t.proportions().width,c=p+t.proportions().height;switch(i){case"fit":return l<=o&&r<=h&&p<=n&&a<=c;case"intersect":return l<o+e.helperProportions.width/2&&r-e.helperProportions.width/2<h&&p<n+e.helperProportions.height/2&&a-e.helperProportions.height/2<c;case"pointer":return s=(e.positionAbs||e.position.absolute).left+(e.clickOffset||e.offset.click).left,d((e.positionAbs||e.position.absolute).top+(e.clickOffset||e.offset.click).top,p,t.proportions().height)&&d(s,l,t.proportions().width);case"touch":return(p<=n&&n<=c||p<=a&&a<=c||n<p&&c<a)&&(l<=o&&o<=h||l<=r&&r<=h||o<l&&h<r);default:return!1}},a.ui.ddmanager={current:null,droppables:{default:[]},prepareOffsets:function(e,t){var i,s,o=a.ui.ddmanager.droppables[e.options.scope]||[],n=t?t.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();e:for(i=0;i<o.length;i++)if(!(o[i].options.disabled||e&&!o[i].accept.call(o[i].element[0],e.currentItem||e.element))){for(s=0;s<r.length;s++)if(r[s]===o[i].element[0]){o[i].proportions().height=0;continue e}o[i].visible="none"!==o[i].element.css("display"),o[i].visible&&("mousedown"===n&&o[i]._activate.call(o[i],t),o[i].offset=o[i].element.offset(),o[i].proportions({width:o[i].element[0].offsetWidth,height:o[i].element[0].offsetHeight}))}},drop:function(e,t){var i=!1;return a.each((a.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&a.ui.intersect(e,this,this.options.tolerance)&&(i=this._drop.call(this,t)||i),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,t)))}),i},dragStart:function(e,t){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||a.ui.ddmanager.prepareOffsets(e,t)})},drag:function(o,n){o.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(o,n),a.each(a.ui.ddmanager.droppables[o.options.scope]||[],function(){var e,t,i,s;this.options.disabled||this.greedyChild||!this.visible||(s=!(i=a.ui.intersect(o,this,this.options.tolerance))&&this.isover?"isout":i&&!this.isover?"isover":null)&&(this.options.greedy&&(t=this.options.scope,(i=this.element.parents(":data(ui-droppable)").filter(function(){return a.data(this,"ui-droppable").options.scope===t})).length&&((e=a.data(i[0],"ui-droppable")).greedyChild="isover"===s)),e&&"isover"===s&&(e.isover=!1,e.isout=!0,e._out.call(e,n)),this[s]=!0,this["isout"===s?"isover":"isout"]=!1,this["isover"===s?"_over":"_out"].call(this,n),e&&"isout"===s&&(e.isout=!1,e.isover=!0,e._over.call(e,n)))})},dragStop:function(e,t){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||a.ui.ddmanager.prepareOffsets(e,t)}}}(jQuery);!function(m){function a(t){return parseInt(t,10)||0}function p(t){return!isNaN(parseInt(t,10))}m.widget("ui.resizable",m.ui.mouse,{version:"1.10.4",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,i,e,s,h=this,n=this.options;if(this.element.addClass("ui-resizable"),m.extend(this,{_aspectRatio:!!n.aspectRatio,aspectRatio:n.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:n.helper||n.ghost||n.animate?n.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(m("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=n.handles||(m(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;i<t.length;i++)e=m.trim(t[i]),(s=m("<div class='ui-resizable-handle "+("ui-resizable-"+e)+"'></div>")).css({zIndex:n.zIndex}),"se"===e&&s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[e]=".ui-resizable-"+e,this.element.append(s);this._renderAxis=function(t){var i,e,s;for(i in t=t||this.element,this.handles)this.handles[i].constructor===String&&(this.handles[i]=m(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(e=m(this.handles[i],this.element),s=/sw|ne|nw|se|n|s/.test(i)?e.outerHeight():e.outerWidth(),e=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(e,s),this._proportionallyResize()),m(this.handles[i]).length},this._renderAxis(this.element),this._handles=m(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){h.resizing||(this.className&&(s=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),h.axis=s&&s[1]?s[1]:"se")}),n.autoHide&&(this._handles.hide(),m(this.element).addClass("ui-resizable-autohide").mouseenter(function(){n.disabled||(m(this).removeClass("ui-resizable-autohide"),h._handles.show())}).mouseleave(function(){n.disabled||h.resizing||(m(this).addClass("ui-resizable-autohide"),h._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();function t(t){m(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()}var i;return this.elementIsWrapper&&(t(this.element),i=this.element,this.originalElement.css({position:i.css("position"),width:i.outerWidth(),height:i.outerHeight(),top:i.css("top"),left:i.css("left")}).insertAfter(i),i.remove()),this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_mouseCapture:function(t){var i,e,s=!1;for(i in this.handles)(e=m(this.handles[i])[0])!==t.target&&!m.contains(e,t.target)||(s=!0);return!this.options.disabled&&s},_mouseStart:function(t){var i,e=this.options,s=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:s.top,left:s.left}),this._renderProxy(),i=a(this.helper.css("left")),s=a(this.helper.css("top")),e.containment&&(i+=m(e.containment).scrollLeft()||0,s+=m(e.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:i,top:s},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof e.aspectRatio?e.aspectRatio:this.originalSize.width/this.originalSize.height||1,e=m(".ui-resizable-"+this.axis).css("cursor"),m("body").css("cursor","auto"===e?this.axis+"-resize":e),h.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i=this.helper,e={},s=this.originalMousePosition,h=this.axis,n=this.position.top,o=this.position.left,a=this.size.width,l=this.size.height,r=t.pageX-s.left||0,s=t.pageY-s.top||0,h=this._change[h];return h&&(s=h.apply(this,[t,r,s]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(s=this._updateRatio(s,t)),s=this._respectSize(s,t),this._updateCache(s),this._propagate("resize",t),this.position.top!==n&&(e.top=this.position.top+"px"),this.position.left!==o&&(e.left=this.position.left+"px"),this.size.width!==a&&(e.width=this.size.width+"px"),this.size.height!==l&&(e.height=this.size.height+"px"),i.css(e),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),m.isEmptyObject(e)||this._trigger("resize",t,this.ui())),!1},_mouseStop:function(t){this.resizing=!1;var i,e,s,h=this.options,n=this;return this._helper&&(s=(i=(e=this._proportionallyResizeElements).length&&/textarea/i.test(e[0].nodeName))&&m.ui.hasScroll(e[0],"left")?0:n.sizeDiff.height,e=i?0:n.sizeDiff.width,i={width:n.helper.width()-e,height:n.helper.height()-s},e=parseInt(n.element.css("left"),10)+(n.position.left-n.originalPosition.left)||null,s=parseInt(n.element.css("top"),10)+(n.position.top-n.originalPosition.top)||null,h.animate||this.element.css(m.extend(i,{top:s,left:e})),n.helper.height(n.size.height),n.helper.width(n.size.width),this._helper&&!h.animate&&this._proportionallyResize()),m("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(t){var i,e,s=this.options,h={minWidth:p(s.minWidth)?s.minWidth:0,maxWidth:p(s.maxWidth)?s.maxWidth:1/0,minHeight:p(s.minHeight)?s.minHeight:0,maxHeight:p(s.maxHeight)?s.maxHeight:1/0};(this._aspectRatio||t)&&(i=h.minHeight*this.aspectRatio,e=h.minWidth/this.aspectRatio,s=h.maxHeight*this.aspectRatio,t=h.maxWidth/this.aspectRatio,i>h.minWidth&&(h.minWidth=i),e>h.minHeight&&(h.minHeight=e),s<h.maxWidth&&(h.maxWidth=s),t<h.maxHeight&&(h.maxHeight=t)),this._vBoundaries=h},_updateCache:function(t){this.offset=this.helper.offset(),p(t.left)&&(this.position.left=t.left),p(t.top)&&(this.position.top=t.top),p(t.height)&&(this.size.height=t.height),p(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var i=this.position,e=this.size,s=this.axis;return p(t.height)?t.width=t.height*this.aspectRatio:p(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=i.left+(e.width-t.width),t.top=null),"nw"===s&&(t.top=i.top+(e.height-t.height),t.left=i.left+(e.width-t.width)),t},_respectSize:function(t){var i=this._vBoundaries,e=this.axis,s=p(t.width)&&i.maxWidth&&i.maxWidth<t.width,h=p(t.height)&&i.maxHeight&&i.maxHeight<t.height,n=p(t.width)&&i.minWidth&&i.minWidth>t.width,o=p(t.height)&&i.minHeight&&i.minHeight>t.height,a=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,r=/sw|nw|w/.test(e),e=/nw|ne|n/.test(e);return n&&(t.width=i.minWidth),o&&(t.height=i.minHeight),s&&(t.width=i.maxWidth),h&&(t.height=i.maxHeight),n&&r&&(t.left=a-i.minWidth),s&&r&&(t.left=a-i.maxWidth),o&&e&&(t.top=l-i.minHeight),h&&e&&(t.top=l-i.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,i,e,s,h=this.helper||this.element,n=0;n<this._proportionallyResizeElements.length;n++){if(s=this._proportionallyResizeElements[n],!this.borderDif)for(this.borderDif=[],i=[s.css("borderTopWidth"),s.css("borderRightWidth"),s.css("borderBottomWidth"),s.css("borderLeftWidth")],e=[s.css("paddingTop"),s.css("paddingRight"),s.css("paddingBottom"),s.css("paddingLeft")],t=0;t<i.length;t++)this.borderDif[t]=(parseInt(i[t],10)||0)+(parseInt(e[t],10)||0);s.css({height:h.height()-this.borderDif[0]-this.borderDif[2]||0,width:h.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||m("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,i){return{width:this.originalSize.width+i}},w:function(t,i){var e=this.originalSize;return{left:this.originalPosition.left+i,width:e.width-i}},n:function(t,i,e){var s=this.originalSize;return{top:this.originalPosition.top+e,height:s.height-e}},s:function(t,i,e){return{height:this.originalSize.height+e}},se:function(t,i,e){return m.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,e]))},sw:function(t,i,e){return m.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,e]))},ne:function(t,i,e){return m.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,e]))},nw:function(t,i,e){return m.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,e]))}},_propagate:function(t,i){m.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),m.ui.plugin.add("resizable","animate",{stop:function(i){var e=m(this).data("ui-resizable"),t=e.options,s=e._proportionallyResizeElements,h=s.length&&/textarea/i.test(s[0].nodeName),n=h&&m.ui.hasScroll(s[0],"left")?0:e.sizeDiff.height,o=h?0:e.sizeDiff.width,h={width:e.size.width-o,height:e.size.height-n},o=parseInt(e.element.css("left"),10)+(e.position.left-e.originalPosition.left)||null,n=parseInt(e.element.css("top"),10)+(e.position.top-e.originalPosition.top)||null;e.element.animate(m.extend(h,n&&o?{top:n,left:o}:{}),{duration:t.animateDuration,easing:t.animateEasing,step:function(){var t={width:parseInt(e.element.css("width"),10),height:parseInt(e.element.css("height"),10),top:parseInt(e.element.css("top"),10),left:parseInt(e.element.css("left"),10)};s&&s.length&&m(s[0]).css({width:t.width,height:t.height}),e._updateCache(t),e._propagate("resize",i)}})}}),m.ui.plugin.add("resizable","containment",{start:function(){var e,s,t=m(this).data("ui-resizable"),i=t.options,h=t.element,n=i.containment,o=n instanceof m?n.get(0):/parent/.test(n)?h.parent().get(0):n;o&&(t.containerElement=m(o),/document/.test(n)||n===document?(t.containerOffset={left:0,top:0},t.containerPosition={left:0,top:0},t.parentData={element:m(document),left:0,top:0,width:m(document).width(),height:m(document).height()||document.body.parentNode.scrollHeight}):(e=m(o),s=[],m(["Top","Right","Left","Bottom"]).each(function(t,i){s[t]=a(e.css("padding"+i))}),t.containerOffset=e.offset(),t.containerPosition=e.position(),t.containerSize={height:e.innerHeight()-s[3],width:e.innerWidth()-s[1]},i=t.containerOffset,h=t.containerSize.height,n=t.containerSize.width,n=m.ui.hasScroll(o,"left")?o.scrollWidth:n,h=m.ui.hasScroll(o)?o.scrollHeight:h,t.parentData={element:o,left:i.left,top:i.top,width:n,height:h}))},resize:function(t){var i=m(this).data("ui-resizable"),e=i.options,s=i.containerOffset,h=i.position,n=i._aspectRatio||t.shiftKey,o={top:0,left:0},t=i.containerElement;t[0]!==document&&/static/.test(t.css("position"))&&(o=s),h.left<(i._helper?s.left:0)&&(i.size.width=i.size.width+(i._helper?i.position.left-s.left:i.position.left-o.left),n&&(i.size.height=i.size.width/i.aspectRatio),i.position.left=e.helper?s.left:0),h.top<(i._helper?s.top:0)&&(i.size.height=i.size.height+(i._helper?i.position.top-s.top:i.position.top),n&&(i.size.width=i.size.height*i.aspectRatio),i.position.top=i._helper?s.top:0),i.offset.left=i.parentData.left+i.position.left,i.offset.top=i.parentData.top+i.position.top,e=Math.abs((i._helper,i.offset.left-o.left+i.sizeDiff.width)),h=Math.abs((i._helper?i.offset.top-o.top:i.offset.top-s.top)+i.sizeDiff.height),o=i.containerElement.get(0)===i.element.parent().get(0),s=/relative|absolute/.test(i.containerElement.css("position")),o&&s&&(e-=Math.abs(i.parentData.left)),e+i.size.width>=i.parentData.width&&(i.size.width=i.parentData.width-e,n&&(i.size.height=i.size.width/i.aspectRatio)),h+i.size.height>=i.parentData.height&&(i.size.height=i.parentData.height-h,n&&(i.size.width=i.size.height*i.aspectRatio))},stop:function(){var t=m(this).data("ui-resizable"),i=t.options,e=t.containerOffset,s=t.containerPosition,h=t.containerElement,n=m(t.helper),o=n.offset(),a=n.outerWidth()-t.sizeDiff.width,n=n.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(h.css("position"))&&m(this).css({left:o.left-s.left-e.left,width:a,height:n}),t._helper&&!i.animate&&/static/.test(h.css("position"))&&m(this).css({left:o.left-s.left-e.left,width:a,height:n})}}),m.ui.plugin.add("resizable","alsoResize",{start:function(){function i(t){m(t).each(function(){var t=m(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})}var t=m(this).data("ui-resizable").options;"object"!=typeof t.alsoResize||t.alsoResize.parentNode?i(t.alsoResize):t.alsoResize.length?(t.alsoResize=t.alsoResize[0],i(t.alsoResize)):m.each(t.alsoResize,function(t){i(t)})},resize:function(t,n){function e(t,e){m(t).each(function(){var t=m(this),s=m(this).data("ui-resizable-alsoresize"),h={},i=e&&e.length?e:t.parents(n.originalElement[0]).length?["width","height"]:["width","height","top","left"];m.each(i,function(t,i){var e=(s[i]||0)+(a[i]||0);e&&0<=e&&(h[i]=e||null)}),t.css(h)})}var i=m(this).data("ui-resizable"),s=i.options,h=i.originalSize,o=i.originalPosition,a={height:i.size.height-h.height||0,width:i.size.width-h.width||0,top:i.position.top-o.top||0,left:i.position.left-o.left||0};"object"!=typeof s.alsoResize||s.alsoResize.nodeType?e(s.alsoResize):m.each(s.alsoResize,function(t,i){e(t,i)})},stop:function(){m(this).removeData("resizable-alsoresize")}}),m.ui.plugin.add("resizable","ghost",{start:function(){var t=m(this).data("ui-resizable"),i=t.options,e=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=m(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=m(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),m.ui.plugin.add("resizable","grid",{resize:function(){var t=m(this).data("ui-resizable"),i=t.options,e=t.size,s=t.originalSize,h=t.originalPosition,n=t.axis,o="number"==typeof i.grid?[i.grid,i.grid]:i.grid,a=o[0]||1,l=o[1]||1,r=Math.round((e.width-s.width)/a)*a,p=Math.round((e.height-s.height)/l)*l,d=s.width+r,g=s.height+p,f=i.maxWidth&&i.maxWidth<d,c=i.maxHeight&&i.maxHeight<g,u=i.minWidth&&i.minWidth>d,e=i.minHeight&&i.minHeight>g;i.grid=o,u&&(d+=a),e&&(g+=l),f&&(d-=a),c&&(g-=l),/^(se|s|e)$/.test(n)?(t.size.width=d,t.size.height=g):/^(ne)$/.test(n)?(t.size.width=d,t.size.height=g,t.position.top=h.top-p):/^(sw)$/.test(n)?(t.size.width=d,t.size.height=g,t.position.left=h.left-r):(0<g-l?(t.size.height=g,t.position.top=h.top-p):(t.size.height=l,t.position.top=h.top+s.height-l),0<d-a?(t.size.width=d,t.position.left=h.left-r):(t.size.width=a,t.position.left=h.left+s.width-a))}})}(jQuery);!function(u){u.widget("ui.selectable",u.ui.mouse,{version:"1.10.4",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e,t=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){(e=u(t.options.filter,t.element[0])).addClass("ui-selectee"),e.each(function(){var e=u(this),t=e.offset();u.data(this,"selectable-item",{element:this,$element:e,left:t.left,top:t.top,right:t.left+e.outerWidth(),bottom:t.top+e.outerHeight(),startselected:!1,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=e.addClass("ui-selectee"),this._mouseInit(),this.helper=u("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(s){var l=this,e=this.options;this.opos=[s.pageX,s.pageY],this.options.disabled||(this.selectees=u(e.filter,this.element[0]),this._trigger("start",s),u(e.appendTo).append(this.helper),this.helper.css({left:s.pageX,top:s.pageY,width:0,height:0}),e.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var e=u.data(this,"selectable-item");e.startselected=!0,s.metaKey||s.ctrlKey||(e.$element.removeClass("ui-selected"),e.selected=!1,e.$element.addClass("ui-unselecting"),e.unselecting=!0,l._trigger("unselecting",s,{unselecting:e.element}))}),u(s.target).parents().addBack().each(function(){var e,t=u.data(this,"selectable-item");if(t)return e=!s.metaKey&&!s.ctrlKey||!t.$element.hasClass("ui-selected"),t.$element.removeClass(e?"ui-unselecting":"ui-selected").addClass(e?"ui-selecting":"ui-unselecting"),t.unselecting=!e,t.selecting=e,(t.selected=e)?l._trigger("selecting",s,{selecting:t.element}):l._trigger("unselecting",s,{unselecting:t.element}),!1}))},_mouseDrag:function(s){if(this.dragged=!0,!this.options.disabled){var e,l=this,i=this.options,n=this.opos[0],c=this.opos[1],a=s.pageX,r=s.pageY;return a<n&&(e=a,a=n,n=e),r<c&&(e=r,r=c,c=e),this.helper.css({left:n,top:c,width:a-n,height:r-c}),this.selectees.each(function(){var e=u.data(this,"selectable-item"),t=!1;e&&e.element!==l.element[0]&&("touch"===i.tolerance?t=!(e.left>a||e.right<n||e.top>r||e.bottom<c):"fit"===i.tolerance&&(t=e.left>n&&e.right<a&&e.top>c&&e.bottom<r),t?(e.selected&&(e.$element.removeClass("ui-selected"),e.selected=!1),e.unselecting&&(e.$element.removeClass("ui-unselecting"),e.unselecting=!1),e.selecting||(e.$element.addClass("ui-selecting"),e.selecting=!0,l._trigger("selecting",s,{selecting:e.element}))):(e.selecting&&((s.metaKey||s.ctrlKey)&&e.startselected?(e.$element.removeClass("ui-selecting"),e.selecting=!1,e.$element.addClass("ui-selected"),e.selected=!0):(e.$element.removeClass("ui-selecting"),e.selecting=!1,e.startselected&&(e.$element.addClass("ui-unselecting"),e.unselecting=!0),l._trigger("unselecting",s,{unselecting:e.element}))),e.selected&&(s.metaKey||s.ctrlKey||e.startselected||(e.$element.removeClass("ui-selected"),e.selected=!1,e.$element.addClass("ui-unselecting"),e.unselecting=!0,l._trigger("unselecting",s,{unselecting:e.element})))))}),!1}},_mouseStop:function(t){var s=this;return this.dragged=!1,u(".ui-unselecting",this.element[0]).each(function(){var e=u.data(this,"selectable-item");e.$element.removeClass("ui-unselecting"),e.unselecting=!1,e.startselected=!1,s._trigger("unselected",t,{unselected:e.element})}),u(".ui-selecting",this.element[0]).each(function(){var e=u.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected"),e.selecting=!1,e.selected=!0,e.startselected=!0,s._trigger("selected",t,{selected:e.element})}),this._trigger("stop",t),this.helper.remove(),!1}})}(jQuery);!function(u){function d(t,e,i){return e<t&&t<e+i}function m(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))}u.widget("ui.sortable",u.ui.mouse,{version:"1.10.4",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=!!this.items.length&&("x"===t.axis||m(this.items[0].item)),this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var t=this.items.length-1;0<=t;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,e){"disabled"===t?(this.options[t]=e,this.widget().toggleClass("ui-sortable-disabled",!!e)):u.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,e){var i=null,s=!1,o=this;return!this.reverting&&(!this.options.disabled&&"static"!==this.options.type&&(this._refreshItems(t),u(t.target).parents().each(function(){if(u.data(this,o.widgetName+"-item")===o)return i=u(this),!1}),!!(i=u.data(t.target,o.widgetName+"-item")===o?u(t.target):i)&&(!(this.options.handle&&!e&&(u(this.options.handle,i).find("*").addBack().each(function(){this===t.target&&(s=!0)}),!s))&&(this.currentItem=i,this._removeCurrentsFromItems(),!0))))},_mouseStart:function(t,e,i){var s,o,r=this.options;if((this.currentContainer=this).refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},u.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),r.containment&&this._setContainment(),r.cursor&&"auto"!==r.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",r.cursor),this.storedStylesheet=u("<style>*{ cursor: "+r.cursor+" !important; }</style>").appendTo(o)),r.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",r.opacity)),r.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",r.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!i)for(s=this.containers.length-1;0<=s;s--)this.containers[s]._trigger("activate",t,this._uiHash(this));return u.ui.ddmanager&&(u.ui.ddmanager.current=this),u.ui.ddmanager&&!r.dropBehaviour&&u.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var e,i,s,o,r=this.options,n=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=n=this.scrollParent[0].scrollTop+r.scrollSpeed:t.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=n=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=n=this.scrollParent[0].scrollLeft+r.scrollSpeed:t.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=n=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(t.pageY-u(document).scrollTop()<r.scrollSensitivity?n=u(document).scrollTop(u(document).scrollTop()-r.scrollSpeed):u(window).height()-(t.pageY-u(document).scrollTop())<r.scrollSensitivity&&(n=u(document).scrollTop(u(document).scrollTop()+r.scrollSpeed)),t.pageX-u(document).scrollLeft()<r.scrollSensitivity?n=u(document).scrollLeft(u(document).scrollLeft()-r.scrollSpeed):u(window).width()-(t.pageX-u(document).scrollLeft())<r.scrollSensitivity&&(n=u(document).scrollLeft(u(document).scrollLeft()+r.scrollSpeed))),!1!==n&&u.ui.ddmanager&&!r.dropBehaviour&&u.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e=this.items.length-1;0<=e;e--)if(s=(i=this.items[e]).item[0],(o=this._intersectsWithPointer(i))&&i.instance===this.currentContainer&&!(s===this.currentItem[0]||this.placeholder[1===o?"next":"prev"]()[0]===s||u.contains(this.placeholder[0],s)||"semi-dynamic"===this.options.type&&u.contains(this.element[0],s))){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(i))break;this._rearrange(t,i),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),u.ui.ddmanager&&u.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,e){var i,s,o,r;if(t)return u.ui.ddmanager&&!this.options.dropBehaviour&&u.ui.ddmanager.drop(this,t),this.options.revert?(s=(i=this).placeholder.offset(),r={},(o=this.options.axis)&&"x"!==o||(r.left=s.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(r.top=s.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,u(this.helper).animate(r,parseInt(this.options.revert,10)||500,function(){i._clear(t)})):this._clear(t,e),!1},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;0<=t;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),u.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?u(this.domPosition.prev).after(this.currentItem):u(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var t=this._getItemsAsjQuery(e&&e.connected),i=[];return e=e||{},u(t).each(function(){var t=(u(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);t&&i.push((e.key||t[1]+"[]")+"="+(e.key&&e.expression?t[1]:t[2]))}),!i.length&&e.key&&i.push(e.key+"="),i.join("&")},toArray:function(t){var e=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},e.each(function(){i.push(u(t.item||this).attr(t.attribute||"id")||"")}),i},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,o=s+this.helperProportions.height,r=t.left,n=r+t.width,h=t.top,a=h+t.height,l=this.offset.click.top,c=this.offset.click.left,l="x"===this.options.axis||h<s+l&&s+l<a,c="y"===this.options.axis||r<e+c&&e+c<n;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?l&&c:r<e+this.helperProportions.width/2&&i-this.helperProportions.width/2<n&&h<s+this.helperProportions.height/2&&o-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var e="x"===this.options.axis||d(this.positionAbs.top+this.offset.click.top,t.top,t.height),i="y"===this.options.axis||d(this.positionAbs.left+this.offset.click.left,t.left,t.width),t=e&&i,e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection();return!!t&&(this.floating?i&&"right"===i||"down"===e?2:1:e&&("down"===e?2:1))},_intersectsWithSides:function(t){var e=d(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=d(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),t=this._getDragHorizontalDirection();return this.floating&&t?"right"===t&&i||"left"===t&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!=t&&(0<t?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!=t&&(0<t?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(t){var e,i,s,o,r=[],n=[],h=this._connectWith();if(h&&t)for(e=h.length-1;0<=e;e--)for(i=(s=u(h[e])).length-1;0<=i;i--)(o=u.data(s[i],this.widgetFullName))&&o!==this&&!o.options.disabled&&n.push([u.isFunction(o.options.items)?o.options.items.call(o.element):u(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);function a(){r.push(this)}for(n.push([u.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):u(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),e=n.length-1;0<=e;e--)n[e][0].each(a);return u(r)},_removeCurrentsFromItems:function(){var i=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=u.grep(this.items,function(t){for(var e=0;e<i.length;e++)if(i[e]===t.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var e,i,s,o,r,n,h,a,l=this.items,c=[[u.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):u(this.options.items,this.element),this]],p=this._connectWith();if(p&&this.ready)for(e=p.length-1;0<=e;e--)for(i=(s=u(p[e])).length-1;0<=i;i--)(o=u.data(s[i],this.widgetFullName))&&o!==this&&!o.options.disabled&&(c.push([u.isFunction(o.options.items)?o.options.items.call(o.element[0],t,{item:this.currentItem}):u(o.options.items,o.element),o]),this.containers.push(o));for(e=c.length-1;0<=e;e--)for(r=c[e][1],a=(n=c[e][i=0]).length;i<a;i++)(h=u(n[i])).data(this.widgetName+"-item",r),l.push({item:h,instance:r,width:0,height:0,left:0,top:0})},refreshPositions:function(t){var e,i,s,o;for(this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset()),e=this.items.length-1;0<=e;e--)(i=this.items[e]).instance!==this.currentContainer&&this.currentContainer&&i.item[0]!==this.currentItem[0]||(s=this.options.toleranceElement?u(this.options.toleranceElement,i.item):i.item,t||(i.width=s.outerWidth(),i.height=s.outerHeight()),o=s.offset(),i.left=o.left,i.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(e=this.containers.length-1;0<=e;e--)o=this.containers[e].element.offset(),this.containers[e].containerCache.left=o.left,this.containers[e].containerCache.top=o.top,this.containers[e].containerCache.width=this.containers[e].element.outerWidth(),this.containers[e].containerCache.height=this.containers[e].element.outerHeight();return this},_createPlaceholder:function(i){var s,o=(i=i||this).options;o.placeholder&&o.placeholder.constructor!==String||(s=o.placeholder,o.placeholder={element:function(){var t=i.currentItem[0].nodeName.toLowerCase(),e=u("<"+t+">",i.document[0]).addClass(s||i.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===t?i.currentItem.children().each(function(){u("<td>&#160;</td>",i.document[0]).attr("colspan",u(this).attr("colspan")||1).appendTo(e)}):"img"===t&&e.attr("src",i.currentItem.attr("src")),s||e.css("visibility","hidden"),e},update:function(t,e){s&&!o.forcePlaceholderSize||(e.height()||e.height(i.currentItem.innerHeight()-parseInt(i.currentItem.css("paddingTop")||0,10)-parseInt(i.currentItem.css("paddingBottom")||0,10)),e.width()||e.width(i.currentItem.innerWidth()-parseInt(i.currentItem.css("paddingLeft")||0,10)-parseInt(i.currentItem.css("paddingRight")||0,10)))}}),i.placeholder=u(o.placeholder.element.call(i.element,i.currentItem)),i.currentItem.after(i.placeholder),o.placeholder.update(i,i.placeholder)},_contactContainers:function(t){for(var e,i,s,o,r,n,h,a,l,c=null,p=null,f=this.containers.length-1;0<=f;f--)u.contains(this.currentItem[0],this.containers[f].element[0])||(this._intersectsWith(this.containers[f].containerCache)?c&&u.contains(this.containers[f].element[0],c.element[0])||(c=this.containers[f],p=f):this.containers[f].containerCache.over&&(this.containers[f]._trigger("out",t,this._uiHash(this)),this.containers[f].containerCache.over=0));if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(i=1e4,s=null,r=(l=c.floating||m(this.currentItem))?"width":"height",n=this.positionAbs[o=l?"left":"top"]+this.offset.click[o],e=this.items.length-1;0<=e;e--)u.contains(this.containers[p].element[0],this.items[e].item[0])&&this.items[e].item[0]!==this.currentItem[0]&&(l&&!d(this.positionAbs.top+this.offset.click.top,this.items[e].top,this.items[e].height)||(h=this.items[e].item.offset()[o],a=!1,Math.abs(h-n)>Math.abs(h+this.items[e][r]-n)&&(a=!0,h+=this.items[e][r]),Math.abs(h-n)<i&&(i=Math.abs(h-n),s=this.items[e],this.direction=a?"up":"down")));(s||this.options.dropOnEmpty)&&this.currentContainer!==this.containers[p]&&(s?this._rearrange(t,s,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1)}},_createHelper:function(t){var e=this.options,t=u.isFunction(e.helper)?u(e.helper.apply(this.element[0],[t,this.currentItem])):"clone"===e.helper?this.currentItem.clone():this.currentItem;return t.parents("body").length||u("parent"!==e.appendTo?e.appendTo:this.currentItem[0].parentNode)[0].appendChild(t[0]),t[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),t[0].style.width&&!e.forceHelperSize||t.width(this.currentItem.width()),t[0].style.height&&!e.forceHelperSize||t.height(this.currentItem.height()),t},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),"left"in(t=u.isArray(t)?{left:+t[0],top:+t[1]||0}:t)&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&u.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),{top:(t=this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&u.ui.ie?{top:0,left:0}:t).top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,i=this.options;"parent"===i.containment&&(i.containment=this.helper[0].parentNode),"document"!==i.containment&&"window"!==i.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,u("document"===i.containment?document:window).width()-this.helperProportions.width-this.margins.left,(u("document"===i.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(i.containment)||(t=u(i.containment)[0],e=u(i.containment).offset(),i="hidden"!==u(t).css("overflow"),this.containment=[e.left+(parseInt(u(t).css("borderLeftWidth"),10)||0)+(parseInt(u(t).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt(u(t).css("borderTopWidth"),10)||0)+(parseInt(u(t).css("paddingTop"),10)||0)-this.margins.top,e.left+(i?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(u(t).css("borderLeftWidth"),10)||0)-(parseInt(u(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(i?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(u(t).css("borderTopWidth"),10)||0)-(parseInt(u(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,e){e=e||this.position;var i="absolute"===t?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&u.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,t=/(html|body)/i.test(s[0].tagName);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():t?0:s.scrollTop())*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():t?0:s.scrollLeft())*i}},_generatePosition:function(t){var e=this.options,i=t.pageX,s=t.pageY,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&u.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,r=/(html|body)/i.test(o[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(i=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(s=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(i=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(s=this.containment[3]+this.offset.click.top)),e.grid&&(t=this.originalPageY+Math.round((s-this.originalPageY)/e.grid[1])*e.grid[1],s=!this.containment||t-this.offset.click.top>=this.containment[1]&&t-this.offset.click.top<=this.containment[3]?t:t-this.offset.click.top>=this.containment[1]?t-e.grid[1]:t+e.grid[1],t=this.originalPageX+Math.round((i-this.originalPageX)/e.grid[0])*e.grid[0],i=!this.containment||t-this.offset.click.left>=this.containment[0]&&t-this.offset.click.left<=this.containment[2]?t:t-this.offset.click.left>=this.containment[0]?t-e.grid[0]:t+e.grid[0])),{top:s-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():r?0:o.scrollTop()),left:i-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():r?0:o.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var o=this.counter;this._delay(function(){o===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)"auto"!==this._storedCSS[i]&&"static"!==this._storedCSS[i]||(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();function o(e,i,s){return function(t){s._trigger(e,t,i._uiHash(i))}}for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;0<=i;i--)e||s.push(o("deactivate",this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(o("out",this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!e){for(this._trigger("beforeStop",t,this._uiHash()),i=0;i<s.length;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1}if(e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!e){for(i=0;i<s.length;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return!(this.fromOutside=!1)},_trigger:function(){!1===u.Widget.prototype._trigger.apply(this,arguments)&&this.cancel()},_uiHash:function(t){var e=t||this;return{helper:e.helper,placeholder:e.placeholder||u([]),position:e.position,originalPosition:e.originalPosition,offset:e.positionAbs,item:e.currentItem,sender:t?t.element:null}}})}(jQuery);!function(h){var s=0,l={},u={};l.height=l.paddingTop=l.paddingBottom=l.borderTopWidth=l.borderBottomWidth="hide",u.height=u.paddingTop=u.paddingBottom=u.borderTopWidth=u.borderBottomWidth="show",h.widget("ui.accordion",{version:"1.10.4",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var e=this.options;this.prevShow=this.prevHide=h(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),e.collapsible||!1!==e.active&&null!=e.active||(e.active=0),this._processPanels(),e.active<0&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():h(),content:this.active.length?this.active.next():h()}},_createIcons:function(){var e=this.options.icons;e&&(h("<span>").addClass("ui-accordion-header-icon ui-icon "+e.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){"active"!==e?("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||!1!==this.options.active||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)):this._activate(t)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var t=h.ui.keyCode,i=this.headers.length,a=this.headers.index(e.target),s=!1;switch(e.keyCode){case t.RIGHT:case t.DOWN:s=this.headers[(a+1)%i];break;case t.LEFT:case t.UP:s=this.headers[(a-1+i)%i];break;case t.SPACE:case t.ENTER:this._eventHandler(e);break;case t.HOME:s=this.headers[0];break;case t.END:s=this.headers[i-1]}s&&(h(e.target).attr("tabIndex",-1),h(s).attr("tabIndex",0),s.focus(),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===h.ui.keyCode.UP&&e.ctrlKey&&h(e.currentTarget).prev().focus()},refresh:function(){var e=this.options;this._processPanels(),!1===e.active&&!0===e.collapsible||!this.headers.length?(e.active=!1,this.active=h()):!1===e.active?this._activate(0):this.active.length&&!h.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=h()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()},_refresh:function(){var i,e=this.options,t=e.heightStyle,a=this.element.parent(),n=this.accordionId="ui-accordion-"+(this.element.attr("id")||++s);this.active=this._findActive(e.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(e){var t=h(this),i=t.attr("id"),a=t.next(),s=a.attr("id");i||t.attr("id",i=n+"-header-"+e),s||a.attr("id",s=n+"-panel-"+e),t.attr("aria-controls",s),a.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(e.event),"fill"===t?(i=a.height(),this.element.siblings(":visible").each(function(){var e=h(this),t=e.css("position");"absolute"!==t&&"fixed"!==t&&(i-=e.outerHeight(!0))}),this.headers.each(function(){i-=h(this).outerHeight(!0)}),this.headers.next().each(function(){h(this).height(Math.max(0,i-h(this).innerHeight()+h(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.headers.next().each(function(){i=Math.max(i,h(this).css("height","").height())}).height(i))},_activate:function(e){e=this._findActive(e)[0];e!==this.active[0]&&(e=e||this.active[0],this._eventHandler({target:e,currentTarget:e,preventDefault:h.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):h()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&h.each(e.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var t=this.options,i=this.active,a=h(e.currentTarget),s=a[0]===i[0],n=s&&t.collapsible,r=n?h():a.next(),o=i.next(),r={oldHeader:i,oldPanel:o,newHeader:n?h():a,newPanel:r};e.preventDefault(),s&&!t.collapsible||!1===this._trigger("beforeActivate",e,r)||(t.active=!n&&this.headers.index(a),this.active=s?h():a,this._toggle(r),i.removeClass("ui-accordion-header-active ui-state-active"),t.icons&&i.children(".ui-accordion-header-icon").removeClass(t.icons.activeHeader).addClass(t.icons.header),s||(a.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),t.icons&&a.children(".ui-accordion-header-icon").removeClass(t.icons.header).addClass(t.icons.activeHeader),a.next().addClass("ui-accordion-content-active")))},_toggle:function(e){var t=e.newPanel,i=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=t,this.prevHide=i,this.options.animate?this._animate(t,i,e):(i.hide(),t.show(),this._toggleComplete(e)),i.attr({"aria-hidden":"true"}),i.prev().attr("aria-selected","false"),t.length&&i.length?i.prev().attr({tabIndex:-1,"aria-expanded":"false"}):t.length&&this.headers.filter(function(){return 0===h(this).attr("tabIndex")}).attr("tabIndex",-1),t.attr("aria-hidden","false").prev().attr({"aria-selected":"true",tabIndex:0,"aria-expanded":"true"})},_animate:function(e,i,t){var a,s,n,r=this,o=0,h=e.length&&(!i.length||e.index()<i.index()),c=this.options.animate||{},d=h&&c.down||c,h=function(){r._toggleComplete(t)};return s=(s="string"==typeof d?d:s)||d.easing||c.easing,n=(n="number"==typeof d?d:n)||d.duration||c.duration,i.length?e.length?(a=e.show().outerHeight(),i.animate(l,{duration:n,easing:s,step:function(e,t){t.now=Math.round(e)}}),void e.hide().animate(u,{duration:n,easing:s,complete:h,step:function(e,t){t.now=Math.round(e),"height"!==t.prop?o+=t.now:"content"!==r.options.heightStyle&&(t.now=Math.round(a-i.outerHeight()-o),o=0)}})):i.animate(l,n,s,h):e.animate(u,n,s,h)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}})}(jQuery);!function(o){function n(){var t=o(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)}function a(t){var e=t.name,i=t.form,s=o([]);return e&&(e=e.replace(/'/g,"\\'"),s=i?o(i).find("[name='"+e+"']"):o("[name='"+e+"']",t.ownerDocument).filter(function(){return!this.form})),s}var u,r="ui-button ui-widget ui-state-default ui-corner-all",l="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only";o.widget("ui.button",{version:"1.10.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,n),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var e=this,i=this.options,t="checkbox"===this.type||"radio"===this.type,s=t?"":"ui-state-active";null===i.label&&(i.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(r).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){i.disabled||this===u&&o(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){i.disabled||o(this).removeClass(s)}).bind("click"+this.eventNamespace,function(t){i.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),t&&this.element.bind("change"+this.eventNamespace,function(){e.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return!1}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return!1;o(this).addClass("ui-state-active"),e.buttonElement.attr("aria-pressed","true");var t=e.element[0];a(t).not(t).map(function(){return o(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return!i.disabled&&(o(this).addClass("ui-state-active"),u=this,void e.document.one("mouseup",function(){u=null}))}).bind("mouseup"+this.eventNamespace,function(){return!i.disabled&&void o(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(t){return!i.disabled&&void(t.keyCode!==o.ui.keyCode.SPACE&&t.keyCode!==o.ui.keyCode.ENTER||o(this).addClass("ui-state-active"))}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){o(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===o.ui.keyCode.SPACE&&o(this).click()})),this._setOption("disabled",i.disabled),this._resetButton()},_determineButtonType:function(){var t,e;this.element.is("[type=checkbox]")?this.type="checkbox":this.element.is("[type=radio]")?this.type="radio":this.element.is("input")?this.type="input":this.type="button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=(t.length?t:this.element).siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),(e=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",e)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(r+" ui-state-active "+l).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){if(this._super(t,e),"disabled"===t)return this.element.prop("disabled",!!e),void(e&&this.buttonElement.removeClass("ui-state-focus"));this._resetButton()},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?a(this.element[0]).each(function(){o(this).is(":checked")?o(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):o(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){var t,e,i,s,n;"input"!==this.type?(t=this.buttonElement.removeClass(l),e=o("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),s=(i=this.options.icons).primary&&i.secondary,n=[],i.primary||i.secondary?(this.options.text&&n.push("ui-button-text-icon"+(s?"s":i.primary?"-primary":"-secondary")),i.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+i.primary+"'></span>"),i.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+i.secondary+"'></span>"),this.options.text||(n.push(s?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",o.trim(e)))):n.push("ui-button-text-only"),t.addClass(n.join(" "))):this.options.label&&this.element.val(this.options.label)}}),o.widget("ui.buttonset",{version:"1.10.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var t="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return o(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return o(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})}(jQuery);!function(n){var a={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},l={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};n.widget("ui.dialog",{version:"1.10.4",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(i){var t=n(this).css(i).offset().top;t<0&&n(this).css("top",i.top-t)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&n.fn.draggable&&this._makeDraggable(),this.options.resizable&&n.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var i=this.options.appendTo;return i&&(i.jquery||i.nodeType)?n(i):this.document.find(i||"body").eq(0)},_destroy:function(){var i,t=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),(i=t.parent.children().eq(t.index)).length&&i[0]!==this.element[0]?i.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:n.noop,enable:n.noop,close:function(i){var t,e=this;if(this._isOpen&&!1!==this._trigger("beforeClose",i)){if(this._isOpen=!1,this._destroyOverlay(),!this.opener.filter(":focusable").focus().length)try{(t=this.document[0].activeElement)&&"body"!==t.nodeName.toLowerCase()&&n(t).blur()}catch(i){}this._hide(this.uiDialog,this.options.hide,function(){e._trigger("close",i)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(i,t){var e=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return e&&!t&&this._trigger("focus",i),e},open:function(){var i=this;this._isOpen?this._moveToTop()&&this._focusTabbable():(this._isOpen=!0,this.opener=n(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){i._focusTabbable(),i._trigger("focus")}),this._trigger("open"))},_focusTabbable:function(){var i=this.element.find("[autofocus]");(i=!(i=!(i=!(i=!i.length?this.element.find(":tabbable"):i).length?this.uiDialogButtonPane.find(":tabbable"):i).length?this.uiDialogTitlebarClose.filter(":tabbable"):i).length?this.uiDialog:i).eq(0).focus()},_keepFocus:function(i){function t(){var i=this.document[0].activeElement;this.uiDialog[0]===i||n.contains(this.uiDialog[0],i)||this._focusTabbable()}i.preventDefault(),t.call(this),this._delay(t)},_createWrapper:function(){this.uiDialog=n("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(i){if(this.options.closeOnEscape&&!i.isDefaultPrevented()&&i.keyCode&&i.keyCode===n.ui.keyCode.ESCAPE)return i.preventDefault(),void this.close(i);var t,e;i.keyCode===n.ui.keyCode.TAB&&(t=(e=this.uiDialog.find(":tabbable")).filter(":first"),e=e.filter(":last"),i.target!==e[0]&&i.target!==this.uiDialog[0]||i.shiftKey?i.target!==t[0]&&i.target!==this.uiDialog[0]||!i.shiftKey||(e.focus(1),i.preventDefault()):(t.focus(1),i.preventDefault()))},mousedown:function(i){this._moveToTop(i)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var i;this.uiDialogTitlebar=n("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(i){n(i.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=n("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(i){i.preventDefault(),this.close(i)}}),i=n("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(i),this.uiDialog.attr({"aria-labelledby":i.attr("id")})},_title:function(i){this.options.title||i.html("&#160;"),i.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=n("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=n("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var o=this,i=this.options.buttons;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),n.isEmptyObject(i)||n.isArray(i)&&!i.length?this.uiDialog.removeClass("ui-dialog-buttons"):(n.each(i,function(i,t){var e;t=n.isFunction(t)?{click:t,text:i}:t,t=n.extend({type:"button"},t),e=t.click,t.click=function(){e.apply(o.element[0],arguments)},i={icons:t.icons,text:t.showText},delete t.icons,delete t.showText,n("<button></button>",t).button(i).appendTo(o.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){var e=this,o=this.options;function s(i){return{position:i.position,offset:i.offset}}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(i,t){n(this).addClass("ui-dialog-dragging"),e._blockFrames(),e._trigger("dragStart",i,s(t))},drag:function(i,t){e._trigger("drag",i,s(t))},stop:function(i,t){o.position=[t.position.left-e.document.scrollLeft(),t.position.top-e.document.scrollTop()],n(this).removeClass("ui-dialog-dragging"),e._unblockFrames(),e._trigger("dragStop",i,s(t))}})},_makeResizable:function(){var e=this,o=this.options,i=o.resizable,t=this.uiDialog.css("position"),i="string"==typeof i?i:"n,e,s,w,se,sw,ne,nw";function s(i){return{originalPosition:i.originalPosition,originalSize:i.originalSize,position:i.position,size:i.size}}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:o.maxWidth,maxHeight:o.maxHeight,minWidth:o.minWidth,minHeight:this._minHeight(),handles:i,start:function(i,t){n(this).addClass("ui-dialog-resizing"),e._blockFrames(),e._trigger("resizeStart",i,s(t))},resize:function(i,t){e._trigger("resize",i,s(t))},stop:function(i,t){o.height=n(this).height(),o.width=n(this).width(),n(this).removeClass("ui-dialog-resizing"),e._unblockFrames(),e._trigger("resizeStop",i,s(t))}}).css("position",t)},_minHeight:function(){var i=this.options;return"auto"===i.height?i.minHeight:Math.min(i.minHeight,i.height)},_position:function(){var i=this.uiDialog.is(":visible");i||this.uiDialog.show(),this.uiDialog.position(this.options.position),i||this.uiDialog.hide()},_setOptions:function(i){var e=this,o=!1,s={};n.each(i,function(i,t){e._setOption(i,t),i in a&&(o=!0),i in l&&(s[i]=t)}),o&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(i,t){var e,o=this.uiDialog;"dialogClass"===i&&o.removeClass(this.options.dialogClass).addClass(t),"disabled"!==i&&(this._super(i,t),"appendTo"===i&&this.uiDialog.appendTo(this._appendTo()),"buttons"===i&&this._createButtons(),"closeText"===i&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===i&&((e=o.is(":data(ui-draggable)"))&&!t&&o.draggable("destroy"),!e&&t&&this._makeDraggable()),"position"===i&&this._position(),"resizable"===i&&((e=o.is(":data(ui-resizable)"))&&!t&&o.resizable("destroy"),e&&"string"==typeof t&&o.resizable("option","handles",t),e||!1===t||this._makeResizable()),"title"===i&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var i,t,e,o=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),o.minWidth>o.width&&(o.width=o.minWidth),i=this.uiDialog.css({height:"auto",width:o.width}).outerHeight(),t=Math.max(0,o.minHeight-i),e="number"==typeof o.maxHeight?Math.max(0,o.maxHeight-i):"none","auto"===o.height?this.element.css({minHeight:t,maxHeight:e,height:"auto"}):this.element.height(Math.max(0,o.height-i)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var i=n(this);return n("<div>").css({position:"absolute",width:i.outerWidth(),height:i.outerHeight()}).appendTo(i.parent()).offset(i.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(i){return!!n(i.target).closest(".ui-dialog").length||!!n(i.target).closest(".ui-datepicker").length},_createOverlay:function(){var t,e;this.options.modal&&(e=(t=this).widgetFullName,n.ui.dialog.overlayInstances||this._delay(function(){n.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(i){t._allowInteraction(i)||(i.preventDefault(),n(".ui-dialog:visible:last .ui-dialog-content").data(e)._focusTabbable())})}),this.overlay=n("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),n.ui.dialog.overlayInstances++)},_destroyOverlay:function(){this.options.modal&&this.overlay&&(n.ui.dialog.overlayInstances--,n.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),n.ui.dialog.overlayInstances=0,!1!==n.uiBackCompat&&n.widget("ui.dialog",n.ui.dialog,{_position:function(){var i=this.options.position,e=[],o=[0,0],i=i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(1===(e=i.split?i.split(" "):[i[0],i[1]]).length&&(e[1]=e[0]),n.each(["left","top"],function(i,t){+e[i]===e[i]&&(o[i]=e[i],e[i]=t)}),i={my:e[0]+(o[0]<0?o[0]:"+"+o[0])+" "+e[1]+(o[1]<0?o[1]:"+"+o[1]),at:e.join(" ")}),n.extend({},n.ui.dialog.prototype.options.position,i)):n.ui.dialog.prototype.options.position,t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(i),t||this.uiDialog.hide()}})}(jQuery);!function(t,i){t.widget("ui.progressbar",{version:"1.10.4",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){if(e===i)return this.options.value;this.options.value=this._constrainedValue(e),this._refreshValue()},_constrainedValue:function(e){return e===i&&(e=this.options.value),this.indeterminate=!1===e,"number"!=typeof e&&(e=0),!this.indeterminate&&Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var i=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(i),this._refreshValue()},_setOption:function(e,i){"max"===e&&(i=Math.max(this.min,i)),this._super(e,i)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}})}(jQuery);!function(r){r.widget("ui.slider",r.ui.mouse,{version:"1.10.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,t=this.options,i=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),s=[],a=t.values&&t.values.length||1;for(i.length>a&&(i.slice(a).remove(),i=i.slice(0,a)),e=i.length;e<a;e++)s.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");this.handles=i.add(r(s.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){r(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,t="";e.range?(!0===e.range&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:r.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=r("<div></div>").appendTo(this.element),t="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(t+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){var e=this.handles.add(this.range).filter("a");this._off(e),this._on(e,this._handleEvents),this._hoverable(e),this._focusable(e)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,a,n,t,l,h=this,u=this.options;return!u.disabled&&(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),l={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(l),s=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var t=Math.abs(i-h.values(e));(t<s||s===t&&(e===h._lastChangedValue||h.values(e)===u.min))&&(s=t,a=r(this),n=e)}),!1!==this._start(e,n)&&(this._mouseSliding=!0,this._handleIndex=n,a.addClass("ui-state-active").focus(),t=a.offset(),l=!r(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-t.left-a.width()/2,top:e.pageY-t.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,n,i),this._animateOff=!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},t=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,t),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,e="horizontal"===this.orientation?(t=this.elementSize.width,e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),e=e/t;return(e=1<e?1:e)<0&&(e=0),"vertical"===this.orientation&&(e=1-e),t=this._valueMax()-this._valueMin(),t=this._valueMin()+e*t,this._trimAlignValue(t)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),(i=2===this.options.values.length&&!0===this.options.range&&(0===t&&s<i||1===t&&i<s)?s:i)!==this.values(t)&&((a=this.values())[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:a}),s=this.values(t?0:1),!1!==a&&this.values(t,i))):i!==this.value()&&!1!==(a=this._trigger("slide",e,{handle:this.handles[t],value:i}))&&this.value(i)},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){var i;this._keySliding||this._mouseSliding||(i={handle:this.handles[t],value:this.value()},this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i))},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),void this._change(null,0)):this._value()},values:function(e,t){var i,s,a;if(1<arguments.length)return this.options.values[e]=this._trimAlignValue(t),this._refreshValue(),void this._change(null,e);if(!arguments.length)return this._values();if(!r.isArray(e))return this.options.values&&this.options.values.length?this._values(e):this.value();for(i=this.options.values,s=e,a=0;a<i.length;a+=1)i[a]=this._trimAlignValue(s[a]),this._change(null,a);this._refreshValue()},_setOption:function(e,t){var i,s=0;switch("range"===e&&!0===this.options.range&&("min"===t?(this.options.value=this._values(0),this.options.values=null):"max"===t&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),r.isArray(this.options.values)&&(s=this.options.values.length),r.Widget.prototype._setOption.apply(this,arguments),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),i=0;i<s;i+=1)this._change(null,i);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;s<i.length;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(e<=this._valueMin())return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=0<this.options.step?this.options.step:1,i=(e-this._valueMin())%t,e=e-i;return 2*Math.abs(i)>=t&&(e+=0<i?t:-t),parseFloat(e.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,i,e,s,a,n=this.options.range,l=this.options,h=this,u=!this._animateOff&&l.animate,o={};this.options.values&&this.options.values.length?this.handles.each(function(e){i=(h.values(e)-h._valueMin())/(h._valueMax()-h._valueMin())*100,o["horizontal"===h.orientation?"left":"bottom"]=i+"%",r(this).stop(1,1)[u?"animate":"css"](o,l.animate),!0===h.options.range&&("horizontal"===h.orientation?(0===e&&h.range.stop(1,1)[u?"animate":"css"]({left:i+"%"},l.animate),1===e&&h.range[u?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:l.animate})):(0===e&&h.range.stop(1,1)[u?"animate":"css"]({bottom:i+"%"},l.animate),1===e&&h.range[u?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:l.animate}))),t=i}):(e=this.value(),s=this._valueMin(),a=this._valueMax(),i=a!==s?(e-s)/(a-s)*100:0,o["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[u?"animate":"css"](o,l.animate),"min"===n&&"horizontal"===this.orientation&&this.range.stop(1,1)[u?"animate":"css"]({width:i+"%"},l.animate),"max"===n&&"horizontal"===this.orientation&&this.range[u?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:l.animate}),"min"===n&&"vertical"===this.orientation&&this.range.stop(1,1)[u?"animate":"css"]({height:i+"%"},l.animate),"max"===n&&"vertical"===this.orientation&&this.range[u?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:l.animate}))},_handleEvents:{keydown:function(e){var t,i,s,a=r(e.target).data("ui-slider-handle-index");switch(e.keyCode){case r.ui.keyCode.HOME:case r.ui.keyCode.END:case r.ui.keyCode.PAGE_UP:case r.ui.keyCode.PAGE_DOWN:case r.ui.keyCode.UP:case r.ui.keyCode.RIGHT:case r.ui.keyCode.DOWN:case r.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,r(e.target).addClass("ui-state-active"),!1===this._start(e,a)))return}switch(s=this.options.step,t=i=this.options.values&&this.options.values.length?this.values(a):this.value(),e.keyCode){case r.ui.keyCode.HOME:i=this._valueMin();break;case r.ui.keyCode.END:i=this._valueMax();break;case r.ui.keyCode.PAGE_UP:i=this._trimAlignValue(t+(this._valueMax()-this._valueMin())/5);break;case r.ui.keyCode.PAGE_DOWN:i=this._trimAlignValue(t-(this._valueMax()-this._valueMin())/5);break;case r.ui.keyCode.UP:case r.ui.keyCode.RIGHT:if(t===this._valueMax())return;i=this._trimAlignValue(t+s);break;case r.ui.keyCode.DOWN:case r.ui.keyCode.LEFT:if(t===this._valueMin())return;i=this._trimAlignValue(t-s)}this._slide(e,a,i)},click:function(e){e.preventDefault()},keyup:function(e){var t=r(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,t),this._change(e,t),r(e.target).removeClass("ui-state-active"))}}})}(jQuery);!function(o){function i(i){return function(){var t=this.element.val();i.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}o.widget("ui.spinner",{version:"1.10.4",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var n={},s=this.element;return o.each(["min","max","step"],function(t,i){var e=s.attr(i);void 0!==e&&e.length&&(n[i]=e)}),n},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){this.cancelBlur?delete this.cancelBlur:(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t))},mousewheel:function(t,i){if(i){if(!this.spinning&&!this._start(t))return!1;this._spin((0<i?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(t){var i;function e(){this.element[0]===this.document[0].activeElement||(this.element.focus(),this.previous=i,this._delay(function(){this.previous=i}))}i=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),e.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,e.call(this)}),!1!==this._start(t)&&this._repeat(null,o(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){if(o(t.currentTarget).hasClass("ui-state-active"))return!1!==this._start(t)&&void this._repeat(null,o(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var t=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=t.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*t.height())&&0<t.height()&&t.height(t.height()),this.options.disabled&&this.disable()},_keydown:function(t){var i=this.options,e=o.ui.keyCode;switch(t.keyCode){case e.UP:return this._repeat(null,1,t),!0;case e.DOWN:return this._repeat(null,-1,t),!0;case e.PAGE_UP:return this._repeat(null,i.page,t),!0;case e.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon "+this.options.icons.down+"'>&#9660;</span></a>"},_start:function(t){return!(!this.spinning&&!1===this._trigger("start",t))&&(this.counter||(this.counter=1),this.spinning=!0)},_repeat:function(t,i,e){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,i,e)},t),this._spin(i*this.options.step,e)},_spin:function(t,i){var e=this.value()||0;this.counter||(this.counter=1),e=this._adjustValue(e+t*this._increment(this.counter)),this.spinning&&!1===this._trigger("spin",i,{value:e})||(this._value(e),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?o.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return t=null!==this.options.min?Math.max(t,this._precisionOf(this.options.min)):t},_precisionOf:function(t){var i=t.toString(),t=i.indexOf(".");return-1===t?0:i.length-t-1},_adjustValue:function(t){var i=this.options,e=null!==i.min?i.min:0,n=t-e;return t=e+Math.round(n/i.step)*i.step,t=parseFloat(t.toFixed(this._precision())),null!==i.max&&t>i.max?i.max:null!==i.min&&t<i.min?i.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,i){if("culture"===t||"numberFormat"===t){var e=this._parse(this.element.val());return this.options[t]=i,void this.element.val(this._format(e))}"max"!==t&&"min"!==t&&"step"!==t||"string"==typeof i&&(i=this._parse(i)),"icons"===t&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(i.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(i.down)),this._super(t,i),"disabled"===t&&(i?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:i(function(t){this._super(t),this._value(this.element.val())}),_parse:function(t){return""===(t="string"==typeof t&&""!==t?window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t:t)||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(t,i){var e;""!==t&&null!==(e=this._parse(t))&&(i||(e=this._adjustValue(e)),t=this._format(e)),this.element.val(t),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:i(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:i(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:i(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:i(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){if(!arguments.length)return this._parse(this.element.val());i(this._value).call(this,t)},widget:function(){return this.uiSpinner}})}(jQuery);!function(s,a){var u,l,c,d,t,p,h,g,i,e,b,f,o,m,y,v,n,r,x,C,w="ui-effects-";function _(t,e,n){var r=g[e.type]||{};return null==t?n||!e.def?null:e.def:(t=r.floor?~~t:parseFloat(t),isNaN(t)?e.def:r.mod?(t+r.mod)%r.mod:t<0?0:r.max<t?r.max:t)}function k(r){var o=p(),a=o._rgba=[];return r=r.toLowerCase(),b(t,function(t,e){var n=e.re.exec(r),n=n&&e.parse(n),e=e.space||"rgba";if(n)return n=o[e](n),o[h[e].cache]=n[h[e].cache],a=o._rgba=n._rgba,!1}),a.length?("0,0,0,0"===a.join()&&u.extend(a,c.transparent),o):c[r]}function M(t,e,n){return 6*(n=(n+1)%1)<1?t+(e-t)*n*6:2*n<1?e:3*n<2?t+(e-t)*(2/3-n)*6:t}function j(t){var e,n,r=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,o={};if(r&&r.length&&r[0]&&r[r[0]])for(n=r.length;n--;)"string"==typeof r[e=r[n]]&&(o[s.camelCase(e)]=r[e]);else for(e in r)"string"==typeof r[e]&&(o[e]=r[e]);return o}function S(t,e,n,r){return t={effect:t=s.isPlainObject(t)?(e=t).effect:t},s.isFunction(e=null==e?{}:e)&&(r=e,n=null,e={}),"number"!=typeof e&&!s.fx.speeds[e]||(r=n,n=e,e={}),s.isFunction(n)&&(r=n,n=null),e&&s.extend(t,e),n=n||e.duration,t.duration=s.fx.off?0:"number"==typeof n?n:n in s.fx.speeds?s.fx.speeds[n]:s.fx.speeds._default,t.complete=r||e.complete,t}function I(t){return!t||"number"==typeof t||s.fx.speeds[t]||("string"==typeof t&&!s.effects.effect[t]||(s.isFunction(t)||"object"==typeof t&&!t.effect))}s.effects={effect:{}},u=jQuery,d=/^([\-+])=\s*(\d+\.?\d*)/,t=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],p=u.Color=function(t,e,n,r){return new u.Color.fn.parse(t,e,n,r)},h={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},g={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},i=p.support={},e=u("<p>")[0],b=u.each,e.style.cssText="background-color:rgba(1,1,1,.5)",i.rgba=-1<e.style.backgroundColor.indexOf("rgba"),b(h,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),(p.fn=u.extend(p.prototype,{parse:function(o,t,e,n){if(o===l)return this._rgba=[null,null,null,null],this;(o.jquery||o.nodeType)&&(o=u(o).css(t),t=l);var a=this,r=u.type(o),i=this._rgba=[];return t!==l&&(o=[o,t,e,n],r="array"),"string"===r?this.parse(k(o)||c._default):"array"===r?(b(h.rgba.props,function(t,e){i[e.idx]=_(o[e.idx],e)}),this):"object"===r?(b(h,o instanceof p?function(t,e){o[e.cache]&&(a[e.cache]=o[e.cache].slice())}:function(t,n){var r=n.cache;b(n.props,function(t,e){if(!a[r]&&n.to){if("alpha"===t||null==o[t])return;a[r]=n.to(a._rgba)}a[r][e.idx]=_(o[t],e,!0)}),a[r]&&u.inArray(null,a[r].slice(0,3))<0&&(a[r][3]=1,n.from&&(a._rgba=n.from(a[r])))}),this):void 0},is:function(t){var o=p(t),a=!0,i=this;return b(h,function(t,e){var n,r=o[e.cache];return r&&(n=i[e.cache]||e.to&&e.to(i._rgba)||[],b(e.props,function(t,e){if(null!=r[e.idx])return a=r[e.idx]===n[e.idx]})),a}),a},_space:function(){var n=[],r=this;return b(h,function(t,e){r[e.cache]&&n.push(t)}),n.pop()},transition:function(t,i){var e=(f=p(t))._space(),n=h[e],t=0===this.alpha()?p("transparent"):this,s=t[n.cache]||n.to(t._rgba),c=s.slice(),f=f[n.cache];return b(n.props,function(t,e){var n=e.idx,r=s[n],o=f[n],a=g[e.type]||{};null!==o&&(null===r?c[n]=o:(a.mod&&(o-r>a.mod/2?r+=a.mod:r-o>a.mod/2&&(r-=a.mod)),c[n]=_((o-r)*i+r,e)))}),this[e](c)},blend:function(t){if(1===this._rgba[3])return this;var e=this._rgba.slice(),n=e.pop(),r=p(t)._rgba;return p(u.map(e,function(t,e){return(1-n)*r[e]+n*t}))},toRgbaString:function(){var t="rgba(",e=u.map(this._rgba,function(t,e){return null==t?2<e?1:0:t});return 1===e[3]&&(e.pop(),t="rgb("),t+e.join()+")"},toHslaString:function(){var t="hsla(",e=u.map(this.hsla(),function(t,e){return null==t&&(t=2<e?1:0),t=e&&e<3?Math.round(100*t)+"%":t});return 1===e[3]&&(e.pop(),t="hsl("),t+e.join()+")"},toHexString:function(t){var e=this._rgba.slice(),n=e.pop();return t&&e.push(~~(255*n)),"#"+u.map(e,function(t){return 1===(t=(t||0).toString(16)).length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}})).parse.prototype=p.fn,h.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/255,n=t[1]/255,r=t[2]/255,o=t[3],a=Math.max(e,n,r),i=Math.min(e,n,r),s=a-i,c=a+i,t=.5*c,n=i===a?0:e===a?60*(n-r)/s+360:n===a?60*(r-e)/s+120:60*(e-n)/s+240,c=0==s?0:t<=.5?s/c:s/(2-c);return[Math.round(n)%360,c,t,null==o?1:o]},h.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],r=t[2],t=t[3],n=r<=.5?r*(1+n):r+n-r*n,r=2*r-n;return[Math.round(255*M(r,n,e+1/3)),Math.round(255*M(r,n,e)),Math.round(255*M(r,n,e-1/3)),t]},b(h,function(c,t){var a=t.props,i=t.cache,s=t.to,f=t.from;p.fn[c]=function(t){if(s&&!this[i]&&(this[i]=s(this._rgba)),t===l)return this[i].slice();var e,n=u.type(t),r="array"===n||"object"===n?t:arguments,o=this[i].slice();return b(a,function(t,e){t=r["object"===n?t:e.idx];null==t&&(t=o[e.idx]),o[e.idx]=_(t,e)}),f?((e=p(f(o)))[i]=o,e):p(o)},b(a,function(i,s){p.fn[i]||(p.fn[i]=function(t){var e,n=u.type(t),r="alpha"===i?this._hsla?"hsla":"rgba":c,o=this[r](),a=o[s.idx];return"undefined"===n?a:("function"===n&&(t=t.call(this,a),n=u.type(t)),null==t&&s.empty?this:("string"===n&&(e=d.exec(t))&&(t=a+parseFloat(e[2])*("+"===e[1]?1:-1)),o[s.idx]=t,this[r](o)))})})}),(p.hook=function(t){t=t.split(" ");b(t,function(t,a){u.cssHooks[a]={set:function(t,e){var n,r,o="";if("transparent"!==e&&("string"!==u.type(e)||(n=k(e)))){if(e=p(n||e),!i.rgba&&1!==e._rgba[3]){for(r="backgroundColor"===a?t.parentNode:t;(""===o||"transparent"===o)&&r&&r.style;)try{o=u.css(r,"backgroundColor"),r=r.parentNode}catch(t){}e=e.blend(o&&"transparent"!==o?o:"_default")}e=e.toRgbaString()}try{t.style[a]=e}catch(t){}}},u.fx.step[a]=function(t){t.colorInit||(t.start=p(t.elem,a),t.end=p(t.end),t.colorInit=!0),u.cssHooks[a].set(t.elem,t.start.transition(t.end,t.pos))}})})("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),u.cssHooks.borderColor={expand:function(n){var r={};return b(["Top","Right","Bottom","Left"],function(t,e){r["border"+e+"Color"]=n}),r}},c=u.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"},y=["add","remove","toggle"],v={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1},s.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,e){s.fx.step[e]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,e,t.end),t.setAttr=!0)}}),s.fn.addBack||(s.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),s.effects.animateClass=function(o,t,e,n){var a=s.speed(t,e,n);return this.queue(function(){var n=s(this),t=n.attr("class")||"",e=(e=a.children?n.find("*").addBack():n).map(function(){return{el:s(this),start:j(this)}}),r=function(){s.each(y,function(t,e){o[e]&&n[e+"Class"](o[e])})};r(),e=e.map(function(){return this.end=j(this.el[0]),this.diff=function(t,e){var n,r,o={};for(n in e)r=e[n],t[n]!==r&&(v[n]||!s.fx.step[n]&&isNaN(parseFloat(r))||(o[n]=r));return o}(this.start,this.end),this}),n.attr("class",t),e=e.map(function(){var t=this,e=s.Deferred(),n=s.extend({},a,{queue:!1,complete:function(){e.resolve(t)}});return this.el.animate(this.diff,n),e.promise()}),s.when.apply(s,e.get()).done(function(){r(),s.each(arguments,function(){var e=this.el;s.each(this.diff,function(t){e.css(t,"")})}),a.complete.call(n[0])})})},s.fn.extend({addClass:(m=s.fn.addClass,function(t,e,n,r){return e?s.effects.animateClass.call(this,{add:t},e,n,r):m.apply(this,arguments)}),removeClass:(o=s.fn.removeClass,function(t,e,n,r){return 1<arguments.length?s.effects.animateClass.call(this,{remove:t},e,n,r):o.apply(this,arguments)}),toggleClass:(f=s.fn.toggleClass,function(t,e,n,r,o){return"boolean"==typeof e||e===a?n?s.effects.animateClass.call(this,e?{add:t}:{remove:t},n,r,o):f.apply(this,arguments):s.effects.animateClass.call(this,{toggle:t},e,n,r)}),switchClass:function(t,e,n,r,o){return s.effects.animateClass.call(this,{add:e,remove:t},n,r,o)}}),s.extend(s.effects,{version:"1.10.4",save:function(t,e){for(var n=0;n<e.length;n++)null!==e[n]&&t.data(w+e[n],t[0].style[e[n]])},restore:function(t,e){for(var n,r=0;r<e.length;r++)null!==e[r]&&((n=t.data(w+e[r]))===a&&(n=""),t.css(e[r],n))},setMode:function(t,e){return e="toggle"===e?t.is(":hidden")?"show":"hide":e},getBaseline:function(t,e){var n,r;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=t[1]/e.width}return{x:r,y:n}},createWrapper:function(n){if(n.parent().is(".ui-effects-wrapper"))return n.parent();var r={width:n.outerWidth(!0),height:n.outerHeight(!0),float:n.css("float")},t=s("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e={width:n.width(),height:n.height()},o=document.activeElement;try{o.id}catch(t){o=document.body}return n.wrap(t),n[0]!==o&&!s.contains(n[0],o)||s(o).focus(),t=n.parent(),"static"===n.css("position")?(t.css({position:"relative"}),n.css({position:"relative"})):(s.extend(r,{position:n.css("position"),zIndex:n.css("z-index")}),s.each(["top","left","bottom","right"],function(t,e){r[e]=n.css(e),isNaN(parseInt(r[e],10))&&(r[e]="auto")}),n.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),n.css(e),t.css(r).show()},removeWrapper:function(t){var e=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),t[0]!==e&&!s.contains(t[0],e)||s(e).focus()),t},setTransition:function(r,t,o,a){return a=a||{},s.each(t,function(t,e){var n=r.cssUnit(e);0<n[0]&&(a[e]=n[0]*o+n[1])}),a}}),s.fn.extend({effect:function(){var a=S.apply(this,arguments),t=a.mode,e=a.queue,i=s.effects.effect[a.effect];return s.fx.off||!i?t?this[t](a.duration,a.complete):this.each(function(){a.complete&&a.complete.call(this)}):!1===e?this.each(n):this.queue(e||"fx",n);function n(t){var e=s(this),n=a.complete,r=a.mode;function o(){s.isFunction(n)&&n.call(e[0]),s.isFunction(t)&&t()}(e.is(":hidden")?"hide"===r:"show"===r)?(e[r](),o()):i.call(e[0],a,o)}},show:(x=s.fn.show,function(t){if(I(t))return x.apply(this,arguments);var e=S.apply(this,arguments);return e.mode="show",this.effect.call(this,e)}),hide:(r=s.fn.hide,function(t){if(I(t))return r.apply(this,arguments);var e=S.apply(this,arguments);return e.mode="hide",this.effect.call(this,e)}),toggle:(n=s.fn.toggle,function(t){if(I(t)||"boolean"==typeof t)return n.apply(this,arguments);var e=S.apply(this,arguments);return e.mode="toggle",this.effect.call(this,e)}),cssUnit:function(t){var n=this.css(t),r=[];return s.each(["em","px","%","pt"],function(t,e){0<n.indexOf(e)&&(r=[parseFloat(n),e])}),r}}),C={},s.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,t){C[t]=function(t){return Math.pow(t,e+2)}}),s.extend(C,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),s.each(C,function(t,e){s.easing["easeIn"+t]=e,s.easing["easeOut"+t]=function(t){return 1-e(1-t)},s.easing["easeInOut"+t]=function(t){return t<.5?e(2*t)/2:1-e(-2*t+2)/2}})}(jQuery);!function(l){var v=/up|down|vertical/,w=/up|left|vertical|horizontal/;l.effects.effect.blind=function(e,t){var s,o,i=l(this),f=["position","top","bottom","left","right","height","width"],r=l.effects.setMode(i,e.mode||"hide"),c=e.direction||"up",a=v.test(c),n=a?"height":"width",p=a?"top":"left",h=w.test(c),d={},u="show"===r;i.parent().is(".ui-effects-wrapper")?l.effects.save(i.parent(),f):l.effects.save(i,f),i.show(),o=(s=l.effects.createWrapper(i).css({overflow:"hidden"}))[n](),c=parseFloat(s.css(p))||0,d[n]=u?o:0,h||(i.css(a?"bottom":"right",0).css(a?"top":"left","auto").css({position:"absolute"}),d[p]=u?c:o+c),u&&(s.css(n,0),h||s.css(p,c+o)),s.animate(d,{duration:e.duration,easing:e.easing,queue:!1,complete:function(){"hide"===r&&i.hide(),l.effects.restore(i,f),l.effects.removeWrapper(i),t()}})}}(jQuery);!function(g){g.effects.effect.bounce=function(e,t){var i,o,c,a=g(this),f=["position","top","bottom","left","right","height","width"],s=g.effects.setMode(a,e.mode||"effect"),p="hide"===s,n="show"===s,u=e.direction||"up",r=e.distance,h=e.times||5,s=2*h+(n||p?1:0),d=e.duration/s,m=e.easing,l="up"===u||"down"===u?"top":"left",y="up"===u||"left"===u,e=a.queue(),u=e.length;for((n||p)&&f.push("opacity"),g.effects.save(a,f),a.show(),g.effects.createWrapper(a),r=r||a["top"==l?"outerHeight":"outerWidth"]()/3,n&&((c={opacity:1})[l]=0,a.css("opacity",0).css(l,y?2*-r:2*r).animate(c,d,m)),p&&(r/=Math.pow(2,h-1)),i=(c={})[l]=0;i<h;i++)(o={})[l]=(y?"-=":"+=")+r,a.animate(o,d,m).animate(c,d,m),r=p?2*r:r/2;p&&((o={opacity:0})[l]=(y?"-=":"+=")+r,a.animate(o,d,m)),a.queue(function(){p&&a.hide(),g.effects.restore(a,f),g.effects.removeWrapper(a),t()}),1<u&&e.splice.apply(e,[1,0].concat(e.splice(u,1+s))),a.dequeue()}}(jQuery);!function(h){h.effects.effect.clip=function(e,t){var i,o=h(this),s=["position","top","bottom","left","right","height","width"],f="show"===h.effects.setMode(o,e.mode||"hide"),c="vertical"===(e.direction||"vertical"),r=c?"height":"width",a=c?"top":"left",n={};h.effects.save(o,s),o.show(),i=h.effects.createWrapper(o).css({overflow:"hidden"}),i=(c="IMG"===o[0].tagName?i:o)[r](),f&&(c.css(r,0),c.css(a,i/2)),n[r]=f?i:0,n[a]=f?0:i/2,c.animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){f||o.hide(),h.effects.restore(o,s),h.effects.removeWrapper(o),t()}})}}(jQuery);!function(a){a.effects.effect.drop=function(e,t){var o=a(this),i=["position","top","bottom","left","right","opacity","height","width"],s=a.effects.setMode(o,e.mode||"hide"),f="show"===s,c=e.direction||"left",p="up"===c||"down"===c?"top":"left",r="up"===c||"left"===c?"pos":"neg",n={opacity:f?1:0};a.effects.save(o,i),o.show(),a.effects.createWrapper(o),c=e.distance||o["top"==p?"outerHeight":"outerWidth"](!0)/2,f&&o.css("opacity",0).css(p,"pos"==r?-c:c),n[p]=(f?"pos"==r?"+=":"-=":"pos"==r?"-=":"+=")+c,o.animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===s&&o.hide(),a.effects.restore(o,i),a.effects.removeWrapper(o),t()}})}}(jQuery);!function(y){y.effects.effect.explode=function(e,i){var t,o,s,f,d,n,c=e.pieces?Math.round(Math.sqrt(e.pieces)):3,h=c,l=y(this),a="show"===y.effects.setMode(l,e.mode||"hide"),p=l.show().css("visibility","hidden").offset(),r=Math.ceil(l.outerWidth()/h),u=Math.ceil(l.outerHeight()/c),v=[];function b(){v.push(this),v.length===c*h&&function(){l.css({visibility:"visible"}),y(v).remove(),a||l.hide();i()}()}for(t=0;t<c;t++)for(f=p.top+t*u,n=t-(c-1)/2,o=0;o<h;o++)s=p.left+o*r,d=o-(h-1)/2,l.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*r,top:-t*u}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:r,height:u,left:s+(a?d*r:0),top:f+(a?n*u:0),opacity:a?0:1}).animate({left:s+(a?0:d*r),top:f+(a?0:n*u),opacity:a?1:0},e.duration||500,e.easing,b)}}(jQuery);!function(i){i.effects.effect.fade=function(e,t){var a=i(this),f=i.effects.setMode(a,e.mode||"toggle");a.animate({opacity:f},{queue:!1,duration:e.duration,easing:e.easing,complete:t})}}(jQuery);!function(m){m.effects.effect.fold=function(e,t){var i=m(this),h=["position","top","bottom","left","right","height","width"],s=m.effects.setMode(i,e.mode||"hide"),f="show"===s,o="hide"===s,d=e.size||15,r=/([0-9]+)%/.exec(d),c=!!e.horizFirst,n=f!=c,a=n?["width","height"]:["height","width"],g=e.duration/2,w={},p={};m.effects.save(i,h),i.show(),s=m.effects.createWrapper(i).css({overflow:"hidden"}),n=n?[s.width(),s.height()]:[s.height(),s.width()],r&&(d=parseInt(r[1],10)/100*n[o?0:1]),f&&s.css(c?{height:0,width:d}:{height:d,width:0}),w[a[0]]=f?n[0]:d,p[a[1]]=f?n[1]:0,s.animate(w,g,e.easing).animate(p,g,e.easing,function(){o&&i.hide(),m.effects.restore(i,h),m.effects.removeWrapper(i),t()})}}(jQuery);!function(f){f.effects.effect.highlight=function(e,o){var c=f(this),n=["backgroundImage","backgroundColor","opacity"],a=f.effects.setMode(c,e.mode||"show"),t={backgroundColor:c.css("backgroundColor")};"hide"===a&&(t.opacity=0),f.effects.save(c,n),c.show().css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(t,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&c.hide(),f.effects.restore(c,n),o()}})}}(jQuery);!function(p){p.effects.effect.pulsate=function(e,i){var t,s=p(this),a=p.effects.setMode(s,e.mode||"show"),c="show"===a,o="hide"===a,n=2*(e.times||5)+(c||"hide"===a?1:0),u=e.duration/n,f=0,h=s.queue(),a=h.length;for(!c&&s.is(":visible")||(s.css("opacity",0).show(),f=1),t=1;t<n;t++)s.animate({opacity:f},u,e.easing),f=1-f;s.animate({opacity:f},u,e.easing),s.queue(function(){o&&s.hide(),i()}),1<a&&h.splice.apply(h,[1,0].concat(h.splice(a,1+n))),s.dequeue()}}(jQuery);!function(y){y.effects.effect.puff=function(t,e){var o=y(this),i=y.effects.setMode(o,t.mode||"hide"),r="hide"===i,f=parseInt(t.percent,10)||150,h=f/100,c={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()};y.extend(t,{effect:"scale",queue:!1,fade:!0,mode:i,complete:e,percent:r?f:100,from:r?c:{height:c.height*h,width:c.width*h,outerHeight:c.outerHeight*h,outerWidth:c.outerWidth*h}}),o.effect(t)},y.effects.effect.scale=function(t,e){var o=y(this),i=y.extend(!0,{},t),r=y.effects.setMode(o,t.mode||"effect"),f=parseInt(t.percent,10)||(0===parseInt(t.percent,10)||"hide"===r?0:100),h=t.direction||"both",c=t.origin,s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},n="horizontal"!==h?f/100:1,f="vertical"!==h?f/100:1;i.effect="size",i.queue=!1,i.complete=e,"effect"!==r&&(i.origin=c||["middle","center"],i.restore=!0),i.from=t.from||("show"===r?{height:0,width:0,outerHeight:0,outerWidth:0}:s),i.to={height:s.height*n,width:s.width*f,outerHeight:s.outerHeight*n,outerWidth:s.outerWidth*f},i.fade&&("show"===r&&(i.from.opacity=0,i.to.opacity=1),"hide"===r&&(i.from.opacity=1,i.to.opacity=0)),o.effect(i)},y.effects.effect.size=function(f,t){var e,h,c=y(this),o=["position","top","bottom","left","right","width","height","overflow","opacity"],s=["width","height","overflow"],i=["fontSize"],n=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],r=y.effects.setMode(c,f.mode||"effect"),a=f.restore||"effect"!==r,m=f.scale||"both",g=f.origin||["middle","center"],u=c.css("position"),p=a?o:["position","top","bottom","left","right","overflow","opacity"],w={height:0,width:0,outerHeight:0,outerWidth:0};"show"===r&&c.show(),e={height:c.height(),width:c.width(),outerHeight:c.outerHeight(),outerWidth:c.outerWidth()},"toggle"===f.mode&&"show"===r?(c.from=f.to||w,c.to=f.from||e):(c.from=f.from||("show"===r?w:e),c.to=f.to||("hide"===r?w:e)),h={from:{y:c.from.height/e.height,x:c.from.width/e.width},to:{y:c.to.height/e.height,x:c.to.width/e.width}},"box"!==m&&"both"!==m||(h.from.y!==h.to.y&&(p=p.concat(n),c.from=y.effects.setTransition(c,n,h.from.y,c.from),c.to=y.effects.setTransition(c,n,h.to.y,c.to)),h.from.x!==h.to.x&&(p=p.concat(d),c.from=y.effects.setTransition(c,d,h.from.x,c.from),c.to=y.effects.setTransition(c,d,h.to.x,c.to))),"content"!==m&&"both"!==m||h.from.y!==h.to.y&&(p=p.concat(i).concat(s),c.from=y.effects.setTransition(c,i,h.from.y,c.from),c.to=y.effects.setTransition(c,i,h.to.y,c.to)),y.effects.save(c,p),c.show(),y.effects.createWrapper(c),c.css("overflow","hidden").css(c.from),g&&(g=y.effects.getBaseline(g,e),c.from.top=(e.outerHeight-c.outerHeight())*g.y,c.from.left=(e.outerWidth-c.outerWidth())*g.x,c.to.top=(e.outerHeight-c.to.outerHeight)*g.y,c.to.left=(e.outerWidth-c.to.outerWidth)*g.x),c.css(c.from),"content"!==m&&"both"!==m||(n=n.concat(["marginTop","marginBottom"]).concat(i),d=d.concat(["marginLeft","marginRight"]),s=o.concat(n).concat(d),c.find("*[width]").each(function(){var t=y(this),e=t.height(),o=t.width(),i=t.outerHeight(),r=t.outerWidth();a&&y.effects.save(t,s),t.from={height:e*h.from.y,width:o*h.from.x,outerHeight:i*h.from.y,outerWidth:r*h.from.x},t.to={height:e*h.to.y,width:o*h.to.x,outerHeight:e*h.to.y,outerWidth:o*h.to.x},h.from.y!==h.to.y&&(t.from=y.effects.setTransition(t,n,h.from.y,t.from),t.to=y.effects.setTransition(t,n,h.to.y,t.to)),h.from.x!==h.to.x&&(t.from=y.effects.setTransition(t,d,h.from.x,t.from),t.to=y.effects.setTransition(t,d,h.to.x,t.to)),t.css(t.from),t.animate(t.to,f.duration,f.easing,function(){a&&y.effects.restore(t,s)})})),c.animate(c.to,{queue:!1,duration:f.duration,easing:f.easing,complete:function(){0===c.to.opacity&&c.css("opacity",c.from.opacity),"hide"===r&&c.hide(),y.effects.restore(c,p),a||("static"===u?c.css({position:"relative",top:c.to.top,left:c.to.left}):y.each(["top","left"],function(r,t){c.css(t,function(t,e){var o=parseInt(e,10),i=r?c.to.left:c.to.top;return"auto"===e?i+"px":o+i+"px"})})),y.effects.removeWrapper(c),t()}})}}(jQuery);!function(q){q.effects.effect.shake=function(e,t){var i,a=q(this),f=["position","top","bottom","left","right","height","width"],n=q.effects.setMode(a,e.mode||"effect"),s=e.direction||"left",o=e.distance||20,c=e.times||3,r=2*c+1,u=Math.round(e.duration/r),p="up"===s||"down"===s?"top":"left",d="up"===s||"left"===s,h={},m={},g={},l=a.queue(),s=l.length;for(q.effects.save(a,f),a.show(),q.effects.createWrapper(a),h[p]=(d?"-=":"+=")+o,m[p]=(d?"+=":"-=")+2*o,g[p]=(d?"-=":"+=")+2*o,a.animate(h,u,e.easing),i=1;i<c;i++)a.animate(m,u,e.easing).animate(g,u,e.easing);a.animate(m,u,e.easing).animate(h,u/2,e.easing).queue(function(){"hide"===n&&a.hide(),q.effects.restore(a,f),q.effects.removeWrapper(a),t()}),1<s&&l.splice.apply(l,[1,0].concat(l.splice(s,1+r))),a.dequeue()}}(jQuery);!function(a){a.effects.effect.slide=function(e,t){var o=a(this),i=["position","top","bottom","left","right","width","height"],s=a.effects.setMode(o,e.mode||"show"),f="show"===s,r=e.direction||"left",c="up"===r||"down"===r?"top":"left",n="up"===r||"left"===r,d={};a.effects.save(o,i),o.show(),r=e.distance||o["top"==c?"outerHeight":"outerWidth"](!0),a.effects.createWrapper(o).css({overflow:"hidden"}),f&&o.css(c,n?isNaN(r)?"-"+r:-r:r),d[c]=(f?n?"+=":"-=":n?"-=":"+=")+r,o.animate(d,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===s&&o.hide(),a.effects.restore(o,i),a.effects.removeWrapper(o),t()}})}}(jQuery);!function(r){r.effects.effect.transfer=function(t,e){var i=r(this),o=r(t.to),n="fixed"===o.css("position"),s=r("body"),f=n?s.scrollTop():0,d=n?s.scrollLeft():0,s=o.offset(),s={top:s.top-f,left:s.left-d,height:o.innerHeight(),width:o.innerWidth()},o=i.offset(),a=r("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:o.top-f,left:o.left-d,height:i.innerHeight(),width:i.innerWidth(),position:n?"fixed":"absolute"}).animate(s,t.duration,t.easing,function(){a.remove(),e()})}}(jQuery);

/*!
 * ClockPicker v0.0.7 (http://weareoutman.github.io/clockpicker/)
 * Copyright 2014 Wang Shenwei.
 * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
 */

;(function(){
	var $ = window.jQuery,
		$win = $(window),
		$doc = $(document),
		$body;

	// Can I use inline svg ?
	var svgNS = 'http://www.w3.org/2000/svg',
		svgSupported = 'SVGAngle' in window && (function(){
			var supported,
				el = document.createElement('div');
			el.innerHTML = '<svg/>';
			supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
			el.innerHTML = '';
			return supported;
		})();

	// Can I use transition ?
	var transitionSupported = (function(){
		var style = document.createElement('div').style;
		return 'transition' in style ||
			'WebkitTransition' in style ||
			'MozTransition' in style ||
			'msTransition' in style ||
			'OTransition' in style;
	})();

	// Listen touch events in touch screen device, instead of mouse events in desktop.
	var touchSupported = 'ontouchstart' in window,
		mousedownEvent = 'mousedown' + ( touchSupported ? ' touchstart' : ''),
		mousemoveEvent = 'mousemove.clockpicker' + ( touchSupported ? ' touchmove.clockpicker' : ''),
		mouseupEvent = 'mouseup.clockpicker' + ( touchSupported ? ' touchend.clockpicker' : '');

	// Vibrate the device if supported
	var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

	function createSvgElement(name) {
		return document.createElementNS(svgNS, name);
	}

	function leadingZero(num) {
		return (num < 10 ? '0' : '') + num;
	}

	// Get a unique id
	var idCounter = 0;
	function uniqueId(prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	}

	// Clock size
	var dialRadius = 100,
		outerRadius = 80,
		// innerRadius = 80 on 12 hour clock
		innerRadius = 54,
		tickRadius = 13,
		diameter = dialRadius * 2,
		duration = transitionSupported ? 350 : 1;

	// Popover template
	var tpl = [
		'<div class="popover clockpicker-popover">',
			'<div class="arrow"></div>',
			'<div class="popover-title">',
				'<span class="clockpicker-span-hours text-primary"></span>',
				' : ',
				'<span class="clockpicker-span-minutes"></span>',
				'<span class="clockpicker-span-am-pm"></span>',
			'</div>',
			'<div class="popover-content">',
				'<div class="clockpicker-plate">',
					'<div class="clockpicker-canvas"></div>',
					'<div class="clockpicker-dial clockpicker-hours"></div>',
					'<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',
				'</div>',
				'<span class="clockpicker-am-pm-block">',
				'</span>',
			'</div>',
		'</div>'
	].join('');

	// ClockPicker
	function ClockPicker(element, options) {
		var popover = $(tpl),
			plate = popover.find('.clockpicker-plate'),
			hoursView = popover.find('.clockpicker-hours'),
			minutesView = popover.find('.clockpicker-minutes'),
			amPmBlock = popover.find('.clockpicker-am-pm-block'),
			isInput = element.prop('tagName') === 'INPUT',
			input = isInput ? element : element.find('input'),
			addon = element.find('.input-group-addon'),
			self = this,
			timer;

		this.id = uniqueId('cp');
		this.element = element;
		this.options = options;
		this.isAppended = false;
		this.isShown = false;
		this.currentView = 'hours';
		this.isInput = isInput;
		this.input = input;
		this.addon = addon;
		this.popover = popover;
		this.plate = plate;
		this.hoursView = hoursView;
		this.minutesView = minutesView;
		this.amPmBlock = amPmBlock;
		this.spanHours = popover.find('.clockpicker-span-hours');
		this.spanMinutes = popover.find('.clockpicker-span-minutes');
		this.spanAmPm = popover.find('.clockpicker-span-am-pm');
		this.amOrPm = "PM";
		
		// Setup for for 12 hour clock if option is selected
		if (options.twelvehour) {
			
			var  amPmButtonsTemplate = ['<div class="clockpicker-am-pm-block">',
				'<button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-am-button">',
				'AM</button>',
				'<button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-pm-button">',
				'PM</button>',
				'</div>'].join('');
			
			var amPmButtons = $(amPmButtonsTemplate);
			//amPmButtons.appendTo(plate);
			
			////Not working b/c they are not shown when this runs
			//$('clockpicker-am-button')
			//    .on("click", function() {
			//        self.amOrPm = "AM";
			//        $('.clockpicker-span-am-pm').empty().append('AM');
			//    });
			//    
			//$('clockpicker-pm-button')
			//    .on("click", function() {
			//         self.amOrPm = "PM";
			//        $('.clockpicker-span-am-pm').empty().append('PM');
			//    });
	
			$('<button type="button" class="btn btn-sm btn-default clockpicker-button am-button">' + "AM" + '</button>')
				.on("click", function() {
					self.amOrPm = "AM";
					$('.clockpicker-span-am-pm').empty().append('AM');
				}).appendTo(this.amPmBlock);
				
				
			$('<button type="button" class="btn btn-sm btn-default clockpicker-button pm-button">' + "PM" + '</button>')
				.on("click", function() {
					self.amOrPm = 'PM';
					$('.clockpicker-span-am-pm').empty().append('PM');
				}).appendTo(this.amPmBlock);
				
		}
		
		if (! options.autoclose) {
			// If autoclose is not setted, append a button
			$('<button type="button" class="btn btn-sm btn-default btn-block clockpicker-button">' + options.donetext + '</button>')
				.click($.proxy(this.done, this))
				.appendTo(popover);
		}

		// Placement and arrow align - make sure they make sense.
		if ((options.placement === 'top' || options.placement === 'bottom') && (options.align === 'top' || options.align === 'bottom')) options.align = 'left';
		if ((options.placement === 'left' || options.placement === 'right') && (options.align === 'left' || options.align === 'right')) options.align = 'top';

		popover.addClass(options.placement);
		popover.addClass('clockpicker-align-' + options.align);

		this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
		this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));

		// Show or toggle
		input.on('focus.clockpicker click.clockpicker', $.proxy(this.show, this));
		addon.on('click.clockpicker', $.proxy(this.toggle, this));

		// Build ticks
		var tickTpl = $('<div class="clockpicker-tick"></div>'),
			i, tick, radian, radius;

		// Hours view
		if (options.twelvehour) {
			for (i = 1; i < 13; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				radius = outerRadius;
				tick.css('font-size', '120%');
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				tick.html(i === 0 ? '00' : i);
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		} else {
			for (i = 0; i < 24; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				var inner = i > 0 && i < 13;
				radius = inner ? innerRadius : outerRadius;
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				if (inner) {
					tick.css('font-size', '120%');
				}
				tick.html(i === 0 ? '00' : i);
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		}

		// Minutes view
		for (i = 0; i < 60; i += 5) {
			tick = tickTpl.clone();
			radian = i / 30 * Math.PI;
			tick.css({
				left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
				top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
			});
			tick.css('font-size', '120%');
			tick.html(leadingZero(i));
			minutesView.append(tick);
			tick.on(mousedownEvent, mousedown);
		}

		// Clicking on minutes view space
		plate.on(mousedownEvent, function(e){
			if ($(e.target).closest('.clockpicker-tick').length === 0) {
				mousedown(e, true);
			}
		});

		// Mousedown or touchstart
		function mousedown(e, space) {
			var offset = plate.offset(),
				isTouch = /^touch/.test(e.type),
				x0 = offset.left + dialRadius,
				y0 = offset.top + dialRadius,
				dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
				dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
				z = Math.sqrt(dx * dx + dy * dy),
				moved = false;

			// When clicking on minutes view space, check the mouse position
			if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
				return;
			}
			e.preventDefault();

			// Set cursor style of body after 200ms
			var movingTimer = setTimeout(function(){
				$body.addClass('clockpicker-moving');
			}, 200);

			// Place the canvas to top
			if (svgSupported) {
				plate.append(self.canvas);
			}

			// Clock
			self.setHand(dx, dy, ! space, true);

			// Mousemove on document
			$doc.off(mousemoveEvent).on(mousemoveEvent, function(e){
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
					x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
					y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
				if (! moved && x === dx && y === dy) {
					// Clicking in chrome on windows will trigger a mousemove event
					return;
				}
				moved = true;
				self.setHand(x, y, false, true);
			});

			// Mouseup on document
			$doc.off(mouseupEvent).on(mouseupEvent, function(e){
				$doc.off(mouseupEvent);
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
					x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
					y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
				if ((space || moved) && x === dx && y === dy) {
					self.setHand(x, y);
				}
				if (self.currentView === 'hours') {
					self.toggleView('minutes', duration / 2);
				} else {
					if (options.autoclose) {
						self.minutesView.addClass('clockpicker-dial-out');
						setTimeout(function(){
							self.done();
						}, duration / 2);
					}
				}
				plate.prepend(canvas);

				// Reset cursor style of body
				clearTimeout(movingTimer);
				$body.removeClass('clockpicker-moving');

				// Unbind mousemove event
				$doc.off(mousemoveEvent);
			});
		}

		if (svgSupported) {
			// Draw clock hands and others
			var canvas = popover.find('.clockpicker-canvas'),
				svg = createSvgElement('svg');
			svg.setAttribute('class', 'clockpicker-svg');
			svg.setAttribute('width', diameter);
			svg.setAttribute('height', diameter);
			var g = createSvgElement('g');
			g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
			var bearing = createSvgElement('circle');
			bearing.setAttribute('class', 'clockpicker-canvas-bearing');
			bearing.setAttribute('cx', 0);
			bearing.setAttribute('cy', 0);
			bearing.setAttribute('r', 2);
			var hand = createSvgElement('line');
			hand.setAttribute('x1', 0);
			hand.setAttribute('y1', 0);
			var bg = createSvgElement('circle');
			bg.setAttribute('class', 'clockpicker-canvas-bg');
			bg.setAttribute('r', tickRadius);
			var fg = createSvgElement('circle');
			fg.setAttribute('class', 'clockpicker-canvas-fg');
			fg.setAttribute('r', 3.5);
			g.appendChild(hand);
			g.appendChild(bg);
			g.appendChild(fg);
			g.appendChild(bearing);
			svg.appendChild(g);
			canvas.append(svg);

			this.hand = hand;
			this.bg = bg;
			this.fg = fg;
			this.bearing = bearing;
			this.g = g;
			this.canvas = canvas;
		}

		raiseCallback(this.options.init);
	}

	function raiseCallback(callbackFunction) {
		if (callbackFunction && typeof callbackFunction === "function") {
			callbackFunction();
		}
	}

	// Default options
	ClockPicker.DEFAULTS = {
		'default': '',       // default time, 'now' or '13:14' e.g.
		fromnow: 0,          // set default time to * milliseconds from now (using with default = 'now')
		placement: 'bottom', // clock popover placement
		align: 'left',       // popover arrow align
		donetext: '完成',    // done button text
		autoclose: false,    // auto close when minute is selected
		twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
		vibrate: true        // vibrate the device when dragging clock hand
	};

	// Show or hide popover
	ClockPicker.prototype.toggle = function(){
		this[this.isShown ? 'hide' : 'show']();
	};

	// Set popover position
	ClockPicker.prototype.locate = function(){
		var element = this.element,
			popover = this.popover,
			offset = element.offset(),
			width = element.outerWidth(),
			height = element.outerHeight(),
			placement = this.options.placement,
			align = this.options.align,
			styles = {},
			self = this;
		if ($(this.input[0]).closest('DIALOG').length > 0) {
			var d_pos = $(this.input[0]).closest('DIALOG').offset();
			offset.top = offset.top - d_pos.top;
			offset.left = offset.left - d_pos.left;
		}

		popover.show();

		// Place the popover
		switch (placement) {
			case 'bottom':
				styles.top = offset.top + height;
				break;
			case 'right':
				styles.left = offset.left + width;
				break;
			case 'top':
				styles.top = offset.top - popover.outerHeight();
				break;
			case 'left':
				styles.left = offset.left - popover.outerWidth();
				break;
		}

		// Align the popover arrow
		switch (align) {
			case 'left':
				styles.left = offset.left;
				break;
			case 'right':
				styles.left = offset.left + width - popover.outerWidth();
				break;
			case 'top':
				styles.top = offset.top;
				break;
			case 'bottom':
				styles.top = offset.top + height - popover.outerHeight();
				break;
		}

		popover.css(styles);
	};

	// Show popover
	ClockPicker.prototype.show = function(e){
		// Not show again
		if (this.isShown) {
			return;
		}

		raiseCallback(this.options.beforeShow);

		var self = this;

		// Initialize
		if (! this.isAppended) {
			// Append popover to body
			var doc = $(this.input[0]).closest('DIALOG').length > 0 ? $(this.input[0]).closest('DIALOG') : document.body;
			$body = $(doc).append(this.popover);

			// Reset position when resize
			$win.on('resize.clockpicker' + this.id, function(){
				if (self.isShown) {
					self.locate();
				}
			});

			this.isAppended = true;
		}

		// Get the time
		var value = ((this.input.prop('value') || this.options['default'] || '') + '').split(':');
		if (value[0] === 'now') {
			var now = new Date(+ new Date() + this.options.fromnow);
			value = [
				now.getHours(),
				now.getMinutes()
			];
		}
		this.hours = + value[0] || 0;
		this.minutes = + value[1] || 0;
		this.spanHours.html(leadingZero(this.hours));
		this.spanMinutes.html(leadingZero(this.minutes));

		// Toggle to hours view
		this.toggleView('hours');

		// Set position
		this.locate();

		this.isShown = true;

		// Hide when clicking or tabbing on any element except the clock, input and addon
		$doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, function(e){
			var target = $(e.target);
			if (target.closest(self.popover).length === 0 &&
					target.closest(self.addon).length === 0 &&
					target.closest(self.input).length === 0) {
				self.hide();
			}
		});

		// Hide when ESC is pressed
		$doc.on('keyup.clockpicker.' + this.id, function(e){
			if (e.keyCode === 27) {
				self.hide();
			}
		});

		raiseCallback(this.options.afterShow);
	};

	// Hide popover
	ClockPicker.prototype.hide = function(){
		raiseCallback(this.options.beforeHide);

		this.isShown = false;

		// Unbinding events on document
		$doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
		$doc.off('keyup.clockpicker.' + this.id);

		this.popover.hide();

		raiseCallback(this.options.afterHide);
	};

	// Toggle to hours or minutes view
	ClockPicker.prototype.toggleView = function(view, delay){
		var raiseAfterHourSelect = false;
		if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
			raiseCallback(this.options.beforeHourSelect);
			raiseAfterHourSelect = true;
		}
		var isHours = view === 'hours',
			nextView = isHours ? this.hoursView : this.minutesView,
			hideView = isHours ? this.minutesView : this.hoursView;

		this.currentView = view;

		this.spanHours.toggleClass('text-primary', isHours);
		this.spanMinutes.toggleClass('text-primary', ! isHours);

		// Let's make transitions
		hideView.addClass('clockpicker-dial-out');
		nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');

		// Reset clock hand
		this.resetClock(delay);

		// After transitions ended
		clearTimeout(this.toggleViewTimer);
		this.toggleViewTimer = setTimeout(function(){
			hideView.css('visibility', 'hidden');
		}, duration);

		if (raiseAfterHourSelect) {
			raiseCallback(this.options.afterHourSelect);
		}
	};

	// Reset clock hand
	ClockPicker.prototype.resetClock = function(delay){
		var view = this.currentView,
			value = this[view],
			isHours = view === 'hours',
			unit = Math.PI / (isHours ? 6 : 30),
			radian = value * unit,
			radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
			x = Math.sin(radian) * radius,
			y = - Math.cos(radian) * radius,
			self = this;
		if (svgSupported && delay) {
			self.canvas.addClass('clockpicker-canvas-out');
			setTimeout(function(){
				self.canvas.removeClass('clockpicker-canvas-out');
				self.setHand(x, y);
			}, delay);
		} else {
			this.setHand(x, y);
		}
	};

	// Set clock hand to (x, y)
	ClockPicker.prototype.setHand = function(x, y, roundBy5, dragging){
		var radian = Math.atan2(x, - y),
			isHours = this.currentView === 'hours',
			unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
			z = Math.sqrt(x * x + y * y),
			options = this.options,
			inner = isHours && z < (outerRadius + innerRadius) / 2,
			radius = inner ? innerRadius : outerRadius,
			value;
			
			if (options.twelvehour) {
				radius = outerRadius;
			}

		// Radian should in range [0, 2PI]
		if (radian < 0) {
			radian = Math.PI * 2 + radian;
		}

		// Get the round value
		value = Math.round(radian / unit);

		// Get the round radian
		radian = value * unit;

		// Correct the hours or minutes
		if (options.twelvehour) {
			if (isHours) {
				if (value === 0) {
					value = 12;
				}
			} else {
				if (roundBy5) {
					value *= 5;
				}
				if (value === 60) {
					value = 0;
				}
			}
		} else {
			if (isHours) {
				if (value === 12) {
					value = 0;
				}
				value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
			} else {
				if (roundBy5) {
					value *= 5;
				}
				if (value === 60) {
					value = 0;
				}
			}
		}
		
		// Once hours or minutes changed, vibrate the device
		if (this[this.currentView] !== value) {
			if (vibrate && this.options.vibrate) {
				// Do not vibrate too frequently
				if (! this.vibrateTimer) {
					navigator[vibrate](10);
					this.vibrateTimer = setTimeout($.proxy(function(){
						this.vibrateTimer = null;
					}, this), 100);
				}
			}
		}

		this[this.currentView] = value;
		this[isHours ? 'spanHours' : 'spanMinutes'].html(leadingZero(value));

		// If svg is not supported, just add an active class to the tick
		if (! svgSupported) {
			this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function(){
				var tick = $(this);
				tick.toggleClass('active', value === + tick.html());
			});
			return;
		}

		// Place clock hand at the top when dragging
		if (dragging || (! isHours && value % 5)) {
			this.g.insertBefore(this.hand, this.bearing);
			this.g.insertBefore(this.bg, this.fg);
			this.bg.setAttribute('class', 'clockpicker-canvas-bg clockpicker-canvas-bg-trans');
		} else {
			// Or place it at the bottom
			this.g.insertBefore(this.hand, this.bg);
			this.g.insertBefore(this.fg, this.bg);
			this.bg.setAttribute('class', 'clockpicker-canvas-bg');
		}

		// Set clock hand and others' position
		var cx = Math.sin(radian) * radius,
			cy = - Math.cos(radian) * radius;
		this.hand.setAttribute('x2', cx);
		this.hand.setAttribute('y2', cy);
		this.bg.setAttribute('cx', cx);
		this.bg.setAttribute('cy', cy);
		this.fg.setAttribute('cx', cx);
		this.fg.setAttribute('cy', cy);
	};

	// Hours and minutes are selected
	ClockPicker.prototype.done = function() {
		raiseCallback(this.options.beforeDone);
		this.hide();
		var last = this.input.prop('value'),
			value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
		if  (this.options.twelvehour) {
			value = value + this.amOrPm;
		}
		
		this.input.prop('value', value);
		this.input.attr('value', value);
		this.input.val(value);
		if (value !== last) {
			this.input.triggerHandler('change');
			if (! this.isInput) {
				this.element.trigger('change');
			}
		}

		if (this.options.autoclose) {
			this.input.trigger('blur');
		}

		raiseCallback(this.options.afterDone);
	};

	// Remove clockpicker from input
	ClockPicker.prototype.remove = function() {
		this.element.removeData('clockpicker');
		this.input.off('focus.clockpicker click.clockpicker');
		this.addon.off('click.clockpicker');
		if (this.isShown) {
			this.hide();
		}
		if (this.isAppended) {
			$win.off('resize.clockpicker' + this.id);
			this.popover.remove();
		}
	};

	// Extends $.fn.clockpicker
	$.fn.clockpicker = function(option){
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function(){
			var $this = $(this),
				data = $this.data('clockpicker');
			if (! data) {
				var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
				$this.data('clockpicker', new ClockPicker($this, options));
			} else {
				// Manual operatsions. show, hide, remove, e.g.
				if (typeof data[option] === 'function') {
					data[option].apply(data, args);
				}
			}
		});
	};
}());

/*!
 * Datepicker for Bootstrap v1.10.0 (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (https://www.apache.org/licenses/LICENSE-2.0)
 */
(function(factory){
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($, undefined){
	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function isUTCEquals(date1, date2) {
		return (
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate()
		);
	}
	function alias(method, deprecationMsg){
		return function(){
			if (deprecationMsg !== undefined) {
				$.fn.datepicker.deprecated(deprecationMsg);
			}

			return this[method].apply(this, arguments);
		};
	}
	function isValidDate(d) {
		return d && !isNaN(d.getTime());
	}
	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
          // Use date arithmetic to allow dates with different times to match
          if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 1000*60*60*24)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!Array.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};
		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();
	// Picker object
	var Datepicker = function(element, options){
		$.data(element, 'datepicker', this);
		this._events = [];
		this._secondaryEvents = [];
		this._process_options(options);
		this.dates = new DateArray();
		this.viewDate = this.o.defaultViewDate;
		this.focusDate = null;
		this.element = $(element);
		this.isInput = this.element.is('input');
		this.inputField = this.isInput ? this.element : this.element.find('input');
		this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn') : false;
		if (this.component && this.component.length === 0){
			this.component = false;
        }
		if (this.o.isInline === null){
			this.isInline = !this.component && !this.isInput;
		} else {
			this.isInline = this.o.isInline;
		}
		this.picker = $(DPGlobal.template);
		// Checking templates and inserting
		if (this._check_template(this.o.templates.leftArrow)) {
			this.picker.find('.prev').html(this.o.templates.leftArrow);
		}

		if (this._check_template(this.o.templates.rightArrow)) {
			this.picker.find('.next').html(this.o.templates.rightArrow);
		}
		this._buildEvents();
		this._attachEvents();
		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		} else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}
		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}
		if (this.o.calendarWeeks) {
			this.picker.find('.datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear')
				.attr('colspan', function(i, val){
					return Number(val) + 1;
				});
		}
		this._process_options({
			startDate: this._o.startDate,
			endDate: this._o.endDate,
			daysOfWeekDisabled: this.o.daysOfWeekDisabled,
			daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
			datesDisabled: this.o.datesDisabled
		});
		this._allow_update = false;
		this.setViewMode(this.o.startView);
		this._allow_update = true;
		this.fillDow();
		this.fillMonths();
		this.update();
		if (this.isInline){
			this.show();
		}
	};
	Datepicker.prototype = {
		constructor: Datepicker,
		_resolveViewName: function(view){
			$.each(DPGlobal.viewModes, function(i, viewMode){
				if (view === i || $.inArray(view, viewMode.names) !== -1){
					view = i;
					return false;
				}
			});
			return view;
		},
		_resolveDaysOfWeek: function(daysOfWeek){
			if (!Array.isArray(daysOfWeek))
				daysOfWeek = daysOfWeek.split(/[,\s]*/);
			return $.map(daysOfWeek, Number);
		},
		_check_template: function(tmp){
			try {
				// If empty
				if (tmp === undefined || tmp === "") {
					return false;
				}
				// If no html, everything ok
				if ((tmp.match(/[<>]/g) || []).length <= 0) {
					return true;
				}
				// Checking if html is fine
				var jDom = $(tmp);
				return jDom.length > 0;
			}
			catch (ex) {
				return false;
			}
		},
		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);
			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;
			// Retrieve view index from any aliases
			o.startView = this._resolveViewName(o.startView);
			o.minViewMode = this._resolveViewName(o.minViewMode);
			o.maxViewMode = this._resolveViewName(o.maxViewMode);
			// Check view is between min and max
			o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView));
			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
			}
			o.multidateSeparator = String(o.multidateSeparator);
			o.weekStart %= 7;
			o.weekEnd = (o.weekStart + 6) % 7;
			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.endDate = Infinity;
				}
			}
			o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled||[]);
			o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted||[]);
			o.datesDisabled = o.datesDisabled||[];
			if (!Array.isArray(o.datesDisabled)) {
				o.datesDisabled = o.datesDisabled.split(',');
			}
			o.datesDisabled = $.map(o.datesDisabled, function(d){
				return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
			});
			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return /^auto|left|right|top|bottom$/.test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			} else {
				_plc = $.grep(plc, function(word){
					return /^left|right$/.test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return /^top|bottom$/.test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
			if (o.defaultViewDate instanceof Date || typeof o.defaultViewDate === 'string') {
				o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear);
			} else if (o.defaultViewDate) {
				var year = o.defaultViewDate.year || new Date().getFullYear();
				var month = o.defaultViewDate.month || 0;
				var day = o.defaultViewDate.day || 1;
				o.defaultViewDate = UTCDate(year, month, day);
			} else {
				o.defaultViewDate = UTCToday();
			}
		},
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				} else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				} else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
            var events = {
                keyup: $.proxy(function(e){
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                        this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };
            if (this.o.showOnFocus === true) {
                events.focus = $.proxy(this.show, this);
            }
            if (this.isInput) { // single input
                this._events = [
                    [this.element, events]
                ];
            }
            // component: input + button
            else if (this.component && this.inputField.length) {
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.inputField, events],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            } else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);
			if (this.o.immediateUpdates) {
				// Trigger input updates immediately on changed year/month
				this._events.push([this.element, {
					'changeYear changeMonth': $.proxy(function(e){
						this.update(e.date);
					}, this)
				}]);
			}
			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[this.picker, '.prev, .next', {
					click: $.proxy(this.navArrowsClick, this)
				}],
				[this.picker, '.day:not(.disabled)', {
					click: $.proxy(this.dayCellClick, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					'mousedown touchstart': $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length ||
							this.isInline
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);
			this.element.trigger({
				type: event,
				date: local_date,
				viewMode: this.viewMode,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					} else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},
		show: function(){
			if (this.inputField.is(':disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
				return;
			if (!this.isInline)
				this.picker.appendTo(this.o.container);
			this.place();
			this.picker.show();
			this._attachSecondaryEvents();
			this._trigger('show');
			if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
				$(this.element).blur();
			}
			return this;
		},
		hide: function(){
			if (this.isInline || !this.picker.is(':visible'))
				return this;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.setViewMode(this.o.startView);

			if (this.o.forceParse && this.inputField.val())
				this.setValue();
			this._trigger('hide');
			return this;
		},
		destroy: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
			return this;
		},
		paste: function(e){
			var dateString;
			if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types
				&& $.inArray('text/plain', e.originalEvent.clipboardData.types) !== -1) {
				dateString = e.originalEvent.clipboardData.getData('text/plain');
			} else if (window.clipboardData) {
				dateString = window.clipboardData.getData('Text');
			} else {
				return;
			}
			this.setDate(dateString);
			this.update();
			e.preventDefault();
		},
		_utc_to_local: function(utc){
			if (!utc) {
				return utc;
			}

			var local = new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));

			if (local.getTimezoneOffset() !== utc.getTimezoneOffset()) {
				local = new Date(utc.getTime() + (local.getTimezoneOffset() * 60000));
			}

			return local;
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
		},
		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},
		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},
		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},
		getUTCDate: function(){
			var selected_date = this.dates.get(-1);
			if (selected_date !== undefined) {
				return new Date(selected_date);
			} else {
				return null;
			}
		},
		clearDates: function(){
			this.inputField.val('');
			this._trigger('changeDate');
			this.update();
			if (this.o.autoclose) {
				this.hide();
			}
		},
		setDates: function(){
			var args = Array.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
			return this;
		},
		setUTCDates: function(){
			var args = Array.isArray(arguments[0]) ? arguments[0] : arguments;
			this.setDates.apply(this, $.map(args, this._utc_to_local));
			return this;
		},
		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),
		remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead'),
		setValue: function(){
			var formatted = this.getFormattedDate();
			this.inputField.val(formatted);
			return this;
		},
		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},
		getStartDate: function(){
			return this.o.startDate;
		},
		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
			return this;
		},
		getEndDate: function(){
			return this.o.endDate;
		},
		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
			return this;
		},
		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			return this;
		},
		setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){
			this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});
			this.update();
			return this;
		},
		setDatesDisabled: function(datesDisabled){
			this._process_options({datesDisabled: datesDisabled});
			this.update();
			return this;
		},
		place: function(){
			if (this.isInline)
				return this;
			console.log( 'DPtest' ,  );
			if ( this.o.container === 'parent' ) this.o.container = (
				$(this.element[0]).closest('DIALOG').prop('nodeName') === 'DIALOG'
				? $(this.element[0]).closest('DIALOG').find('.mdl-dialog__content')
				: $('BODY')
//				: $(this.element[0]).parent()
			);
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				container = $(this.o.container),
				windowWidth = container.width(),
				scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
				appendOffset = container.offset();
			var parentsZindex = [0];
			this.element.parents().each(function(){
				var itemZIndex = $(this).css('z-index');
				if (itemZIndex !== 'auto' && Number(itemZIndex) !== 0) parentsZindex.push(Number(itemZIndex));
			});
			var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left - appendOffset.left;
			var top = offset.top - appendOffset.top;
			if (this.o.container !== 'body') {
				top += scrollTop;
			}
			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);
			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				if (offset.left < 0) {
					// component is outside the window on the left side. Move it into visible range
					this.picker.addClass('datepicker-orient-left');
					left -= offset.left - visualPadding;
				} else if (left + calendarWidth > windowWidth) {
					// the calendar passes the widow right edge. Align it to component right side
					this.picker.addClass('datepicker-orient-right');
					left += width - calendarWidth;
				} else {
					if (this.o.rtl) {
						// Default to right
						this.picker.addClass('datepicker-orient-right');
					} else {
						// Default to left
						this.picker.addClass('datepicker-orient-left');
					}
				}
			}
			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + top - calendarHeight;
				yorient = top_overflow < 0 ? 'bottom' : 'top';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));
			else
				top += height;
			if (this.o.rtl) {
				var right = windowWidth - (left + width);
				this.picker.css({
					top: top,
					right: right,
					zIndex: zIndex
				});
			} else {
				this.picker.css({
					top: top,
					left: left,
					zIndex: zIndex
				});
			}
			if ( this.o.title === true ) {
				var elDate = this.element.val() != '' ? this.element.val() : [];
				this.picker.find('thead .datepicker-title').html( '<small>' + moment( elDate ).format('YYYY') + '</small><span>' + moment( elDate ).format('ddd, D. MMM') + '</span>' );
			}
			return this;
		},
		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return this;
			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			} else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.inputField.val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}
			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					!this.dateWithinRange(date) ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);
			if (this.o.updateViewDate) {
				if (this.dates.length)
					this.viewDate = new Date(this.dates.get(-1));
				else if (this.viewDate < this.o.startDate)
					this.viewDate = new Date(this.o.startDate);
				else if (this.viewDate > this.o.endDate)
					this.viewDate = new Date(this.o.endDate);
				else
					this.viewDate = this.o.defaultViewDate;
			}
			if (fromArgs){
				// setting date by clicking
				this.setValue();
				this.element.change();
			}
			else if (this.dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates) && fromArgs) {
					this._trigger('changeDate');
					this.element.change();
				}
			}
			if (!this.dates.length && oldDates.length) {
				this._trigger('clearDate');
				this.element.change();
			}
			this.fill();
			return this;
		},
		fillDow: function(){
            if (this.o.showWeekDays) {
			 	var dowCnt = this.o.weekStart,
					html = '<tr>';
				if (this.o.calendarWeeks){
					html += '<th class="cw">&#160;</th>';
				}
				while (dowCnt < this.o.weekStart + 7){
					html += '<th class="dow';
			        if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) !== -1) html += ' disabled';
        			html += '">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
				}
				html += '</tr>';
				this.picker.find('.datepicker-days thead').append(html);
      		}
		},
		fillMonths: function(){
			var localDate = this._utc_to_local(this.viewDate);
			var html = '';
			var focused;
			for (var i = 0; i < 12; i++){
				focused = localDate && localDate.getMonth() === i ? ' focused' : '';
				html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i] + '</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},
		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},
		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = UTCToday();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			} else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with UTC today, not local today
			if (this.o.todayHighlight && isUTCEquals(date, today)) {
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (!this.dateWithinRange(date)){
				cls.push('disabled');
			}
			if (this.dateIsDisabled(date)){
				cls.push('disabled', 'disabled-date');
			}
			if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){
				cls.push('highlighted');
			}
			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
				if (date.valueOf() === this.range[0]){
					cls.push('range-start');
				}
				if (date.valueOf() === this.range[this.range.length-1]){
					cls.push('range-end');
				}
			}
			return cls;
		},
		_fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn){
			var html = '';
			var step = factor / 10;
			var view = this.picker.find(selector);
			var startVal = Math.floor(year / factor) * factor;
			var endVal = startVal + step * 9;
			var focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step;
			var selected = $.map(this.dates, function(d){
				return Math.floor(d.getUTCFullYear() / step) * step;
			});
			var classes, tooltip, before;
			for (var currVal = startVal - step; currVal <= endVal + step; currVal += step) {
				classes = [cssClass];
				tooltip = null;

				if (currVal === startVal - step) {
					classes.push('old');
				} else if (currVal === endVal + step) {
					classes.push('new');
				}
				if ($.inArray(currVal, selected) !== -1) {
					classes.push('active');
				}
				if (currVal < startYear || currVal > endYear) {
					classes.push('disabled');
				}
				if (currVal === focusedVal) {
				  classes.push('focused');
        		}
				if (beforeFn !== $.noop) {
					before = beforeFn(new Date(currVal, 0, 1));
					if (before === undefined) {
						before = {};
					} else if (typeof before === 'boolean') {
						before = {enabled: before};
					} else if (typeof before === 'string') {
						before = {classes: before};
					}
					if (before.enabled === false) {
						classes.push('disabled');
					}
					if (before.classes) {
						classes = classes.concat(before.classes.split(/\s+/));
					}
					if (before.tooltip) {
						tooltip = before.tooltip;
					}
				}
				html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + currVal + '</span>';
			}
			view.find('.datepicker-switch').text(startVal + '-' + endVal);
			view.find('td').html(html);
		},
		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
		        titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
		        todayDate = UTCToday(),
		        titleBtnVisible = (this.o.todayBtn === true || this.o.todayBtn === 'linked') && todayDate >= this.o.startDate && todayDate <= this.o.endDate && !this.weekOfDateIsDisabled(todayDate),
				tooltip,
				before;
			if (isNaN(year) || isNaN(month))
				return;
			this.picker.find('.datepicker-days .datepicker-switch')
						.text(DPGlobal.formatDate(d, titleFormat, this.o.language));
			this.picker.find('tfoot .today')
						.text(todaytxt)
                        .css('display', titleBtnVisible ? 'block' : 'none');
			this.picker.find('tfoot .clear')
						.text(cleartxt)
						.css('display', this.o.clearBtn === true ? 'block' : 'none');
			this.picker.find('thead .datepicker-title')
						.html(this.o.title === true ? '<small>' + moment().format('YYYY') + '</small><span>' + moment().format('ddd, D. MMM') + '</span>' : this.o.title)
						.css('display', ( typeof(this.o.title) === 'string' && this.o.title !== '' ) || this.o.title === true ? 'table-cell' : 'none');
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month, 0),
				day = prevMonth.getUTCDate();
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			if (prevMonth.getUTCFullYear() < 100){
        		nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
        	}
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var weekDay, clsName;
			while (prevMonth.valueOf() < nextMonth){
				weekDay = prevMonth.getUTCDay();
				if (weekDay === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek = (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');
					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');
				var content = prevMonth.getUTCDate();
				if (this.o.beforeShowDay !== $.noop){
					before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof before === 'boolean')
						before = {enabled: before};
					else if (typeof before === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
					if (before.content)
						content = before.content;
				}
				//Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
				//Fallback to unique function for older jquery versions
				if (typeof $.uniqueSort === "function") {
					clsName = $.uniqueSort(clsName);
				} else {
					clsName = $.unique(clsName);
				}
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + ' data-date="' + prevMonth.getTime().toString() + '">' + content + '</td>');
				tooltip = null;
				if (weekDay === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
			}
			this.picker.find('.datepicker-days tbody').html(html.join(''));
			var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
			var months = this.picker.find('.datepicker-months')
						.find('.datepicker-switch')
							.text(this.o.maxViewMode < 2 ? monthsTitle : year)
							.end()
						.find('tbody span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});
			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			if (this.o.beforeShowMonth !== $.noop){
				var that = this;
				$.each(months, function(i, month){
                    var moDate = new Date(year, i, 1);
                    var before = that.o.beforeShowMonth(moDate);
					if (before === undefined)
						before = {};
					else if (typeof before === 'boolean')
						before = {enabled: before};
					else if (typeof before === 'string')
						before = {classes: before};
					if (before.enabled === false && !$(month).hasClass('disabled'))
					    $(month).addClass('disabled');
					if (before.classes)
					    $(month).addClass(before.classes);
					if (before.tooltip)
					    $(month).prop('title', before.tooltip);
				});
			}
			// Generating decade/years picker
			this._fill_yearsView(
				'.datepicker-years',
				'year',
				10,
				year,
				startYear,
				endYear,
				this.o.beforeShowYear
			);
			// Generating century/decades picker
			this._fill_yearsView(
				'.datepicker-decades',
				'decade',
				100,
				year,
				startYear,
				endYear,
				this.o.beforeShowDecade
			);
			// Generating millennium/centuries picker
			this._fill_yearsView(
				'.datepicker-centuries',
				'century',
				1000,
				year,
				startYear,
				endYear,
				this.o.beforeShowCentury
			);
		},
		updateNavArrows: function(){
			if (!this._allow_update)
				return;
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				prevIsDisabled,
				nextIsDisabled,
				factor = 1;
			switch (this.viewMode){
				case 4:
					factor *= 10;
					/* falls through */
				case 3:
					factor *= 10;
					/* falls through */
				case 2:
					factor *= 10;
					/* falls through */
				case 1:
					prevIsDisabled = Math.floor(year / factor) * factor <= startYear;
					nextIsDisabled = Math.floor(year / factor) * factor + factor > endYear;
					break;
				case 0:
					prevIsDisabled = year <= startYear && month <= startMonth;
					nextIsDisabled = year >= endYear && month >= endMonth;
					break;
			}
			this.picker.find('.prev').toggleClass('disabled', prevIsDisabled);
			this.picker.find('.next').toggleClass('disabled', nextIsDisabled);
		},
		click: function(e){
			e.preventDefault();
			e.stopPropagation();
			var target, dir, day, year, month;
			target = $(e.target);
			// Clicked on the switch
			if (target.hasClass('datepicker-switch') && this.viewMode !== this.o.maxViewMode){
				this.setViewMode(this.viewMode + 1);
			}
			// Clicked on today button
			if (target.hasClass('today') && !target.hasClass('day')){
				this.setViewMode(0);
				this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
			}
			// Clicked on clear button
			if (target.hasClass('clear')){
				this.clearDates();
			}
			if (!target.hasClass('disabled')){
				// Clicked on a month, year, decade, century
				if (target.hasClass('month')
						|| target.hasClass('year')
						|| target.hasClass('decade')
						|| target.hasClass('century')) {
					this.viewDate.setUTCDate(1);
					day = 1;
					if (this.viewMode === 1){
						month = target.parent().find('span').index(target);
						year = this.viewDate.getUTCFullYear();
						this.viewDate.setUTCMonth(month);
					} else {
						month = 0;
						year = Number(target.text());
						this.viewDate.setUTCFullYear(year);
					}
					this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate);
					if (this.viewMode === this.o.minViewMode){
						this._setDate(UTCDate(year, month, day));
					} else {
						this.setViewMode(this.viewMode - 1);
						this.fill();
					}
				}
			}
			if (this.picker.is(':visible') && this._focused_from){
				this._focused_from.focus();
			}
			delete this._focused_from;
		},
		dayCellClick: function(e){
			var $target = $(e.currentTarget);
			var timestamp = $target.data('date');
			var date = new Date(timestamp);
			if (this.o.updateViewDate) {
				if (date.getUTCFullYear() !== this.viewDate.getUTCFullYear()) {
					this._trigger('changeYear', this.viewDate);
				}
				if (date.getUTCMonth() !== this.viewDate.getUTCMonth()) {
					this._trigger('changeMonth', this.viewDate);
				}
			}
			this._setDate(date);
		},
		// Clicked on prev or next
		navArrowsClick: function(e){
			var $target = $(e.currentTarget);
			var dir = $target.hasClass('prev') ? -1 : 1;
			if (this.viewMode !== 0){
				dir *= DPGlobal.viewModes[this.viewMode].navStep * 12;
			}
			this.viewDate = this.moveMonth(this.viewDate, dir);
			this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate);
			this.fill();
		},
		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}

			if (ix !== -1){
				if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
					this.dates.remove(ix);
				}
			} else if (this.o.multidate === false) {
				this.dates.clear();
				this.dates.push(date);
			}
			else {
				this.dates.push(date);
			}

			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},
		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if ((!which && this.o.updateViewDate) || which === 'view')
				this.viewDate = date && new Date(date);
			this.fill();
			this.setValue();
			if (!which || which !== 'view') {
				this._trigger('changeDate');
			}
			this.inputField.trigger('change');
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},
		moveDay: function(date, dir){
			var newDate = new Date(date);
			newDate.setUTCDate(date.getUTCDate() + dir);
			return newDate;
		},
		moveWeek: function(date, dir){
			return this.moveDay(date, dir * 7);
		},
		moveMonth: function(date, dir){
			if (!isValidDate(date))
				return this.o.defaultViewDate;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},
		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},
		moveAvailableDate: function(date, dir, fn){
			do {
				date = this[fn](date, dir);

				if (!this.dateWithinRange(date))
					return false;

				fn = 'moveDay';
			}
			while (this.dateIsDisabled(date));

			return date;
		},
		weekOfDateIsDisabled: function(date){
			return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
		},
		dateIsDisabled: function(date){
			return (
				this.weekOfDateIsDisabled(date) ||
				$.grep(this.o.datesDisabled, function(d){
					return isUTCEquals(date, d);
				}).length > 0
			);
		},
		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},
		keydown: function(e){
			if (!this.picker.is(':visible')){
				if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
					this.show();
					e.stopPropagation();
                }
				return;
			}
			var dateChanged = false,
				dir, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 37: // left
				case 38: // up
				case 39: // right
				case 40: // down
					if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
						break;
					dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
                    if (this.viewMode === 0) {
	  					if (e.ctrlKey){
	  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

	  						if (newViewDate)
	  							this._trigger('changeYear', this.viewDate);
	  					} else if (e.shiftKey){
	  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

	  						if (newViewDate)
	  							this._trigger('changeMonth', this.viewDate);
	  					} else if (e.keyCode === 37 || e.keyCode === 39){
	  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
	  					} else if (!this.weekOfDateIsDisabled(focusDate)){
	  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
	  					}
			        } else if (this.viewMode === 1) {
			            if (e.keyCode === 38 || e.keyCode === 40) {
			              dir = dir * 4;
			            }
			            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
			          } else if (this.viewMode === 2) {
			            if (e.keyCode === 38 || e.keyCode === 40) {
			              dir = dir * 4;
			            }
			            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
			        }
					if (newViewDate){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 13: // enter
					if (!this.o.forceParse)
						break;
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					if (this.o.keyboardNavigation) {
						this._toggle_multidate(focusDate);
						dateChanged = true;
					}
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						e.stopPropagation();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				this.inputField.trigger('change');
			}
		},
		setViewMode: function(viewMode){
			this.viewMode = viewMode;
			this.picker
				.children('div')
				.hide()
				.filter('.datepicker-' + DPGlobal.viewModes[this.viewMode].clsName)
					.show();
			this.updateNavArrows();
        	this._trigger('changeViewMode', new Date(this.viewDate));
		}
	};
	var DateRangePicker = function(element, options){
		$.data(element, 'datepicker', this);
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;
		this.keepEmptyValues = options.keepEmptyValues;
		delete options.keepEmptyValues;
		datepickerPlugin.call($(this.inputs), options)
			.on('changeDate', $.proxy(this.dateUpdated, this));
		this.pickers = $.map(this.inputs, function(i){
			return $.data(i, 'datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		clearDates: function(){
			$.each(this.pickers, function(i, p){
				p.clearDates();
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;
			var dp = $.data(e.target, 'datepicker');
			if (dp === undefined) {
				return;
			}
			var new_date = dp.getUTCDate(),
				keep_empty_values = this.keepEmptyValues,
				i = $.inArray(e.target, this.inputs),
				j = i - 1,
				k = i + 1,
				l = this.inputs.length;
			if (i === -1)
				return;
			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate() && (p === dp || !keep_empty_values))
					p.setUTCDate(new_date);
			});
			if (new_date < this.dates[j]){
				// Date being moved earlier/left
				while (j >= 0 && new_date < this.dates[j] && (this.pickers[j].element.val() || "").length > 0) {
					this.pickers[j--].setUTCDate(new_date);
				}
			} else if (new_date > this.dates[k]){
				// Date being moved later/right
				while (k < l && new_date > this.dates[k] && (this.pickers[k].element.val() || "").length > 0) {
					this.pickers[k++].setUTCDate(new_date);
				}
			}
			this.updateDates();
			delete this.updating;
		},
		destroy: function(){
			$.map(this.pickers, function(p){ p.destroy(); });
			$(this.inputs).off('changeDate', this.dateUpdated);
			delete this.element.data().datepicker;
		},
		remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead')
	};
	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
			console.log('DP',key,inkey);
				out[inkey] = data[key];
			}
		return out;
	}
	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}
	var old = $.fn.datepicker;
	var datepickerPlugin = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.hasClass('input-daterange') || opts.inputs){
					$.extend(opts, {
						inputs: opts.inputs || $this.find('input').toArray()
					});
					data = new DateRangePicker(this, opts);
				}
				else {
					data = new Datepicker(this, opts);
				}
				$this.data('datepicker', data);
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
			}
		});
		if (
			internal_return === undefined ||
			internal_return instanceof Datepicker ||
			internal_return instanceof DateRangePicker
		)
			return this;
		if (this.length > 1)
			throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
		else
			return internal_return;
	};
	$.fn.datepicker = datepickerPlugin;
	var defaults = $.fn.datepicker.defaults = {
		assumeNearbyYear: false,
		autoclose: true,
		beforeShowDay: $.noop,
		beforeShowMonth: $.noop,
		beforeShowYear: $.noop,
		beforeShowDecade: $.noop,
		beforeShowCentury: $.noop,
		calendarWeeks: false,
		clearBtn: true,
		toggleActive: false,
		daysOfWeekDisabled: [],
		daysOfWeekHighlighted: [],
		datesDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'yyyy-mm-dd',
		isInline: null,
		keepEmptyValues: false,
		keyboardNavigation: true,
		language: IS_lang,
		minViewMode: 0,
		maxViewMode: 4,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: true,
		todayHighlight: true,
		updateViewDate: true,
		weekStart: 1,
		disableTouchKeyboard: false,
		enableOnReadonly: false,
		showOnFocus: true,
		zIndexOffset: 10,
		container: 'parent',
		immediateUpdates: false,
		title: true,
		templates: {
			leftArrow: '&#x00AB;',
			rightArrow: '&#x00BB;'
		},
    	showWeekDays: true
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear",
			titleFormat: "MM yyyy"
		}
	};
	var DPGlobal = {
		viewModes: [
			{
				names: ['days', 'month'],
				clsName: 'days',
				e: 'changeMonth'
			},
			{
				names: ['months', 'year'],
				clsName: 'months',
				e: 'changeYear',
				navStep: 1
			},
			{
				names: ['years', 'decade'],
				clsName: 'years',
				e: 'changeDecade',
				navStep: 10
			},
			{
				names: ['decades', 'century'],
				clsName: 'decades',
				e: 'changeCentury',
				navStep: 100
			},
			{
				names: ['centuries', 'millennium'],
				clsName: 'centuries',
				e: 'changeMillennium',
				navStep: 1000
			}
		],
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
                return format;
            // IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language, assumeNearby){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toValue)
				return format.toValue(date, format, language);
			var fn_map = {
					d: 'moveDay',
					m: 'moveMonth',
					w: 'moveWeek',
					y: 'moveYear'
				},
				dateAliases = {
					yesterday: '-1d',
					today: '+0d',
					tomorrow: '+1d'
				},
				parts, part, dir, i, fn;
			if (date in dateAliases){
				date = dateAliases[date];
			}
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)){
				parts = date.match(/([\-+]\d+)([dmwy])/gi);
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = parts[i].match(/([\-+]\d+)([dmwy])/i);
					dir = Number(part[1]);
					fn = fn_map[part[2].toLowerCase()];
					date = Datepicker.prototype[fn](date, dir);
				}
				return Datepicker.prototype._zero_utc_time(date);
			}
			parts = date && date.match(this.nonpunctuation) || [];
			function applyNearbyYear(year, threshold){
				if (threshold === true)
					threshold = 10;

				// if year is 2 digits or less, than the user most likely is trying to get a recent century
				if (year < 100){
					year += 2000;
					// if the new year is more than threshold years in advance, use last century
					if (year > ((new Date()).getFullYear()+threshold)){
						year -= 100;
					}
				}

				return year;
			}
			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['yy'] = setters_map['yyyy'];
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCToday();
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m.toLowerCase() === p.toLowerCase();
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toDisplay)
                return format.toDisplay(date, format, language);
            var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
			              '<tr>'+
			                '<th colspan="7" class="datepicker-title"></th>'+
			              '</tr>'+
							'<tr>'+
								'<th class="prev">'+defaults.templates.leftArrow+'</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">'+defaults.templates.rightArrow+'</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="4"><div class="today"></div></th>'+
								'<th colspan="3"><div class="clear"></div></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-decades">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-centuries">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;

	/* DATEPICKER NO CONFLICT
	* =================== */
	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};
	/* DATEPICKER VERSION
	 * =================== */
	$.fn.datepicker.version = '1.10.0';
	$.fn.datepicker.deprecated = function(msg){
		var console = window.console;
		if (console && console.warn) {
			console.warn('DEPRECATED: ' + msg);
		}
	};

	/* DATEPICKER DATA-API
	* ================== */
	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			datepickerPlugin.call($this, 'show');
		}
	);
	$(function(){
		datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
	});
}));


/**
 *
 * Date picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 */
(function ($) {
	var DatePicker = function () {
		var	ids = {},
			views = {
				years: 'datepickerViewYears',
				months: 'datepickerViewMonths',
				days: 'datepickerViewDays'
			},
			tpl = {
				wrapper: '<div class="mdl-datepicker"><div class="datepickerContainer"><table cellspacing="0" cellpadding="0"><tbody><tr></tr></tbody></table></div></div>',
				head: [
					'<td>',
					'<table cellspacing="0" cellpadding="0">',
						'<thead>',
							'<tr>',
								'<th class="datepickerGoPrev"><a href="#"><span><%=prev%></span></a></th>',
								'<th colspan="5" class="datepickerMonth"><a href="#"><span></span></a></th>',
								'<th class="datepickerGoNext"><a href="#"><span><%=next%></span></a></th>',
							'</tr>',
							'<tr class="datepickerDoW">',
								'<th><span><%=week%></span></th>',
								'<th><span><%=day1%></span></th>',
								'<th><span><%=day2%></span></th>',
								'<th><span><%=day3%></span></th>',
								'<th><span><%=day4%></span></th>',
								'<th><span><%=day5%></span></th>',
								'<th><span><%=day6%></span></th>',
								'<th><span><%=day7%></span></th>',
							'</tr>',
						'</thead>',
					'</table></td>'
				],
				space : '<td class="datepickerSpace"><div></div></td>',
				days: [
					'<tbody class="datepickerDays">',
						'<tr>',
							'<th class="datepickerWeek"><a href="#"><span><%=weeks[0].week%></span></a></th>',
							'<td class="<%=weeks[0].days[0].classname%>"><a href="#"><span><%=weeks[0].days[0].text%></span></a></td>',
							'<td class="<%=weeks[0].days[1].classname%>"><a href="#"><span><%=weeks[0].days[1].text%></span></a></td>',
							'<td class="<%=weeks[0].days[2].classname%>"><a href="#"><span><%=weeks[0].days[2].text%></span></a></td>',
							'<td class="<%=weeks[0].days[3].classname%>"><a href="#"><span><%=weeks[0].days[3].text%></span></a></td>',
							'<td class="<%=weeks[0].days[4].classname%>"><a href="#"><span><%=weeks[0].days[4].text%></span></a></td>',
							'<td class="<%=weeks[0].days[5].classname%>"><a href="#"><span><%=weeks[0].days[5].text%></span></a></td>',
							'<td class="<%=weeks[0].days[6].classname%>"><a href="#"><span><%=weeks[0].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek"><a href="#"><span><%=weeks[1].week%></span></a></th>',
							'<td class="<%=weeks[1].days[0].classname%>"><a href="#"><span><%=weeks[1].days[0].text%></span></a></td>',
							'<td class="<%=weeks[1].days[1].classname%>"><a href="#"><span><%=weeks[1].days[1].text%></span></a></td>',
							'<td class="<%=weeks[1].days[2].classname%>"><a href="#"><span><%=weeks[1].days[2].text%></span></a></td>',
							'<td class="<%=weeks[1].days[3].classname%>"><a href="#"><span><%=weeks[1].days[3].text%></span></a></td>',
							'<td class="<%=weeks[1].days[4].classname%>"><a href="#"><span><%=weeks[1].days[4].text%></span></a></td>',
							'<td class="<%=weeks[1].days[5].classname%>"><a href="#"><span><%=weeks[1].days[5].text%></span></a></td>',
							'<td class="<%=weeks[1].days[6].classname%>"><a href="#"><span><%=weeks[1].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek"><a href="#"><span><%=weeks[2].week%></span></a></th>',
							'<td class="<%=weeks[2].days[0].classname%>"><a href="#"><span><%=weeks[2].days[0].text%></span></a></td>',
							'<td class="<%=weeks[2].days[1].classname%>"><a href="#"><span><%=weeks[2].days[1].text%></span></a></td>',
							'<td class="<%=weeks[2].days[2].classname%>"><a href="#"><span><%=weeks[2].days[2].text%></span></a></td>',
							'<td class="<%=weeks[2].days[3].classname%>"><a href="#"><span><%=weeks[2].days[3].text%></span></a></td>',
							'<td class="<%=weeks[2].days[4].classname%>"><a href="#"><span><%=weeks[2].days[4].text%></span></a></td>',
							'<td class="<%=weeks[2].days[5].classname%>"><a href="#"><span><%=weeks[2].days[5].text%></span></a></td>',
							'<td class="<%=weeks[2].days[6].classname%>"><a href="#"><span><%=weeks[2].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek"><a href="#"><span><%=weeks[3].week%></span></a></th>',
							'<td class="<%=weeks[3].days[0].classname%>"><a href="#"><span><%=weeks[3].days[0].text%></span></a></td>',
							'<td class="<%=weeks[3].days[1].classname%>"><a href="#"><span><%=weeks[3].days[1].text%></span></a></td>',
							'<td class="<%=weeks[3].days[2].classname%>"><a href="#"><span><%=weeks[3].days[2].text%></span></a></td>',
							'<td class="<%=weeks[3].days[3].classname%>"><a href="#"><span><%=weeks[3].days[3].text%></span></a></td>',
							'<td class="<%=weeks[3].days[4].classname%>"><a href="#"><span><%=weeks[3].days[4].text%></span></a></td>',
							'<td class="<%=weeks[3].days[5].classname%>"><a href="#"><span><%=weeks[3].days[5].text%></span></a></td>',
							'<td class="<%=weeks[3].days[6].classname%>"><a href="#"><span><%=weeks[3].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek"><a href="#"><span><%=weeks[4].week%></span></a></th>',
							'<td class="<%=weeks[4].days[0].classname%>"><a href="#"><span><%=weeks[4].days[0].text%></span></a></td>',
							'<td class="<%=weeks[4].days[1].classname%>"><a href="#"><span><%=weeks[4].days[1].text%></span></a></td>',
							'<td class="<%=weeks[4].days[2].classname%>"><a href="#"><span><%=weeks[4].days[2].text%></span></a></td>',
							'<td class="<%=weeks[4].days[3].classname%>"><a href="#"><span><%=weeks[4].days[3].text%></span></a></td>',
							'<td class="<%=weeks[4].days[4].classname%>"><a href="#"><span><%=weeks[4].days[4].text%></span></a></td>',
							'<td class="<%=weeks[4].days[5].classname%>"><a href="#"><span><%=weeks[4].days[5].text%></span></a></td>',
							'<td class="<%=weeks[4].days[6].classname%>"><a href="#"><span><%=weeks[4].days[6].text%></span></a></td>',
						'</tr>',
						'<tr>',
							'<th class="datepickerWeek"><a href="#"><span><%=weeks[5].week%></span></a></th>',
							'<td class="<%=weeks[5].days[0].classname%>"><a href="#"><span><%=weeks[5].days[0].text%></span></a></td>',
							'<td class="<%=weeks[5].days[1].classname%>"><a href="#"><span><%=weeks[5].days[1].text%></span></a></td>',
							'<td class="<%=weeks[5].days[2].classname%>"><a href="#"><span><%=weeks[5].days[2].text%></span></a></td>',
							'<td class="<%=weeks[5].days[3].classname%>"><a href="#"><span><%=weeks[5].days[3].text%></span></a></td>',
							'<td class="<%=weeks[5].days[4].classname%>"><a href="#"><span><%=weeks[5].days[4].text%></span></a></td>',
							'<td class="<%=weeks[5].days[5].classname%>"><a href="#"><span><%=weeks[5].days[5].text%></span></a></td>',
							'<td class="<%=weeks[5].days[6].classname%>"><a href="#"><span><%=weeks[5].days[6].text%></span></a></td>',
						'</tr>',
					'</tbody>'
				],
				months: [
					'<tbody class="<%=className%>">',
						'<tr>',
							'<td colspan="2"><a href="#"><span><%=data[0]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[1]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[2]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[3]%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2"><a href="#"><span><%=data[4]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[5]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[6]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[7]%></span></a></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2"><a href="#"><span><%=data[8]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[9]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[10]%></span></a></td>',
							'<td colspan="2"><a href="#"><span><%=data[11]%></span></a></td>',
						'</tr>',
					'</tbody>'
				]
			},
			defaults = {
				flat: false,
				starts: 1,
				prev: '&#9664;',
				next: '&#9654;',
				lastSel: false,
				mode: 'single',
				view: 'days',
				calendars: 1,
				format: 'Y-m-d',
				position: 'bottom',
				eventName: 'click',
				allowFrom: false,
				allowTo: false,
				onRender: function(){return {};},
				onChange: function(){return true;},
				onShow: function(){return true;},
				onBeforeShow: function(){return true;},
				onHide: function(){return true;},
				locale: {
					days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
					daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
					months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					weekMin: 'wk'
				}
			},
			fill = function(el) {
				var options = $(el).data('datepicker');
				var cal = $(el);
				var currentCal = Math.floor(options.calendars/2), date, data, dow, month, cnt = 0, week, days, indic, indic2, html, tblCal;
				cal.find('td>table tbody').remove();
				for (var i = 0; i < options.calendars; i++) {
					date = new Date(options.current);
					date.addMonths(-currentCal + i);
					tblCal = cal.find('table').eq(i+1);
					switch (tblCal[0].className) {
						case 'datepickerViewDays':
							dow = formatDate(date, 'B, Y');
							break;
						case 'datepickerViewMonths':
							dow = date.getFullYear();
							break;
						case 'datepickerViewYears':
							dow = (date.getFullYear()-6) + ' - ' + (date.getFullYear()+5);
							break;
					} 
					tblCal.find('thead tr:first th:eq(1) span').text(dow);
					dow = date.getFullYear()-6;
					data = {
						data: [],
						className: 'datepickerYears'
					}
					for ( var j = 0; j < 12; j++) {
						data.data.push(dow + j);
					}
					html = tmpl(tpl.months.join(''), data);
					date.setDate(1);
					data = {weeks:[], test: 10};
					month = date.getMonth();
					var dow = (date.getDay() - options.starts) % 7;
					date.addDays(-(dow + (dow < 0 ? 7 : 0)));
					week = -1;
					cnt = 0;
					while (cnt < 42) {
						indic = parseInt(cnt/7,10);
						indic2 = cnt%7;
						if (!data.weeks[indic]) {
							week = date.getWeekNumber();
							data.weeks[indic] = {
								week: week,
								days: []
							};
						}
						data.weeks[indic].days[indic2] = {
							text: date.getDate(),
							classname: []
						};
						if (month != date.getMonth()) {
							data.weeks[indic].days[indic2].classname.push('datepickerNotInMonth');
						}
						if (date.getDay() == 0) {
							data.weeks[indic].days[indic2].classname.push('datepickerSunday');
						}
						if (date.getDay() == 6) {
							data.weeks[indic].days[indic2].classname.push('datepickerSaturday');
						}
						var fromUser = options.onRender(date);
						var val = date.valueOf();
						if (fromUser.selected || options.date == val || $.inArray(val, options.date) > -1 || (options.mode == 'range' && val >= options.date[0] && val <= options.date[1])) {
							data.weeks[indic].days[indic2].classname.push('datepickerSelected');
						}
						if (fromUser.disabled) {
							data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
						}
						if (fromUser.className) {
							data.weeks[indic].days[indic2].classname.push(fromUser.className);
						}
						data.weeks[indic].days[indic2].classname = data.weeks[indic].days[indic2].classname.join(' ');
						cnt++;
						date.addDays(1);
					}
					html = tmpl(tpl.days.join(''), data) + html;
					data = {
						data: options.locale.monthsShort,
						className: 'datepickerMonths'
					};
					html = tmpl(tpl.months.join(''), data) + html;
					tblCal.append(html);
				}
			},
			parseDate = function (date, format) {
				if (date.constructor == Date) {
					return new Date(date);
				}
				var parts = date.split(/\W+/);
				var against = format.split(/\W+/), d, m, y, h, min, now = new Date();
				for (var i = 0; i < parts.length; i++) {
					switch (against[i]) {
						case 'd':
						case 'e':
							d = parseInt(parts[i],10);
							break;
						case 'm':
							m = parseInt(parts[i], 10)-1;
							break;
						case 'Y':
						case 'y':
							y = parseInt(parts[i], 10);
							y += y > 100 ? 0 : (y < 29 ? 2000 : 1900);
							break;
						case 'H':
						case 'I':
						case 'k':
						case 'l':
							h = parseInt(parts[i], 10);
							break;
						case 'P':
						case 'p':
							if (/pm/i.test(parts[i]) && h < 12) {
								h += 12;
							} else if (/am/i.test(parts[i]) && h >= 12) {
								h -= 12;
							}
							break;
						case 'M':
							min = parseInt(parts[i], 10);
							break;
					}
				}
				return new Date(
					y === undefined ? now.getFullYear() : y,
					m === undefined ? now.getMonth() : m,
					d === undefined ? now.getDate() : d,
					h === undefined ? now.getHours() : h,
					min === undefined ? now.getMinutes() : min,
					0
				);
			},
			formatDate = function(date, format) {
				var m = date.getMonth();
				var d = date.getDate();
				var y = date.getFullYear();
				var wn = date.getWeekNumber();
				var w = date.getDay();
				var s = {};
				var hr = date.getHours();
				var pm = (hr >= 12);
				var ir = (pm) ? (hr - 12) : hr;
				var dy = date.getDayOfYear();
				if (ir == 0) {
					ir = 12;
				}
				var min = date.getMinutes();
				var sec = date.getSeconds();
				var parts = format.split(''), part;
				for ( var i = 0; i < parts.length; i++ ) {
					part = parts[i];
					switch (parts[i]) {
						case 'a':
							part = date.getDayName();
							break;
						case 'A':
							part = date.getDayName(true);
							break;
						case 'b':
							part = date.getMonthName();
							break;
						case 'B':
							part = date.getMonthName(true);
							break;
						case 'C':
							part = 1 + Math.floor(y / 100);
							break;
						case 'd':
							part = (d < 10) ? ("0" + d) : d;
							break;
						case 'e':
							part = d;
							break;
						case 'H':
							part = (hr < 10) ? ("0" + hr) : hr;
							break;
						case 'I':
							part = (ir < 10) ? ("0" + ir) : ir;
							break;
						case 'j':
							part = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy;
							break;
						case 'k':
							part = hr;
							break;
						case 'l':
							part = ir;
							break;
						case 'm':
							part = (m < 9) ? ("0" + (1+m)) : (1+m);
							break;
						case 'M':
							part = (min < 10) ? ("0" + min) : min;
							break;
						case 'p':
						case 'P':
							part = pm ? "PM" : "AM";
							break;
						case 's':
							part = Math.floor(date.getTime() / 1000);
							break;
						case 'S':
							part = (sec < 10) ? ("0" + sec) : sec;
							break;
						case 'u':
							part = w + 1;
							break;
						case 'w':
							part = w;
							break;
						case 'y':
							part = ('' + y).substr(2, 2);
							break;
						case 'Y':
							part = y;
							break;
					}
					parts[i] = part;
				}
				return parts.join('');
			},
			extendDate = function(options) {
				if (Date.prototype.tempDate) {
					return;
				}
				Date.prototype.tempDate = null;
				Date.prototype.months = options.months;
				Date.prototype.monthsShort = options.monthsShort;
				Date.prototype.days = options.days;
				Date.prototype.daysShort = options.daysShort;
				Date.prototype.getMonthName = function(fullName) {
					return this[fullName ? 'months' : 'monthsShort'][this.getMonth()];
				};
				Date.prototype.getDayName = function(fullName) {
					return this[fullName ? 'days' : 'daysShort'][this.getDay()];
				};
				Date.prototype.addDays = function (n) {
					this.setDate(this.getDate() + n);
					this.tempDate = this.getDate();
				};
				Date.prototype.addMonths = function (n) {
					if (this.tempDate == null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setMonth(this.getMonth() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.addYears = function (n) {
					if (this.tempDate == null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setFullYear(this.getFullYear() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.getMaxDays = function() {
					var tmpDate = new Date(Date.parse(this)),
						d = 28, m;
					m = tmpDate.getMonth();
					d = 28;
					while (tmpDate.getMonth() == m) {
						d ++;
						tmpDate.setDate(d);
					}
					return d - 1;
				};
				Date.prototype.getFirstDay = function() {
					var tmpDate = new Date(Date.parse(this));
					tmpDate.setDate(1);
					return tmpDate.getDay();
				};
				Date.prototype.getWeekNumber = function() {
					var tempDate = new Date(this);
					tempDate.setDate(tempDate.getDate() - (tempDate.getDay() + 6) % 7 + 3);
					var dms = tempDate.valueOf();
					tempDate.setMonth(0);
					tempDate.setDate(4);
					return Math.round((dms - tempDate.valueOf()) / (604800000)) + 1;
				};
				Date.prototype.getDayOfYear = function() {
					var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
					var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
					var time = now - then;
					return Math.floor(time / 24*60*60*1000);
				};
			},
			layout = function (el) {
				var options = $(el).data('datepicker');
				var cal = $('#' + options.id);
				if (!options.extraHeight) {
					var divs = $(el).find('div.datepickerContainer');
					options.extraHeight = divs.outerHeight(true) - divs.height();
					options.extraWidth = divs.outerWidth(true) - divs.width();
				}
				var tbl = cal.find('table:first').get(0);
				var width = tbl.offsetWidth;
				var height = tbl.offsetHeight;
				cal.css({
					width: width + options.extraWidth + 'px',
					height: height + options.extraHeight + 'px'
				}).find('div.datepickerContainer').css({
					width: width + options.extraWidth + 'px',
					height: height + options.extraWidth + 'px'
				});
			},
			click = function(ev) {
				if ($(ev.target).is('span')) {
					ev.target = ev.target.parentNode;
				}
				var el = $(ev.target);
				if (el.is('a')) {
					ev.target.blur();
					if (el.hasClass('datepickerDisabled')) {
						return false;
					}
					var options = $(this).data('datepicker');
					var parentEl = el.parent();
					var tblEl = parentEl.parent().parent().parent();
					var tblIndex = $('table', this).index(tblEl.get(0)) - 1;
					var tmp = new Date(options.current);
					var changed = false;
					var fillIt = false;
					if (parentEl.is('th')) {
						if (parentEl.hasClass('datepickerWeek') && options.mode == 'range' && !parentEl.next().hasClass('datepickerDisabled')) {
							var val = parseInt(parentEl.next().text(), 10);
							tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
							if (parentEl.next().hasClass('datepickerNotInMonth')) {
								tmp.addMonths(val > 15 ? -1 : 1);
							}
							tmp.setDate(val);
							options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();
							tmp.setHours(23,59,59,0);
							tmp.addDays(6);
							options.date[1] = tmp.valueOf();
							fillIt = true;
							changed = true;
							options.lastSel = false;
						} else if (parentEl.hasClass('datepickerMonth')) {
							tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
							switch (tblEl.get(0).className) {
								case 'datepickerViewDays':
									tblEl.get(0).className = 'datepickerViewMonths';
									el.find('span').text(tmp.getFullYear());
									break;
								case 'datepickerViewMonths':
									tblEl.get(0).className = 'datepickerViewYears';
									el.find('span').text((tmp.getFullYear()-6) + ' - ' + (tmp.getFullYear()+5));
									break;
								case 'datepickerViewYears':
									tblEl.get(0).className = 'datepickerViewDays';
									el.find('span').text(formatDate(tmp, 'B, Y'));
									break;
							}
						} else if (parentEl.parent().parent().is('thead')) {
							switch (tblEl.get(0).className) {
								case 'datepickerViewDays':
									options.current.addMonths(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
								case 'datepickerViewMonths':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
								case 'datepickerViewYears':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -12 : 12);
									break;
							}
							fillIt = true;
						}
					} else if (parentEl.is('td') && !parentEl.hasClass('datepickerDisabled')) {
						switch (tblEl.get(0).className) {
							case 'datepickerViewMonths':
								options.current.setMonth(tblEl.find('tbody.datepickerMonths td').index(parentEl));
								options.current.setFullYear(parseInt(tblEl.find('thead th.datepickerMonth span').text(), 10));
								options.current.addMonths(Math.floor(options.calendars/2) - tblIndex);
								if ( typeof( options.minView ) != 'undefined' && options.minView == 'months' ) {
									var tmp = new Date(options.current);
									options.date = tmp.valueOf();
								} else {
									tblEl.get(0).className = 'datepickerViewDays';
									tblEl.get(0).setAttribute('data-before', 'months');
								}
								changed = false;
								break;
							case 'datepickerViewYears':
								options.current.setFullYear(parseInt(el.text(), 10));
								tblEl.get(0).className = 'datepickerViewMonths';
								tblEl.get(0).setAttribute('data-before', 'years');
								changed = false;
								break;
							default:
								var val = parseInt(el.text(), 10);
								tmp.addMonths(tblIndex - Math.floor(options.calendars/2));
								if (parentEl.hasClass('datepickerNotInMonth')) {
									tmp.addMonths(val > 15 ? -1 : 1);
								}
								tmp.setDate(val);
								switch (options.mode) {
									case 'multiple':
										val = (tmp.setHours(0,0,0,0)).valueOf();
										if ($.inArray(val, options.date) > -1) {
											$.each(options.date, function(nr, dat){
												if (dat == val) {
													options.date.splice(nr,1);
													return false;
												}
											});
										} else {
											options.date.push(val);
										}
										break;
									case 'range':
										if (!options.lastSel) {
											options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();
										}
										val = (tmp.setHours(23,59,59,0)).valueOf();
										if (val < options.date[0]) {
											options.date[1] = options.date[0] + 86399000;
											options.date[0] = val - 86399000;
										} else {
											options.date[1] = val;
										}
										options.lastSel = !options.lastSel;
										break;
									default:
										options.date = tmp.valueOf();
										break;
								}
								tblEl.get(0).removeAttribute('data-before');
								changed = true;
								break;
						}
						fillIt = true;
						changed = true;
					}
					if (fillIt) {
						fill(this);
					}
					if (changed) {
						options.onChange.apply(this, prepareDate(options));
					}
				}
				return false;
			},
			prepareDate = function (options) {
				var tmp;
				if (options.mode == 'single') {
					tmp = new Date(options.date);
					return [formatDate(tmp, options.format), tmp, options.el];
				} else {
					tmp = [[],[], options.el];
					$.each(options.date, function(nr, val){
						var date = new Date(val);
						tmp[0].push(formatDate(date, options.format));
						tmp[1].push(date);
					});
					return tmp;
				}
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('datepickerId'));
				if (!cal.is(':visible')) {
					var calEl = cal.get(0);
					fill(calEl);
					var options = cal.data('datepicker');
					options.onBeforeShow.apply(this, [cal.get(0)]);
					var pos = $(this).offset();
					if ($(this).closest('DIALOG').length > 0) {
						var d_pos = $(this).closest('DIALOG').offset();
						pos.top = pos.top - d_pos.top;
						pos.left = pos.left - d_pos.left;
					}
					var viewPort = getViewport();
					var top = pos.top;
					var left = pos.left;
					var oldDisplay = $.curCSS(calEl, 'display');
					cal.css({
						visibility: 'hidden',
						display: 'block'
					});
					layout(calEl);
					switch (options.position){
						case 'top':
//							top -= calEl.offsetHeight + 50;
							top -= calEl.offsetHeight;
							break;
						case 'left':
							top += this.offsetHeight;
//							left -= calEl.offsetWidth;
							break;
						case 'right':
//							left += this.offsetWidth;
							top += this.offsetHeight;
							left += this.offsetWidth - calEl.offsetWidth;
							break;
						case 'bottom':
							top += this.offsetHeight;
							break;
						case 'bottomleft':
							top += this.offsetHeight;
//							left -= calEl.offsetWidth;
							break;
						case 'bottomright':
							top += this.offsetHeight;
//							left += this.offsetWidth;
							left += this.offsetWidth - calEl.offsetWidth;
							break;
						case 'topleft':
//							top -= calEl.offsetHeight;
//							left -= calEl.offsetWidth;
							top -= calEl.offsetHeight;
							break;
						case 'topright':
//							top -= calEl.offsetHeight;
//							left += this.offsetWidth;
							top -= calEl.offsetHeight;
							left += ( this.offsetWidth - calEl.offsetWidth );
							break;
					}

					if (top + calEl.offsetHeight > viewPort.t + viewPort.h) {
//						top = pos.top  - calEl.offsetHeight;
						top = viewPort.t + viewPort.h - calEl.offsetHeight;
					}
					if (top < viewPort.t) {
//						top = pos.top + this.offsetHeight + calEl.offsetHeight;
						top = viewPort.t;
					}
					if (left + calEl.offsetWidth > viewPort.l + viewPort.w) {
//						left = pos.left - calEl.offsetWidth;
						left = viewPort.l + viewPort.w - calEl.offsetWidth;
					}
					if (left < viewPort.l) {
//						left = pos.left + this.offsetWidth
						left = viewPort.l;
					}

					cal.css({
						visibility: 'visible',
						display: 'block',
						top: top + 'px',
						left: left + 'px'
					});
					if (options.onShow.apply(this, [cal.get(0)]) != false) {
						cal.show();
					}
					$(document).bind('mousedown', {cal: cal, trigger: this}, hide);
				}
				return false;
			},
			hide = function (ev) {
				if (ev.target != ev.data.trigger && !isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('datepicker').onHide.apply(this, [ev.data.cal.get(0), ev.data.trigger]) != false) {
						ev.data.cal.hide();
					}
					$(document).unbind('mousedown', hide);
				}
			};
		return {
			init: function(options){
				options = $.extend({}, defaults, options||{});
				extendDate(options.locale);
				options.calendars = Math.max(1, parseInt(options.calendars,10)||1);
				options.mode = /single|multiple|range/.test(options.mode) ? options.mode : 'single';
				return this.each(function(){
					if (!$(this).data('datepicker')) {
						options.el = this;
						if (options.date.constructor == String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode != 'single') {
							if (options.date.constructor != Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (!options.current) {
							options.current = new Date();
						} else {
							options.current = parseDate(options.current, options.format);
						} 
						options.current.setDate(1);
						options.current.setHours(0,0,0,0);
						var id = 'datepicker_' + parseInt(Math.random() * 1000), cnt;
						options.id = id;
						$(this).data('datepickerId', options.id);
						var cal = $(tpl.wrapper).attr('id', id).bind('click', click).data('datepicker', options);
						if (options.className) {
							cal.addClass(options.className);
						}
						var html = '';
						for (var i = 0; i < options.calendars; i++) {
							cnt = options.starts;
							if (i > 0) {
								html += tpl.space;
							}
							html += tmpl(tpl.head.join(''), {
									week: options.locale.weekMin,
									prev: options.prev,
									next: options.next,
									day1: options.locale.daysMin[(cnt++)%7],
									day2: options.locale.daysMin[(cnt++)%7],
									day3: options.locale.daysMin[(cnt++)%7],
									day4: options.locale.daysMin[(cnt++)%7],
									day5: options.locale.daysMin[(cnt++)%7],
									day6: options.locale.daysMin[(cnt++)%7],
									day7: options.locale.daysMin[(cnt++)%7]
								});
						}
						cal
							.find('tr:first').append(html)
								.find('table').addClass(views[options.view]);
						fill(cal.get(0));
						if (options.flat) {
							cal.appendTo(this).show().css('position', 'relative');
							layout(cal.get(0));
						} else {
							var doc = $(this).closest('DIALOG').length > 0 ? $(this).closest('DIALOG') : document.body;
//							cal.appendTo(document.body);
							cal.appendTo(doc);
							$(this).bind(options.eventName, show);
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('datepickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('datepickerId')) {
						$(this).change();
						$('#' + $(this).data('datepickerId')).hide();
					}
				});
			},
			setDate: function(date, shiftTo){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						options.date = date;
						if (options.date.constructor == String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode != 'single') {
							if (options.date.constructor != Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (shiftTo) {
							options.current = new Date (options.mode != 'single' ? options.date[0] : options.date);
						}
						fill(cal.get(0));
					}
				});
			},
			getDate: function(formated) {
				if (this.size() > 0) {
					return prepareDate($('#' + $(this).data('datepickerId')).data('datepicker'))[formated ? 0 : 1];
				}
			},
			clear: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.mode != 'single') {
							options.date = [];
							fill(cal.get(0));
						}
					}
				});
			},
			fixLayout: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.flat) {
							layout(cal.get(0));
						}
					}
				});
			}
		};
	}();
	$.fn.extend({
		DatePicker: DatePicker.init,
		DatePickerHide: DatePicker.hidePicker,
		DatePickerShow: DatePicker.showPicker,
		DatePickerSetDate: DatePicker.setDate,
		DatePickerGetDate: DatePicker.getDate,
		DatePickerClear: DatePicker.clear,
		DatePickerLayout: DatePicker.fixLayout
	});
})(jQuery);

$.fn.serializeAssoc = function() {
	var data = {};
	$.each( this.serializeArray(), function( key, obj ) {
		var a = obj.name.match(/(.*?)\[(.*?)\]/);
		if ( a !== null ) {
			var subName = a[1];
			var subKey = a[2];

			if ( !data[subName] ) data[subName] = [ ];
			if ( !subKey.length ) subKey = data[subName].length;
			if ( data[subName][subKey] ) {
				if ( $.isArray( data[subName][subKey] ) ) {
					data[subName][subKey].push( obj.value );
				} else {
					data[subName][subKey] = [ ];
					data[subName][subKey].push( obj.value );
				}
			} else data[subName][subKey] = obj.value;
		} else {
			if( data[obj.name] ) {
				if( $.isArray( data[obj.name] ) ) {
					data[obj.name].push( obj.value );
				} else {
					data[obj.name] = [ ];
					data[obj.name].push( obj.value );
				}
			} else data[obj.name] = obj.value;
		}
	});
	return data;
};

(function(){
	var cache = {};
	this.tmpl = function tmpl(str, data){
		// Figure out if we're getting a template, or if we need to load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
		cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
		// Generate a reusable function that will serve as a template generator (and which will be cached).
		new Function("obj",
			"var p=[],print=function(){p.push.apply(p,arguments);};" +
			// Introduce the data as local variables using with(){}
			"with(obj){p.push('" +
				// Convert the template into pure JavaScript
				str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'")
				+ "');}return p.join('');");
		// Provide some basic currying to the user
		return data ? fn( data ) : fn;
	};
})();

jQuery.curCSS = function(element, prop, val) {
	return jQuery(element).css(prop, val);
};
