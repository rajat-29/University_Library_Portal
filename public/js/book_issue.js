var studentName;
var bookName;
var flag1 = 1;
var flag2 = 1;

function issueBook() {

    document.getElementById("field_info").style.display = 'visible';
    document.getElementById("field_info").style.display = 'block';
    document.getElementById("field_info").style.marginTop = '10px';
    document.getElementById("field_info").style.marginBottom = '10px';

    if(studentid.value == '' || bookid.value == '') {
        display_book.innerHTML= "Field is Empty !!";
        return;
    }
    if(flag1 == 2 || flag2 == 2) {
        display_book.innerHTML= "Data not Correct !!";
        return;
    }

    var today = new Date();
    var dd = today.getDate()+7;
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd>=30) {
        dd = dd-30;
        mm++;
    }
    if(mm>12) {
        yyyy++;
    }

    today = + mm + '/' + dd + '/' + yyyy;

	var obj = new Object();
    obj.isbn = bookid.value;
	obj.uniId = studentid.value;
    obj.ReturnDate = today;
    obj.studentName = studentName;
    obj.bookName = BookName;
    obj.fine = 0;
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/issueNewBook");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
        display_book.innerHTML= "New Book Is Issued !!";
        location.reload();
    });  
}

function getMonths(mno) {
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function get_student_name() {
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checknameusingUniId");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({uniId: studentid.value}));
    request.addEventListener("load",function() {

        var d;
        d = JSON.parse(request.responseText); 
        if(d == false) {
            flag1 = 2;
            document.getElementById('get_student_name').innerHTML= "Wrong Student Id";
        }
        else {
            studentName = d.name;
            document.getElementById('get_student_name').innerHTML= d.name;
            flag1 = 1;
        }
    });  
}

function get_book_name() {
    
    var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkbookusingIsbn");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({isbn: bookid.value}));
    request.addEventListener("load",function() {
        BookName = request.responseText;  
        if(BookName == 'false') {
            flag2 = 2;
            document.getElementById('get_book_name').innerHTML= "Wrong ISBN"; 
        }
        else {
            flag2 = 1;   
            document.getElementById('get_book_name').innerHTML= request.responseText; 
        } 
    });  
}