<?php


    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');
  
    # 设置SQL语句
   $sql="SELECT * FROM `products` WHERE `new`=1";
    

    # 执行SQL语句
    $res = mysqli_query($con,$sql);


    if(!$res){
        die('error'.mysqli_error($con));
    };
    $row=mysqli_fetch_assoc($res);
    $arr=array();
  while($row){
      array_push($arr,$row);
      $row=mysqli_fetch_assoc($res);
  }
  print_r(json_encode($arr));
    
   
  
?>