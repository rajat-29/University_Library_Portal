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
        "data" : "uniId"
      },
      {
        "data" : "name"
      },
      {
        "data" : "phone", "orderable": false
      },
      {
        "data" : "role", "orderable": false
      },
      {
        "data" : null
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '<span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    
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
      content: "Are you sure you want to delete " + d[1].innerHTML,
      draggable: true,
      buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
              action: function () {
               btnClass: 'btn-red any-other-class'
               var filename = '/admin/students/' + ides;
            
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