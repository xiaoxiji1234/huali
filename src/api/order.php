<?php

    $key=$_GET['key'];
    $min=$_GET['min'];
    $len=$_GET['len'];
    $start = ($min-1)*$len;
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');
  
    # 设置SQL语句
   $sql="SELECT * FROM `products` ORDER BY `sale` DESC LIMIT $start,$len";

   $sql1="SELECT * FROM `products` ORDER BY `proPrice` LIMIT $start,$len";

    $sql2="SELECT * FROM `products` WHERE `new`=1 LIMIT $start,$len";

    $sql3="SELECT * FROM `products` ORDER BY `proPrice` LIMIT $start,$len";

   $sql4="SELECT * FROM `products` ";


    if($key=='销量'){
        $res = mysqli_query($con,$sql);
        $arr=array();
        $row=mysqli_fetch_assoc($res);
        while($row){
            array_push($arr,$row);
            $row=mysqli_fetch_assoc($res);
        }
        $s = "SELECT COUNT(*) `sale` FROM `products`";
        $r= mysqli_query($con,$s);
    
        if (!$r) {
        die('error for mysql: ' .mysqli_error($con));
        };
        $rs = mysqli_fetch_assoc($r);

       $arr2=array(
            "total" => $rs['sale'],
            "list" => $arr,
            "code" => 1,
            "message" => "获取列表数据成功"
        );
        print_r(json_encode($arr2));
    }else if($key=='价格'){
        $res = mysqli_query($con,$sql1);
        $arr=array();
        $row=mysqli_fetch_assoc($res);
        while($row){
            array_push($arr,$row);
            $row=mysqli_fetch_assoc($res);
        }
        $s = "SELECT COUNT(*) `proPrice` FROM `products`";
        $r= mysqli_query($con,$s);
    
        if (!$r) {
        die('error for mysql: ' .mysqli_error($con));
        };
        $rs = mysqli_fetch_assoc($r);

       $arr2=array(
            "total" => $rs['proPrice'],
            "list" => $arr,
            "code" => 1,
            "message" => "获取列表数据成功"
        );
        print_r(json_encode($arr2));
    }else if($key=='最新'){
        $res = mysqli_query($con,$sql2);
        $arr=array();
        $row=mysqli_fetch_assoc($res);
        while($row){
            array_push($arr,$row);
            $row=mysqli_fetch_assoc($res);
        }
        $s = "SELECT COUNT(*) `new` FROM `products` WHERE `new`=1";
        $r= mysqli_query($con,$s);
    
        if (!$r) {
        die('error for mysql: ' .mysqli_error($con));
        };
        $rs = mysqli_fetch_assoc($r);

       $arr2=array(
            "total" => $rs['new'],
            "list" => $arr,
            "code" => 1,
            "message" => "获取列表数据成功"
        );
        print_r(json_encode($arr2));
    }else{
        $res = mysqli_query($con,$sql4);
        $arr=array();
        $row=mysqli_fetch_assoc($res);
        while($row){
            array_push($arr,$row);
            $row=mysqli_fetch_assoc($res);
        }
        $s = "SELECT COUNT(*) `id` FROM `products`";
        $r= mysqli_query($con,$s);
    
        if (!$r) {
        die('error for mysql: ' .mysqli_error($con));
        };
        $rs = mysqli_fetch_assoc($r);

       $arr2=array(
            "total" => $rs['id'],
            "list" => $arr,
            "code" => 1,
            "message" => "获取列表数据成功"
        );
        print_r(json_encode($arr2));
    }

    
        
        
    
       

    
 
    

   
     
    
    
   
  
?>