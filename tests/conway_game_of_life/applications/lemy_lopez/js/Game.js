//MADE WITH LOVE BY LEMYS LOPEZ @lemyskaman
//hecho con amor por lemys lopez @lemyskaman

$(document).ready(function() {



    //console.log(Matrix.cells_status);

    /*
Matrix.cells_status=[
    [false, true, false, false, false, false],
    [false, false, true, false, false, false],
    [true, true, true, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]

];*/

    //console.log(Matrix.cells_status);
    ///home/lemys/inglaterra/tests/index.html






    var iterations = 0;






    var step = function() {
        $("#gen_status").html(iterations++);
        Matrix.beat();
    }
    var game_timer;
    var speed = 800;
    var game_status = true;
    var play_game = function(speed) {
        clearInterval(game_timer);
        game_timer = setInterval(function() {
            if (game_status == true) {
                step()
            }
        }, speed);
    };
    play_game(speed);


    $("#refresh_bt").tap(function() {
        game_status = true;
        Matrix.randomSeed();
        play_game(speed);

    });
    $("#play_bt").tap(function() {
        game_status = true;
    });
    $("#stop_bt").tap(function() {
        game_status = false;
    });

    $("#step_bt").tap(function() {
        if (game_status == false) {
            step();
        } else {
            alert("you must stop the game so you can run it step by step")
        }
    });
    $("#speed_input").change(function(event) {
        speed = $("#speed_input").val();
        play_game(speed);
    });
    $("#size_input").change(function(event) {
        $("#game_container").html('');
        Matrix.cellsBodySize = $("#size_input").val();
        Matrix.build();
        $("#game_container").find("svg").css({
            "border-style": "solid",
            "border-width": "5px",
            "border-color": "#ccc",
        });
        play_game(speed);
    });
    $("#width_input").change(function(event) {
        //alert("this will reset your game");
        $("#game_container").html('');
        Matrix.m = $("#width_input").val();
        Matrix.randomSeed();
        Matrix.build();
        $("#game_container").find("svg").css({
            "border-style": "solid",
            "border-width": "5px",
            "border-color": "#ccc",
        });
        play_game(speed);
    });
    $("#height_input").change(function(event) {
        //alert("this will reset your game");
        $("#game_container").html('');
        Matrix.n = $("#height_input").val();
        Matrix.randomSeed();
        Matrix.build();
        $("#game_container").find("svg").css({
            "border-style": "solid",
            "border-width": "5px",
            "border-color": "#ccc",
        });
        play_game(speed);
    });
    $("#animations_select").change(function(event) {
        //alert("this will reset your game");
        $("#game_container").html('');
        Matrix.animation = Boolean($("#animations_select").val());

        console.log(Matrix.animation);
        Matrix.build();
        $("#game_container").find("svg").css({
            "border-style": "solid",
            "border-width": "5px",
            "border-color": "#ccc",
        });
        play_game(speed);
    });
    $("#delay_input").change(function(event) {
        //alert("this will reset your game");
        $("#game_container").html('');
        Matrix.delay = $("#delay_input").val();

        Matrix.build();
        $("#game_container").find("svg").css({
            "border-style": "solid",
            "border-width": "5px",
            "border-color": "#ccc",
        });
        play_game(speed);
    });




    Matrix.delay = 200;
    Matrix.animation = true;
    Matrix.cellsBodySize = 20;
    Matrix.m = 30;
    Matrix.n = 20;
    Matrix.randomSeed();
    Matrix.build();
    play_game(speed);




    $("#game_container").find("svg").css({
        "border-style": "solid",
        "border-width": "5px",
        "border-color": "#ccc",
    });







});