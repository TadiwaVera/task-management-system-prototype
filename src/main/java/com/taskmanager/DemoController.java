package com.taskmanager;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/secure/hello")
    public String helloSecure() {
        return "You are authenticated!";
    }
}
