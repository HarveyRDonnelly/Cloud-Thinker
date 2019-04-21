
/* jQuery */

window.addEventListener("hashchange", function() { scrollBy(0, -65) });

$("#div-blur").click(function(e){
    e.stopPropagation();
});

$(function() {
	
	$(document).on("change", ":file", function() {
		var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
		input.trigger('fileselect', [numFiles, label]);
	});

	$(document).ready( function() {
		$(":file").on("fileselect", function(event, numFiles, label) {

			var input = $(this).parents(".input-group").find(":text"),
			log = numFiles > 1 ? numFiles + " files selected" : label;

			if( input.length ) {
				input.val(log);
			} else {
				if (log ){
					document.getElementById("create-account-file-input-label").textContent = log;
				};
			}
		});
	});
});

$(function() {
    var imagesPreview = function(input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    $($.parseHTML("<img height='100px'>")).attr("src", event.target.result).appendTo(placeToInsertImagePreview);
                }
                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('#create-account-file-input').on("change", function() {
		$( "#create-account-default-preview-img" ).remove();
        imagesPreview(this, "div.create-account-preview-img");
    });
});

// Validate Email Address

function validateEmail(x) {
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
}

/* Sign In Visibility */

function signInVisibility() {
    var popup = document.getElementById("sign-in-div");
	document.getElementById("div-blur").style.cssText = "filter: blur(3px)grayscale(0.7); pointer-events: none;";
    popup.classList.toggle("show");
}

function endScreenBlur() {
	document.getElementById("div-blur").style.cssText = "filter: blur(0px)grayscale(0);";
}

// Firebase AUTH Functions

// Check if a user is signed in

function formSignInCheck() {
	var user = firebase.auth().currentUser;

	if (user) {
		document.getElementById("current-form").submit();
	} else {
		signInVisibility();
		document.getElementById("sign-intitle").textContent = "You must sign in to continue ";
		return;
	}
}

function myArchivesLinkSignInCheck() {
	var user = firebase.auth().currentUser;

	if (user) {
		window.location.href = "/open-platform/my-archives";
	} else {
		signInVisibility();
		document.getElementById("sign-intitle").textContent = "You must sign in to continue ";
		return;
	}
}

// Sign any user out

function signOut() {
	firebase.auth().signOut().then(function() {
		document.cookie = "email=";
		window.location.href = "/";
	}).catch(function(error) {
	});
}

// Email Auth

function e_toggleSignIn() {
	if (firebase.auth().currentUser) {
		firebase.auth().signOut();
	} else {
		
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;
		
		var obj_email = document.getElementById("sign-in-email-group");
		var obj_password = document.getElementById("sign-in-password-group");
		
		var glyph_email = document.getElementById("sign-in-email-glyphicon");
		var glyph_password = document.getElementById("sign-in-password-glyphicon");
		
		if (!validateEmail(email)) {
			obj_email.className = "form-group has-success has-feedback";
			glyph_email.className = "glyphicon glyphicon-ok form-control-feedback";
			$("#sign-in-email-group").tooltip("destroy");
		} else {
			obj_email.className = "form-group has-error has-feedback";
			glyph_email.className = "glyphicon glyphicon-remove form-control-feedback";
			$("#sign-in-email-group").tooltip("destroy");
			$("#sign-in-email-group").attr("title", "Email address not valid");
			$("#sign-in-email-group").tooltip("show");
			return;
		}
		
		if (email.length < 4) {
			obj_email.className = "form-group has-error has-feedback";
			glyph_email.className = "glyphicon glyphicon-remove form-control-feedback";
			$("#sign-in-email-group").tooltip("destroy");
			$("#sign-in-email-group").attr("title", "Email address too short");
			$("#sign-in-email-group").tooltip("show");
			return;
		} else if (email.length > 4) {
			obj_email.className = "form-group has-success has-feedback";
			glyph_email.className = "glyphicon glyphicon-ok form-control-feedback";
			$("#sign-in-email-group").tooltip("destroy");
		}
		
		if (password.length < 6) {
			obj_password.className = "form-group has-error has-feedback";
			glyph_password.className = "glyphicon glyphicon-remove form-control-feedback";
			$("#sign-in-password-group").tooltip("destroy");
			$("#sign-in-password-group").attr("title", "Please enter a password");
			$("#sign-in-password-group").tooltip("show");
			return;
		} else if (password.length > 6) {
			obj_password.className = "form-group has-success has-feedback";
			glyph_password.className = "glyphicon glyphicon-ok form-control-feedback";
			$("#sign-in-password-group").tooltip("destroy");
		}
		
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === "auth/wrong-password") {
				obj_password.className = "form-group has-error has-feedback";
				glyph_password.className = "glyphicon glyphicon-remove form-control-feedback";
				$("#sign-in-password-group").tooltip("destroy");
				$("#sign-in-password-group").attr("title", "Wrong Password");
				$("#sign-in-password-group").tooltip("show");
			} else {
				obj_password.className = "form-group has-warning has-feedback";
				glyph_password.className = "glyphicon glyphicon-warning-sign form-control-feedback";
				$("#sign-in-password-group").tooltip("destroy");
				$("#sign-in-password-group").attr("title", errorMessage);
				$("#sign-in-password-group").tooltip("show");
			}
			console.log(error);
			document.getElementById("e_SignInButton").disabled = false;
		});
		document.getElementById("e_SignInButton").disabled = true;
	}
}

