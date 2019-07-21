// index page for login page //

var user_name = document.getElementById('user_name');
var pass = document.getElementById('pass');
var submit = document.getElementById('submit');
var signup = document.getElementById('signup');

submit.addEventListener("click", function() {
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
})

signup.addEventListener("click", function() {
    window.location = "/signup_page";
})


pass.addEventListener("keyup", function() {

     if (event.keyCode === 13) {
    //console.log(pass.value);
    var request = new XMLHttpRequest();
    request.open('POST',"/checkLogin");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name : n.value,password: pass.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            console.log('hello user');
            window.location = "/home";
            //window.location.href = "h.html";
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
      //  console.log(data);
    });
}
})



