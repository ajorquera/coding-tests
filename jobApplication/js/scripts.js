"use strict";

$(document).ready(function (){
    var submitForm,
        ajaxCalls,
        name,
        password,
        TOKEN,
        email,
        surname,
        APIHost;
    
    TOKEN = 'ZKgMulsDSz7hg7rbW26dbwaRLDmApKPaDONSTuQT';
    
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
    
    submitForm = function () {
        name = $('#name').val();
        surname = $('#surname').val();
        email = $('#email').val();
        password = $('#password').val();
        passwordConfirmation = $('#passwrodConfirmation').val();
        
        if(isValidForm()) {
            showErrorMessages();
        }    
        
        ajaxCalls.createUser()
            .then(ajaxCalls.createRoom())
            .then(ajaxCalls.addMembers())
            .then(redirectToHipchat());
    };
    
    
});


