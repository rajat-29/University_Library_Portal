var table;

$(document).ready(function() {
     table = $('#categories').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/admin/showBooks",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "name", "orderable": false
      },
      {
        "data" : "category", "orderable": false
      },
      {
        "data" : "author", "orderable": false
      },
      {
        "data" : "isbn", "orderable": false
      },
      {
        "data" : "price", "orderable": false
      },
      {
        "data" : null, "orderable": false
      },
      ],
      "columnDefs": [{
          "targets": -1,

          "render": function (data, type, row, meta) {
              data = '<span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    
          return data;
          }
      }],
    });
  });


function deleteTag(ides) {
  $(document).on("click", "#delete", function() {
   
    var bookname = '/admin/book/' + ides;
                    
    var request = new XMLHttpRequest();
    request.open('DELETE',bookname);
    request.send()
    request.addEventListener("load",function(event) {
        table.ajax.reload(null, false);
    });  
  })
}