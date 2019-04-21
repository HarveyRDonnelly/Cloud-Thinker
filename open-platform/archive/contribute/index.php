<?php

// Cloud Thinker Software 2017
// File Directory: /open-platform/archive/contribute/index.php

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

// Display submit form

if($table_id == null) {
	header("Location: /");
}

echo('

<html>
	<head>
	
		<!-- Link to jQuery library -->
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

		<!-- Link to Bootstrap CDN (JS) -->
		
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
		<!-- Initialise Google Analytics (JS) -->
		
		<script src="/js/google_analytics_init.js"></script>
		
		<!-- Initialise Facebook SDK (JS) -->
		
		<script src="/js/fb_sdk_init.js"></script>

		<!-- Firebase Script CDNs (JS) -->
	
		<script src="https://www.gstatic.com/firebasejs/3.2.1/firebase.js"></script>
		<script src="https://www.gstatic.com/firebasejs/3.6.10/firebase-app.js"></script>
		<script src="https://www.gstatic.com/firebasejs/3.6.10/firebase-auth.js"></script>
		<script src="https://www.gstatic.com/firebasejs/3.6.10/firebase-database.js"></script>
		<script src="https://www.gstatic.com/firebasejs/3.6.10/firebase-messaging.js"></script>
		<script src="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.js"></script>
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<script src="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.js"></script>
		
		<!-- Initialise Firebase (JS) -->
		
		<script src="/js/firebase_init.js"></script>
		
		<!-- Main Script (JS) -->
		
		<script src="/js/main.js"></script>
		
		<!-- Link to Firebase CDN (CSS) -->
		
		<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.css" />
		
		<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.css" />
		
		<!-- Link to Cascading Style -->
		
		<link href="/css/style.css" type="text/css" rel="stylesheet"/>
		
		<!-- Link and Display Shortcut Icon -->
		
		<link rel="icon" href="/img/logo.png"/>
		
		<!-- Font Awesome CDN (CSS) -->
		
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		
		<!-- Link to Bootstrap CDN (CSS) -->
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		
		<!-- Meta tags -->
		
		<meta name="google-signin-scope" content="profile email">
		<meta name="google-signin-client_id" content="294179949419-81bq51mmqelbkn28udkh9lirsa0q7msi.apps.googleusercontent.com">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
	
		<!-- Display Webpage Title -->
		
		<title>Submit data to ');
			echo(htmlspecialchars($table_name));
			echo('
		</title>
	</head>
	<!-- Body -->
	
	<body id="submit-body">
		
		<div id="div-blur">
	
			<!-- Navbar -->
			
			<nav id="nav" class="navbar navbar-inverted navbar-fixed-top">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span> 
						</button>
						<a class="navbar-brand" href="/">
							<nobr id="navbar-nobr-logo">
								<img src="/img/svg/logo.svg" height="100%"/>
								cloud 
								<strong id="navbar-strong-logo">
									thinker
								</strong>
							</nobr>
						</a>
					</div>
					<div class="collapse navbar-collapse" id="myNavbar">
						<ul class="nav navbar-nav">
							<li>
								<a id="navbar-a-open" href="/open-platform/">
									Open Platform
								</a>
							</li>
							<li>
								<a id="navbar-a-enterprise" href="/#dev-platform">
									Developer Platform
								</a>
							</li>
							<li>
								<a id="navbar-a-academic" href="/#contact-us">
									Contact us
								</a>
							</li>
						</ul>
						<ul id="nav-right-ul" class="nav navbar-nav navbar-right">
							<li>
								<a href="#sign-in" onclick="signInVisibility()" id="nav-account">
									<span class="glyphicon glyphicon-user">
									</span>
									Sign In 
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			
			<!-- Content -->
		
			</br>
			</br>
			<div class="container">
				<form action="/open-platform/archive/contribute/submit/?id=');
				echo($table_id);
				echo('" id="current-form" method="POST">
					<div id="submit-title-text">
						<h1>
							Add to ');
							echo(htmlspecialchars($table_name));
						echo('</h1>
					</div>
					<div>
						<p>
							<div id="submit-heading">
								');
								echo(htmlspecialchars($field_array[1]));
								echo('
							</div>
							<input class="form-control" type="text" name="field1_data"></textarea>
						</p>
						<p>
							<div id="submit-heading">
								');
								echo(htmlspecialchars($field_array[2]));
								echo('
							</div>
							<textarea id="submit-textarea" class="form-control" type="text" name="field2_data"></textarea>
						</p>
						<p>
							<div id="submit-heading">
								');
								echo(htmlspecialchars($field_array[3]));
								echo('
							</div>
							<textarea id="submit-textarea" class="form-control" type="text" name="field3_data"></textarea>
						</p>
						<p>
							<div id="submit-heading">
								');
								echo(htmlspecialchars($field_array[4]));
								echo('
							</div>
							<textarea id="submit-textarea" class="form-control" type="text" name="field4_data"></textarea>
						</p>
					</div>
				</form>
				<h3>
					<button id="create-archive-btn" onclick="formSignInCheck();">
						Create
					</button>
				</h3>
			
			</div>
		</div>
		
		<div id="sign-in-div">
			<div id="sign-in-div-esc-btn" class="glyphicon glyphicon-remove" onclick="signInVisibility(); endScreenBlur();">
			</div>
			<div class="row">
				<h1 id="sign-intitle" align="center">
					Sign in
					<span class="glyphicon glyphicon-log-in">
					</span>
				</h1>
			</div>
			<div class="row">
				<p>
					</br>
					<div id="sign-in-email-group" class="form-group"  data-toggle="tooltip" data-placement="top" title="error">
						<input id="email" class="form-control" type="text" width="100%" placeholder="Email">
						<div id="sign-in-email-glyphicon">
						</div>
					</div>
					<div id="sign-in-password-group" class="form-group"  data-toggle="tooltip" data-placement="top" title="error">
						<input id="password" class="form-control" type="password" width="100%" placeholder="Password">
						<div id="sign-in-password-glyphicon">
						</div>
					</div>
					<button disabled id="e_SignInButton" class="btn btn-primary btn-md btn-block">
						Sign in
					</button>
					</br>
					<div data-toggle="collapse" data-target="#signInHelp" id="a-no-dec">
						<b>
							Having trouble signing in?
						</b>
					</div>
					<div id="signInHelp" class="collapse">
						Reset your password
						<a href="/reset-password/">
							here
						</a>
						</br>
						Create an account
						<a href="/create-account/">
							here
						</a>
					</div>
				</p>
				<hr>
				</hr>
				<p>
					<button disabled class="btn btn-block" id="fb_SignInButton">
						<span class="fa fa-facebook">
						</span>
						Log in with Facebook
					</button>
					</br>
					<button disabled class="btn btn-block" id="g_SignInButton">
						<span class="fa fa-google">
						</span> 
						Log in with Google
					</button>
					</br>
					<button disabled class="btn btn-block" id="tw_SignInButton">
						<span class="fa fa-twitter">
						</span>
						Log in with Twitter
					</button>
					</br>
				</p>
			</div>
		</div>
	</body>
</html>

');

// Close connection

mysqli_close($conn);

?>