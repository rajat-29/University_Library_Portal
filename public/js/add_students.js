var flag1 = 1;
var flag2 = 1;

submitStudent.addEventListener("click", function() {

  document.getElementById("field_info").style.display = 'visible';
  document.getElementById("field_info").style.display = 'block';
  document.getElementById("field_info").style.marginTop = '10px';
  document.getElementById("field_info").style.marginBottom = '10px';

	if(uniId.value == '' || stuname.value == '' || email2.value == '' || 
		password2.value == '' || phone.value == '') {
      display_email.innerHTML= "Field is Empty !!";
      return;
	}
	else if(phone.value.length<10 || phone.value.length>10) {
      display_email.innerHTML= "Phone No should be of length 10 ";
  		return;
	}

	if(!ValidateEmail(email2.value))  {
       display_email.innerHTML= "Email format is not valid ";
  		 return;
	}

	if(flag1 == 2 || flag2 == 2) {
        display_email.innerHTML= "Data not Correct !! ";
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
        display_email.innerHTML= "New User Is Registred !! ";
        location.reload();
    });  
})

function email_avail() {

	var obj1 = new Object();
	obj1.email = email2.value;
	
	var request = new XMLHttpRequest();
  request.open('POST',"/admin/checkemail");
  request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify({email: email2.value}));
  request.addEventListener("load",function() {
    var data = request.responseText;
    if(data === 'true') {
    	flag1 = 2;
    }
    else {
      flag1 = 1;
    }
  });  
}

function id_avial() {
	
	var request = new XMLHttpRequest();
  request.open('POST',"/admin/checkid");
  request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify({uniId: uniId.value}));
  request.addEventListener("load",function() {
    var data = request.responseText;
    if(data === 'true') {
    	flag2 = 2;
    }
    else {
      flag2 = 1;
    }
  });  
}

function ValidateEmail(mail)  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return (false)
}