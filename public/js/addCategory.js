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
        display_category.innerHTML= "Status is Empty !!";
        return;
    }
    if(flag == 2)
    {
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

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function cat_check()
{
    document.getElementById("field_info").style.display = 'visible';
    document.getElementById("field_info").style.display = 'block';
    document.getElementById("field_info").style.marginTop = '10px';
    document.getElementById("field_info").style.marginBottom = '10px';
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkcat");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({name: catname.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            display_category.innerHTML= "Category " + catname.value + " is already exist";
            flag = 2;
        }
        else {
           document.getElementById("field_info").style.display = 'none'; 
           flag = 1;
        }
    });  
}