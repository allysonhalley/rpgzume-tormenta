package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.dto.ClassAbilitiesDTO;
import com.hefti.rpgzume.service.ClassAbilitiesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/class-abilities")
public class ClassAbilitiesController {

    private final ClassAbilitiesService classAbilitiesService;

    public ClassAbilitiesController(ClassAbilitiesService classAbilitiesService) {
        this.classAbilitiesService = classAbilitiesService;
    }

    @GetMapping
    public ResponseEntity<List<ClassAbilitiesDTO>> getAllClassAbilities() {
        return ResponseEntity.ok(classAbilitiesService.getAllClassAbilities());
    }
}
