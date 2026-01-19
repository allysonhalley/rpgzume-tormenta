package com.hefti.rpgzume.service;

import com.hefti.rpgzume.dto.ClassAbilityDTO;
import com.hefti.rpgzume.model.ClassAbility;
import com.hefti.rpgzume.repository.ClassAbilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassAbilityService {

    private final ClassAbilityRepository classAbilityRepository;

    public ClassAbilityService(ClassAbilityRepository classAbilityRepository) {
        this.classAbilityRepository = classAbilityRepository;
    }

    public List<ClassAbilityDTO> getAllClassAbilities() {
        return classAbilityRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ClassAbilityDTO convertToDTO(ClassAbility classAbility) {
        return new ClassAbilityDTO(
                classAbility.getId(),
                classAbility.getName(),
                classAbility.getResume(),
                classAbility.getDescription(),
                classAbility.getBook(),
                classAbility.getPage(),
                classAbility.getType(),
                classAbility.getPlayerClass() != null ? classAbility.getPlayerClass().getId() : null,
                classAbility.getPlayerClass() != null ? classAbility.getPlayerClass().getName() : null);
    }
}
