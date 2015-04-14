"use strict";

//TODO use a plugin to handle validation

$(document).ready(function (){
    var submitForm,
        ajaxCalls,
        name,
        password,
        passwordConfirmation,
        redirectToHipchat,
        newUserId,
        newRoomId,
        messages,
        email,
        TOKEN,
        surname,
        companyUsers2Chat,
        redirectionUrl,
        APIHost;

    //configuration-----------------------------------------------------------------------------------------------------
    TOKEN = '';

    redirectionUrl = 'https://www.hipchat.com/sign_in?d=%2Fchat';

    companyUsers2Chat = [
        {
            id: '1936211'
        },{
            id: '1735158'
        }
    ];

    APIHost = 'https://api.hipchat.com';

    messages = {
        errors: {
            required: "Campo Obligatorio",

            email: "La dirección de correo no es válida",

            emailUsed: "La direccion de correo electrónico ya se encuentra registrada",

            password: "Ingresa un minimo de 8 carácteres",

            passwordConfirmation: "Las contraseñas deben coincidir",

            acceptConditions: "Acepta las condiciones para poder continuar"
        },

        welcomeMessageRoom: 'Bienvenidos, por favor subir su curriculum y test ya culminado'
    };

    //------------------------------------------------------------------------------------------------------------------

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
                promise;

            ajaxData = {
                "color": "green",
                "message": messages.welcomeMessageRoom,
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
                "name": name + ' ' + surname,
                "title": surname[0].toLowerCase() + name,
                "password": password,
                "email": email
            };
            
            promise = $.ajax({
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
                newRoomId = data.id.toString();
            });

            return promise;
        },
        
        addMembers: function() {
            var i,
                promises,
                _addMemberIntoRoom;

            _addMemberIntoRoom = function(member, room) {
                return $.ajax({
                    method: 'PUT',
                    url: APIHost + '/v2/room/{roomId}/member/{userId}',
                    tokens : {roomId: room, userId: member.id}
                });
            };

            //add new candidate id
            companyUsers2Chat.push({id: newUserId});

            promises = [];

            for(i = 0; i < companyUsers2Chat.length; i += 1) {
                promises.push(_addMemberIntoRoom(companyUsers2Chat[i], newRoomId))
            }

            promises = $.when(promises);

            return promises;
            
        },

        loginUser: function() {
            $.ajax({
                method: 'GET',
                url: 'https://www.hipchat.com/sign_in'

            }).done(function(data) {
                var input,
                    promise,
                    parser,
                    doc,
                    token,
                    ajaxData;

                parser = new DOMParser();
                doc = parser.parseFromString(data,"text/html");
                input = $(doc).find('input[name="xsrf_token"]');
                token = input[0].value;

                ajaxData = {
                    "xsrf_token" : token,
                    "d" : '/chat',
                    "email" : '',
                    "password" : '',
                    "signin" : 'Log in'
                };

                promise =  $.ajax({
                    method: 'POST',
                    url: 'https://www.hipchat.com/sign_in',
                    data: JSON.stringify(ajaxData)
                });

                promise.done(function(data) {
                    console.log("login");
                    console.log(data);
                });

                return promise;
            });

            promises.push(promise);
        },
        
        getUser: function () {
            $.ajax({
                method: 'GET',
                url: APIHost + '/v2/user'
            });
        },

        viewUser: function (email) {
            var promise;

            promise = $.ajax({
                method: 'GET',
                url: APIHost + '/v2/user/{email}',
                async: false,
                tokens : {email: email}
            });

            return promise;
        }
    };

    redirectToHipchat = function () {
       window.location.href = redirectionUrl;
    };

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

    //Validation--------------------------------------------------------------------------------------------------------

    $.validator.setDefaults({
        onkeyup: false,
        errorElement: "span",
        errorClass: "help-block",
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            element = element.closest('.form-group').find('.error');
            element.append(error);
        }
    });

    jQuery.validator.addMethod('checkEmail',function(email) {
        var check_result;
        
        ajaxCalls.viewUser(email).then(function() {
            check_result = false;
        },function(){
            check_result = true;
        });

        return check_result;
    }, messages.errors.emailUsed);


    $("#aplicationForm").validate({
        errorLabelContainer: "#errors",
        rules: {
            name: "required",
            surname: "required",
            email: {
                required: true,
                email:true,
                checkEmail:true
            },
            password: {
                required: true,
                minlength: 8
            },
            passwordConfirmation: {
                required: true,
                minlength: 8,
                equalTo: "#password"
            },
            conditions: "required"
        },
        messages: {
            name: messages.errors.required,

            surname: messages.errors.required,

            email: {
                required: messages.errors.required,
                email : messages.errors.email
            },

            password: {
                required: messages.errors.required,
                minlength: messages.errors.password
            },

            passwordConfirmation: {
                required: messages.errors.required,
                minlength: messages.errors.password,
                equalTo:  messages.errors.passwordConfirmation
            },

            conditions:  messages.errors.acceptConditions
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
});
