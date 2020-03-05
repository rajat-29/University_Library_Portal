var authName = document.getElementById('authName');
var authemail = document.getElementById('authemail');
var authphone = document.getElementById('authphone');

submitAuth.addEventListener("click", function() {

      if(authName.value == '' || authemail.value == '' || authphone.value == '')
      {
            $.confirm({
          title: 'Field ?',
          content: "Field is Empty !! ",
          draggable: true,
          buttons: {
            OK: {
                btnClass: 'btn-danger any-other-class',
                 action: function () {      
              }
              },
              }
        });
        return;
      }
      else if(authphone.value.length<10 || authphone.value.length>10)
      {
            $.confirm({
            title: 'Phone No ?',
            content: "Phone No should be of length 10 ",
            draggable: true,
                  buttons: {
              OK: {
                  btnClass: 'btn-danger any-other-class',
                   action: function () {      
                  }
                  },
            }
            });
            return;
      }
      if(!ValidateEmail(authemail.value))
      {
            $.confirm({
            title: 'Email format ?',
            content: "Email format is not valid ",
            draggable: true,
                  buttons: {
              OK: {
                  btnClass: 'btn-danger any-other-class',
                   action: function () {      
                  }
                  },
            }
            });
            return;
      }


      var obj1 = Object()
      obj1.name = authName.value;
      obj1.email = authemail.value;
      obj1.phone = authphone.value;
      var request = new XMLHttpRequest();
      request.open('POST', '/user/updateUserProfileDetails');
      request.setRequestHeader("Content-Type","application/json");
      request.send(JSON.stringify(obj1))
      request.addEventListener("load",function()
      {
            alert("Data Updated Successfully");
             location.reload();
      });        
})

function ValidateEmail(mail) 
{
      console.log('vv')
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}