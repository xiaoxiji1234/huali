<?php


    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');

    $userName=$_GET['userName'];
    $num=$_GET['num'];
    $id=$_GET['id'];

    

    $sql="UPDATE `car` SET `userName`='$userName',`num`=$num WHERE `id`=$id";
  
    # 执行SQL语句
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysql' .mysqli_error($con));
    }
   
   
    echo json_encode(array("code"=>true,"msg"=>"添加数据成功"));
    

   
    
   
  
   
  
?>