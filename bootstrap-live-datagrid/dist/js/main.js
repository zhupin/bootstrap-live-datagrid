/*

Arash Tavanaei 

Zhupin.ir & whmcsir.ir

+989194568517


*/

(function ( $ ) {

$.fn.live_datagrid = function(options) {

var defaults = {
	el : '#live_datagrid',
	hcolor:"#0f99d4",
	htext : "#fff",
	bordered:true,
	striped:true,
	textdir:"center",
	responsive:true,
	url:"",
	search_form:false,
	refresh_button:false,
	paging_class:"",
	pgae_prev_icon:'fa fa-arrow-right',
	pgae_next_icon:'fa fa-arrow-left',
	paging_total_res_text:'کل نتایج :#TOTAL#',
	paging_pages_text:'تعداد صفخات :#PAGES#',
	paging_last_text:'آخرین',
	paging_first_text:'اولین',
	loading_start_function:false,
	loading_stop_function:false,
	extera_class:"",
	limit:2,
	page:1,
	order_by:{},

	
	
}

this.addClass('table-responsive');
this.addClass('live_datagrid_div');

this.working = false;

if(typeof options =="undefined" || !options)
	options = {};

options=$.extend(defaults,options);


var senddata = {};
	
	if(options.search_form ){
		
		options.search_form = $(document).find(options.search_form);
		var _rtyuiop = this;
		
		options.search_form.on('submit',function(e){
			
			e.preventDefault();
			var fd = {};
			
			$(this).serializeArray().forEach(fi=>{ fd[fi.name] = fi.value  } );
			fd['__SEARCH'] = 1;
			senddata = $.extend(senddata,fd);
			
			_rtyuiop.refresh();
			return false;
		})
			
			
		
		
		
		
		
	}
	
	if(options.order_by){
		
		senddata = $.extend(senddata,{__order_by:options.order_by});
	}

	var out = "";
	
	
	this.refresh = (data='')=>{
		
		var _this = this;	
		
		var orders__ = {};
		
		th = this.find('table th');
			
		$.each(th,(k,v)=>{
			if($(v).data('sortname').trim())
			orders__[$(v).data('name')] = [$(v).data('sortname'),$(v).data('sorttype')];
			
			
		});
		
	if(data)
	senddata = $.extend(senddata,data);	
	
	
if(Object.keys(orders__).length) 
senddata.__order_by=orders__;	
		
	this.get();	
	}
	
	///////////////////////////
this.get = (data='')=>{
	if(this.working){
	
	alert('منتظر درخواست قبلی بمانید.');
	return;
}

out = "";
	var _this = this;
if(data)
	senddata = $.extend(senddata,data);


senddata._PAGE = options.page;
senddata._LIMIT = options.limit;




$.ajax({
	
	url:options.url,
	type:'post',
	dataType:'json',
	data:senddata,
	beforeSend(){
		_this.prepend('<div class="livegrid_loading"><div class="lds-hourglass"></div></div>');
		_this.working = true;
	},
	success(result){
		
		
	let pagination = {
		
		page: result.hasOwnProperty('page')  ? result.page : options.page ,
		num_pages :  result.hasOwnProperty('num_pages')  ? Number(parseInt(result.num_pages)) : 1 ,
		total :  result.hasOwnProperty('total')  ? Number(parseInt(result.total)) : 1 ,
		limit :  result.hasOwnProperty('limit')  ? result.limit : options.limit ,
		
	};	
		
		
	
	var head = "";
var indexes = [];
var order = result.hasOwnProperty('order') ? result.order:false;

if(result.hasOwnProperty('head') && Object.keys(result.head).length ){

	head +='<thead style="background-color:'+options.hcolor+';color:'+options.htext+'">'+"\n";
	head +='<tr>'+"\n";
$.each(result.head,function(index,value){
	
	
	
	
	head +='<th data-name="'+index+'" data-sortname="'+(order &&  order.hasOwnProperty(index) ? order[index][0] : "")+'" data-sorttype="'+(order &&  order.hasOwnProperty(index) ? order[index][1] : "")+'" >'+value+'</th>'+"\n";
		indexes.push(index);
	
})
		
	
	head +='</tr>'+"\n"
	head +='</thead>'+"\n";
}	
	
	out +='<table class="table '+(options.bordered ? 'table-bordered' : '' )+' '+(options.striped ? 'table-striped' : '' )+' live-datagrid-table '+(options.extera_class ? options.extera_class : '' )+'" >'+"\n";
    out +=head;
    out +='<tbody>'+"\n";	
	
	if(result.hasOwnProperty('data') &&  Object.keys(result.data).length){


	$.each(result.data,(index,value)=>{
	out +='<tr>'+"\n";

            indexes.forEach(ind=>{
			out +='<td data-index="'+ind+'" >'+value[ind]+'</td>'+"\n";
			});
			
			
	out +='</tr>'+"\n";			
	});


	}
   	
	out +='</tbody>'+"\n";	
	out +='</table>'+"\n";	
	
	
	
	if(pagination.num_pages > 1){
		
	p = '<div class="container-fluid text-center">'+'\n';	
	p += '<div class="row">'+'\n';	
	p += '<div class="col-xs-12">'+'\n';	
	
	p+='<div style="font-size:90%;"><span>'+(options.paging_total_res_text.replace( '\#TOTAL\#' ,pagination.total))+'</span>&nbsp;&nbsp;&nbsp;<span>'+(options.paging_pages_text.replace( '\#PAGES\#' ,pagination.num_pages))+'</span></div><hr/>';
	
	p += '<ul class="pagination '+options.paging_class+'">'+'\n';
	
	
	
	//if(pagination.page>3)
		p += '<li class="page-item"><a data-toggle="livegrid-page" class="page-link" data-page="1" href="javascript:;">'+options.paging_first_text+'</a></li>'+"\n";	
	p += '<li class="page-item"><a data-toggle="livegrid-page" class="page-link" data-page="'+(pagination.page -1)+'" href="javascript:;"><i class="'+options.pgae_prev_icon+'"></i></a></li>'+"\n";
	
	if(pagination.page <= 2) {
	$mn	= 1;
	$mx	= Math.min(5, pagination.num_pages);
	}
	else if(pagination.page >= (pagination.num_pages-2)) {
	$mn = pagination.num_pages - Math.min(5, pagination.num_pages) + 1;
	$mx = pagination.num_pages;
	}
	else {
	$mn = pagination.page-2;
	$mx = pagination.page+2;
	}
	for($i=$mn; $i<=$mx; $i++) {
	p += '<li  class="page-item '+(pagination.page==$i ? 'active' : '')+'" ><a data-toggle="livegrid-page" class="page-link" href="javascript:;" data-page="'+$i+'"   >'+$i+'</a></li>'+"\n";		
		
	}
	
	//if(pagination.page>3)
	p += '<li class="page-item"><a data-toggle="livegrid-page" class="page-link" data-page="'+(pagination.page +1)+'" href="javascript:;"><i class="'+options.pgae_next_icon+'"></i></a></li>'+"\n";
	p += '<li class="page-item"><a data-toggle="livegrid-page" class="page-link" data-page="'+(pagination.num_pages)+'" href="javascript:;">'+options.paging_last_text+'</a></li>'+"\n";
	
	
	p += '</ul>'+'\n';	
	p += '</div></div></div>'+'\n';	
	p += '<div class="clearfix"></div>'+'\n';	
	
		
		
		
	out +=p;	
		
	}
	
	

_this.html(out);
_this.find('[data-toggle="livegrid-page"]').click(function(ev){
 p = $(this).data('page');

	options.page = p;
	_this.refresh();
	
	
});
_this.find('table th').click(function(ev){

	$(this).attr('data-sorttype', ($(this).attr('data-sorttype')=="ASC" ? "DESC" : "ASC" ) );
	_this.refresh();
	
	
});


	
	},
	error(e,c){
		
		console.log('ERROR CODE AND MESSAGE:'+e+"\n\n"+c);
	},
	
	complete(){
		
		_this.working = false;
	
	

		
		
	}
	
	
	
});	
	
	
	
}

////////////////////////////////////

function loading(){
	
	
	
	
	
	
}

return this;

}

}( jQuery ));