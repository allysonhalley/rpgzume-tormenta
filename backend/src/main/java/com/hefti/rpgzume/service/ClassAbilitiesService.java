package com.hefti.rpgzume.service;

import com.hefti.rpgzume.dto.ClassAbilitiesDTO;
import com.hefti.rpgzume.model.ClassAbilities;
import com.hefti.rpgzume.repository.ClassAbilitiesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassAbilitiesService {

    private final ClassAbilitiesRepository classAbilitiesRepository;

    public ClassAbilitiesService(ClassAbilitiesRepository classAbilitiesRepository) {
        this.classAbilitiesRepository = classAbilitiesRepository;
    }

    public List<ClassAbilitiesDTO> getAllClassAbilities() {
        return classAbilitiesRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ClassAbilitiesDTO convertToDTO(ClassAbilities classAbilities) {
        return new ClassAbilitiesDTO(
                classAbilities.getCard().getId(),
                classAbilities.getCard().getName(),
                classAbilities.getCard().getDescription(),
                classAbilities.getCard().getBook(),
                classAbilities.getCard().getPage(),
                classAbilities.getCard().getType(),
                classAbilities.getAbilities());
    }
}
