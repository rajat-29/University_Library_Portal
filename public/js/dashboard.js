// add new categories
function addCategory()
{
    window.location = "/add_category";
}

function manageCategory()
{
    window.location = '/manage_category';
}

function manageAuthor()
{
    window.location = '/manage_author';
}

function addAuthor()
{
    window.location = '/add_author';
}

function issueBook()
{
    window.location = '/book_issue';
}

function manage_issue_books()
{
    window.location = '/manage_issue_books';
}
function addNewUser()
{
    window.location='/add_students';
}

function manageStudents()
{
    console.log('dd')
    window.location = '/manage_students';
}


function valid()
{
    if(document.chngpwd.newpassword.value!= document.chngpwd.confirmpassword.value)
    {
        alert("New Password and Confirm Password Field do not match  !!");
        document.chngpwd.confirmpassword.focus();
        return false;
    }
    return true;
}

function fetchNumbers()
{
    var totalNoofUser = document.getElementById('totalNoofUser');
    var totalNoOfBook = document.getElementById('totalNoOfBook'); 
    var totalNoofCat = document.getElementById('totalNoofCat');


    //for total number of users
    var countdata;
    var request = new XMLHttpRequest();
    request.open('GET','/totalNoofUsers');
    request.send();
    request.onload = function()
    {
        countdata = JSON.parse(request.responseText);
        totalNoofUser.innerHTML = countdata;
    }

    //for total number of books
    var countbook;
    var request1 = new XMLHttpRequest();
    request1.open('GET','/totalNoofBooks');
    request1.send();
    request1.onload = function()
    {
        countbook = JSON.parse(request1.responseText);
        totalNoOfBook.innerHTML = countbook;
    }

    //for total number of categories
    var countcat;
    var request2 = new XMLHttpRequest();
    request2.open('GET','/totalNoofCat');
    request2.send();
    request2.onload = function()
    {
        countcat = JSON.parse(request2.responseText);
        totalNoofCat.innerHTML = countcat;
    }

}

function addBook()
{
    window.location = "/add_book";
}

function manageBook()
{
    window.location = '/manageBook'
}

function changePassword()
{
    window.location="/changePassword";
}

// render home page
function home_page()
{
    window.location = "/home";
}

// logout user
function openlogoutpage()
{
    $.confirm({
    theme: 'supervan',
    title: 'Confirm Logout!',
    content: 'Do you really want logout?',
    draggable: true,
    buttons: {
        Yes: {
            action: function () {
             window.location = "/logout_person";
        }
    },
        No: {
             action: function () {
            
        }
    },
    }
    });
}