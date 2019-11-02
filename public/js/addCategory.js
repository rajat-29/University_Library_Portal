var catname = document.getElementById('catname');
var submitbtn = document.getElementById('submitbtn');

submitbtn.addEventListener("click", function() {

    if(catname.value == '')
    {
        alert("Category is Empty");
        return;
    }

	var obj = new Object();
	obj.name = catname.value;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var format = "AM";
    if(hrs>12)
    {
        hrs=hrs-12;
        format="PM";
    }
    today = + dd + '-' + getMonths(mm) + '-' + yyyy;
    today = today + " ";
    today = today + "(" + hrs + ':' + mins + '' + format + ")";

    obj.createDate = today;

	if(document.getElementById('activestatus').checked)
	{
		obj.status = "Active";
	}
	else if(document.getElementById('inactivestatus').checked)
	{
		obj.status = "Inactive";
	}
    else
    {
        alert("Status is Empty");
        return;
    }
	
	var request = new XMLHttpRequest();
    request.open('POST',"/admin/addnewCategory");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        console.log("Data Posted Successfully");
        alert("New Category Is Registred");
    });  
    window.location = "/admin/add_category";
})

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function cat_check()
{
    document.getElementById("email_info").style.display = 'visible';
    document.getElementById("email_info").style.display = 'block';
    document.getElementById("email_info").style.marginTop = '10px';
    document.getElementById("email_info").style.marginBottom = '10px';
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkcat");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name: catname.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            display_email.innerHTML= "Category " + catname.value + " is already exist";
        }
        else
           document.getElementById("email_info").style.display = 'none'; 
    });  
}