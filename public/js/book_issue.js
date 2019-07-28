var studentid = document.getElementById('studentid');
var bookid = document.getElementById('bookid');
var submitIssue = document.getElementById('submitIssue');
var studentName;
var BookName;
var today;
var email2;

function issueBook()
{

    if(studentid.value == '' || bookid.value == '')
    {
        alert("Fields can't be Empty");
        return;
    }

    today = new Date();
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

submitIssue.addEventListener("click", function() {

    console.log("ramj")

    var data = new Object()
            data.to=email2;
            data.from="codemailler12@gmail.com";
            data.subject="Book Issued";
            data.text= "Hi " + "\n" + studentName + " having University Id = " + studentid.value + " has Issued" +
             " a book name : " + BookName + " having ISBN no : " + bookid.value + " and your return date is " + 
             today;
        
        console.log(data);
        var request = new XMLHttpRequest();
            request.open('POST', '/sendMail');
            request.setRequestHeader("Content-Type","application/json");
            request.send(JSON.stringify(data))
            request.addEventListener("load",function()
            {
                 console.log(request.responseText);
            });
})

function get_student_name()
{
    var get_student_name = document.getElementById('get_student_name');
    
    var request = new XMLHttpRequest();
    request.open('POST',"/checknameusingUniId");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({uniId: studentid.value}));
    request.addEventListener("load",function() {

        var obj1;
        obj1 = JSON.parse(request.responseText);

        console.log(obj1.name)
        
    studentName = obj1.name;
    email2 = obj1.email;

    get_student_name.innerHTML= obj1.name;
        
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

        BookName = request.responseText;

        
    get_book_name.innerHTML= request.responseText;
        
    });  
}