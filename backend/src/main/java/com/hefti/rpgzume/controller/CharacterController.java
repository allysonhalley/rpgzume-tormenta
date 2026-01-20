package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.dto.CharacterDTO;
import com.hefti.rpgzume.service.CharacterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "*")
public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping
    public List<CharacterDTO> getAllCharacters() {
        return characterService.getAllCharacters();
    }

    @GetMapping("/user/{userId}")
    public List<CharacterDTO> getCharactersByUser(@PathVariable Long userId) {
        return characterService.getCharactersByUser(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CharacterDTO> getCharacterById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(characterService.getCharacterById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CharacterDTO> createCharacter(@RequestBody CharacterDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(characterService.createCharacter(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CharacterDTO> updateCharacter(@PathVariable String id, @RequestBody CharacterDTO dto) {
        return ResponseEntity.ok(characterService.updateCharacter(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable String id) {
        characterService.deleteCharacter(id);
        return ResponseEntity.noContent().build();
    }
}
