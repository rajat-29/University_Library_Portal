var authName = document.getElementById('authName');
var authemail = document.getElementById('authemail');
var authphone = document.getElementById('authphone');

submitAuth.addEventListener("click", function() {
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
             location.reload();
      });        
})