 var globalNAME;

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
        "data" : "fine"
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
  console.log(Fines.value);


    var obj1 = Object()
      obj1.isbn = globalNAME;
      obj1.fine = Fines.value;
      var request = new XMLHttpRequest();
      request.open('POST', '/updateuserdetails');
      request.setRequestHeader("Content-Type","application/json");
      request.send(JSON.stringify(obj1))
      request.addEventListener("load",function()
          {
             console.log(request.responseText);
          });
          location.reload();
}