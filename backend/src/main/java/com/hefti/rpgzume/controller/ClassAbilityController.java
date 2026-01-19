package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.dto.ClassAbilityDTO;
import com.hefti.rpgzume.service.ClassAbilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/class-abilities")
public class ClassAbilityController {

    private final ClassAbilityService classAbilityService;

    public ClassAbilityController(ClassAbilityService classAbilityService) {
        this.classAbilityService = classAbilityService;
    }

    @GetMapping
    public ResponseEntity<List<ClassAbilityDTO>> getAllClassAbilities() {
        return ResponseEntity.ok(classAbilityService.getAllClassAbilities());
    }
}
