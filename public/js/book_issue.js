var studentid = document.getElementById('studentid');
var bookid = document.getElementById('bookid');


function issueBook()
{

     var today = new Date();
    var dd = today.getDate()+7;
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var format = "AM";

    if(dd>=30)
    {
        dd = 6;
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