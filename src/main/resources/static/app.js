var stompClient = null;

function setConnected(connected) {
    $("#connect-btn").prop("disabled", connected);
    $("#disconnect-btn").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
        $("#socket-connected").css("display","inline");
        $("#socket-disconnected").css("display","none");
    }
    else {
        $("#conversation").hide();
        $("#socket-connected").css("display","none");
        $("#socket-disconnected").css("display","inline");
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('localhost:9080/example-sockets');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/type1', function (greeting) {
            showGreeting(greeting.body);
        });

        stompClient.subscribe('/topic/type2', function (greeting) {
            showGreeting(greeting.body);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMsg1() {
    stompClient.send("/socket/sendType1", {}, $("#msg1").val());
    $("#msg1").val("");
}

function sendMsg2() {
    stompClient.send("/socket/sendType2", {}, $("#msg2").val());
    $("#msg2").val("");
}

function showGreeting(message) {
    $("#msg-list").append("<tr><td>" + message + "</td></tr>");
}

window.onload = function () {
    $("#connect-btn").click(function() {
        connect();
    });
    $("#disconnect-btn").click(function() {
        disconnect();
    });
    $("#msg-btn1").click(function() {
        sendMsg1();
    });
    $("#msg-btn2").click(function() {
        sendMsg2();
    });
    $("#msg1").keyup(function (e) {
        if(e.keyCode == 13){
            sendMsg1();
        }
    });

    $("#msg2").keyup(function (e) {
        if(e.keyCode == 13){
            sendMsg2();
        }
    })
}

