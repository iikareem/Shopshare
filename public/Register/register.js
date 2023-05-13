var email="";
var password="";
var confirmPassword="";
var address="";
var phoneNumber="";


$(document).ready(function () {
        
    $("#termAndCondtions").click(function() {
        $("#signInBtn").attr("disabled", !this.checked);
      });

$("#signInBtn").click(function(){

email = $("#inputEmail").val();

password = $("#inputPassword").val();

confirmPassword = $("#confirmPassword").val();

address = $("#inputAddress").val();

phoneNumber = $("#phoneNumber").val();

if (password != confirmPassword ) {alert("password and confirm password does not match!")}



});


});