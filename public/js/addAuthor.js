var flag = 1;

submitAuth.addEventListener("click", function() {

    document.getElementById("field_info").style.display = 'visible';
    document.getElementById("field_info").style.display = 'block';
    document.getElementById("field_info").style.marginTop = '10px';
    document.getElementById("field_info").style.marginBottom = '10px';

    if(authName.value == '') {
        display_author.innerHTML= "Author Field is Empty";
        return;
    }
    if(flag == 2) {
        display_author.innerHTML= "Author already Exists !!";
        return;
    }

	  var obj = new Object();
	  obj.name = authName.value;

    var request = new XMLHttpRequest();
    request.open('POST',"/admin/addnewAuthor");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        display_author.innerHTML= "New Author Is Registred !!";
        window.location = "/admin/add_author";
    });  
    
})

function auth_check() {
       
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkauth");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name: authName.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            flag = 2;
        }
        else {
           flag = 1;
        }
    });  
}