package com.hefti.rpgzume.dto;

public record ClassAbilityDTO(
                String id,
                String name,
                String resume, // Added resume field
                String description,
                String book,
                Integer page,
                String type,
                String playerClassId,
                String playerClassName) {
}
