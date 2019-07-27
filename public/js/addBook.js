var categoryList = document.getElementById('categoryList');
var authorList = document.getElementById('authorList');


var bookname = document.getElementById('bookname');
var author = document.getElementById('author');
var isbn = document.getElementById('isbn');
var price = document.getElementById('price');

function fetchselectoptions()
{

	// to fetch categories select options
	var commArr;
	var request = new XMLHttpRequest();
    request.open('GET','/categoryOptions');
    request.send();
    request.onload = function()
    {
        commArr = JSON.parse(request.responseText);
       for(i in commArr)
       {
       	categoryList.options[categoryList.options.length] = new Option(commArr[i].name,commArr[i].name);
       }
    }

    // to fetch author select options
    var authorArr;
    var request1 = new XMLHttpRequest();
    request1.open('GET','/authorOptions');
    request1.send();
    request1.onload = function()
    {
        authorArr = JSON.parse(request1.responseText);
       for(j in authorArr)
       {
        authorList.options[authorList.options.length] = new Option(authorArr[j].name,authorArr[j].name);
       }
    }
}

function addNewBook()
{

  if(bookname.value == '' || categoryList.value == '' || authorList.value == '' 
    || isbn.value == '' || price.value == '')
  {
    alert("Fields can't be Empty");
    return;
  }

	var obj = new Object();
	obj.name = bookname.value;
	obj.category = categoryList.value;
	obj.author = authorList.value;
	obj.isbn = isbn.value;
	obj.price = price.value;


	var request = new XMLHttpRequest();
    request.open('POST',"/addnewbook");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        console.log("Data Posted Successfully");
        alert("New Book Is Registred");
    });  
    window.location = "/add_book";
}