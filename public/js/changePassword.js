var submitbtn = document.getElementById('submitbtn');

submitbtn.addEventListener("click", function() {

	var oldPass = document.getElementById('oldPass');
	var newPass = document.getElementById('newPass');
	var confPass = document.getElementById('confPass');

	if(oldPass.value == '' || newPass.value == '' || confPass.value == '')
	{
		alert("Field is Empty");
		return;
	}

	if(newPass.value != confPass.value)
	{
		alert("Confirm Password should Match");
		return;
	}
	else if(newPass.value.length < 6)
	{
		alert("Password Length is Short");
	}
	else
	{
		var obj = new Object();
		obj.oldpass = oldPass.value;
		obj.newpass = newPass.value;

		var request = new XMLHttpRequest();
		request.open('POST', '/admin/changePasswordDatabase');
	    request.setRequestHeader("Content-Type","application/json");
	    request.send(JSON.stringify(obj))
	    request.onload = function ()
	    {
	    	if(request.responseText == "true")
	    	{
	    		alert("Password Changed Successfully");
	    		 window.location = "/admin/changePassword";
	    	}
	    	else
	    		alert(request.responseText)
	    }  
	}
   
})