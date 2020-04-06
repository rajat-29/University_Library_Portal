 var table;

 $(document).ready(function() {
    table = $('#authors').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/admin/showauthor",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "name", "orderable": false
      },
      {
        "data" : null, "orderable": false
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteAuthor("'+row._id+'")><i class="fas fa-trash"></i></span>';    
          }
            }],
    });
  });

function deleteAuthor(ides) {
  
  $(document).on("click", "#delete", function() {

    var authname = '/admin/author/' + ides;
            
    var request = new XMLHttpRequest();
    request.open('DELETE',authname);
    request.send()
    request.addEventListener("load",function(event){
        table.ajax.reload(null, false);
    });  
  })
}