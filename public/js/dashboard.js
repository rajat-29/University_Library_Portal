// add new categories
function addCategory()
{
    window.location = "/add_category";
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