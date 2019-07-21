var categoryList = document.getElementById('categoryList');

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
}

function addNewBook()
{
	var obj = new Object();
	obj.name = bookname.value;
	obj.category = categoryList.value;
	obj.author = author.value;
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