<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
$C = new stdclass();

$C->BASEURL = 'http://localhost/bootstrap-live-datagrid/';





function get_conf($index){
	global $C;
	
	return $C->{$index};
	
}




?>

<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>   </title>
	<link href="<?=get_conf('BASEURL').'dist/css/font-awesome.css'?>"  rel="stylesheet" type="text/css" />
	<link href="<?=get_conf('BASEURL').'dist/css/bootstrap.min.css'?>"  rel="stylesheet" type="text/css" />
	<link href="<?=get_conf('BASEURL').'dist/css/live_datagrid.css'?>"  rel="stylesheet" type="text/css" />
	<script>
	var siteurl = "<?=get_conf('BASEURL')?>";
	
	</script>
	<script src="<?=get_conf('BASEURL').'dist/js/jquery.js'?>" ></script>


	
</head>	


<body>


<div class="container mt-2" >

<div id="app" >
<form id="sf" >

<input type="text" name="name" />
<button type="submit" name="search" value="1" >جستجو</button>

</form>
<div id="datagrid_a"></div>




</div>

<a href="javascript:;"  onclick="t.refresh()" >رفرش</a>

</div>

	<script src="<?=get_conf('BASEURL').'dist/js/bootstrap.min.js'?>" ></script>
	
	<script src="<?=get_conf('BASEURL').'dist/js/main.js'?>" ></script>
	
	<script>
	var t ;
	$(document).ready(function(){
	
		 t = $('#datagrid_a').live_datagrid({
			
			url:siteurl+'server.php',
			el:"#datagrid_a",
			order_by:{'id':['id','DESC'],'name':['name','ASC'],'mobile':['mobile','ASC']},
			search_form:'#sf',
		});
		
		
		t.get();
		
		
		
		
	});
	
	
	</script>
	
	
</body>
</html>