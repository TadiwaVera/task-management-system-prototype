package com.taskmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// A other class implemented to resolve CORS ERROR
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "hello world";
    }
}
