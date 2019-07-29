 $(document).ready(function() {
     let table = $('#issuedBooks').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/showIssuedBookSpecificUser",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "uniId"
      },
      {
        "data" : "bookName"
      },
      {
        "data" : "isbn"
      },
      {
        "data" : "ReturnDate"
      },
      {
        "data" : "fine"
      },
      
     
      ],
      
      
    });
  });