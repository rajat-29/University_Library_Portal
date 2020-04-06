var vercode = document.getElementById('vercode');
var verificationCode;

function verifCode()
{
    verificationCode = Math.floor(Math.random() * 1000000) + 100000;
    document.getElementById('verificationcode').innerHTML = verificationCode;
}

submit.addEventListener("click", function() {

    document.getElementById("field_info").style.display = 'visible';
    document.getElementById("field_info").style.display = 'block';
    document.getElementById("field_info").style.marginTop = '10px';
    document.getElementById("field_info").style.marginBottom = '10px';

    if(user_name.value == '' || pass.value == '')
    {
        document.getElementById('display_info').innerHTML = "Field is Empty !!";
        return;
    }

    if(vercode.value != verificationCode) {
        document.getElementById('display_info').innerHTML = "Verification Code don't match !!";
        return;
    }

	var request = new XMLHttpRequest();
    request.open('POST',"/login/checkLogin");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name : user_name.value,password: pass.value}));
    request.addEventListener("load",function() {
    	var data = request.responseText;
        if(data === 'notexits') {
            document.getElementById('display_info').innerHTML = "Email Doesn't Exists";
        }
        else if(data === 'false') {
            document.getElementById('display_info').innerHTML = "Password Is Not Correct";
        }
        else {
            window.location = data;
        }
    });
})