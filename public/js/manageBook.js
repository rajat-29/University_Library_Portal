 $(document).ready(function() {
     let table = $('#categories').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/showBooks",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "name"
      },
      {
        "data" : "category"
      },
      {
        "data" : "author"
      },
      {
        "data" : "isbn"
      },
      {
        "data" : "price"
      },
      {
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<center><span class="btn btn-danger btn-sm emailbtn actionbtns" onclick=deleteTag("'+row._id+'","'+row.name+'")><i class="fas fa-trash"></i></span></center>';    
          }
            }],
    });
  });
