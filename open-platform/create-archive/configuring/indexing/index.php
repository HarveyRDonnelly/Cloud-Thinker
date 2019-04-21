<?php

// Cloud Thinker Software 2017
// File Directory: /open-platform/create-archive/configuring/indexing/index.php

// Define connection variables

$username = "id997101_open_admin";
$password = "TheWorld2002";
$servername = "localhost";
$db = "id997101_openplatform";
$conn = mysqli_connect($servername, $username, $password, $db);

// Check connection

if (!$conn) {
    die(
		header("/maintenance/")
	);
}

// Define other variables

$email = $_COOKIE["email"];
$table_id = $_COOKIE["table_id_cookie"];
$table_name = $_COOKIE["table_name_cookie"];

// Check connection

if (!$conn) {
    die(
		header("Location: /maintenance")
	);
}

// Insert data

if (mysqli_query($conn, "INSERT INTO public_table_list (table_name, table_id, admin_user) VALUES ('$table_name', '$table_id', '$email')")) {
    header("Location: /open-platform/create-archive/configuring/user-data/index.php");
} else {
   header("Location: /maintenance");
}

// Close connection

mysqli_close($conn);

?>