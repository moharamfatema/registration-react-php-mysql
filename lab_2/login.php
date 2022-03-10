<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type,location");
    
    $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("registration");
    $query = $mysqli->query("select * from user where email = '".$data->email."'and password = '".md5($data->pwd)."'");
    if($query->num_rows)
    {
        $query = $query->fetch_row();
        echo json_encode($query);
    }
    else
    {
        $error= array("error"=>"not-found");
        echo json_encode($error);
    }
    ?>