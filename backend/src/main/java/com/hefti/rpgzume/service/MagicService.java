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
    private PdfGeneratorService pdfGeneratorService;

    // Buscar todas as magics
    public List<Magic> getAllMagics() {
        return magicRepository.findAll();
    }

    public Magic createMagic(Magic magic) {
        return magicRepository.save(magic);
    }

    public List<Magic> createMagics(List<Magic> magics) {
        return magicRepository.saveAll(magics);
    }

    // Buscar uma magic pelo ID
    public Optional<Magic> getMagicById(String id) {
        return magicRepository.findById(id);
    }

    // Atualizar uma magic
    public Magic updateMagic(Magic magic) {
        if (!magicRepository.existsById(magic.getId())) {
            throw new IllegalArgumentException("Magic com ID " + magic.getId() + " não encontrada.");
        }
        return magicRepository.save(magic);
    }

    // Excluir uma magic
    public void deleteMagic(String id) {
        if (magicRepository.existsById(id)) {
            magicRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Magic com ID " + id + " não encontrada.");
        }
    }

    // Deprecated/Removed methods related to separate Card entity

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