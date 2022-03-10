<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type,location");
    
    session_start();
    $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("registration");
    $query = $mysqli->query("select * from user where email='".$data->email."'");
    if($query->num_rows)
    {
        $error= array("error"=>"email-exists");
        echo json_encode($error);
    }
    else
    {
        $query = $mysqli->query("insert into user (email,name,password) values ('".$data->email."','".$data->name."',md5('".$data->pwd."'));");
        $res = array('OK'=>1);
        echo json_encode($res);
    }
    ?>