package com.hefti.rpgzume.dto;

import java.util.List;

public record CharacterDTO(
                String id,
                Long userId,
                String name,
                String raceId,
                String raceName,
                String classId,
                String className,
                List<String> featureIds,
                List<String> magicIds) {
}
