/*
Copyright 2010 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var Base=function(){};Base.extend=function(b,e){var f=Base.prototype.extend;Base._prototyping=true;var d=new this;f.call(d,b);delete Base._prototyping;var c=d.constructor;var a=d.constructor=function(){if(!Base._prototyping){if(this._constructing||this.constructor==a){this._constructing=true;c.apply(this,arguments);delete this._constructing}else{if(arguments[0]!=null){return(arguments[0].extend||f).call(arguments[0],d)}}}};a.ancestor=this;a.extend=this.extend;a.forEach=this.forEach;a.implement=this.implement;a.prototype=d;a.toString=this.toString;a.valueOf=function(g){return(g=="object")?a:c.valueOf()};f.call(a,e);if(typeof a.init=="function"){a.init()}return a};Base.prototype={extend:function(b,h){if(arguments.length>1){var e=this[b];if(e&&(typeof h=="function")&&(!e.valueOf||e.valueOf()!=h.valueOf())&&/\bbase\b/.test(h)){var a=h.valueOf();h=function(){var k=this.base||Base.prototype.base;this.base=e;var i=a.apply(this,arguments);this.base=k;return i};h.valueOf=function(i){return(i=="object")?h:a};h.toString=Base.toString}this[b]=h}else{if(b){var g=Base.prototype.extend;if(!Base._prototyping&&typeof this!="function"){g=this.extend||g}var d={toSource:null};var f=["constructor","toString","valueOf"];var c=Base._prototyping?0:1;while(j=f[c++]){if(b[j]!=d[j]){g.call(this,j,b[j])}}for(var j in b){if(!d[j]){g.call(this,j,b[j])}}}}return this},base:function(){}};Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,d,c){for(var b in a){if(this.prototype[b]===undefined){d.call(c,a[b],b,a)}}},implement:function(){for(var a=0;a<arguments.length;a++){if(typeof arguments[a]=="function"){arguments[a](this.prototype)}else{this.prototype.extend(arguments[a])}}return this},toString:function(){return String(this.valueOf())}});(function(){var c={};var b={create:function(){var f=arguments[0];function d(){this.initialize.apply(this,arguments)}for(var e in f){d.prototype[e]=f[e]}if(!d.prototype.initialize){d.prototype.initialize=function(){}}return d}};var a=b.create({initialize:function(e,f,d){this.r=(Math.sqrt(e.length)-1)/2;this.matrix=e;this.divisor=f;this.bias=d},apply:function(e,p){var v=e.width,j=e.height;var n=e.data;var f=p.data;var o,i,u;var d,l,s;for(var q=0;q<j;++q){for(var t=0;t<v;++t){u=d=l=s=0;o=(q*v+t)<<2;for(var k=-this.r;k<=this.r;++k){for(var m=-this.r;m<=this.r;++m){i=(Math.max(0,Math.min(j-1,q+k))*v+Math.max(0,Math.min(v-1,t+m)))<<2;d+=n[i]*this.matrix[u];l+=n[i+1]*this.matrix[u];s+=n[i+2]*this.matrix[u];u++}}f[o]=d/this.divisor+this.bias;f[o+1]=l/this.divisor+this.bias;f[o+2]=s/this.divisor+this.bias;f[o+3]=255}}}});c.drawing={};c.drawing.context=function(e){var d=document.createElement("canvas");d.width=e.w;d.height=e.h;return d.getContext("2d")};c.drawing.copy=function(f,e,d){f.drawImage(e.canvas||e,0,0,d.w,d.h)};c.drawing.clear=function(d,e){d.clearRect(0,0,e.w,e.h)};c.drawing.drawCenterInside=function(j,g,i,f){if(f.w/f.h>i.w/i.h){var e=f.h*i.w/f.w;j.drawImage(g.canvas||g,f.x,f.y,f.w,f.h,i.x,i.y+(i.h-e)/2,i.w,e)}else{var d=f.w*i.h/f.h;j.drawImage(g.canvas||g,f.x,f.y,f.w,f.h,i.x+(i.w-d)/2,i.y,d,i.h)}};c.drawing.drawCenterCrop=function(j,g,i,f){if(f.w/f.h>i.w/i.h){var d=f.h*i.w/i.h;j.drawImage(g.canvas||g,f.x+(f.w-d)/2,f.y,d,f.h,i.x,i.y,i.w,i.h)}else{var e=f.w*i.h/i.w;j.drawImage(g.canvas||g,f.x,f.y+(f.h-e)/2,f.w,e,i.x,i.y,i.w,i.h)}};c.drawing.getTrimRect=function(o,p,f){if(!o.canvas){var d=o;o=c.drawing.context(p);c.drawing.copy(o,d,p)}if(f==0){return{x:0,y:0,w:p.w,h:p.h}}f=f||1;var g=p.w,n=p.h,e=0,k=0;var i=o.getImageData(0,0,p.w,p.h).data;var h;for(var j=0;j<p.h;j++){for(var m=0;m<p.w;m++){h=i[((j*p.w+m)<<2)+3];if(h>f){g=Math.min(m,g);n=Math.min(j,n);e=Math.max(m,e);k=Math.max(j,k)}}}if(g>e){return{x:0,y:0,w:p.w,h:p.h}}return{x:g,y:n,w:e-g+1,h:k-n+1}};c.drawing.copyAsAlpha=function(h,g,e,f,d){f=f||"#fff";d=d||"#000";h.save();h.clearRect(0,0,e.w,e.h);h.globalCompositeOperation="source-over";c.drawing.copy(h,g,e);h.globalCompositeOperation="source-atop";h.fillStyle=f;h.fillRect(0,0,e.w,e.h);h.globalCompositeOperation="destination-atop";h.fillStyle=d;h.fillRect(0,0,e.w,e.h);h.restore()};c.drawing.makeAlphaMask=function(o,p,e){var d=o.getImageData(0,0,p.w,p.h);var l=o.createImageData(p.w,p.h);var k=d.data;var f=l.data;var h,j;for(var m=0;m<p.h;m++){for(var n=0;n<p.w;n++){h=(m*p.w+n)<<2;j=0.3*k[h]+0.59*k[h+1]+0.11*k[h+2];f[h]=f[h+1]=f[h+2]=255;f[h+3]=j}}o.putImageData(l,0,0);if(e){o.save();o.globalCompositeOperation="source-atop";o.fillStyle=e;o.fillRect(0,0,p.w,p.h);o.restore()}};c.drawing.applyFilter=function(f,d,e){var g=d.getImageData(0,0,e.w,e.h);var h=d.createImageData(e.w,e.h);f.apply(g,h);d.putImageData(h,0,0)};c.drawing.blur=function(g,p,s){var q=Math.ceil(g);var d=q*2+1;var m=new Array(d*d);var o=g/3;var h=2*o*o;var n=Math.sqrt(Math.PI*h);var l=g*g;var j=0;var f=0;var e;for(var i=-q;i<=q;i++){for(var k=-q;k<=q;k++){e=1*k*k+1*i*i;if(e>l){m[f]=0}else{m[f]=Math.exp(-e/h)/n}j+=m[f];f++}}c.drawing.applyFilter(new a(m,j,0),p,s)};c.drawing.fx=function(e,j,d,p){e=e||[];var f=[];var g=[];var h=[];for(var k=0;k<e.length;k++){if(/^outer/.test(e[k].effect)){f.push(e[k])}else{if(/^inner/.test(e[k].effect)){g.push(e[k])}else{if(/^fill/.test(e[k].effect)){h.push(e[k])}}}}var n=c.drawing.context(p);var l=c.drawing.context(p);j.save();for(var k=0;k<f.length;k++){var o=f[k];n.save();switch(o.effect){case"outer-shadow":c.drawing.clear(n,p);c.drawing.copyAsAlpha(n,d.canvas||d,p);if(o.blur){c.drawing.blur(o.blur,n,p)}c.drawing.makeAlphaMask(n,p,o.color||"#000");if(o.translate){n.translate(o.translate.x||0,o.translate.y||0)}j.globalAlpha=Math.max(0,Math.min(1,o.opacity||1));c.drawing.copy(j,n,p);break}n.restore()}c.drawing.clear(n,p);c.drawing.copy(n,d.canvas||d,p);if(h.length){var o=h[0];n.save();n.globalCompositeOperation="source-atop";switch(o.effect){case"fill-color":n.fillStyle=o.color;break;case"fill-lineargradient":var m=n.createLinearGradient(o.from.x,o.from.y,o.to.x,o.to.y);for(var k=0;k<o.colors.length;k++){m.addColorStop(o.colors[k].offset,o.colors[k].color)}n.fillStyle=m;break}n.fillRect(0,0,p.w,p.h);n.restore()}j.globalAlpha=1;c.drawing.copy(j,n,p);for(var k=0;k<g.length;k++){var o=g[k];n.save();switch(o.effect){case"inner-shadow":c.drawing.clear(n,p);c.drawing.copyAsAlpha(n,d.canvas||d,p,"#fff","#000");c.drawing.copyAsAlpha(l,d.canvas||d,p);if(o.blur){c.drawing.blur(o.blur,l,p)}c.drawing.makeAlphaMask(l,p,"#000");if(o.translate){n.translate(o.translate.x||0,o.translate.y||0)}n.globalCompositeOperation="source-over";c.drawing.copy(n,l,p);c.drawing.makeAlphaMask(n,p,o.color);j.globalAlpha=Math.max(0,Math.min(1,o.opacity||1));c.drawing.copy(j,n,p);break}n.restore()}j.restore()};c.loadImageResources=function(d,i){var g={};var f=function(){for(var j in d){if(!(j in g)){return}}(i||function(){})(g);i=null};for(var h in d){var e=document.createElement("img");e.src=d[h];(function(j,k){j.onload=function(){g[k]=j;f()};j.onerror=function(){g[k]=null;f()}})(e,h)}};c.loadFromUri=function(e,f){f=f||function(){};var d=document.createElement("img");d.src=e;d.onload=function(){f(d)};d.onerror=function(){f(null)}};c.toDataUri=function(e){var f=document.createElement("canvas");f.width=e.naturalWidth;f.height=e.naturalHeight;var d=f.getContext("2d");d.drawImage(e,0,0);return f.toDataURL()};window.imagelib=c})();(function(){var a={};a.forms={};a.forms.Form=Base.extend({constructor:function(d,c){this.id_=d;this.params_=c;this.fields_=c.fields;for(var b=0;b<this.fields_.length;b++){this.fields_[b].setForm_(this)}this.onChange=this.params_.onChange||function(){}},createUI:function(b){for(var c=0;c<this.fields_.length;c++){var d=this.fields_[c];d.createUI(b)}},notifyChanged_:function(){this.onChange()},getValues:function(){var b={};for(var c=0;c<this.fields_.length;c++){var d=this.fields_[c];b[d.id_]=d.getValue()}return b}});a.forms.Field=Base.extend({constructor:function(c,b){this.id_=c;this.params_=b},setForm_:function(b){this.form_=b},getHtmlId:function(){return"_frm-"+this.form_.id_+"-"+this.id_},createUI:function(b){b=$(b);return $("<div>").addClass("form-field-outer").append($("<label>").attr("for",this.getHtmlId()).text(this.params_.title)).append($("<div>").addClass("form-field-container")).appendTo(b)}});a.forms.ColorField=a.forms.Field.extend({createUI:function(b){var d=$(".form-field-container",this.base(b));var c=this;this.el_=$("<div>").addClass("form-color").attr("id",this.getHtmlId()).append($("<div>").addClass("form-color-preview").css("background-color",this.getValue().color)).button({label:null,icons:{secondary:"ui-icon-carat-1-s"}}).appendTo(d);this.el_.ColorPicker({color:this.getValue().color,onChange:function(e,g,f){c.setValue("#"+g);$(".form-color-preview",c.el_).css("background-color",c.getValue().color);c.form_.notifyChanged_()}});if(this.params_.alpha){this.alphaEl_=$("<div>").addClass("form-color-alpha").slider({min:0,max:100,range:"min",value:this.getValue().alpha,slide:function(e,f){c.setAlpha(f.value);c.form_.notifyChanged_()}}).appendTo(d)}},getValue:function(){var b=this.value_||this.params_.defaultValue||"#000000";if(/^([0-9a-f]{6}|[0-9a-f]{3})$/i.test(b)){b="#"+b}var c=this.alpha_;if(typeof c!="number"){c=this.params_.defaultAlpha;if(typeof c!="number"){c=100}}return{color:b,alpha:c}},setValue:function(b){this.value_=b},setAlpha:function(b){this.alpha_=b}});a.forms.EnumField=a.forms.Field.extend({createUI:function(b){var f=$(".form-field-container",this.base(b));var e=this;if(this.params_.buttons){this.el_=$("<div>").attr("id",this.getHtmlId()).addClass(".form-field-buttonset").appendTo(f);for(var c=0;c<this.params_.options.length;c++){var d=this.params_.options[c];$("<input>").attr({type:"radio",name:this.getHtmlId(),id:this.getHtmlId()+"-"+d.id,value:d.id}).change(function(){e.form_.notifyChanged_()}).appendTo(this.el_);$("<label>").attr("for",this.getHtmlId()+"-"+d.id).text(d.title).appendTo(this.el_)}this.findAndSetValue(this.params_.defaultValue||this.params_.options[0].id);this.el_.buttonset()}else{this.el_=$("<select>").attr("id",this.getHtmlId()).change(function(){e.form_.notifyChanged_()}).appendTo(f);for(var c=0;c<this.params_.options.length;c++){var d=this.params_.options[c];$("<option>").attr("value",d.id).text(d.title).appendTo(this.el_)}}},getValue:function(){return this.params_.buttons?$("input:checked",this.el_).val():this.el_.val()},setValue:function(b){this.findAndSetValue(b)},findAndSetValue:function(b){if(this.params_.buttons){$("input",this.el_).each(function(c,d){$(d).attr("checked",$(d).val()==b)})}else{this.el_.val(b)}}});a.forms.BooleanField=a.forms.EnumField.extend({constructor:function(c,b){b.options=[{id:"1",title:b.onText||"Yes"},{id:"0",title:b.offText||"No"}];b.defaultValue=b.defaultValue?"1":"0";b.buttons=true;this.base(c,b)},getValue:function(){return this.base()=="1"},setValue:function(b){this.base(b?"1":"0")}});a.forms.ImageField=a.forms.Field.extend({createUI:function(c){var h=this.base(c);var g=$(".form-field-container",h);var k=this;h.addClass("form-field-drop-target");h.get(0).ondragenter=a.forms.ImageField.makeDragenterHandler_(h);h.get(0).ondragleave=a.forms.ImageField.makeDragleaveHandler_(h);h.get(0).ondragover=a.forms.ImageField.makeDragoverHandler_(h);h.get(0).ondrop=a.forms.ImageField.makeDropHandler_(h,function(i){if(k.loadFromFileList_(i.dataTransfer.files)){k.setTypeUI_("image")}});this.el_=$("<div>").attr("id",this.getHtmlId()).addClass(".form-field-buttonset").appendTo(g);var j=["image","Image","clipart","Clipart","text","Text"];var d={};for(var f=0;f<j.length/2;f++){$("<input>").attr({type:"radio",name:this.getHtmlId(),id:this.getHtmlId()+"-"+j[f*2],value:j[f*2]}).appendTo(this.el_);d[j[f*2]]=$("<label>").attr("for",this.getHtmlId()+"-"+j[f*2]).text(j[f*2+1]).appendTo(this.el_)}this.el_.buttonset();this.fileEl_=$("<input>").addClass("form-image-hidden-file-field").attr({id:this.getHtmlId(),type:"file",accept:"image/*"}).change(function(){if(k.loadFromFileList_(k.fileEl_.get(0).files)){k.setTypeUI_("image")}}).appendTo(this.el_);d.image.click(function(i){k.fileEl_.trigger("click");k.setTypeUI_(null);i.preventDefault();return false});var b=$("<div>").addClass("form-image-type-params form-image-type-params-clipart").hide().appendTo(this.el_);var m=$("<div>").addClass("form-image-clipart-list").appendTo(b);for(var f=0;f<a.forms.ImageField.clipartList_.length;f++){var l="res/clipart/"+a.forms.ImageField.clipartList_[f];$("<img>").addClass("form-image-clipart-item").attr("src",l).click(function(i){return function(){$("img",b).removeClass("selected");$(this).addClass("selected");k.setValueSVGUrl(i);k.form_.notifyChanged_()}}(l)).appendTo(m)}d.clipart.click(function(i){k.setTypeUI_("clipart")});var e=$("<div>").addClass("form-image-type-params form-image-type-params-text").hide().appendTo(this.el_);$("<input>").addClass("form-image-clipart-item").attr("type","text").keyup(function(i){return function(){k.textParams_=k.textParams_||{};k.textParams_.text=$(this).val();k.setValueTextParams(k.textParams_);k.form_.notifyChanged_()}}(l)).appendTo(e);$("<div>").slider({min:0,max:10,value:0,slide:function(i,n){k.textParams_=k.textParams_||{};k.textParams_.padding=n.value;k.setValueTextParams(k.textParams_);k.form_.notifyChanged_()}}).appendTo(e);d.text.click(function(i){k.setTypeUI_("text")});this.imagePreview_=$("<img>").addClass("form-image-preview").hide().appendTo(g)},setTypeUI_:function(b){$("label",this.el_).removeClass("ui-state-active");$(".form-image-type-params",this.el_).hide();if(b){$("label[for="+this.getHtmlId()+"-"+b+"]").addClass("ui-state-active");$(".form-image-type-params-"+b,this.el_).show()}},loadFromFileList_:function(c){c=c||[];var g=this;var e=null;for(var d=0;d<c.length;d++){if(a.forms.ImageField.isValidFile_(c[d])){e=c[d];break}}if(!e){this.clearValue();this.form_.notifyChanged_();alert("Please choose a valid image file (PNG, JPG, GIF, SVG, PSD, etc.)");return false}var f=false;if(e.type=="image/svg+xml"&&window.canvg){f=true}var b=new FileReader();b.onload=function(i){if(f){var h=document.createElement("canvas");h.className="offscreen";h.style.width="300px";h.style.height="300px";document.body.appendChild(h);canvg(h,i.target.result,{ignoreMouse:true,ignoreAnimation:true});g.setValueImageUri(h.toDataURL());document.body.removeChild(h)}else{g.setValueImageUri(i.target.result)}g.form_.notifyChanged_()};b.onerror=function(h){g.clearValue();g.form_.notifyChanged_();switch(h.target.error.code){case h.target.error.NOT_FOUND_ERR:alert("File Not Found!");break;case h.target.error.NOT_READABLE_ERR:alert("File is not readable");break;case h.target.error.ABORT_ERR:break;default:alert("An error occurred reading this file.")}};b.onabort=function(h){g.clearValue();g.form_.notifyChanged_();alert("File read cancelled")};if(f){b.readAsText(e)}else{b.readAsDataURL(e)}return true},clearValue:function(){this.valueImageUri_=null;this.fileEl_.val("");this.imagePreview_.hide()},getValue:function(){return this.valueImageUri_},setValueImageUri:function(b){this.valueImageUri_=b;if(this.imagePreview_){this.imagePreview_.attr("src",b);this.imagePreview_.show()}},setValueSVGUrl:function(c){var b=document.createElement("canvas");b.className="offscreen";b.style.width="300px";b.style.height="300px";document.body.appendChild(b);canvg(b,c,{ignoreMouse:true,ignoreAnimation:true});this.setValueImageUri(b.toDataURL());document.body.removeChild(b)},setValueTextParams:function(f){f=f||{};var c={w:600,h:100};var e=imagelib.drawing.context(c);e.fillStyle="#000";e.font="bold 100px/100px sans-serif";e.textBaseline="alphabetic";e.fillText(f.text||"",0,100);var d=imagelib.drawing.getTrimRect(e,c);var h=(f.padding||0)*5;var g={x:h,y:h,w:d.w,h:d.h};var b=imagelib.drawing.context({w:d.w+h*2,h:d.h+h*2});imagelib.drawing.drawCenterInside(b,e,g,d);this.setValueImageUri(b.canvas.toDataURL())}});a.forms.ImageField.clipartList_=["icons/home.svg","icons/map_pin.svg","icons/refresh.svg","icons/search.svg","icons/share.svg","icons/export.svg"];a.forms.ImageField.isValidFile_=function(b){return !!b.type.toLowerCase().match(/^image\//)};a.forms.ImageField.makeDropHandler_=function(c,b){return function(d){$(c).removeClass("drag-hover");b(d)}};a.forms.ImageField.makeDragoverHandler_=function(b){return function(c){b=$(b).get(0);if(b._studio_frm_dragtimeout_){window.clearTimeout(b._studio_frm_dragtimeout_);b._studio_frm_dragtimeout_=null}c.dataTransfer.dropEffect="link";c.preventDefault()}};a.forms.ImageField.makeDragenterHandler_=function(b){return function(c){b=$(b).get(0);if(b._studio_frm_dragtimeout_){window.clearTimeout(b._studio_frm_dragtimeout_);b._studio_frm_dragtimeout_=null}$(b).addClass("drag-hover");c.preventDefault()}};a.forms.ImageField.makeDragleaveHandler_=function(b){return function(c){b=$(b).get(0);if(b._studio_frm_dragtimeout_){window.clearTimeout(b._studio_frm_dragtimeout_)}b._studio_frm_dragtimeout_=window.setTimeout(function(){$(b).removeClass("drag-hover")},100)}};a.ui={};a.ui.createImageOutputSlot=function(b){$("<div>").addClass("out-image-container").append($("<div>").text(b.label)).append($("<img>").attr("id",b.id)).appendTo(b.container)};window.studio=a})();