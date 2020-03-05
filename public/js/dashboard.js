function addCategory()
{
    window.location = "/admin/add_category";
}

function manageCategory()
{
    window.location = '/admin/manage_category';
}

function manageAuthor()
{
    window.location = '/admin/manage_author';
}

function addAuthor()
{
    window.location = '/admin/add_author';
}

function issueBook()
{
    window.location = '/admin/book_issue';
}

function manage_issue_books()
{
    window.location = '/admin/manage_issue_books';
}
function addNewUser()
{
    window.location='/admin/add_students';
}

function manageStudents()
{
    window.location = '/admin/manage_students';
}

function openissuedBookSpecificUser()
{
    window.location = '/user/openissuedBookSpecificUser';
}

function updateUserProfile()
{
    window.location = '/user/updateUserProfile';
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
    var totalissuedBooks = document.getElementById('totalissuedBooks');
    var totalNoofAuthors = document.getElementById('totalNoofAuthors');
    var totalissuedBooksToUser = document.getElementById('totalissuedBooksToUser');

    //for total number of users
    var countdata;
    var request = new XMLHttpRequest();
    request.open('GET','/admin/totalNoofUsers');
    request.send();
    request.onload = function()
    {
        countdata = JSON.parse(request.responseText);
        totalNoofUser.innerHTML = countdata;
    }

    //for total number of books
    var countbook;
    var request1 = new XMLHttpRequest();
    request1.open('GET','/admin/totalNoofBooks');
    request1.send();
    request1.onload = function()
    {
        countbook = JSON.parse(request1.responseText);
        totalNoOfBook.innerHTML = countbook;
    }

    //for total number of categories
    var countcat;
    var request2 = new XMLHttpRequest();
    request2.open('GET','/admin/totalNoofCat');
    request2.send();
    request2.onload = function()
    {
        countcat = JSON.parse(request2.responseText);
        totalNoofCat.innerHTML = countcat;
    }

    //for total number of books issued
    var countIssuedBooks;
    var request3 = new XMLHttpRequest();
    request3.open('GET','/admin/totalissuedBooks');
    request3.send();
    request3.onload = function()
    {
        countIssuedBooks = JSON.parse(request3.responseText);
        totalissuedBooks.innerHTML = countIssuedBooks;
    }

    //for total number of authors
    var countAuthors;
    var request4 = new XMLHttpRequest();
    request4.open('GET','/admin/totalNoofAuthors');
    request4.send();
    request4.onload = function()
    {
        countAuthors = JSON.parse(request4.responseText);
        totalNoofAuthors.innerHTML = countAuthors;
    }
}

function addBook()
{
    window.location = "/admin/add_book";
}

function manageBook()
{
    window.location = '/admin/manageBook'
}

function changePassword()
{
    window.location="/admin/changePassword";
}

// render home page
function home_page()
{
    window.location = "/login/home";
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
             window.location = "/admin/logout_person";
        }
    },
        No: {
             action: function () {
            
        }
    },
    }
    });
}