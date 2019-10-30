 var globalNAME;
 var table;

 $(document).ready(function() {
     table = $('#issuedBooks').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/admin/showIssuedBooks",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "studentName", "orderable": false
      },
      {
        "data" : "uniId"
      },
      {
        "data" : "bookName", "orderable": false
      },
      {
        "data" : "isbn", "orderable": false
      },
      {
        "data" : "ReturnDate", "orderable": false
      },
      {
        "data" : "fine", "orderable": false
      },
      {
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<span class="btn btn-primary btn-sm emailbtn actionbtns" id="editDetails" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    

          }
            }],
    });
  });

 

 function deleteTag(ides)
{
  $(document).on("click", "#delete", function() {
    d = $(this).parent().parent()[0].children;
  $.confirm({
      title: 'Delete Issued Book?',
      content: "Are you sure you want to delete " + d[2].innerHTML + " issued to " + d[0].innerHTML,
      draggable: true,
      buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
              action: function () {
               btnClass: 'btn-red any-other-class'
               var filename = '/admin/issuedBook/' + ides;
            
               var request = new XMLHttpRequest();
               request.open('DELETE',filename);
               request.send()
               request.addEventListener("load",function(event)
               {
                   table.ajax.reload(null, false);
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
})
}

$(document).on("click", "#editDetails", function() {
    d = $(this).parent().parent()[0].children;
    console.log(d);
    globalNAME = d[3].innerHTML
    $('#username').val(d[0].innerHTML);
    $('#bookName').val(d[2].innerHTML);
    $('#isbn').val(d[3].innerHTML);
    $('#return').val(d[4].innerHTML);  
})

function updateuserdetails()
{
    var Fines = document.getElementById("Fines");

    var obj1 = Object()
      obj1.isbn = globalNAME;
      obj1.fine = Fines.value;
      var request = new XMLHttpRequest();
      request.open('POST', '/admin/updateuserdetails');
      request.setRequestHeader("Content-Type","application/json");
      request.send(JSON.stringify(obj1))
      request.addEventListener("load",function()
          {
              table.ajax.reload(null, false);
          });
}