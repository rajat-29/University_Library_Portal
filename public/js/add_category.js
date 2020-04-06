var flag = 1;

submitbtn.addEventListener("click", function() {

  document.getElementById("field_info").style.display = 'visible';
  document.getElementById("field_info").style.display = 'block';
  document.getElementById("field_info").style.marginTop = '10px';
  document.getElementById("field_info").style.marginBottom = '10px';

  if(catname.value == '') {
      display_category.innerHTML= "Category is Empty !!";
      return;
  }

	var obj = new Object();
	obj.name = catname.value;

	if(document.getElementById('activestatus').checked) {
		  obj.status = "Active";
	}
	else if(document.getElementById('inactivestatus').checked) {
		  obj.status = "Inactive";
	}
  else {
      display_category.innerHTML= "Status is Empty !!";
      return;
  }
  if(flag == 2) {
      display_category.innerHTML= "Category already Exists !!";
      return;
  }
	
	var request = new XMLHttpRequest();
  request.open('POST',"/admin/addnewCategory");
  request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify(obj))
  request.addEventListener("load",function() {
      display_category.innerHTML= "New Category Is Registred !!";
      location.reload();
  });  
})

function cat_check() {   
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkcat");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name: catname.value}));
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