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
    var totalissuedBooksToUser = document.getElementById('totalissuedBooksToUser');

    // total books issued to user
    var countBookstoUser;
    var request5 = new XMLHttpRequest();
    request5.open('GET','/admin/totalissuedBooksToUser');
    request5.send();
    request5.onload = function()
    {
        countBookstoUser = JSON.parse(request5.responseText);
        totalissuedBooksToUser.innerHTML = countBookstoUser;
    }
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