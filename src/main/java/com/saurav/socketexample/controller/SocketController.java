package com.saurav.socketexample.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /**
     * Message type one sent using {@link SendTo} annotation
     */
    @MessageMapping("/sendType1")
    @SendTo("/topic/type1")
    public String testSocketType1(String msg) {
        return "Message Type 1: " + msg ;
    }

    /**
     * Message type two sent using {@link SimpMessagingTemplate}
     */
    @MessageMapping("/sendType2")
    public void testSocketType2(String msg) {
        messagingTemplate.convertAndSend("/topic/type2", "Message Type 2: " + msg);
    }
}