function e_handleSignUp() {
	
	var email = document.getElementById("email").value;
	var c_email = document.getElementById("c_email").value;
	var password = document.getElementById("password").value;
	var c_password = document.getElementById("c_password").value;
	var input_displayName = document.getElementById("displayName").value;
	var profileImage = document.getElementById("create-account-file-input");
	
	var obj_email = document.getElementById("create-account-email-group");
	var obj_c_email = document.getElementById("create-account-c_email-group");
	var obj_password = document.getElementById("create-account-password-group");
	var obj_c_password = document.getElementById("create-account-c_password-group");
	var obj_displayName = document.getElementById("create-account-displayName-group");
	
	var glyph_email = document.getElementById("create-account-email-glyphicon");
	var glyph_c_email = document.getElementById("create-account-c_email-glyphicon");
	var glyph_password = document.getElementById("create-account-password-glyphicon");
	var glyph_c_password = document.getElementById("create-account-c_password-glyphicon");
	var glyph_displayName = document.getElementById("create-account-displayName-glyphicon");
	
	if (displayName.length < 2) {
		obj_displayName.className = "form-group has-error has-feedback";
		glyph_displayName.className = "glyphicon glyphicon-remove form-control-feedback";
		$("#create-account-displayName-group").tooltip("destroy");
		$("#create-account-displayName-group").attr("title", "Please enter a valid name");
		$("#create-account-displayName-group").tooltip("show");
		return;
	} else if (displayName.length > 2) {
		obj_displayName.className = "form-group has-success has-feedback";
		glyph_displayName.className = "glyphicon glyphicon-ok form-control-feedback";
		$("#create-account-displayName-group").tooltip("destroy");
	}
	
	if (email.length < 4) {
		obj_email.className = "form-group has-error has-feedback";
		glyph_email.className = "glyphicon glyphicon-remove form-control-feedback";
		$("#create-account-email-group").tooltip("destroy");
		$("#create-account-email-group").attr("title", "Email address is too short");
		$("#create-account-email-group").tooltip("show");
		return;
	} else if (email.length > 4) {
		obj_email.className = "form-group has-success has-feedback";
		glyph_email.className = "glyphicon glyphicon-ok form-control-feedback";
		$("#create-account-email-group").tooltip("destroy");
	}
	
	if (!validateEmail(email)) {
		obj_email.className = "form-group has-success has-feedback";
		glyph_email.className = "glyphicon glyphicon-ok form-control-feedback";
		$("#create-account-email-group").tooltip("destroy");
	} else {
		obj_email.className = "form-group has-error has-feedback";
		glyph_email.className = "glyphicon glyphicon-remove form-control-feedback";
		$("#create-account-email-group").tooltip("destroy");
		$("#create-account-email-group").attr("title", "Email address not valid");
		$("#create-account-email-group").tooltip("show");
		return;
	}
	
	if (c_email.length < 4) {
		obj_c_email.className = "form-group has-error has-feedback";
		glyph_c_email.className = "glyphicon glyphicon-remove form-control-feedback";
		$("#create-account-c_email-group").tooltip("destroy");
		$("#create-account-c_email-group").attr("title", "Email address is too short");
		$("#create-account-c_email-group").tooltip("show");
		return;
	} else if (c_email.length > 4) {
		obj_c_email.className = "form-group has-success has-feedback";
		glyph_c_email.className = "glyphicon glyphicon-ok form-control-feedback";
		$("#create-account-email-group").tooltip("destroy");
	}
	
	if (!validateEmail(c_email)) {
		obj_c_email.className = "form-group has-success has-feedback";
		glyph_c_email.className = "glyphicon glyphicon-ok form-control-feedback";
		$("#create-account-c_email-group").tooltip("destroy");
	} else {
		obj_c_email.className = "form-group has-error has-feedback";
		glyph_c_email.className = "glyphicon glyphicon-remove form-control-feedback";
		$("#create-account-c_email-group").tooltip("destroy");
		$("#create-account-c_email-group").attr("title", "Email address not valid");
		$("#create-account-c_email-group").tooltip("show");
		return;
	}
	
	if (email !== c_email) {
		obj_c_email.className = "form-group has-warning has-feedback";
		glyph_c_email.className = "glyphicon glyphicon-warning-sign form-control-feedback";
		$("#create-account-c_email-group").tooltip("destroy");
		$("#create-account-c_email-group").attr("title", "Email addresses do not match");
		$("#create-account-c_email-group").tooltip("show");
		return;
	}
	
	if (password.length < 6) {
		obj_password.className = "form-group has-error has-feedback";
		glyph_password.className = "glyphicon glyphicon-warning-sign form-control-feedback";
		$("#create-account-password-group").tooltip("destroy");
		$("#create-account-password-group").attr("title", "Password is too weak");
		$("#create-account-password-group").tooltip("show");
		return;
	} else if (password.length > 6) {
		obj_password.className = "form-group has-success has-feedback";
		glyph_password.className = "glyphicon glyphicon-ok form-control-feedback";
		$("#create-account-password-group").tooltip("destroy");
	}
	
	if (c_password.length < 6) {
		obj_c_password.className = "form-group has-error has-feedback";
		glyph_c_password.className = "glyphicon glyphicon-warning-sign form-control-feedback";
		$("#create-account-c_password-group").tooltip("destroy");
		$("#create-account-c_password-group").attr("title", "Password is too weak");
		$("#create-account-c_password-group").tooltip("show");
		return;
	} else if (c_password.length > 6) {
		obj_c_password.className = "form-group has-success has-feedback";
		glyph_c_password.className = "glyphicon glyphicon-ok form-control-feedback";
		$("#create-account-c_password-group").tooltip("destroy");
	}
	
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == "auth/weak-password") {
			alert("The password is too weak");
		} else {
			alert(errorMessage);
		}
		console.log(error);
	}).then(function() {
		
		var user = firebase.auth().currentUser;

		user.updateProfile({
			displayName: input_displayName,
		}).then(function(error) {
			alert(error.code);
			alert(error.message);
			alert(input_displayName);
		});
		
		document.cookie = "email=" + email;
		if(profileImage.value.length < 4) {
			window.location.replace("/open-platform/user-data/configuring/index.php");
		} else {
			document.getElementById("create-account-file-input-form").submit();
		}
	});
}

