mediaWiki.loader.implement("jquery.checkboxShiftClick",function($,mw){(function($){jQuery.fn.checkboxShiftClick=function(text){var prevCheckbox=null;var $box=this;$box.click(function(e){if(prevCheckbox!==null&&e.shiftKey){$box.slice(Math.min($box.index(prevCheckbox),$box.index(e.target)),Math.max($box.index(prevCheckbox),$box.index(e.target))+1).attr({checked:e.target.checked?'checked':''});}prevCheckbox=e.target;});return $box;};})(jQuery);;},{},{});mediaWiki.loader.implement("jquery.client",function($,mw){(function($){$.client=new(function(){var profile;this.profile=function(){if(typeof profile==='undefined'){var uk='unknown';var x='x';var wildUserAgents=['Opera','Navigator','Minefield','KHTML','Chrome','PLAYSTATION 3'];var userAgentTranslations=[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape'],['PLAYSTATION 3','PS3'],];var versionPrefixes=['camino','chrome','firefox','netscape',
'netscape6','opera','version','konqueror','lynx','msie','safari','ps3'];var versionSuffix='(\\/|\\;?\\s|)([a-z0-9\\.\\+]*?)(\\;|dev|rel|\\)|\\s|$)';var names=['camino','chrome','firefox','netscape','konqueror','lynx','msie','opera','safari','ipod','iphone','blackberry','ps3'];var nameTranslations=[];var layouts=['gecko','konqueror','msie','opera','webkit'];var layoutTranslations=[['konqueror','khtml'],['msie','trident'],['opera','presto']];var layoutVersions=['applewebkit','gecko'];var platforms=['win','mac','linux','sunos','solaris','iphone'];var platformTranslations=[['sunos','solaris']];function translate(source,translations){for(var i=0;i<translations.length;i++){source=source.replace(translations[i][0],translations[i][1]);}return source;};var userAgent=navigator.userAgent,match,name=uk,layout=uk,layoutversion=uk,platform=uk,version=x;if(match=new RegExp('('+wildUserAgents.join('|')+')').exec(userAgent)){userAgent=translate(userAgent,userAgentTranslations);}userAgent=userAgent.
toLowerCase();if(match=new RegExp('('+names.join('|')+')').exec(userAgent)){name=translate(match[1],nameTranslations);}if(match=new RegExp('('+layouts.join('|')+')').exec(userAgent)){layout=translate(match[1],layoutTranslations);}if(match=new RegExp('('+layoutVersions.join('|')+')\\\/(\\d+)').exec(navigator.userAgent.toLowerCase())){layoutversion=parseInt(match[2]);}if(match=new RegExp('('+platforms.join('|')+')').exec(navigator.platform.toLowerCase())){platform=translate(match[1],platformTranslations);}if(match=new RegExp('('+versionPrefixes.join('|')+')'+versionSuffix).exec(userAgent)){version=match[3];}if(name.match(/safari/)&&version>400){version='2.0';}if(name==='opera'&&version>=9.8){version=userAgent.match(/version\/([0-9\.]*)/i)[1]||10;}profile={'name':name,'layout':layout,'layoutVersion':layoutversion,'platform':platform,'version':version,'versionBase':(version!==x?new String(version).substr(0,1):x),'versionNumber':(parseFloat(version,10)||0.0)};}return profile;};this.test=
function(map){var profile=jQuery.client.profile();var dir=jQuery('body').is('.rtl')?'rtl':'ltr';if(typeof map[dir]!=='object'||typeof map[dir][profile.name]==='undefined'){return true;}var name=map[dir][profile.name];for(var condition in name){var op=name[condition][0];var val=name[condition][1];if(val===false){return false;}else if(typeof val=='string'){if(!(eval('profile.version'+op+'"'+val+'"'))){return false;}}else if(typeof val=='number'){if(!(eval('profile.versionNumber'+op+val))){return false;}}}return true;}})();$(document).ready(function(){var profile=$.client.profile();$('html').addClass('client-'+profile.name).addClass('client-'+profile.name+'-'+profile.versionBase).addClass('client-'+profile.layout).addClass('client-'+profile.platform);});})(jQuery);;},{},{});mediaWiki.loader.implement("jquery.cookie",function($,mw){jQuery.cookie=function(key,value,options){if(arguments.length>1&&(value===null||typeof value!=="object")){options=jQuery.extend({},options);if(value===null){
options.expires=-1;}if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}return(document.cookie=[encodeURIComponent(key),'=',options.raw?String(value):encodeURIComponent(String(value)),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}options=value||{};var result,decode=options.raw?function(s){return s;}:decodeURIComponent;return(result=new RegExp('(?:^|; )'+encodeURIComponent(key)+'=([^;]*)').exec(document.cookie))?decode(result[1]):null;};;},{},{});mediaWiki.loader.implement("jquery.placeholder",function($,mw){(function($){jQuery.fn.placeholder=function(){return this.each(function(){if(this.placeholder&&'placeholder'in document.createElement(this.tagName)){return;}var placeholder=this.getAttribute('placeholder');var $input=jQuery(this);if(this.value===''||this.value==placeholder){
$input.addClass('placeholder').val(placeholder);}$input.blur(function(){if(this.value===''){this.value=placeholder;$input.addClass('placeholder');}}).bind('focus drop keydown paste',function(e){if($input.hasClass('placeholder')){if(e.type=='drop'&&e.originalEvent.dataTransfer){try{this.value=e.originalEvent.dataTransfer.getData('text/plain');}catch(exception){this.value=e.originalEvent.dataTransfer.getData('text');}e.preventDefault();}else{this.value='';}$input.removeClass('placeholder');}});this.form&&$(this.form).submit(function(){if($input.hasClass('placeholder')){$input.val('').removeClass('placeholder');}});});};})(jQuery);;},{},{});mediaWiki.loader.implement("mediawiki.language",function($,mw){(function($,mw){mw.language={'procPLURAL':function(template){if(template.title&&template.parameters&&mw.language.convertPlural){if(template.parameters.length==0){return'';}var count=mw.language.convertNumber(template.title,true);return mw.language.convertPlural(parseInt(count),template.
parameters);}if(template.parameters[0]){return template.parameters[0];}return'';},'convertPlural':function(count,forms){if(!forms||forms.length==0){return'';}return(parseInt(count)==1)?forms[0]:forms[1];},'preConvertPlural':function(forms,count){while(forms.length<count){forms.push(forms[forms.length-1]);}return forms;},'convertNumber':function(number,integer){if(!mw.language.digitTransformTable){return number;}var transformTable=mw.language.digitTransformTable;if(integer){if(parseInt(number)==number){return number;}var tmp=[];for(var i in transformTable){tmp[transformTable[i]]=i;}transformTable=tmp;}var numberString=''+number;var convertedNumber='';for(var i=0;i<numberString.length;i++){if(transformTable[numberString[i]]){convertedNumber+=transformTable[numberString[i]];}else{convertedNumber+=numberString[i];}}return integer?parseInt(convertedNumber):convertedNumber;},'digitTransformTable':null};})(jQuery,mediaWiki);mediaWiki.language.convertPlural=function(count,forms){forms=
mediaWiki.language.preConvertPlural(forms,2);return(count<=1)?forms[0]:forms[1];};;},{},{});mediaWiki.loader.implement("mediawiki.util",function($,mw){(function($,mw){mediaWiki.util={'initialised':false,'init':function(){if(this.initialised===false){this.initialised=true;$(function(){var profile=$.client.profile();if(profile.name=='opera'){mw.util.tooltipAccessKeyPrefix='shift-esc-';}else if(profile.name=='chrome'){mw.util.tooltipAccessKeyPrefix=(profile.platform=='mac'?'ctrl-option-':'alt-');}else if(profile.platform!=='win'&&profile.name=='safari'&&profile.layoutVersion>526){mw.util.tooltipAccessKeyPrefix='ctrl-alt-';}else if(!(profile.platform=='win'&&profile.name=='safari')&&(profile.name=='safari'||profile.platform=='mac'||profile.name=='konqueror')){mw.util.tooltipAccessKeyPrefix='ctrl-';}else if(profile.name=='firefox'&&profile.versionBase=='2'){mw.util.tooltipAccessKeyPrefix='alt-shift-';}$('input[type=checkbox]:not(.noshiftselect)').checkboxShiftClick();if(!('placeholder'in
document.createElement('input'))){$('input[placeholder]').placeholder();}if($('#bodyContent').length){mw.util.$content=$('#bodyContent');}else if($('#article').length){mw.util.$content=$('#article');}else{mw.util.$content=$('#content');}});return true;}return false;},'rawurlencode':function(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/~/g,'%7E');},'wikiUrlencode':function(str){return this.rawurlencode(str).replace(/%20/g,'_').replace(/%3A/g,':').replace(/%2F/g,'/');},'addCSS':function(text){var s=document.createElement('style');s.type='text/css';s.rel='stylesheet';if(s.styleSheet){s.styleSheet.cssText=text;}else{s.appendChild(document.createTextNode(text+''));}document.getElementsByTagName("head")[0].appendChild(s);return s.sheet||s;},'wikiGetlink':function(str){return wgServer+wgArticlePath.replace('$1',this.wikiUrlencode(str));},'getParamValue':function(param
,url){url=url?url:document.location.href;var re=new RegExp('[^#]*[&?]'+$.escapeRE(param)+'=([^&#]*)');var m=re.exec(url);if(m&&m.length>1){return decodeURIComponent(m[1]);}return null;},'tooltipAccessKeyPrefix':'alt-','tooltipAccessKeyRegexp':/\[(ctrl-)?(alt-)?(shift-)?(esc-)?(.)\]$/,'updateTooltipAccessKeys':function(nodeList){var $nodes;if(nodeList instanceof jQuery){$nodes=nodeList;}else if(nodeList){$nodes=$(nodeList);}else{this.updateTooltipAccessKeys($('#column-one a, #mw-head a, #mw-panel a, #p-logo a'));this.updateTooltipAccessKeys($('input'));this.updateTooltipAccessKeys($('label'));return;}$nodes.each(function(i){var tip=$(this).attr('title');if(!!tip&&mw.util.tooltipAccessKeyRegexp.exec(tip)){tip=tip.replace(mw.util.tooltipAccessKeyRegexp,'['+mw.util.tooltipAccessKeyPrefix+"$5]");$(this).attr('title',tip);}});},'$content':null,'addPortletLink':function(portlet,href,text,id,tooltip,accesskey,nextnode){if(arguments.length<3){return null;}var $link=$('<a></a>').attr('href',href
).text(text);if(tooltip){$link.attr('title',tooltip);}switch(skin){case'standard':case'cologneblue':$("#quickbar").append($link.after('<br />'));return $link.get(0);case'nostalgia':$("#searchform").before($link).before(' &#124; ');return $link.get(0);default:var $portlet=$('#'+portlet);if($portlet.length===0){return null;}var $ul=$portlet.find('ul').eq(0);if($ul.length===0){if($portlet.find('div').length===0){$portlet.append('<ul></ul>');}else{$portlet.find('div').eq(-1).append('<ul></ul>');}$ul=$portlet.find('ul').eq(0);}if($ul.length===0){return null;}$portlet.removeClass('emptyPortlet');var $item=$link.wrap('<li><span></span></li>').parent().parent();if(id){$item.attr('id',id);}if(accesskey){$link.attr('accesskey',accesskey);tooltip+=' ['+accesskey+']';}if(tooltip){$link.attr('title',tooltip);}if(accesskey&&tooltip){this.updateTooltipAccessKeys($link);}if(nextnode&&nextnode.parentNode==$ul.get(0)){$(nextnode).before($item);}else{if($ul.find(nextnode).length===0){$ul.append($item);}
else{$ul.find(nextnode).eq(0).before($item);}}return $item.get(0);}},'validateEmail':function(mailtxt){if(mailtxt===''){return null;}var rfc5322_atext="a-z0-9!#$%&'*+\\-/=?^_`{|}~",rfc1034_ldh_str="a-z0-9\\-",HTML5_email_regexp=new RegExp('^'+'['+rfc5322_atext+'\\.]+'+'@'+'['+rfc1034_ldh_str+']+'+'(?:\\.['+rfc1034_ldh_str+']+)*'+'$','i');return(null!==mailtxt.match(HTML5_email_regexp));}};mediaWiki.util.init();})(jQuery,mediaWiki);;},{},{});mediaWiki.loader.implement("mediawiki.legacy.ajax",function($,mw){window.sajax_debug_mode=false;window.sajax_request_type='GET';window.sajax_debug=function(text){if(!sajax_debug_mode)return false;var e=document.getElementById('sajax_debug');if(!e){e=document.createElement('p');e.className='sajax_debug';e.id='sajax_debug';var b=document.getElementsByTagName('body')[0];if(b.firstChild){b.insertBefore(e,b.firstChild);}else{b.appendChild(e);}}var m=document.createElement('div');m.appendChild(document.createTextNode(text));e.appendChild(m);return true;};
window.sajax_init_object=function(){sajax_debug('sajax_init_object() called..');var A;try{A=new XMLHttpRequest();}catch(e){try{A=new ActiveXObject('Msxml2.XMLHTTP');}catch(e){try{A=new ActiveXObject('Microsoft.XMLHTTP');}catch(oc){A=null;}}}if(!A){sajax_debug('Could not create connection object.');}return A;};window.sajax_do_call=function(func_name,args,target){var i,x,n;var uri;var post_data;uri=wgServer+((wgScript==null)?(wgScriptPath+'/index.php'):wgScript)+'?action=ajax';if(sajax_request_type=='GET'){if(uri.indexOf('?')==-1){uri=uri+'?rs='+encodeURIComponent(func_name);}else{uri=uri+'&rs='+encodeURIComponent(func_name);}for(i=0;i<args.length;i++){uri=uri+'&rsargs[]='+encodeURIComponent(args[i]);}post_data=null;}else{post_data='rs='+encodeURIComponent(func_name);for(i=0;i<args.length;i++){post_data=post_data+'&rsargs[]='+encodeURIComponent(args[i]);}}x=sajax_init_object();if(!x){alert('AJAX not supported');return false;}try{x.open(sajax_request_type,uri,true);}catch(e){if(window.
location.hostname=='localhost'){alert("Your browser blocks XMLHttpRequest to 'localhost', try using a real hostname for development/testing.");}throw e;}if(sajax_request_type=='POST'){x.setRequestHeader('Method','POST '+uri+' HTTP/1.1');x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}x.setRequestHeader('Pragma','cache=yes');x.setRequestHeader('Cache-Control','no-transform');x.onreadystatechange=function(){if(x.readyState!=4){return;}sajax_debug('received ('+x.status+' '+x.statusText+') '+x.responseText);if(typeof(target)=='function'){target(x);}else if(typeof(target)=='object'){if(target.tagName=='INPUT'){if(x.status==200){target.value=x.responseText;}}else{if(x.status==200){target.innerHTML=x.responseText;}else{target.innerHTML='<div class="error">Error: '+x.status+' '+x.statusText+' ('+x.responseText+')</div>';}}}else{alert('bad target for sajax_do_call: not a function or object: '+target);}return;};sajax_debug(func_name+' uri = '+uri+' / post = '+post_data);x
.send(post_data);sajax_debug(func_name+' waiting..');delete x;return true;};window.wfSupportsAjax=function(){var request=sajax_init_object();var supportsAjax=request?true:false;delete request;return supportsAjax;};;},{},{"watch":"Suivre","unwatch":"Ne plus suivre","watching":"Suivi\u2026","unwatching":"Fin du suivi\u2026","tooltip-ca-watch":"Ajouter cette page \u00e0 votre liste de suivi","tooltip-ca-unwatch":"Retirer cette page de votre liste de suivi"});mediaWiki.loader.implement("mediawiki.legacy.wikibits",function($,mw){window.clientPC=navigator.userAgent.toLowerCase();window.is_gecko=/gecko/.test(clientPC)&&!/khtml|spoofer|netscape\/7\.0/.test(clientPC);window.is_safari=window.is_safari_win=window.webkit_version=window.is_chrome=window.is_chrome_mac=false;window.webkit_match=clientPC.match(/applewebkit\/(\d+)/);if(webkit_match){window.is_safari=clientPC.indexOf('applewebkit')!=-1&&clientPC.indexOf('spoofer')==-1;window.is_safari_win=is_safari&&clientPC.indexOf('windows')!=-1;
window.webkit_version=parseInt(webkit_match[1]);window.is_chrome=clientPC.indexOf('chrome')!==-1&&clientPC.indexOf('spoofer')===-1;window.is_chrome_mac=is_chrome&&clientPC.indexOf('mac')!==-1}window.is_ff2=/firefox\/[2-9]|minefield\/3/.test(clientPC);window.ff2_bugs=/firefox\/2/.test(clientPC);window.is_ff2_win=is_ff2&&clientPC.indexOf('windows')!=-1;window.is_ff2_x11=is_ff2&&clientPC.indexOf('x11')!=-1;window.is_opera=window.is_opera_preseven=window.is_opera_95=window.opera6_bugs=window.opera7_bugs=window.opera95_bugs=false;if(clientPC.indexOf('opera')!=-1){window.is_opera=true;window.is_opera_preseven=window.opera&&!document.childNodes;window.is_opera_seven=window.opera&&document.childNodes;window.is_opera_95=/opera\/(9\.[5-9]|[1-9][0-9])/.test(clientPC);window.opera6_bugs=is_opera_preseven;window.opera7_bugs=is_opera_seven&&!is_opera_95;window.opera95_bugs=/opera\/(9\.5)/.test(clientPC);}window.ie6_bugs=false;if(/msie ([0-9]{1,}[\.0-9]{0,})/.exec(clientPC)!=null&&parseFloat(RegExp.
$1)<=6.0){ie6_bugs=true;}window.doneOnloadHook=undefined;if(!window.onloadFuncts){window.onloadFuncts=[];}window.addOnloadHook=function(hookFunct){if(!doneOnloadHook){onloadFuncts[onloadFuncts.length]=hookFunct;}else{hookFunct();}};window.importScript=function(page){var uri=wgScript+'?title='+encodeURIComponent(page.replace(/ /g,'_')).replace(/%2F/ig,'/').replace(/%3A/ig,':')+'&action=raw&ctype=text/javascript';return importScriptURI(uri);};window.loadedScripts={};window.importScriptURI=function(url){if(loadedScripts[url]){return null;}loadedScripts[url]=true;var s=document.createElement('script');s.setAttribute('src',url);s.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(s);return s;};window.importStylesheet=function(page){return importStylesheetURI(wgScript+'?action=raw&ctype=text/css&title='+encodeURIComponent(page.replace(/ /g,'_')));};window.importStylesheetURI=function(url,media){var l=document.createElement('link');l.type='text/css';l.
rel='stylesheet';l.href=url;if(media){l.media=media;}document.getElementsByTagName('head')[0].appendChild(l);return l;};window.appendCSS=function(text){var s=document.createElement('style');s.type='text/css';s.rel='stylesheet';if(s.styleSheet){s.styleSheet.cssText=text;}else{s.appendChild(document.createTextNode(text+''));}document.getElementsByTagName('head')[0].appendChild(s);return s;};if(typeof stylepath!='undefined'&&skin=='monobook'){if(opera6_bugs){importStylesheetURI(stylepath+'/'+skin+'/Opera6Fixes.css');}else if(opera7_bugs){importStylesheetURI(stylepath+'/'+skin+'/Opera7Fixes.css');}else if(opera95_bugs){importStylesheetURI(stylepath+'/'+skin+'/Opera9Fixes.css');}else if(ff2_bugs){importStylesheetURI(stylepath+'/'+skin+'/FF2Fixes.css');}}if('wgBreakFrames'in window&&window.wgBreakFrames){if(window.top!=window){window.top.location=window.location;}}window.showTocToggle=function(){if(document.createTextNode){var linkHolder=document.getElementById('toctitle');var existingLink=
document.getElementById('togglelink');if(!linkHolder||existingLink){return;}var outerSpan=document.createElement('span');outerSpan.className='toctoggle';var toggleLink=document.createElement('a');toggleLink.id='togglelink';toggleLink.className='internal';toggleLink.href='#';addClickHandler(toggleLink,function(evt){toggleToc();return killEvt(evt);});toggleLink.appendChild(document.createTextNode(mediaWiki.msg('hidetoc')));outerSpan.appendChild(document.createTextNode('['));outerSpan.appendChild(toggleLink);outerSpan.appendChild(document.createTextNode(']'));linkHolder.appendChild(document.createTextNode(' '));linkHolder.appendChild(outerSpan);var cookiePos=document.cookie.indexOf("hidetoc=");if(cookiePos>-1&&document.cookie.charAt(cookiePos+8)==1){toggleToc();}}};window.changeText=function(el,newText){if(el.innerText){el.innerText=newText;}else if(el.firstChild&&el.firstChild.nodeValue){el.firstChild.nodeValue=newText;}};window.killEvt=function(evt){evt=evt||window.event||window.Event;
if(typeof(evt.preventDefault)!='undefined'){evt.preventDefault();evt.stopPropagation();}else{evt.cancelBubble=true;}return false;};window.toggleToc=function(){var tocmain=document.getElementById('toc');var toc=document.getElementById('toc').getElementsByTagName('ul')[0];var toggleLink=document.getElementById('togglelink');if(toc&&toggleLink&&toc.style.display=='none'){changeText(toggleLink,mediaWiki.msg('hidetoc'));toc.style.display='block';document.cookie="hidetoc=0";tocmain.className='toc';}else{changeText(toggleLink,mediaWiki.msg('showtoc'));toc.style.display='none';document.cookie="hidetoc=1";tocmain.className='toc tochidden';}return false;};window.mwEditButtons=[];window.mwCustomEditButtons=[];window.escapeQuotes=function(text){var re=new RegExp("'","g");text=text.replace(re,"\\'");re=new RegExp("\\n","g");text=text.replace(re,"\\n");return escapeQuotesHTML(text);};window.escapeQuotesHTML=function(text){var re=new RegExp('&',"g");text=text.replace(re,"&amp;");re=new RegExp('"',"g"
);text=text.replace(re,"&quot;");re=new RegExp('<',"g");text=text.replace(re,"&lt;");re=new RegExp('>',"g");text=text.replace(re,"&gt;");return text;};window.tooltipAccessKeyPrefix='alt-';if(is_opera){tooltipAccessKeyPrefix='shift-esc-';}else if(is_chrome){tooltipAccessKeyPrefix=is_chrome_mac?'ctrl-option-':'alt-';}else if(!is_safari_win&&is_safari&&webkit_version>526){tooltipAccessKeyPrefix='ctrl-alt-';}else if(!is_safari_win&&(is_safari||clientPC.indexOf('mac')!=-1||clientPC.indexOf('konqueror')!=-1)){tooltipAccessKeyPrefix='ctrl-';}else if(is_ff2){tooltipAccessKeyPrefix='alt-shift-';}window.tooltipAccessKeyRegexp=/\[(ctrl-)?(alt-)?(shift-)?(esc-)?(.)\]$/;window.updateTooltipAccessKeys=function(nodeList){if(!nodeList){var linkContainers=['column-one','mw-head','mw-panel','p-logo'];for(var i in linkContainers){var linkContainer=document.getElementById(linkContainers[i]);if(linkContainer){updateTooltipAccessKeys(linkContainer.getElementsByTagName('a'));}}updateTooltipAccessKeys(
document.getElementsByTagName('input'));updateTooltipAccessKeys(document.getElementsByTagName('label'));return;}for(var i=0;i<nodeList.length;i++){var element=nodeList[i];var tip=element.getAttribute('title');if(tip&&tooltipAccessKeyRegexp.exec(tip)){tip=tip.replace(tooltipAccessKeyRegexp,'['+tooltipAccessKeyPrefix+"$5]");element.setAttribute('title',tip);}}};window.addPortletLink=function(portlet,href,text,id,tooltip,accesskey,nextnode){var root=document.getElementById(portlet);if(!root){return null;}var uls=root.getElementsByTagName('ul');var node;if(uls.length>0){node=uls[0];}else{node=document.createElement('ul');var lastElementChild=null;for(var i=0;i<root.childNodes.length;++i){if(root.childNodes[i].nodeType==1){lastElementChild=root.childNodes[i];}}if(lastElementChild&&lastElementChild.nodeName.match(/div/i)){lastElementChild.appendChild(node);}else{root.appendChild(node);}}if(!node){return null;}root.className=root.className.replace(/(^| )emptyPortlet( |$)/,"$2");var link=
document.createElement('a');link.appendChild(document.createTextNode(text));link.href=href;var span=document.createElement('span');span.appendChild(link);var item=document.createElement('li');item.appendChild(span);if(id){item.id=id;}if(accesskey){link.setAttribute('accesskey',accesskey);tooltip+=' ['+accesskey+']';}if(tooltip){link.setAttribute('title',tooltip);}if(accesskey&&tooltip){updateTooltipAccessKeys(new Array(link));}if(nextnode&&nextnode.parentNode==node){node.insertBefore(item,nextnode);}else{node.appendChild(item);}return item;};window.getInnerText=function(el){if(typeof el=='string'){return el;}if(typeof el=='undefined'){return el;}if(el.nodeType&&el.getAttribute('data-sort-value')!==null){return el.getAttribute('data-sort-value');}if(el.textContent){return el.textContent;}if(el.innerText){return el.innerText;}var str='';var cs=el.childNodes;var l=cs.length;for(var i=0;i<l;i++){switch(cs[i].nodeType){case 1:str+=ts_getInnerText(cs[i]);break;case 3:str+=cs[i].nodeValue;
break;}}return str;};window.ta=[];window.akeytt=function(doId){};window.checkboxes=undefined;window.lastCheckbox=undefined;window.setupCheckboxShiftClick=function(){checkboxes=[];lastCheckbox=null;var inputs=document.getElementsByTagName('input');addCheckboxClickHandlers(inputs);};window.addCheckboxClickHandlers=function(inputs,start){if(!start){start=0;}var finish=start+250;if(finish>inputs.length){finish=inputs.length;}for(var i=start;i<finish;i++){var cb=inputs[i];if(!cb.type||cb.type.toLowerCase()!='checkbox'||(' '+cb.className+' ').indexOf(' noshiftselect ')!=-1){continue;}var end=checkboxes.length;checkboxes[end]=cb;cb.index=end;addClickHandler(cb,checkboxClickHandler);}if(finish<inputs.length){setTimeout(function(){addCheckboxClickHandlers(inputs,finish);},200);}};window.checkboxClickHandler=function(e){if(typeof e=='undefined'){e=window.event;}if(!e.shiftKey||lastCheckbox===null){lastCheckbox=this.index;return true;}var endState=this.checked;var start,finish;if(this.index<
lastCheckbox){start=this.index+1;finish=lastCheckbox;}else{start=lastCheckbox;finish=this.index-1;}for(var i=start;i<=finish;++i){checkboxes[i].checked=endState;if(i>start&&typeof checkboxes[i].onchange=='function'){checkboxes[i].onchange();}}lastCheckbox=this.index;return true;};window.getElementsByClassName=function(oElm,strTagName,oClassNames){var arrReturnElements=new Array();if(typeof(oElm.getElementsByClassName)=='function'){var arrNativeReturn=oElm.getElementsByClassName(oClassNames);if(strTagName=='*'){return arrNativeReturn;}for(var h=0;h<arrNativeReturn.length;h++){if(arrNativeReturn[h].tagName.toLowerCase()==strTagName.toLowerCase()){arrReturnElements[arrReturnElements.length]=arrNativeReturn[h];}}return arrReturnElements;}var arrElements=(strTagName=='*'&&oElm.all)?oElm.all:oElm.getElementsByTagName(strTagName);var arrRegExpClassNames=new Array();if(typeof oClassNames=='object'){for(var i=0;i<oClassNames.length;i++){arrRegExpClassNames[arrRegExpClassNames.length]=new RegExp
("(^|\\s)"+oClassNames[i].replace(/\-/g,"\\-")+"(\\s|$)");}}else{arrRegExpClassNames[arrRegExpClassNames.length]=new RegExp("(^|\\s)"+oClassNames.replace(/\-/g,"\\-")+"(\\s|$)");}var oElement;var bMatchesAll;for(var j=0;j<arrElements.length;j++){oElement=arrElements[j];bMatchesAll=true;for(var k=0;k<arrRegExpClassNames.length;k++){if(!arrRegExpClassNames[k].test(oElement.className)){bMatchesAll=false;break;}}if(bMatchesAll){arrReturnElements[arrReturnElements.length]=oElement;}}return(arrReturnElements);};window.redirectToFragment=function(fragment){var match=navigator.userAgent.match(/AppleWebKit\/(\d+)/);if(match){var webKitVersion=parseInt(match[1]);if(webKitVersion<420){return;}}if(window.location.hash==''){window.location.hash=fragment;if(is_gecko){addOnloadHook(function(){if(window.location.hash==fragment){window.location.hash=fragment;}});}}};window.ts_image_path=stylepath+'/common/images/';window.ts_image_up='sort_up.gif';window.ts_image_down='sort_down.gif';window.
ts_image_none='sort_none.gif';window.ts_europeandate=wgContentLanguage!='en';window.ts_alternate_row_colors=false;window.ts_number_transform_table=null;window.ts_number_regex=null;window.sortables_init=function(){var idnum=0;var tables=getElementsByClassName(document,'table','sortable');for(var ti=0;ti<tables.length;ti++){if(!tables[ti].id){tables[ti].setAttribute('id','sortable_table_id_'+idnum);++idnum;}ts_makeSortable(tables[ti]);}};window.ts_makeSortable=function(table){var firstRow;if(table.rows&&table.rows.length>0){if(table.tHead&&table.tHead.rows.length>0){firstRow=table.tHead.rows[table.tHead.rows.length-1];}else{firstRow=table.rows[0];}}if(!firstRow){return;}for(var i=0;i<firstRow.cells.length;i++){var cell=firstRow.cells[i];if((' '+cell.className+' ').indexOf(' unsortable ')==-1){$(cell).append('<a href="#" class="sortheader" '+'onclick="ts_resortTable(this);return false;">'+'<span class="sortarrow">'+'<img src="'+ts_image_path+ts_image_none+'" alt="&darr;"/></span></a>');}}
if(ts_alternate_row_colors){ts_alternate(table);}};window.ts_getInnerText=function(el){return getInnerText(el);};window.ts_resortTable=function(lnk){var span=lnk.getElementsByTagName('span')[0];var td=lnk.parentNode;var tr=td.parentNode;var column=td.cellIndex;var table=tr.parentNode;while(table&&!(table.tagName&&table.tagName.toLowerCase()=='table')){table=table.parentNode;}if(!table){return;}if(table.rows.length<=1){return;}if(ts_number_transform_table===null){ts_initTransformTable();}var rowStart=(table.tHead&&table.tHead.rows.length>0?0:1);var bodyRows=0;if(rowStart==0&&table.tBodies){for(var i=0;i<table.tBodies.length;i++){bodyRows+=table.tBodies[i].rows.length;}if(bodyRows<table.rows.length)rowStart=1;}var itm='';for(var i=rowStart;i<table.rows.length;i++){if(table.rows[i].cells.length>column){itm=ts_getInnerText(table.rows[i].cells[column]);itm=itm.replace(/^[\s\xa0]+/,'').replace(/[\s\xa0]+$/,'');if(itm!=''){break;}}}var sortfn=ts_sort_generic;var preprocessor=ts_toLowerCase;if
(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/.test(itm)){preprocessor=ts_dateToSortKey;}else if(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/.test(itm)){preprocessor=ts_dateToSortKey;}else if(/^\d\d[\/.-]\d\d[\/.-]\d\d$/.test(itm)){preprocessor=ts_dateToSortKey;}else if(/(^([-\u2212] *)?[\u00a3$\u20ac\u00a4\u00a5]|\u00a2$)/.test(itm)){preprocessor=ts_currencyToSortKey;}else if(ts_number_regex.test(itm)){preprocessor=ts_parseFloat;}var reverse=(span.getAttribute('sortdir')=='down');var newRows=new Array();var staticRows=new Array();for(var j=rowStart;j<table.rows.length;j++){var row=table.rows[j];if((' '+row.className+' ').indexOf(' unsortable ')<0){var keyText=ts_getInnerText(row.cells[column]);if(keyText===undefined){keyText='';}var oldIndex=(reverse?-j:j);var preprocessed=preprocessor(keyText.replace(/^[\s\xa0]+/,'').replace(/[\s\xa0]+$/,''));newRows[newRows.length]=new Array(row,preprocessed,oldIndex);}else{staticRows[staticRows.length]=new Array(row,false,j-rowStart);}}newRows.sort(sortfn);var
arrowHTML;if(reverse){arrowHTML='<img src="'+ts_image_path+ts_image_down+'" alt="&darr;"/>';newRows.reverse();span.setAttribute('sortdir','up');}else{arrowHTML='<img src="'+ts_image_path+ts_image_up+'" alt="&uarr;"/>';span.setAttribute('sortdir','down');}for(var i=0;i<staticRows.length;i++){var row=staticRows[i];newRows.splice(row[2],0,row);}for(var i=0;i<newRows.length;i++){if((' '+newRows[i][0].className+' ').indexOf(' sortbottom ')==-1){table.tBodies[0].appendChild(newRows[i][0]);}}for(var i=0;i<newRows.length;i++){if((' '+newRows[i][0].className+' ').indexOf(' sortbottom ')!=-1){table.tBodies[0].appendChild(newRows[i][0]);}}var spans=getElementsByClassName(tr,'span','sortarrow');for(var i=0;i<spans.length;i++){spans[i].innerHTML='<img src="'+ts_image_path+ts_image_none+'" alt="&darr;"/>';}span.innerHTML=arrowHTML;if(ts_alternate_row_colors){ts_alternate(table);}};window.ts_initTransformTable=function(){if(typeof wgSeparatorTransformTable=='undefined'||(wgSeparatorTransformTable[0]
==''&&wgDigitTransformTable[2]=='')){var digitClass="[0-9,.]";ts_number_transform_table=false;}else{ts_number_transform_table={};var ascii=wgSeparatorTransformTable[0].split("\t");var localised=wgSeparatorTransformTable[1].split("\t");for(var i=0;i<ascii.length;i++){ts_number_transform_table[localised[i]]=ascii[i];}ascii=wgDigitTransformTable[0].split("\t");localised=wgDigitTransformTable[1].split("\t");for(var i=0;i<ascii.length;i++){ts_number_transform_table[localised[i]]=ascii[i];}var digits=['0','1','2','3','4','5','6','7','8','9',',','\\.'];var maxDigitLength=1;for(var digit in ts_number_transform_table){digits.push(digit.replace(/[\\\\$\*\+\?\.\(\)\|\{\}\[\]\-]/,function(s){return'\\'+s;}));if(digit.length>maxDigitLength){maxDigitLength=digit.length;}}if(maxDigitLength>1){var digitClass='['+digits.join('',digits)+']';}else{var digitClass='('+digits.join('|',digits)+')';}}ts_number_regex=new RegExp("^("+"[-+\u2212]?[0-9][0-9,]*(\\.[0-9,]*)?(E[-+\u2212]?[0-9][0-9,]*)?"+"|"+
"[-+\u2212]?"+digitClass+"+%?"+")$","i");};window.ts_toLowerCase=function(s){return s.toLowerCase();};window.ts_dateToSortKey=function(date){if(date.length==11){switch(date.substr(3,3).toLowerCase()){case'jan':var month='01';break;case'feb':var month='02';break;case'mar':var month='03';break;case'apr':var month='04';break;case'may':var month='05';break;case'jun':var month='06';break;case'jul':var month='07';break;case'aug':var month='08';break;case'sep':var month='09';break;case'oct':var month='10';break;case'nov':var month='11';break;case'dec':var month='12';break;}return date.substr(7,4)+month+date.substr(0,2);}else if(date.length==10){if(ts_europeandate==false){return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);}else{return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);}}else if(date.length==8){var yr=date.substr(6,2);if(parseInt(yr)<50){yr='20'+yr;}else{yr='19'+yr;}if(ts_europeandate==true){return yr+date.substr(3,2)+date.substr(0,2);}else{return yr+date.substr(0,2)+
date.substr(3,2);}}return'00000000';};window.ts_parseFloat=function(s){if(!s){return 0;}if(ts_number_transform_table!=false){var newNum='',c;for(var p=0;p<s.length;p++){c=s.charAt(p);if(c in ts_number_transform_table){newNum+=ts_number_transform_table[c];}else{newNum+=c;}}s=newNum;}var num=parseFloat(s.replace(/[, ]/g,'').replace("\u2212",'-'));return(isNaN(num)?-Infinity:num);};window.ts_currencyToSortKey=function(s){return ts_parseFloat(s.replace(/[^-\u22120-9.,]/g,''));};window.ts_sort_generic=function(a,b){return a[1]<b[1]?-1:a[1]>b[1]?1:a[2]-b[2];};window.ts_alternate=function(table){var tableBodies=table.getElementsByTagName('tbody');for(var i=0;i<tableBodies.length;i++){var tableRows=tableBodies[i].getElementsByTagName('tr');for(var j=0;j<tableRows.length;j++){var oldClasses=tableRows[j].className.split(' ');var newClassName='';for(var k=0;k<oldClasses.length;k++){if(oldClasses[k]!=''&&oldClasses[k]!='even'&&oldClasses[k]!='odd'){newClassName+=oldClasses[k]+' ';}}tableRows[j].
className=newClassName+(j%2==0?'even':'odd');}}};window.jsMsg=function(message,className){if(!document.getElementById){return false;}var messageDiv=document.getElementById('mw-js-message');if(!messageDiv){messageDiv=document.createElement('div');if(document.getElementById('column-content')&&document.getElementById('content')){document.getElementById('content').insertBefore(messageDiv,document.getElementById('content').firstChild);}else if(document.getElementById('content')&&document.getElementById('article')){document.getElementById('article').insertBefore(messageDiv,document.getElementById('article').firstChild);}else{return false;}}messageDiv.setAttribute('id','mw-js-message');messageDiv.style.display='block';if(className){messageDiv.setAttribute('class','mw-js-message-'+className);}if(typeof message==='object'){while(messageDiv.hasChildNodes()){messageDiv.removeChild(messageDiv.firstChild);}messageDiv.appendChild(message);}else{messageDiv.innerHTML=message;}return true;};window.
injectSpinner=function(element,id){var spinner=document.createElement('img');spinner.id='mw-spinner-'+id;spinner.src=stylepath+'/common/images/spinner.gif';spinner.alt=spinner.title='...';if(element.nextSibling){element.parentNode.insertBefore(spinner,element.nextSibling);}else{element.parentNode.appendChild(spinner);}};window.removeSpinner=function(id){var spinner=document.getElementById('mw-spinner-'+id);if(spinner){spinner.parentNode.removeChild(spinner);}};window.runOnloadHook=function(){if(doneOnloadHook||!(document.getElementById&&document.getElementsByTagName)){return;}doneOnloadHook=true;updateTooltipAccessKeys(null);setupCheckboxShiftClick();jQuery(document).ready(sortables_init);for(var i=0;i<onloadFuncts.length;i++){onloadFuncts[i]();}};window.addHandler=function(element,attach,handler){if(element.addEventListener){element.addEventListener(attach,handler,false);}else if(element.attachEvent){element.attachEvent('on'+attach,handler);}};window.hookEvent=function(hookName,
hookFunct){addHandler(window,hookName,hookFunct);};window.addClickHandler=function(element,handler){addHandler(element,'click',handler);};window.removeHandler=function(element,remove,handler){if(window.removeEventListener){element.removeEventListener(remove,handler,false);}else if(window.detachEvent){element.detachEvent('on'+remove,handler);}};hookEvent('load',runOnloadHook);if(ie6_bugs){importScriptURI(stylepath+'/common/IEFixes.js');}showTocToggle();;},{},{"showtoc":"afficher","hidetoc":"masquer"});