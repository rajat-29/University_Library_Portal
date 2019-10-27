// index page for login page //
var rajat;

function verifCode()
{
    var verificationcode = document.getElementById('verificationcode');

    rajat = Math.floor(Math.random() * 1000000) + 100000;

    verificationcode.innerHTML = rajat;

}

var user_name = document.getElementById('user_name');
var pass = document.getElementById('pass');
var vercode = document.getElementById('vercode');
var submit = document.getElementById('submit');
var signup = document.getElementById('signup');

submit.addEventListener("click", function() {

    if(user_name.value == '' || pass.value == '')
    {
        alert("Field is Empty");
        return;
    }

    console.log(vercode.value)
    console.log(rajat)

    // if(vercode.value != rajat)
    // {
    //     alert("Verification code doesn't match");
    //     return;
    // }

	var request = new XMLHttpRequest();
    request.open('POST',"checkLogin");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name : user_name.value,password: pass.value}));
    request.addEventListener("load",function() {
    	var data = JSON.parse(request.responseText);
    	if(data.isLogin === 1) {
            window.sessionStorage.setItem('email' , data.email);
            window.sessionStorage.setItem('uniId' , data.uniId);
            window.sessionStorage.setItem('name' , data.name);
            window.sessionStorage.setItem('role' , data.role);
            window.location = "/home";
        }
        else if(data.isLogin === 0)
        {
            window.location = "/404";
        }
    	else {
            document.getElementById("wrong_id").style.display = "block";
            document.getElementById("forming").style.height = "340px";
    		console.log('getout');
            n.value = "";
            pass.value = "";
    	}
    });
})

signup.addEventListener("click", function() {
    window.location = "/signup_page";
})


vercode.addEventListener("keyup", function() {

     if (event.keyCode === 13) {
    //console.log(pass.value);
    if(user_name.value == '' || pass.value == '')
    {
        alert("Field is Empty");
        return;
    }

    console.log(vercode.value)
    console.log(rajat)

    if(vercode.value != rajat)
    {
        alert("Verification code doesn't match");
        return;
    }

    var request = new XMLHttpRequest();
    request.open('POST',"checkLogin");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name : user_name.value,password: pass.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            window.location = "/home";
        }
        else if(data === 'false')
        {
            window.location = "/404";
        }
        else {
            document.getElementById("wrong_id").style.display = "block";
            document.getElementById("forming").style.height = "340px";
            console.log('getout');
            n.value = "";
            pass.value = "";
        }
    });
}
})


