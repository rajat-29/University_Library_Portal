submitbtn.addEventListener("click", function() {

	document.getElementById("field_info").style.display = 'visible';
	document.getElementById("field_info").style.display = 'block';
	document.getElementById("field_info").style.marginTop = '10px';
	document.getElementById("field_info").style.marginBottom = '10px';

	if(oldPass.value == '' || newPass.value == '' || confPass.value == '')	{
		display_password.innerHTML= "Field is Empty";
		return;
	}

	if(newPass.value != confPass.value) {
		display_password.innerHTML= "Confirm Password should Match !!";
		return;
	}
	else if(newPass.value.length < 6) {
		display_password.innerHTML= "Password Length is Short";
		return;
	}
	else {
		var obj = new Object();
		obj.oldpass = oldPass.value;
		obj.newpass = newPass.value;

		var request = new XMLHttpRequest();
		request.open('POST', '/admin/changePasswordDatabase');
	    request.setRequestHeader("Content-Type","application/json");
	    request.send(JSON.stringify(obj))
	    request.onload = function () {
	    	if(request.responseText == "true")	{
	    		display_password.innerHTML= "Password Changed Successfully !!";
	    		location.reload();
	    	}
	    	else
	    		display_password.innerHTML= request.responseText;
	    }  
	}
})