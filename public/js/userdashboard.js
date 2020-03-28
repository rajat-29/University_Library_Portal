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