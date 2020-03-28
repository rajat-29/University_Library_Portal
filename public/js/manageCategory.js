var table;

 $(document).ready(function() {
     table = $('#categories').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/admin/showcategories",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "name", "orderable": false
      },
      {
        "data" : "status", "orderable": false
      },
      {
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<span class="btn btn-primary btn-sm" id="editCategory" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    
          }
      }],
    });
  });

function deleteTag(ides) {
  
  $(document).on("click", "#delete", function() {
    var catname = '/admin/category/' + ides;

    var request = new XMLHttpRequest();
    request.open('DELETE',catname);
    request.send()
    request.addEventListener("load",function(event) {
      table.ajax.reload(null, false);
    });  
  })
}

$(document).on("click", "#editCategory", function() {
    d = $(this).parent().parent()[0].children;
    $('#username').val(d[0].innerHTML);
    $('#statusName').val(d[1].innerHTML);
})

function updateuserdetails() {

  var username = document.getElementById("username");
  var statusName = document.getElementById("statusName");
  var strUser = statusName.options[statusName.selectedIndex].value;

      var obj = Object()
      obj.name = username.value;
      obj.status = strUser;

      var request = new XMLHttpRequest();
      request.open('POST', '/admin/updateCategoryDetails');
      request.setRequestHeader("Content-Type","application/json");
      request.send(JSON.stringify(obj))
      request.addEventListener("load",function() {
        table.ajax.reload(null, false);
      });
}