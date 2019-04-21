<?php

// Cloud Thinker Software 2017
// File Directory: /open-platform/archive/contribute/submit/index.php

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

$field1_data = strval($_POST['field1_data']);
$field1_data = mysqli_real_escape_string($conn, $field1_data);
$field2_data = strval($_POST['field2_data']);
$field2_data = mysqli_real_escape_string($conn, $field2_data);
$field3_data = strval($_POST['field3_data']);
$field3_data = mysqli_real_escape_string($conn, $field3_data);
$field4_data = strval($_POST['field4_data']);
$field4_data = mysqli_real_escape_string($conn, $field4_data);
$table_id = strval($_GET['id']);
$table_name_array = mysqli_query($conn, "SELECT * FROM public_table_list WHERE table_id LIKE '%$table_id%'");
$table_name_cell = mysqli_fetch_array($table_name_array);
$table_name = $table_name_cell["table_name"];
$result1 = mysqli_query($conn, "SHOW COLUMNS FROM `$table_id`");
$field_array_string = "";
while($row1 = mysqli_fetch_array($result1)){
	$field_array_string .= $row1[0].",";
}
$field_array = explode(',', $field_array_string);

// Insert data

if (mysqli_query($conn, "INSERT INTO `$table_id` (`$field_array[1]`, `$field_array[2]`, `$field_array[3]`, `$field_array[4]`)
VALUES ('$field1_data', '$field2_data', '$field3_data', '$field4_data')")) {
    header("Location: /open-platform/archive/?id=" . $table_id);
} else {
	header("Location: /maintenance");
}

// Close connection

mysqli_close($conn);
?>