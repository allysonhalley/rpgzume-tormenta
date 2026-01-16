package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.model.Magic;
import com.hefti.rpgzume.model.dto.MagicDTO;
import com.hefti.rpgzume.service.MagicService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/magics")
public class MagicController {
    @Autowired
    private MagicService magicService;

    // Endpoint para obter todos os magics
    @GetMapping
    public List<MagicDTO> getAllMagics() {
        return magicService.getAllMagics().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Endpoint para criar um novo magic
    @PostMapping
    public ResponseEntity<MagicDTO> createMagic(@RequestBody Magic magic) {
        Magic savedMagic = magicService.createMagic(magic);
        return ResponseEntity.ok(convertToDTO(savedMagic));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MagicDTO> getMagicById(@PathVariable String id) {
        Optional<Magic> magic = magicService.getMagicById(id);
        return magic.map(m -> ResponseEntity.ok(convertToDTO(m)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMagic(@PathVariable String id) {
        magicService.deleteMagic(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/fullmagic")
    public ResponseEntity<MagicDTO> createMagicWithCard(@RequestBody Magic magic) {
        Magic savedMagic = magicService.createMagicWithCard(magic);
        return ResponseEntity.ok(convertToDTO(savedMagic));
    }

    @PostMapping("/addfulllist")
    public ResponseEntity<List<MagicDTO>> createMagics(@RequestBody List<Magic> magics) {
        List<Magic> savedMagics = magicService.createMagics(magics);
        List<MagicDTO> magicDTOs = savedMagics.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(magicDTOs);
    }

    @GetMapping("/pdf")
    public ResponseEntity<Object> getPdf() throws JSONException {
        magicService.generatePdfAllMagics();
        return ResponseEntity.ok("PDF Gerado!");
    }

    private MagicDTO convertToDTO(Magic magic) {
        return new MagicDTO(
                magic.getId(),
                magic.getCard() != null ? magic.getCard().getType() : "magic",
                magic.getSchool(),
                magic.getCard() != null ? magic.getCard().getName() : "Sem Nome",
                magic.getLevel(),
                magic.getCard() != null ? magic.getCard().getResume() : "Sem Resumo",
                magic.getCard() != null ? magic.getCard().getBook() : "Sem Livro",
                magic.getCard() != null ? magic.getCard().getPage() : 0,
                magic.getComponents(),
                magic.getCastTime(),
                magic.getRange(),
                magic.getTargetArea(),
                magic.getDuration(),
                magic.getSavingThrow(),
                magic.getSpellResistance(),
                magic.getEffect(),
                magic.getCard() != null ? magic.getCard().getDescription() : "Sem Descrição");
    }
}
