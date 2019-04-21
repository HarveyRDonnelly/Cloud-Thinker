<?php

// Cloud Thinker Software 2017
// File Directory: /open-platform/my-archives/delete/index.php

// Define connection variables

$username = "id997101_dev_admin";
$password = "TheWorld";
$servername = "localhost";
$db = "id997101_dev_platform";
$conn = mysqli_connect($servername, $username, $password, $db);

// Define other variables

$table_id = "15469";
$row_id = "1001";

// Set Queries

$usedFieldsArray = mysqli_query($conn, "SELECT * FROM archiveIndex WHERE id=$table_id");
$usedFieldsCell = mysqli_fetch_array($usedFieldsArray);
$usedFields = $usedFieldsCell["usedFields"];
$queryResult = mysqli_query($conn, "SELECT * FROM `$table_id` WHERE id=$row_id");

// Check connection

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($usedFields == 1) {
	
} else if ($usedFields == 2) {
	
} else if ($usedFields == 3) {
	
} else if ($usedFields == 4) {
	
} else if ($usedFields == 5) {
	if (mysqli_num_rows($queryResult) > 0) {
		while($row = mysqli_fetch_assoc($queryResult)) {
			echo("<h1>");
			echo($row["field1"]);
			echo("</h1>");
			echo($row["field4"]);
			echo("<h3>");
		}
	} else {
		echo "No data.";
	}
	
} else if ($usedFields == 6) {
	
} else if ($usedFields == 7) {
	
} else if ($usedFields == 8) {
	
} else if ($usedFields == 9) {
	
} else if ($usedFields == 10) {
	
}

echo("usedFields: " . $usedFields);

mysqli_close($conn);
?>