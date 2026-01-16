package com.hefti.rpgzume.model.dto;

public record MagicDTO(
                String id,
                String type,
                String school,
                String name,
                String level,
                String resume,
                String book,
                Integer page,
                String components,
                String castTime,
                String range,
                String targetArea,
                String duration,
                String savingThrow,
                String spellResistance,
                String effect,
                String description) {
}
