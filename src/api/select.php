<?php

    $key=$_GET['key'];
    $min=$_GET['min'];
    $len=$_GET['len'];
    $start = ($min-1)*$len;
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');
  
    # 设置SQL语句
   $sql="SELECT * FROM `products` WHERE `type` LIKE '%$key%' LIMIT $start,$len";

   $sql1="SELECT * FROM `products` WHERE `introduce` LIKE '%$key%' LIMIT $start,$len";

    $sql3="SELECT * FROM `products` LIMIT $start,$len";
    
    $sql4="SELECT COUNT(*) `id` FROM `products`";

    if($key=='undefined'){
        $res2 = mysqli_query($con,$sql3);
        $arr2=array();
        $row2=mysqli_fetch_assoc($res2);
        while($row2){
            array_push($arr2,$row2);
            $row2=mysqli_fetch_assoc($res2);
        }
        $s = "SELECT COUNT(*) `id` FROM `products`";
        $r= mysqli_query($con,$s);
    
        if (!$r) {
        die('error for mysql: ' .mysqli_error($con));
        };
        $rs = mysqli_fetch_assoc($r);

       $arr2=array(
            "total" => $rs['id'],
            "list" => $arr2,
            "code" => 1,
            "message" => "获取列表数据成功"
        );
        print_r(json_encode($arr2));

    }else{
        # 执行SQL语句
        $res = mysqli_query($con,$sql);
        if(!$res){
            die('error'.mysqli_error($con));
        };
        $row=mysqli_fetch_assoc($res);
        if(!$row){
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

            $s = "SELECT COUNT(*) `introduce` FROM `products` WHERE `introduce` LIKE '%$key%'";
            $r= mysqli_query($con,$s);
        
            if (!$r) {
            die('error for mysql: ' .mysqli_error($con));
            };
            $rs = mysqli_fetch_assoc($r);

            echo json_encode(array(
                "total" => $rs['introduce'],
                "list" => $arr1,
                "code" => 1,
                "message" => "获取列表数据成功"
            ));
        

        }else{
            $arr=array();
            while($row){
                array_push($arr,$row);
                $row=mysqli_fetch_assoc($res);
            }
            $s = "SELECT COUNT(*) `type` FROM `products` WHERE `type` LIKE '%$key%'";
            $r= mysqli_query($con,$s);
        
            if (!$r) {
            die('error for mysql: ' .mysqli_error($con));
            };
            $rs = mysqli_fetch_assoc($r);

            echo json_encode(array(
                "total" => $rs['type'],
                "list" => $arr,
                "code" => 1,
                "message" => "获取列表数据成功"
            ));
        
        }
    }
       

    
 
    

   
     
    
    
   
  
?>