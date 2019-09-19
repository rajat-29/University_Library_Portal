var checkName;

 $(document).ready(function() {
     let table = $('#categories').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/showcategories",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "name"
      },
      {
        "data" : "status", "orderable": false
      },
      {
        "data" : "createDate", "orderable": false
      },
      {
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<span class="btn btn-primary btn-sm emailbtn actionbtns" id="editCategory" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    
          }
            }],
    });
  });

 function deleteTag(ides)
{
  $(document).on("click", "#delete", function() {
    d = $(this).parent().parent()[0].children;
  $.confirm({
      title: 'Delete Category!',
      content: "Are you sure you want to delete " + d[0].innerHTML,
      draggable: true,
      buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
              action: function () {
               btnClass: 'btn-red any-other-class'
               var filename = '/category/' + ides;
            
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

$(document).on("click", "#editCategory", function() {
    d = $(this).parent().parent()[0].children;
    console.log(d);
    checkName = d[2].innerHTML
    $('#username').val(d[0].innerHTML);
    $('#statusName').val(d[1].innerHTML);
    $('#dateDone').val(d[2].innerHTML);
    
})


function updateuserdetails()
{
  var username = document.getElementById("username");
  var statusName = document.getElementById("statusName");


    var obj1 = Object()
    
      obj1.name = username.value;
      obj1.status = statusName.value;
      obj1.createDate = checkName
      var request = new XMLHttpRequest();
      request.open('POST', '/updateCategoryDetails');
      request.setRequestHeader("Content-Type","application/json");
      request.send(JSON.stringify(obj1))
      request.addEventListener("load",function()
          {
             console.log(request.responseText);
          });
          location.reload();
}