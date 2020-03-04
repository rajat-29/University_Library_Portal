var categoryList = document.getElementById('categoryList');
var authorList = document.getElementById('authorList');
var flag = 1;

var bookname = document.getElementById('bookname');
var author = document.getElementById('author');
var isbn = document.getElementById('isbn');
var price = document.getElementById('price');

function fetchselectoptions()
{
	// to fetch categories select options
	var commArr;
	var request = new XMLHttpRequest();
    request.open('GET','/admin/categoryOptions');
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
    request1.open('GET','/admin/authorOptions');
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
    $.confirm({
          title: 'Field ?',
          content: "Field is Empty !! ",
          draggable: true,
          buttons: {
            OK: {
                btnClass: 'btn-danger any-other-class',
                 action: function () {      
              }
              },
              }
        });
        return;
  }
  if(flag == 2)
    {
        $.confirm({
          title: 'Exists ?',
          content: "Book already Exists !! ",
          draggable: true,
          buttons: {
            OK: {
                btnClass: 'btn-danger any-other-class',
                 action: function () {      
              }
              },
              }
        });
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
        alert("New Book Is Registred");
    });  
    window.location = "/admin/add_book";
}

function isbn_check()
{
    document.getElementById("email_info").style.display = 'visible';
    document.getElementById("email_info").style.display = 'block';
    document.getElementById("email_info").style.marginTop = '10px';
    document.getElementById("email_info").style.marginBottom = '10px';
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkisbn");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({isbn:isbn.value}));
    request.addEventListener("load",function() {
        var data = request.responseText;
        if(data === 'true') {
            display_email.innerHTML= "Isbn " + isbn.value + " is already exist";
            flag = 2;
        }
        else {
          document.getElementById("email_info").style.display = 'none';
          flag = 1;
        } 
    });  
}