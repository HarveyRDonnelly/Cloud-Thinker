<?php

// Cloud Thinker Software 2017
// File Directory: /open-platform/my-archives/delete/index.php

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

$table_id = strval($_GET["table_id"]);
$email = $_COOKIE["email"];

// Insert data

if (mysqli_query($conn, "DELETE FROM `$email` WHERE `$email`.`table_id` = '$table_id'")) {
	if (mysqli_query($conn, "DELETE FROM `public_table_list` WHERE `public_table_list`.`table_id` = '$table_id'")) {
		if (mysqli_query($conn, "DROP TABLE $table_id")) {
			header("Location: /open-platform/my-archives");
		} else {
		   header("Location: /maintenane");
		}
	} else {
		header("Location: /maintenance");
	}
} else {
	header("Location: /maintenancce");
}

// Close connection

mysqli_close($conn);

?>