// Google Auth

function g_toggleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
	} else {
		firebase.auth().signOut();
	}
	document.getElementById("fb_SignInButton").disabled = true;
	document.getElementById("g_SignInButton").disabled = true;
	document.getElementById("tw_SignInButton").disabled = true;
	document.getElementById("e_SignInButton").disabled = true;
	initFirebaseApp();
	window.location.replace("/open-platform/user-data/configuring/index.php");
}

// Facebook Auth

function fb_toggleSignIn() {
	if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope("email");
        firebase.auth().signInWithRedirect(provider);
	} else {
		firebase.auth().signOut();
	}
	document.getElementById("fb_SignInButton").disabled = true;
	document.getElementById("g_SignInButton").disabled = true;
	document.getElementById("tw_SignInButton").disabled = true;
	document.getElementById("e_SignInButton").disabled = true;
	initFirebaseApp();
	window.location.replace("/open-platform/user-data/configuring/index.php");
}

// Twitter Auth

function tw_toggleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.TwitterAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	} else {
		firebase.auth().signOut();
	}
	document.getElementById("fb_SignInButton").disabled = true;
	document.getElementById("g_SignInButton").disabled = true;
	document.getElementById("tw_SignInButton").disabled = true;
	document.getElementById("e_SignInButton").disabled = true;
	initFirebaseApp();
	window.location.replace("/open-platform/user-data/configuring/index.php");
}

