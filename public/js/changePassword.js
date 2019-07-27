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
	}
	else
	{
		var obj = new Object();
		obj.oldpass = oldPass.value;
		obj.newpass = newPass.value;

		var request = new XMLHttpRequest();
		request.open('POST', '/changePasswordDatabase');
	    request.setRequestHeader("Content-Type","application/json");
	    request.send(JSON.stringify(obj))
	    request.onload = function ()
	    {
	    	console.log("Password changed Successfully");
	    	alert(request.responseText);
	    }  
	}
    window.location = "/changePassword";
})