<?php

// Cloud Thinker Software 2017
// File Directory: /contact-us/send-email/index.php

$ct_email = "harveydonnelly02@gmail.com";
$input_name = strval($_POST["name"]);
$input_user_email = strval($_POST["email"]);
$input_subject = strval($_POST["subject"]);
$input_content = strval($_POST["message"]);

$headers = "From: " . $input_user_email . "\r\n";
$headers .= "Reply-To: ". $input_user_email . "\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$subject = "Message from " . $input_name . " - " . $input_subject;

$message = "

<html>
	<body>
		<h1>
			<bold>" . $input_subject . "</bold>
		</h1>
		<p>" . $input_content . "</p>
		<h3>" . $input_name . "</h3>
		<h4>" . $input_user_email . "</h3>
		</br>
		<h2>
			<img src='http://www.cloudthinker.tk/img/logo.png' height='25px'/>
		</h2>
	</body
</html>

";

mail($ct_email, $subject, $message, $headers);
header("Location: /");

?>