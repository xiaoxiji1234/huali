<?php

    $key=$_GET['key'];
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');
  
    # 设置SQL语句
   $sql="SELECT * FROM `products` WHERE `type` LIKE '%$key%'";
    


    # 执行SQL语句
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error'.mysqli_error($con));
    };
    $row=mysqli_fetch_assoc($res);
    if(!$row){
        $sql1="SELECT * FROM `products` WHERE `introduce` LIKE '%$key%'";
        $res1 = mysqli_query($con,$sql1);
        if(!$res1){
            die('error'.mysqli_error($con));
        };
        $row1=mysqli_fetch_assoc($res1);
        $arr1=array();
        while($row1){
            array_push($arr1,$row1);
            $row1=mysqli_fetch_assoc($res1);
        }
        print_r(json_encode($arr1));
    }else{
        $arr=array();
        while($row){
            array_push($arr,$row);
            $row=mysqli_fetch_assoc($res);
        }
        print_r(json_encode($arr));
     }
    
    
   
  
?>