package com.hefti.rpgzume.controller;

import com.hefti.rpgzume.model.Feature;
import com.hefti.rpgzume.model.dto.FeatureDTO;
import com.hefti.rpgzume.service.FeatureService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/features")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    // Endpoint para obter todos os features
    @GetMapping
    public List<FeatureDTO> getAllFeatures() {
        return featureService.getAllFeatures().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Endpoint para criar um novo feature
    @PostMapping
    public ResponseEntity<FeatureDTO> createFeature(@RequestBody Feature feature) {
        Feature savedFeature = featureService.createFeature(feature);
        return ResponseEntity.ok(convertToDTO(savedFeature));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeatureDTO> getFeatureById(@PathVariable String id) {
        Optional<Feature> feature = featureService.getFeatureById(id);
        return feature.map(f -> ResponseEntity.ok(convertToDTO(f)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeature(@PathVariable String id) {
        featureService.deleteFeature(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/fullfeature")
    public ResponseEntity<FeatureDTO> createFeatureWithCard(@RequestBody Feature feature) {
        Feature savedFeature = featureService.createFeatureWithCard(feature);
        return ResponseEntity.ok(convertToDTO(savedFeature));
    }

    @PostMapping("/addfulllist")
    public ResponseEntity<List<FeatureDTO>> createFeatures(@RequestBody List<Feature> features) {
        List<Feature> savedFeatures = featureService.createFeatures(features);
        List<FeatureDTO> featureDTOs = savedFeatures.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(featureDTOs);
    }

    @GetMapping("/pdf")
    public ResponseEntity<Object> getPdf() throws JSONException {
        featureService.generatePdfAllFeatures();
        return ResponseEntity.ok("PDF Gerado!");
    }

    // Método auxiliar para converter `Feature` para `FeatureDTO`
    private FeatureDTO convertToDTO(Feature feature) {
        return new FeatureDTO(
                feature.getId(),
                feature.getCard() != null ? feature.getCard().getType() : "feature",
                feature.getFeatureType(),
                feature.getCard() != null ? feature.getCard().getName() : "Sem Nome",
                feature.getCard() != null ? feature.getCard().getResume() : "Sem Resumo",
                feature.getCard() != null ? feature.getCard().getBook() : "Sem Livro",
                feature.getCard() != null ? feature.getCard().getPage() : 0,
                feature.getCard() != null ? feature.getCard().getDescription() : "Sem Descrição",
                feature.getPrerequisites(),
                feature.getBenefit(),
                feature.getNormal(),
                feature.getSpecial());
    }

}
