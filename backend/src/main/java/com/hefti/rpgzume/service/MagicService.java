package com.hefti.rpgzume.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hefti.rpgzume.model.Card;
import com.hefti.rpgzume.model.Feature;
import com.hefti.rpgzume.model.Magic;
import com.hefti.rpgzume.repository.CardRepository;
import com.hefti.rpgzume.repository.MagicRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MagicService {
    
    @Autowired
    private MagicRepository magicRepository;
    
    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    // Buscar todas as magics
    public List<Magic> getAllMagics() {
        return magicRepository.findAll();
    }

    public Magic createMagic(Magic magic) {
        return magicRepository.save(magic);
    }

    public List<Magic> createMagics(List<Magic> magics) {
        magics.forEach(magic -> {
            magic.setCard(cardRepository.save(magic.getCard()));
            createMagic(magic);
        });
        return magicRepository.saveAll(magics);
    }

    // Buscar uma magic pelo ID
    public Optional<Magic> getMagicById(String id) {
        return magicRepository.findById(id);
    }

    // Atualizar uma magic
    public Magic updateMagic(Magic magic) {
        // Certifique-se de que o card associado existe
        Optional<Card> cardOptional = cardRepository.findById(magic.getCard().getId());
        if (cardOptional.isEmpty()) {
            throw new IllegalArgumentException("Card com ID " + magic.getCard().getId() + " não encontrado.");
        }
        magic.setCard(cardOptional.get());
        return magicRepository.save(magic);
    }

    // Excluir uma magic e a entidade Card associada
    public void deleteMagic(String id) {
        Optional<Magic> magicOptional = magicRepository.findById(id);
        if (magicOptional.isPresent()) {
            magicRepository.delete(magicOptional.get());
        } else {
            throw new IllegalArgumentException("Magic com ID " + id + " não encontrada.");
        }
    }

    // Buscar todas as magics de um card específico
    public List<Magic> getMagicsByCard(String cardId) {
        return magicRepository.findByCardId(cardId);
    }

    public Magic createMagicWithCard(Magic magic) {
        Card card = magic.getCard();
        if (card != null) {
            magic.setCard(cardRepository.save(card));
        }
        return magicRepository.save(magic);
    }

    public void generatePdfAllMagics() throws JSONException {
        pdfGeneratorService.generateMagicPdf(getAllMagicsJson());
    }

    private JSONArray getAllMagicsJson() throws JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Magic> magics = magicRepository.findAll();

        // Converte a lista diretamente em uma string JSON e depois em um JSONArray
        try {
            String jsonString = objectMapper.writeValueAsString(magics);
            return new JSONArray(jsonString);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter lista para JSON", e);
        }
    }
}