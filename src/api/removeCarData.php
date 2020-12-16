<?php
    // 获取传递过来的用名 和 商品id
    $userName = $_GET['userName'];
    $id = $_GET['id'];

    $con = mysqli_connect('localhost','root','123456','goods');

    $sql = "DELETE FROM `car` WHERE `car`.`id` = '$id' AND `userName` = '$userName'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysqli' . mysqli_error());
        // echo json_encode(array("code"=>false,"msg"=>"删除数据失败"));
    }else{
        echo json_encode(array("code"=>$res,"msg"=>"删除数据成功"));
    }
?>