window.onload = function() {
	alert("Hello World!");
};
if(document.getElementByClassName("ct-content")) {
	if(document.getElementByClassName("ct-content auto")) {
		
		var ajaxRequest;
		var id = 1001;
		
		try {
			ajaxRequest = new XMLHttpRequest();
		} catch(e) {
			try {
				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				alert("Error: " + e);
				return false;
			}
		}
		 
		ajaxRequest.onreadystatechange = function(){
			if(ajaxRequest.readyState == 4){
				
				var contentContainer = document.getElementByClassName("ct-content auto");
				
				contentContainer.innerHTML = ajaxRequest.responseText;
			}
		}
		
		ajaxRequest.open("GET", "/dev-platform/lab/php/test.php?id=" + id;
		ajaxRequest.send(null);
		
	}
}