 $(document).ready(function() {
     let table = $('#issuedBooks').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/showIssuedBooks",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "studentName"
      },
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
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<center><span class="btn btn-danger btn-sm emailbtn actionbtns" onclick=deleteTag("'+row._id+'","'+row.studentName+'","'+row.bookName+'")><i class="fas fa-trash"></i></span></center>';    
          }
            }],
    });
  });

 function deleteTag(ides,studentName,bookName)
{
  $.confirm({
      title: 'Delete Issued Book?',
      content: "Are you sure you want to delete " + bookName + " issued to " + studentName,
      draggable: true,
      buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
              action: function () {
               btnClass: 'btn-red any-other-class'
               var filename = '/issuedBook/' + ides;
            
               var request = new XMLHttpRequest();
               request.open('DELETE',filename);
               request.send()
               request.addEventListener("load",function(event)
              {
                  location.reload();
                 console.log(request.responseText);
              });  
          }
      },
        No: {
            btnClass: 'btn-danger any-other-class',
             action: function () {      
          }
      },
      }
    });
}