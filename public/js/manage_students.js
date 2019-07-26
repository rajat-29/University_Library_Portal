 $(document).ready(function() {
     let table = $('#studentListing').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/showStudents",
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
        "data" : "phone"
      },
      {
        "data" : "role"
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

  function deleteTag(ides,sudnames)
{
  $.confirm({
      title: 'Delete Category!',
      content: "Are you sure you want to delete " + sudnames,
      draggable: true,
      buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
              action: function () {
               btnClass: 'btn-red any-other-class'
               var filename = '/students/' + ides;
            
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
}