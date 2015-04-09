"use strict";

//TODO use a plugin to handle validation

$(document).ready(function (){
    var submitForm,
        ajaxCalls,
        name,
        password,
        passwordConfirmation,
        redirectToHipchat,
        showErrorMessages,
        checkErrors,
        newUserId,
        newRoomId,
        email,
        acceptConditions,
        validations,
        TOKEN,
        surname,
        APIHost;
    
    TOKEN = 'ZKgMulsDSz7hg7rbW26dbwaRLDmApKPaDONSTuQT';
    
    APIHost = 'https://api.hipchat.com';

    validations = {
        email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,

        //hipchat ask for 8 minimum characters
        password: /.{8,}/
    };
    
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TOKEN
        },
        
        crossDomain: true

    });
    
    ajaxCalls = {
        createWelcomeMessage: function() {
            var ajaxData,
                promise,
                message;

            message = 'Bienvenidos, por favor subir su curriculum y test ya culminado';

            ajaxData = {
                "color": "green",
                "message": message,
                "notify": true,
                "message_format": "text"
            };

            promise =  $.ajax({
                method: 'POST',
                url: APIHost + '/v2/room/{roomId}/notification',
                data: JSON.stringify(ajaxData),
                tokens: {roomId: newRoomId}
            });

            return promise;

        },

        createUser: function() {
            var ajaxData,
                promise;
            
            ajaxData = {
                "name"           : name + ' ' + surname,
                "title"          : surname[0].toLowerCase() + name,
                "password"       : password,
                "email"          : email
            };
            
           promise =  $.ajax({
                method: 'POST',
                url: APIHost + '/v2/user',
                data: JSON.stringify(ajaxData)
            });

           promise.done(function(data) {
               newUserId = data.id;
           });

           return promise;
            
        },
        
        createRoom: function() {
            var ajaxData,
                promise;
            
            ajaxData = {
                "name"          : surname + ' ' + name[0].toUpperCase() + ' (Candidato)',
                "owner_user_id" : '1953666',
                "privacy"       : 'private'
            };
            
            promise =  $.ajax({
                method: 'POST',
                url: APIHost + '/v2/room',
                data: JSON.stringify(ajaxData)
            });

            promise.done(function(data) {
                newRoomId = data.id;
            });

            return promise;
        },
        
        addMembers: function() {
            var promise,
                promises;

            promises = [];


            promise =  $.ajax({
                method: 'PUT',
                url: APIHost + '/v2/room/{roomId}/member/{userName}',
                tokens : {roomId: newRoomId, userName: '1936211'}
            });

            promises.push(promise);

            promise =  $.ajax({
                method: 'PUT',
                url: APIHost + '/v2/room/{roomId}/member/{userName}',
                tokens : {roomId: newRoomId, userName: newUserId}
            });

            promises.push(promise);

            promise = $.when(promises);

            return promise;
            
        },
        
        getUser: function () {
            $.ajax({
                method: 'GET',
                url: APIHost + '/v2/user'
            });
        }
    };


    redirectToHipchat = function () {
       window.location.href = "https://www.hipchat.com/sign_in?d=%2Fchat";
    };

   $.validator.setDefaults({
        errorElement: "span",
        errorClass: "help-block",
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#aplicationForm").validate({
        errorLabelContainer: "#errors",
        rules: {
            name: "required",
            surname: "required",
            email: {
                required: true,
                email:true
            },
            password: {
                required: true,
                minlength: 8
            },
            passwrodConfirmation: {
                required: true,
                minlength: 8,
                equalTo: "#password"
            },
            conditionss: "required"
        },
        messages: {
            name: "Todos los campos son obligatorios",
            surname: "Todos los campos son obligatorios",
            email: {
                required: "Todos los campos son obligatorios",
                email : "Ingresa un correo válido"
            },
            password: {
                required: "Todos los campos son obligatorios",
                minlength: "Ingresa una contraseña con un minimo de 8 carácteres"
            },
            passwrodConfirmation: {
                required: "Todos los campos son obligatorios",
                minlength: "Ingresa una contraseña con un minimo de 8 carácteres",
                equalTo: "Las contraseñas deben coincidir"
            },
            conditionss: "Acepta las condiciones para poder continuar"
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function (form) {
            submitForm(); 
        return false;
        }
    });  

    submitForm = function () {

        name = $('#name').val();
        surname = $('#surname').val();
        email = $('#email').val();
        password = $('#password').val();
        passwordConfirmation = $('#passwordConfirmation').val();
       
        ajaxCalls.createUser()
            .then(ajaxCalls.createRoom)
            .then(ajaxCalls.addMembers)
            .then(ajaxCalls.createWelcomeMessage)
            //.then(loginUser)
            .then(redirectToHipchat);
    };

});
