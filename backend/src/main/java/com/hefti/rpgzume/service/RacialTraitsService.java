package com.hefti.rpgzume.service;

import com.hefti.rpgzume.dto.RacialTraitsDTO;
import com.hefti.rpgzume.model.RacialTraits;
import com.hefti.rpgzume.repository.RacialTraitsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RacialTraitsService {

    private final RacialTraitsRepository racialTraitsRepository;

    public RacialTraitsService(RacialTraitsRepository racialTraitsRepository) {
        this.racialTraitsRepository = racialTraitsRepository;
    }

    public List<RacialTraitsDTO> getAllRacialTraits() {
        return racialTraitsRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private RacialTraitsDTO convertToDTO(RacialTraits racialTraits) {
        return new RacialTraitsDTO(
                racialTraits.getId(),
                racialTraits.getName(),
                racialTraits.getDescription(),
                racialTraits.getBook(),
                racialTraits.getPage(),
                racialTraits.getType(),
                racialTraits.getTraits());
    }
}
