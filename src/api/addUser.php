<?php


    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');

    $tel=$_POST['tel'];
    $password=$_POST['password'];
    $email=$_POST['email'];

    //手机注册
    if($email==null){
        $sql = "INSERT INTO `user`(`id`, `tel`, `email`, `password`) VALUES (null,'$tel',null,'$password')";
    }else if($tel==null){  //邮箱注册
        $sql = "INSERT INTO `user`(`id`, `tel`, `email`, `password`) VALUES (null,null,'$email','$password')";
    }
  
    # 执行SQL语句
    $res = mysqli_query($con,$sql);


    if(!$res){
        die('error'.mysqli_error($con));
    };
   print_r(json_encode(array('code'=>true)));
    
   
  
   
  
?>