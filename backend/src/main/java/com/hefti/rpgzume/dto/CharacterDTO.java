package com.hefti.rpgzume.dto;

import java.util.List;

public record CharacterDTO(
        String id,
        Long userId,
        String name,
        String raceId,
        String raceName,
        String principalClassId, // Renamed from classId
        String principalClassName, // Renamed from className
        List<String> additionalClassIds, // New
        List<String> featureIds,
        List<String> magicIds) {
}
