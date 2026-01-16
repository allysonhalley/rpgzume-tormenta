package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.model.Card;
import com.hefti.rpgzume.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.hefti.rpgzume.model.dto.CardDTO;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cards") // Prefixo REST comum
@CrossOrigin(origins = "http://localhost:4200") // Permite chamadas do Angular
public class CardController {

    @Autowired
    private CardService cardService;

    // Endpoint para listar todos os cards
    @GetMapping
    public Map<String, List<CardDTO>> getAllCards() {
        return cardService.getAllCards().entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().stream()
                                .map(this::convertToDTO)
                                .collect(Collectors.toList())));
    }

    // Endpoint para buscar um card pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<CardDTO> getCardById(@PathVariable String id) {
        Optional<Card> card = cardService.getCardById(id);
        return card.map(c -> ResponseEntity.ok(convertToDTO(c)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para criar um novo card
    @PostMapping
    public ResponseEntity<CardDTO> create(@RequestBody Card card) {
        Card savedCard = cardService.createCard(card);
        return ResponseEntity.ok(convertToDTO(savedCard));
    }

    @PostMapping("/addlist")
    public ResponseEntity<List<CardDTO>> createCards(@RequestBody List<Card> cards) {
        return ResponseEntity.ok(cardService.createCards(cards).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList()));
    }

    // Endpoint para atualizar um card pelo ID
    @PutMapping("/{id}")
    public ResponseEntity<CardDTO> updateCard(@PathVariable String id, @RequestBody Card cardDetails) {
        return cardService.getCardById(id)
                .map(card -> {
                    card.setName(cardDetails.getName());
                    card.setResume(cardDetails.getResume());
                    card.setDescription(cardDetails.getDescription());
                    card.setBook(cardDetails.getBook());
                    card.setPage(cardDetails.getPage());
                    Card updatedCard = cardService.createCard(card);
                    return ResponseEntity.ok(convertToDTO(updatedCard));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private CardDTO convertToDTO(Card card) {
        String featureType = card.getFeature() != null ? card.getFeature().getFeatureType() : null;
        String school = card.getMagic() != null ? card.getMagic().getSchool() : null;

        return new CardDTO(
                card.getId(),
                card.getType(),
                card.getName(),
                card.getResume(),
                card.getDescription(),
                card.getBook(),
                card.getPage(),
                featureType,
                school);
    }
}
