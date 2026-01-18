package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.dto.RacialTraitsDTO;
import com.hefti.rpgzume.service.RacialTraitsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/racial-traits")
public class RacialTraitsController {

    private final RacialTraitsService racialTraitsService;

    public RacialTraitsController(RacialTraitsService racialTraitsService) {
        this.racialTraitsService = racialTraitsService;
    }

    @GetMapping
    public ResponseEntity<List<RacialTraitsDTO>> getAllRacialTraits() {
        return ResponseEntity.ok(racialTraitsService.getAllRacialTraits());
    }
}
