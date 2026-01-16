package com.hefti.rpgzume.model.dto;

public record FeatureDTO(
                String id,
                String type,
                String featureType,
                String name,
                String resume,
                String book,
                Integer page,
                String description,
                String prerequisites,
                String benefit,
                String normal,
                String special) {
}
