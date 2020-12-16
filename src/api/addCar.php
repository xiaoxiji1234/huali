<?php


    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','hua');

    $proId=$_GET['proId'];
    $userName=$_GET['userName'];
    $proName=$_GET['proName'];
    $proPrice=$_GET['proPrice'];
    $originalCost=$_GET['originalCost'];
    $imgUrl=$_GET['imgUrl'];
    $num=$_GET['num'];
    $type=$_GET['type'];
    

    $sql="INSERT INTO `car`(`id`, `proId`,`userName`, `proName`, `proPrice`, `originalCost`, `imgUrl`, `num`, `type`) VALUES (null,'$proId','$userName','$proName','$proPrice','$originalCost','$imgUrl','$num','$type')";

    $sql1="SELECT * FROM `car` WHERE `proId`='$proId' AND `userName`='$userName'";
   
  
    # 执行SQL语句
    $res = mysqli_query($con,$sql1);

    if(!$res){
        die('error for mysql' .mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
     # 如果购物车表中存在该条数据，让这个条数据中的goods_num 值加 1
    if($row){
        $goodsNum = $row['num']+1;
       $res2= mysqli_query($con,"UPDATE `car` SET `num` = '$goodsNum'  WHERE `userName`='$userName' AND `proId`='$proId'");
    }else{
        # 如果不存在，就往car表中 添加数据
        $res2= mysqli_query($con,$sql);
    }
    if($res2){
        echo json_encode(array("code"=>true,"msg"=>"添加数据成功"));
    }

   
    
   
  
   
  
?>