// Send Password Reset Email

function resetPassword() {
	var auth = firebase.auth();
	var emailAddress = document.getElementById("emailAddress").value;

	auth.sendPasswordResetEmail(emailAddress).then(function() {
		window.location.replace("/");
	}, function(error) {
		var errorMessage = error.message;
		document.getElementById("my-account-password-reset-div").attr("title", errorMessage);
		$("#my-account-password-reset-div").tooltip("show");
	});
}

// Edit Account Details

function editDisplayName() {
	var newName = document.getElementById("my-account-display-name").value;
	var user = firebase.auth().currentUser;

	user.updateProfile({
		displayName: newName
	}).then(function(error) {
		return;
	});
	window.location.replace("/");
}

function editEmailAddress() {
	var newEmail = document.getElementById("my-account-email").value;
	var user = firebase.auth().currentUser;

	user.updateProfile({
		email: newEmail
	}).then(function(error) {
		return;
	});
	window.location.replace("/");
}

// Initialise Firebase Auth

function initFirebaseApp() {

  firebase.auth().getRedirectResult().then(function(result) {
	if (result.credential) {
		var token = result.credential.accessToken;
	} else {
		// ...
	}
	var user = result.user;
	}).catch(function(error) {

		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
		if (errorCode === "auth/account-exists-with-different-credential") {
			alert("You have already signed up with a different auth provider for that email");
		} else {
			console.error(error);
		}
	});
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			
			// User is signed in
	  
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			
			document.cookie = "email=" + email;
			document.getElementById("fb_SignInButton").innerHTML = "<span class='fa fa-facebook'></span> Log out";
			document.getElementById("g_SignInButton").innerHTML = "<span class='fa fa-google'></span> Log out";
			document.getElementById("tw_SignInButton").innerHTML = "<span class='fa fa-twitter'></span> Log out";
			document.getElementById("nav-account").innerHTML = "<span class='glyphicon glyphicon-user'></span> My Account ";
			document.getElementById("nav-right-ul").innerHTML = "<li><a id='nav-account' href='/my-account/'><span class='glyphicon glyphicon-user'></span> My Account</a></li><li><a onclick='signOut();' href='#sign-out'><i> Sign out </i></a></li>";
			document.getElementById("e_SignInButton").innerHTML = "Sign Out";
			document.getElementById("welcomeName").innerHTML = "Hello " + displayName;
			document.getElementById("my-account-display-name").placeholder = displayName;
			document.getElementById("my-account-email").placeholder = email;
		} else {
			document.getElementById("fb_SignInButton").innerHTML = "<nobr><span class='fa fa-facebook'></span> Log in with Facebook</nobr>";
			document.getElementById("g_SignInButton").innerHTML = "<nobr><span class='fa fa-google'></span> Log in with Google</nobr>";
			document.getElementById("tw_SignInButton").innerHTML = "<nobr><span class='fa fa-twitter'></span> Log in with Twitter</nobr>";
			document.getElementById("nav-account").innerHTML = "<span class='glyphicon glyphicon-log-in'></span> Sign In ";
			document.getElementById("nav-right-ul").innerHTML = "<li><a id='nav-account' href='#sign-in'><span class='glyphicon glyphicon-log-in'></span> Sign in </a></li>";
			document.getElementById("nav-account").onclick = signInVisibility;
			document.getElementById("e_SignInButton").innerHTML = "Sign In";
		}
		document.getElementById("fb_SignInButton").disabled = false;
		document.getElementById("g_SignInButton").disabled = false;
		document.getElementById("tw_SignInButton").disabled = false;
		document.getElementById("e_SignInButton").disabled = false;
	});
	document.getElementById("fb_SignInButton").addEventListener("click", fb_toggleSignIn, false);
	document.getElementById("g_SignInButton").addEventListener("click", g_toggleSignIn, false);
	document.getElementById("tw_SignInButton").addEventListener("click", tw_toggleSignIn, false);
	document.getElementById("e_SignInButton").addEventListener("click", e_toggleSignIn, false);
}

window.onload = function() {
	initFirebaseApp();
};
