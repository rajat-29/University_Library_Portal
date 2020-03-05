var studentid = document.getElementById('studentid');
var bookid = document.getElementById('bookid');
var submitIssue = document.getElementById('submitIssue');
var studentName;
var BookName;
var today;
var email2;
var flag1 = 1;
var flag2 = 1;

function issueBook()
{
    if(studentid.value == '' || bookid.value == '')
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
    if(flag1 == 2 || flag2 == 2)
    {
        $.confirm({
          title: 'Data ?',
          content: "Data not Correct !! ",
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

    today = new Date();
    var dd = today.getDate()+7;
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd>=30)
    {
        dd = dd-30;
        mm++;
    }
    if(mm>12)
    {
        yyyy++;
    }

    today = + mm + '/' + dd + '/' + yyyy;

	var obj = new Object();
	obj.uniId = studentid.value;
	obj.isbn = bookid.value;
    obj.ReturnDate = today;

     var request = new XMLHttpRequest();
    request.open('POST',"/admin/issueNewBook");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        alert("New Book Is Issued");
    });  
    window.location = "/admin/book_issue";
}

function getMonths(mno) {
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function get_student_name()
{
    var get_student_name = document.getElementById('get_student_name');
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checknameusingUniId");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({uniId: studentid.value}));
    request.addEventListener("load",function() {

        var obj1;
        obj1 = JSON.parse(request.responseText); 
        if(obj1 == false)
        {
            flag1 = 2;
            get_student_name.innerHTML= "Wrong Student Id";
        }
        else
        {
            studentName = obj1.name;
            email2 = obj1.email;
            get_student_name.innerHTML= obj1.name;
            flag1 = 1;
        }
    });  
}

function get_book_name()
{
    var get_book_name = document.getElementById('get_book_name');
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkbookusingIsbn");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({isbn: bookid.value}));
    request.addEventListener("load",function() {
        BookName = request.responseText;  
        if(BookName == 'false')
        {
            flag2 = 2;
            get_book_name.innerHTML= "Wrong ISBN"; 
        }
        else
        {
            get_book_name.innerHTML= request.responseText; 
            flag2 = 1;   
        } 
    });  
}