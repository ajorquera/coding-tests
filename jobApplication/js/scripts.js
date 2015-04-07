"use strict";

$(document).ready(function (){
    var submitForm,
        ajaxCalls,
        name,
        password,
        passwordConfirmation,
        conditions,
        TOKEN,
        TOKEN2,
        email,
        surname,
        APIHost;
    
    TOKEN = 'ZKgMulsDSz7hg7rbW26dbwaRLDmApKPaDONSTuQT';
    //TOKEN2 = 'nNf831F6ZaAmgQrUOmhKK4jZDvtPrDFRODVMSUrM';
    
    APIHost = 'https://api.hipchat.com';
    
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TOKEN
        }
    });
    
    ajaxCalls = {
        createUser: function() {
            var ajaxData,
                deferred;
            
            ajaxData = {
                "name"           : name + ' ' + surname,
                "title"          : "candidate",
                "mention_name"   : name + surname[0],
                "password"       : password,
                "email"          : email
            };
            
            console.log("The user has been created %o", ajaxData);

            $.ajax({
                method: 'POST',
                url: APIHost + '/v2/user',
                data: JSON.stringify(ajaxData), 
                crossDomain: true
            }).then(
                function(data) {
                   redirectToHipchat();
                },
                function(err) {
                    if(err.status == 400) {
                        showErrorMessages();
                    }
                });
            
            deferred = $.Deferred();
            
            //deferred.resolve(true);
            
            return deferred.promise;
            
            /*$.ajax({
                method: 'POST',
                url: APIHost + '/v2/user',
                crossDomain: true
            });*/
        },
        
        
        createRoom: function() {
            var ajaxData,
                deferred;
            
            ajaxData = {
                "name"           : name + ' ' + surname,
                "title"          : "candidate",
                "mention_name"   : name + surname[0],
                "password"       : password,
                "email"          : email
            };
            
            console.log("The user has been created %o", ajaxData)
            
            //fake response for development
            deferred = $.Deferred();
            
            deferred.resolve(true);
            
            return deferred.promise;
            
            /*$.ajax({
                method: 'POST',
                url: APIHost + '/v2/user',
                crossDomain: true
            });*/
        },
        
        addMembers: function() {
            var ajaxData,
                deferred;
            
            ajaxData = {
                "name"           : name + ' ' + surname,
                "title"          : "candidate",
                "mention_name"   : name + surname[0],
                "password"       : password,
                "email"          : email
            };
            
            console.log("The user has been created %o", ajaxData)
            
            deferred = $.Deferred();
            
            deferred.resolve(true);
            
            return deferred.promise;
            
            /*$.ajax({
                method: 'POST',
                url: APIHost + '/v2/user',
                crossDomain: true
            });*/
        },
        
        getUser: function () {
            $.ajax({
                method: 'GET',
                url: APIHost + '/v2/user',
                crossDomain: true
            });
        }
    };

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };

    function validatePassword(pass) {
        var re = /\b\w{8,}\b/;
        return re.test(pass);
    };

    function redirectToHipchat() {
       window.location.href = "https://www.hipchat.com/sign_in";
    };

    function showErrorMessages(err) {
        if(err == 1) {
            $('#errorPanel').show();
            setTimeout( "$('#errorPanel').hide();",5000);
        }

        if(err == 2) {
            $('#emailExist').show();
            setTimeout( "$('#emailExist').hide();",5000);
        }
    };
    
    submitForm = function () {

        name = $('#name').val();
        surname = $('#surname').val();
        email = $('#email').val();
        password = $('#password').val();
        passwordConfirmation = $('#passwrodConfirmation').val();
        conditions = $('#conditionss').prop('checked');

        if(validateEmail(email) && validatePassword(password) && password === passwordConfirmation && name !=='' && surname !== '' && conditions) {
            ajaxCalls.createUser();
        }else {
            showErrorMessages(1);
        }
      
       // ajaxCalls.createUser()
          //  .then(ajaxCalls.createRoom())
          //  .then(ajaxCalls.addMembers())
          //  .then(redirectToHipchat());

    };

    $("#aplicationForm").submit(function(ev) {
        ev.preventDefault();
        submitForm();
    });
    
    
});


