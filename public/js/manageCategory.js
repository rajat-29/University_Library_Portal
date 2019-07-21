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
        "data" : "status"
      },
      {
        "data" : "createDate"
      },
      {
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<center><span class="btn btn-danger btn-sm emailbtn actionbtns" onclick=deleteTag("'+row._id+'","'+row.tags+'")><i class="fas fa-trash"></i></span></center>';    
          }
            }],
    });
  });