<?php

    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');

    $id=$_GET['id'];
   
    // print_r($id);

    $sql="DELETE FROM `car` WHERE `id`= $id";


   
  
    # 执行SQL语句
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysql' .mysqli_error($con));
    }
    
  
    echo json_encode(array("code"=>true,"msg"=>"删除数据成功"));
    

   
    
   
  
   
  
?>