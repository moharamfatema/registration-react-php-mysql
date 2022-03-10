<style>
    <?php include './main.css'; ?>
</style>
<?php

echo "
<!DOCTYPE html>
    <html lang='en'>
        <head></head>    
        <body class='body'>
            <div class='welcome'>
                <h1>Hello ".$_GET['name']."</h1>
            </div>
        </body>
    </html>
    ";
?>
