package com.hefti.rpgzume.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hefti.rpgzume.model.Card;
import com.hefti.rpgzume.model.Feature;
import com.hefti.rpgzume.repository.CardRepository;
import com.hefti.rpgzume.repository.FeatureRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    // Buscar todas as features
    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    public Feature createFeature(Feature feature) {
        return featureRepository.save(feature);
    }

    public List<Feature> createFeatures(List<Feature> features) {
        return featureRepository.saveAll(features);
    }

    // Buscar uma feature pelo ID
    public Optional<Feature> getFeatureById(String id) {
        return featureRepository.findById(id);
    }

    // Atualizar uma feature
    public Feature updateFeature(Feature feature) {
        if (!featureRepository.existsById(feature.getId())) {
            throw new IllegalArgumentException("Feature com ID " + feature.getId() + " não encontrada.");
        }
        return featureRepository.save(feature);
    }

    // Excluir uma feature
    public void deleteFeature(String id) {
        if (featureRepository.existsById(id)) {
            featureRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Feature com ID " + id + " não encontrada.");
        }
    }

    // Deprecated/Removed methods related to separate Card entity

    public void generatePdfAllFeatures() throws JSONException {
        pdfGeneratorService.generateFeaturePdf(getAllFeatureJson());
    }

    private JSONArray getAllFeatureJson() throws JSONException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Feature> features = featureRepository.findAll();

        // Converte a lista diretamente em uma string JSON e depois em um JSONArray
        try {
            String jsonString = objectMapper.writeValueAsString(features);
            return new JSONArray(jsonString);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter lista para JSON", e);
        }
    }
}
