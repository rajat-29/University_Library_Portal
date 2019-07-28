var studentid = document.getElementById('studentid');
var bookid = document.getElementById('bookid');


function issueBook()
{

    if(studentid.value == '' || bookid.value == '')
    {
        alert("Fields can't be Empty");
        return;
    }

    var today = new Date();
    var dd = today.getDate()+7;
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var format = "AM";

    if(dd>=30)
    {
        dd = dd-30;
        mm++;
    }
    if(mm>12)
    {
        yyyy++;
    }

    if(hrs>12)
    {
        hrs=hrs-12;
        format="PM";
    }
    today = + dd + '-' + getMonths(mm) + '-' + yyyy;
    today = today + " ";
    today = today + "(" + hrs + ':' + mins + '' + format + ")";

	var obj = new Object();
	obj.uniId = studentid.value;
	obj.isbn = bookid.value;
    obj.ReturnDate = today;

     var request = new XMLHttpRequest();
    request.open('POST',"/issueNewBook");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        console.log("Data Posted Successfully");
        alert("New Book Is Issued");
    });  
    window.location = "/book_issue";
}

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function get_student_name()
{
    var get_student_name = document.getElementById('get_student_name');
    
    var request = new XMLHttpRequest();
    request.open('POST',"/checknameusingUniId");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({uniId: studentid.value}));
    request.addEventListener("load",function() {
        
    get_student_name.innerHTML= request.responseText;
        
    });  
}

function get_book_name()
{
    var get_book_name = document.getElementById('get_book_name');
    
    var request = new XMLHttpRequest();
    request.open('POST',"/checkbookusingIsbn");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({isbn: bookid.value}));
    request.addEventListener("load",function() {
        
    get_book_name.innerHTML= request.responseText;
        
    });  
}