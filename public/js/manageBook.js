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
                     data = '<span class="btn btn-primary btn-sm emailbtn actionbtns" id="updateBooks" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    
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

$(document).on("click", "#updateBooks", function() {
    d = $(this).parent().parent()[0].children;
    console.log(d);
    checkName = d[3].innerHTML;
    $('#username').val(d[0].innerHTML);
    $('#cateoryName').val(d[1].innerHTML);
    $('#authorName').val(d[2].innerHTML);
    $('#isbn').val(d[3].innerHTML);
    $('#pricing').val(d[4].innerHTML);
    
    
})


function updateuserdetails()
{
  var username = document.getElementById("username");
  var cateoryName = document.getElementById("cateoryName");
    var authorName = document.getElementById("authorName");
      var pricing = document.getElementById("pricing");



    var obj1 = Object()
    
      obj1.name = username.value;
      obj1.category = cateoryName.value;
      obj1.author = authorName.value;
      obj1.price = pricing.value;
      obj1.isbn = checkName
      var request = new XMLHttpRequest();
      request.open('POST', '/updateBookDetails');
      request.setRequestHeader("Content-Type","application/json");
      request.send(JSON.stringify(obj1))
      request.addEventListener("load",function()
          {
             console.log(request.responseText);
          });
          location.reload();
}