<?php
    $mysqli =  $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("registration");
    $query = $mysqli->query("select * from user where email = '".$data->email."'and password = '".md5($data->pwd)."'");
?>
