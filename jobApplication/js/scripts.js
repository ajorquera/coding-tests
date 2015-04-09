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

        createUser =  ajaxCalls.createUser();

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
                name: "Por favor ingresa tu nombre.",
                surname: "Por favor ingresa tu apellido.",
                email: {
                    required: "Por favor ingresa tu correo electronico.",
                    email : "Por favor ingresa un correo electronico valido."
                },
                password: {
                    required: "Por favor ingresa tu contraseña.",
                    minlength: "Tu contraseña debe ser de almenos 8 caracteres."
                },
                passwrodConfirmation: {
                    required: "Por favor ingresa tu contraseña.",
                    minlength: "Tu contraseña debe de almenos  8 caracteres.",
                    equalTo: "Por favor ingresa la misma contraseña."
                },
                conditionss: "Por favor acepta las condiciones."
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
