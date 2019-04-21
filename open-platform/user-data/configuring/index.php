<?php

// Cloud Thinker Software 2017
// File Directory: /open-platform/user-data/configuring/index.php

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

// Create table

if ($result = mysqli_query($conn, "SHOW TABLES LIKE '`$email`'")) {
    if($result->num_rows == 1) {
    } else {
		$sql = "CREATE TABLE `$email` (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		table_name VARCHAR(30) NOT NULL,
		table_id VARCHAR(30) NOT NULL,
		date_created TIMESTAMP
		)";

		if (mysqli_query($conn, $sql)) {
			header("Location: /");
		} else {
			header("Location: /maintenance");
		}
	}
} else {
	header("Location: /maintenance");
}

// Close connection

mysqli_close($conn);

?>