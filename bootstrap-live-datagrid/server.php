<?php
sleep(2);
/*
$data is an array and has some indexes

$data['head'] is an array for <thead> items on front-end with Key and Value Same as sample

$data['order'] is an array for Showing order Arrows up and down in <thead>


$data['page'] is a number for current Page
$data['totla'] is a number for all results
$data['num_pages'] is a number for all Pages count
$data['limit'] is a number for limit per page


$data['data'] is an Array for results


*/


$data = []; 

$data['head'] = ['id'=>'کد','name'=>'نام','mobile'=>'همراه','act'=>'عملیات'];





$data['order'] =[];

if(isset($_POST['__order_by'])){

$data['order'] = $_POST['__order_by'];
	
}



$total = 8;
$limit = isset($_POST['_LIMIT']) ? $_POST['_LIMIT'] : 2 ; 
$num_pages = ceil($total/$limit);
$page = 1;
if(isset($_POST['_PAGE']))
	$page = intval($_POST['_PAGE']);

$oo[] =['id'=>1,'name'=>'arash','mobile'=>'09130246374','act'=>'<button class="btn btn-light btn-sm">DELETE</button>']; 
$oo[] =['id'=>2,'name'=>'ashkan','mobile'=>'09194568517','act'=>'<button class="btn btn-info btn-sm">DELETE</button>']; 
$oo[] =['id'=>3,'name'=>'soodabe','mobile'=>'09194568517','act'=>'<button class="btn btn-info btn-sm">DELETE</button>']; 
$oo[] =['id'=>4,'name'=>'sanaz','mobile'=>'09194568517','act'=>'<button class="btn btn-info btn-sm">DELETE</button>']; 
$oo[] =['id'=>5,'name'=>'rostam','mobile'=>'09194568517','act'=>'<button class="btn btn-info btn-sm">DELETE</button>']; 
$oo[] =['id'=>6,'name'=>'koorosh','mobile'=>'09194568517','act'=>'<button class="btn btn-info btn-sm">DELETE</button>']; 
$oo[] =['id'=>7,'name'=>'sohrab','mobile'=>'09194568517','act'=>'<button class="btn btn-info btn-sm">DELETE</button>']; 
$oo[] =['id'=>8,'name'=>'behdad','mobile'=>'09130246374','act'=>'<button class="btn btn-light btn-sm">DELETE</button>']; 


$data['data'] = 	array_slice($oo, ($page-1)*$limit ,$limit);
	
$data['page'] = $page;
$data['total'] = $total;
$data['num_pages'] = $num_pages;
$data['limit'] = $limit;




echo json_encode($data);
exit;