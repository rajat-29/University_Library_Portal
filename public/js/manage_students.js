 var table;

 $(document).ready(function() {
      table = $('#studentListing').DataTable({
      "processing": true,
      "serverSide": true,
      "dataSrc":"",
      "ajax": {
        "url": "/admin/showStudents",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "uniId", "orderable": false
      },
      {
        "data" : "name", "orderable": false
      },
      {
        "data" : "phone", "orderable": false
      },
      {
        "data" : "role", "orderable": false
      },
      {
        "data" : null, "orderable": false
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<span class="btn btn-danger btn-sm" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    
          }
      }],
    });
});

function deleteTag(ides) {

    var filename = '/admin/students/' + ides; 
    var request = new XMLHttpRequest();
    request.open('DELETE',filename);
    request.send()
    request.addEventListener("load",function(event) {
        table.ajax.reload(null, false);
    });  
}