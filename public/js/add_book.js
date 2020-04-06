var categoryList = document.getElementById('categoryList');
var authorList = document.getElementById('authorList');
var flag = 1;

function fetchselectoptions()
{
	  var commArr;
	  var request = new XMLHttpRequest();
    request.open('GET','/admin/categoryOptions');
    request.send();
    request.onload = function() {
      commArr = JSON.parse(request.responseText);
      for(i in commArr) {
       	categoryList.options[categoryList.options.length] = new Option(commArr[i].name,commArr[i].name);
      }
    }

    var authorArr;
    var request1 = new XMLHttpRequest();
    request1.open('GET','/admin/authorOptions');
    request1.send();
    request1.onload = function() {
      authorArr = JSON.parse(request1.responseText);
       for(j in authorArr) {
        authorList.options[authorList.options.length] = new Option(authorArr[j].name,authorArr[j].name);
       }
    }
}

function addNewBook() {

  document.getElementById("field_info").style.display = 'visible';
  document.getElementById("field_info").style.display = 'block';
  document.getElementById("field_info").style.marginTop = '10px';
  document.getElementById("field_info").style.marginBottom = '10px';

  if(bookname.value == '' || categoryList.value == '' || authorList.value == '' 
    || isbn.value == '' || price.value == '') {
      display_book.innerHTML= "Field is Empty !! ";
      return;
  }
  if(flag == 2) {
        display_book.innerHTML= "ISBN already Exists !! ";
        return;
  }

	var obj = new Object();
	obj.name = bookname.value;
	obj.category = categoryList.value;
	obj.author = authorList.value;
	obj.isbn = isbn.value;
	obj.price = price.value;

	var request = new XMLHttpRequest();
  request.open('POST',"/admin/addnewbook");
  request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify(obj))
  request.addEventListener("load",function() {
      display_book.innerHTML= "New Book Is Registred !! ";
      window.location = "/admin/add_book";
  });  
}

function isbn_check() {
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkisbn");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({isbn:isbn.value}));
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