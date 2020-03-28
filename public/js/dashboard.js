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