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
                     data = '<span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    
                      return data;
          }
            }],
    });
  });


 function deleteTag(ides)
{
    
    $(document).on("click", "#delete", function() {
    d = $(this).parent().parent()[0].children;
        $.confirm({
            title: 'Delete Book!',
            content: "Are you sure you want to delete " + d[0].innerHTML,
            draggable: true,
            buttons: {
              Yes: {
                   btnClass: 'btn-success any-other-class',
                    action: function () {
                     btnClass: 'btn-red any-other-class'
                     var filename = '/book/' + ides;
                  
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