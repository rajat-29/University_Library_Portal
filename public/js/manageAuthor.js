 $(document).ready(function() {
     let table = $('#authors').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/showauthor",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "name"
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
                   return '<center><span class="btn btn-danger btn-sm emailbtn actionbtns" onclick=deleteAuthor("'+row._id+'","'+row.name+'")><i class="fas fa-trash"></i></span></center>';    
          }
            }],
    });
  });

  function deleteAuthor(ides,authnames)
{
  $.confirm({
      title: 'Delete Author!',
      content: "Are you sure you want to delete " + authnames,
      draggable: true,
      buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
              action: function () {
               btnClass: 'btn-red any-other-class'
               var filename = '/author/' + ides;
            
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