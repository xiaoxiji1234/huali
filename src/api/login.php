<?php


    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');

    $tel=$_POST['tel'];
    $email=$_POST['email'];
    $password=$_POST['password'];
  
    # 设置SQL语句
    if($tel==null){
        $sql = "SELECT * FROM `user` WHERE `email`='$email' AND `password`='$password'";
    }else if($email==null){
        $sql = "SELECT * FROM `user` WHERE `tel`='$tel' AND `password`='$password'";
    }
    

    # 执行SQL语句
    $res = mysqli_query($con,$sql);


    if(!$res){
        die('error'.mysqli_error($con));
    };
    $row=mysqli_fetch_assoc($res);
   if(!$row){
       print_r(json_encode(array('code'=>false)));
   }else{
       print_r(json_encode(array('code'=>true)));
    }
    
   
  
   
  
?>