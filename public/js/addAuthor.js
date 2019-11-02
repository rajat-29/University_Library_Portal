var authName = document.getElementById('authName');
var submitAuth = document.getElementById('submitAuth');

submitAuth.addEventListener("click", function(){

    if(authName.value == '')
    {
        alert("Author is Empty");
        return ;
    }

	var obj = new Object();
	obj.name = authName.value;

	//date
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

    var request = new XMLHttpRequest();
    request.open('POST',"/admin/addnewAuthor");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        console.log("Data Posted Successfully");
        alert("New Author Is Registred");
    });  
    window.location = "/admin/add_author";
})

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function auth_check()
{
    document.getElementById("email_info").style.display = 'visible';
    document.getElementById("email_info").style.display = 'block';
    document.getElementById("email_info").style.marginTop = '10px';
    document.getElementById("email_info").style.marginBottom = '10px';
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkauth");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name: authName.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            display_email.innerHTML= "Author " + authName.value + " is already exist";
        }
        else
           document.getElementById("email_info").style.display = 'none'; 
    });  
}