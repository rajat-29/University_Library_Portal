var table;

$(document).ready(function() {
     table = $('#issuedBooks').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "/admin/showIssuedBooks",
        "type": "POST",
      },
      "columns": [
      {
        "data" : "studentName", "orderable": false
      },
      {
        "data" : "uniId", "orderable": false
      },
      {
        "data" : "bookName", "orderable": false
      },
      {
        "data" : "isbn", "orderable": false
      },
      {
        "data" : "ReturnDate", "orderable": false
      },
      {
        "data" : "fine", "orderable": false
      },
      {
        "data" : null, "orderable": false
      },
      ],
      "columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                   return '</span><span class="btn btn-danger btn-sm emailbtn actionbtns" id="delete" onclick=deleteTag("'+row._id+'")><i class="fas fa-trash"></i></span>';    

          }
        }],
    });
  });

function deleteTag(ides) {

  $(document).on("click", "#delete", function() {
    
    var filename = '/admin/issuedBook/' + ides;
            
    var request = new XMLHttpRequest();
    request.open('DELETE',filename);
    request.send()
    request.addEventListener("load",function(event) {
      table.ajax.reload(null, false);
    });  
  })
}

function updatesFines() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  today = + mm + '/' + dd + '/' + yyyy;

  var request = new XMLHttpRequest();
  request.open('POST', '/admin/getIssuedBookData');
  request.setRequestHeader("Content-Type","application/json");
  request.send();
  request.addEventListener("load",function() {
  var obj = JSON.parse(request.responseText)
    for(i in obj) {
      updateFinesOneByOne(obj[i],today);
    }
  });
}

function updateFinesOneByOne(obj,today) {

    var date1 = new Date(obj.ReturnDate); 
    var date2 = new Date(today); 

    var Difference_In_Time = date2.getTime() - date1.getTime(); 

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

    if(Difference_In_Days > 0) {
        var obj1 = Object()
        obj1._id = obj._id;
        obj1.fine = Difference_In_Days*2;
        var request = new XMLHttpRequest();
        request.open('POST', '/admin/updateIssuedBookDetails');
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify(obj1))
        request.addEventListener("load",function() {
            table.ajax.reload(null, false);
        });
    }
}