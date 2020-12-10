<?php


    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');

    $tel=$_POST['tel'];
  
    # 设置SQL语句
    $sql = "SELECT * FROM `user` WHERE `tel`='$tel'";

    # 执行SQL语句
    $res = mysqli_query($con,$sql);


    if(!$res){
        die('error'.mysqli_error($con));
    };
    $row=mysqli_fetch_assoc($res);
   if(!$row){
       print_r(json_encode(true));
   }else{
       print_r(json_encode(false));
    }
    
   
  
   
  
?>