<?php

// Cloud Thinker Software 2017
// File Directory: /open-platform/create-archive/configuring/index.php

// Define connection variables

$username = "id997101_open_admin";
$password = "TheWorld2002";
$servername = "localhost";
$db = "id997101_openplatform";
$conn = mysqli_connect($servername, $username, $password, $db);

// Check connection

if (!$conn) {
    die(
		header("Location: /maintenance")
	);
}

// Define other variables

$email = $_COOKIE["email"];
$table_id = uniqid();
$table_name = strval($_GET['table_name']);
$table_name = mysqli_real_escape_string($conn, $table_name);
$field_1 = strval($_GET['field_1']);
$field_1 = mysqli_real_escape_string($conn, $field_1);
$field_2 = strval($_GET['field_2']);
$field_2 = mysqli_real_escape_string($conn, $field_2);
$field_3 = strval($_GET['field_3']);
$field_3 = mysqli_real_escape_string($conn, $field_3);
$field_4 = strval($_GET['field_4']);
$field_4 = mysqli_real_escape_string($conn, $field_4);

// Create table

if (mysqli_query($conn, "CREATE TABLE `$table_id` (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,`$field_1` VARCHAR(1000) NOT NULL,`$field_2` VARCHAR(1000) NOT NULL,`$field_3` VARCHAR(1000) NOT NULL,`$field_4` VARCHAR(1000) NOT NULL,reg_date TIMESTAMP)")) {
	setcookie('table_name_cookie', $table_name);
	setcookie('table_id_cookie', $table_id);
    header("Location: /open-platform/create-archive/configuring/indexing/index.php");
} else {
    header("Location: /maintenance");
}

// Close connection

mysqli_close($conn);
?>