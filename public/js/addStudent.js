var submitStudent = document.getElementById('submitStudent');
var uniId = document.getElementById('uniId');
var stuname = document.getElementById('stuname');
var email2 = document.getElementById('email2');
var password2 = document.getElementById('password2');
var phone = document.getElementById('phone');
var flag1 = 1;
var flag2 = 1;

submitStudent.addEventListener("click", function() {

	if(uniId.value == '' || stuname.value == '' || email2.value == '' || 
		password2.value == '' || phone.value == '')
	{
		$.confirm({
          title: 'Field ?',
          content: "Field is Empty !! ",
          draggable: true,
          buttons: {
            OK: {
                btnClass: 'btn-danger any-other-class',
                 action: function () {      
              }
              },
              }
        });
        return;
	}
	else if(phone.value.length<10 || phone.value.length>10)
	{
		$.confirm({
	    	title: 'Phone No ?',
	    	content: "Phone No should be of length 10 ",
	    	draggable: true,
	   		buttons: {
	        OK: {
	            btnClass: 'btn-danger any-other-class',
	             action: function () {      
	        	}
	   		},
	    	}
		});
		return;
	}
	if(!ValidateEmail(email2.value))
	{
		$.confirm({
	    	title: 'Email format ?',
	    	content: "Email format is not valid ",
	    	draggable: true,
	   		buttons: {
	        OK: {
	            btnClass: 'btn-danger any-other-class',
	             action: function () {      
	        	}
	   		},
	    	}
		});
		return;
	}
	 if(flag1 == 2 || flag2 == 2)
    {
        $.confirm({
          title: 'Data ?',
          content: "Data not Correct !! ",
          draggable: true,
          buttons: {
            OK: {
                btnClass: 'btn-danger any-other-class',
                 action: function () {      
              }
              },
              }
        });
        return;
    }

	var obj = new Object();
	obj.uniId = uniId.value;
	obj.name = stuname.value;
	obj.email = email2.value;
	obj.password = password2.value;
	obj.phone = phone.value;
	obj.role = "User"

	var request = new XMLHttpRequest();
    request.open('POST',"/admin/addnewuser");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        alert("New User Is Registred");
    });  
    window.location = "/admin/add_students";
 
})

function email_avail()
{
	document.getElementById("email_info").style.display = 'visible';
	document.getElementById("email_info").style.display = 'block';
	document.getElementById("email_info").style.marginTop = '10px';
	document.getElementById("email_info").style.marginBottom = '10px';
	
	var obj1 = new Object();
	obj1.email = email2.value;
	
	var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkemail");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({email: email2.value}));
    request.addEventListener("load",function() {
    	var data = request.responseText;
    	if(data === 'true') {
    		display_email.innerHTML= "User " + obj1.email + " is already exist";
    		flag1 = 2;
    	}
    	else {
            display_email.innerHTML= obj1.email + " is available";
            flag1 = 1;
    	}
    });  
}

function id_avial()
{
	document.getElementById("email_info").style.display = 'visible';
	document.getElementById("email_info").style.display = 'block';
	document.getElementById("email_info").style.marginTop = '10px';
	document.getElementById("email_info").style.marginBottom = '10px';
	
	var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkid");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({uniId: uniId.value}));
    request.addEventListener("load",function() {
    	var data = request.responseText;
    	if(data === 'true') {
    		display_email.innerHTML= "User " + uniId.value + " is already exist";
    		flag2 = 2;
    	}
    	else {
            display_email.innerHTML= uniId.value + " is available";
            flag2 = 1;
    	}
    });  
}

function ValidateEmail(mail) 
{
	console.log('vv')
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}