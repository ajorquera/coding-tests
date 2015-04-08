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
        APIHost,
        login;
    
    TOKEN = 'ZKgMulsDSz7hg7rbW26dbwaRLDmApKPaDONSTuQT';
    
    APIHost = 'https://api.hipchat.com';
    
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + TOKEN
        }
    });
    
    ajaxCalls = {
        createUser: function() {
            var ajaxData,
                deferred,
                promise;
            
            ajaxData = {
                "name"           : name + ' ' + surname,
                "title"          : "candidate",
                "password"       : password,
                "email"          : email
            };
            
            console.log("The user has been created %o", ajaxData);

           promise =  $.ajax({
                method: 'POST',
                url: APIHost + '/v2/user',
                data: JSON.stringify(ajaxData), 
                crossDomain: true
            });
           
            return promise;
            
        },
        
        createRoom: function() {
            var ajaxData,
                deferred,
                promise;
            
            ajaxData = {
                "name"           : name + ' ' + surname,
                "owner_user_id"   : 'admin@jortech.com.ve',
                "privacy"       : 'private'
            };
            
            console.log("The room has been created %o", ajaxData)

            promise =  $.ajax({
                method: 'POST',
                url: APIHost + '/v2/room',
                data: JSON.stringify(ajaxData), 
                crossDomain: true
            });
            
          
            return promise;
        },
        
        addMembers: function(email) {
            var ajaxData,
                deferred,
                promise;
            
            ajaxData = {
                "name"           : name + ' ' + surname,
                "title"          : "candidate",
                "mention_name"   : name + surname[0],
                "password"       : password,
                "email"          : email
            };
            
            console.log("The member has been added %o", ajaxData)

            promise =  $.ajax({
                method: 'PUT',
                url: APIHost + '/v2/room/'+ajaxData.name+'/member/'+email,
                crossDomain: true
            });
            
            return promise;
            
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
       window.location.href = "https://www.hipchat.com/sign_in?d=%2Fchat";
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
        var createUser,
            createRoom,
            addMember;

        name = $('#name').val();
        surname = $('#surname').val();
        email = $('#email').val();
        password = $('#password').val();
        passwordConfirmation = $('#passwrodConfirmation').val();
        conditions = $('#conditionss').prop('checked');

        if(validateEmail(email) && validatePassword(password) && password === passwordConfirmation && name !=='' && surname !== '' && conditions) {
           var createUser =  ajaxCalls.createUser();

           createUser.done(function(data) {

                createRoom = ajaxCalls.createRoom();

                createRoom.done(function(data) {
                    addMember = ajaxCalls.addMembers('mtmvargas@jortech.com.ve');
                    addMember.done(function() {
                        var promise = ajaxCalls.addMembers(email);
                        promise.done(function() {
                            redirectToHipchat();
                        })
                   });
                });
           });

        }else {
            showErrorMessages(1);
        }
      
    };

    $("#aplicationForm").submit(function(ev) {
        ev.preventDefault();
        submitForm();
    });
    
    
});
