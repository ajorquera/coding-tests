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

    showErrorMessages = function (errors) {
        var i,
            errorElement,
            message;

        $('.form-group').removeClass('has-error');
        $('.help-block').text('');

        for(i = 0; i < errors.length; i += 1) {

            switch(errors[i]) {
                case 'email':
                    message = 'Ingresa un correo válido';
                    break;

                case 'password':
                    message = 'Ingresa una contraseña con un minimo de 8 carácteres';
                    break;

                case 'passwordConfirmation':
                    message = 'Las contraseñas deben coincidir';
                    break;

                case 'required':
                    message = 'Todos los campos son obligatorios';
                    $('.form-group').addClass('has-error');
                    break;

                case 'acceptConditions':
                    message = 'Acepta las condiciones para poder continuar';
                    break;
            }

            errorElement = $('#' + errors[i] + ' + .help-block');
            errorElement.text(message);
            errorElement.removeClass('invisible');
            errorElement.parent('.form-group').addClass('has-error');
        }
    };

    checkErrors = function() {
        var errors;

        errors = [];

        if(!validations.email.test(email)) {
            errors.push('email')
        }

        if(!validations.password.test(password)) {
            errors.push('password')

        }

        if(password !== passwordConfirmation) {
            errors.push('passwordConfirmation')
        }

        if(!(name && surname && email && password && passwordConfirmation)) {
            errors.push('required')
        }

        return errors.length > 0 ? errors : 0;
    };
    
    submitForm = function () {
        var errors;

        name = $('#name').val();
        surname = $('#surname').val();
        email = $('#email').val();
        password = $('#password').val();
        passwordConfirmation = $('#passwordConfirmation').val();

        errors = checkErrors();

        if(errors) {
            showErrorMessages(errors);

            return;
        }
        
        ajaxCalls.createUser()
            .then(ajaxCalls.createRoom)
            .then(ajaxCalls.addMembers)
            .then(ajaxCalls.createWelcomeMessage)
            //.then(loginUser)
            .then(redirectToHipchat);
    };

    $("#aplicationForm").submit(function(ev) {
        ev.preventDefault();
        submitForm();
    });
    
    
});
