var catname = document.getElementById('catname');
var submitbtn = document.getElementById('submitbtn');

submitbtn.addEventListener("click", function() {

	var obj = new Object();
	obj.name = catname.value;
	if(document.getElementById('activestatus').checked)
	{
		obj.status = "Active";
	}
	else if(document.getElementById('inactivestatus').checked)
	{
		obj.status = "Inactive";
	}
	
	var request = new XMLHttpRequest();
    request.open('POST',"/addnewCategory");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        console.log("Data Posted Successfully");
        alert("New Category Is Registred");
    });  
    window.location = "/add_category";
})


