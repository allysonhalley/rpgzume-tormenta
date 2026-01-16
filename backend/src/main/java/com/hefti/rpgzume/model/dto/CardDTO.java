package com.hefti.rpgzume.model.dto;

public record CardDTO(
                String id,
                String type,
                String name,
                String resume,
                String description,
                String book,
                Integer page,
                String featureType,
                String school) {
}
