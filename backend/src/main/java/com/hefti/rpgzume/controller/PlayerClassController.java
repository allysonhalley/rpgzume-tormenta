package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.model.PlayerClass;
import com.hefti.rpgzume.service.PlayerClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/player-classes")
public class PlayerClassController {

    @Autowired
    private PlayerClassService playerClassService;

    @GetMapping
    public ResponseEntity<List<PlayerClass>> getAllPlayerClasses() {
        return ResponseEntity.ok(playerClassService.findAll());
    }
}
