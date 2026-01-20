package com.hefti.rpgzume.service;

import com.hefti.rpgzume.dto.CharacterDTO;
import com.hefti.rpgzume.model.Character;
import com.hefti.rpgzume.model.Card;
import com.hefti.rpgzume.model.Feature;
import com.hefti.rpgzume.model.Magic;
import com.hefti.rpgzume.model.PlayerClass;
import com.hefti.rpgzume.model.RacialTraits;
import com.hefti.rpgzume.user.User;
import com.hefti.rpgzume.repository.CharacterRepository;
import com.hefti.rpgzume.repository.RacialTraitsRepository;
import com.hefti.rpgzume.repository.PlayerClassRepository;
import com.hefti.rpgzume.repository.FeatureRepository;
import com.hefti.rpgzume.repository.MagicRepository;
import com.hefti.rpgzume.user.UserRepository;
import com.hefti.rpgzume.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;
    private final RacialTraitsRepository racialTraitsRepository; // New
    private final PlayerClassRepository playerClassRepository; // New
    private final FeatureRepository featureRepository; // New
    private final MagicRepository magicRepository; // New

    public CharacterService(CharacterRepository characterRepository,
            UserRepository userRepository,
            RacialTraitsRepository racialTraitsRepository,
            PlayerClassRepository playerClassRepository,
            FeatureRepository featureRepository,
            MagicRepository magicRepository) {
        this.characterRepository = characterRepository;
        this.userRepository = userRepository;
        this.racialTraitsRepository = racialTraitsRepository;
        this.playerClassRepository = playerClassRepository;
        this.featureRepository = featureRepository;
        this.magicRepository = magicRepository;
    }

    public List<CharacterDTO> getAllCharacters() {
        return characterRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CharacterDTO> getCharactersByUser(Long userId) {
        return characterRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CharacterDTO getCharacterById(String id) {
        Character character = characterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado"));
        return convertToDTO(character);
    }

    @Transactional
    public CharacterDTO createCharacter(CharacterDTO dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        RacialTraits race = racialTraitsRepository.findById(dto.raceId())
                .orElseThrow(() -> new RuntimeException("Raça não encontrada"));

        PlayerClass principalClass = playerClassRepository.findById(dto.principalClassId())
                .orElseThrow(() -> new RuntimeException("Classe Principal não encontrada"));

        Character character = new Character();
        character.setUser(user);
        character.setName(dto.name());
        character.setRace(race);
        character.setPrincipalClass(principalClass);

        if (dto.additionalClassIds() != null && !dto.additionalClassIds().isEmpty()) {
            List<PlayerClass> additionalClasses = playerClassRepository.findAllById(dto.additionalClassIds());
            character.setAdditionalClasses(additionalClasses);
        }

        if (dto.featureIds() != null && !dto.featureIds().isEmpty()) {
            List<Feature> features = featureRepository.findAllById(dto.featureIds());
            character.setFeatures(features);
        }

        if (dto.magicIds() != null && !dto.magicIds().isEmpty()) {
            List<Magic> magics = magicRepository.findAllById(dto.magicIds());
            character.setMagics(magics);
        }

        return convertToDTO(characterRepository.save(character));
    }

    @Transactional
    public void deleteCharacter(String id) {
        characterRepository.deleteById(id);
    }

    @Transactional
    public CharacterDTO updateCharacter(String id, CharacterDTO dto) {
        Character character = characterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado"));

        RacialTraits race = racialTraitsRepository.findById(dto.raceId())
                .orElseThrow(() -> new RuntimeException("Raça não encontrada"));

        PlayerClass principalClass = playerClassRepository.findById(dto.principalClassId())
                .orElseThrow(() -> new RuntimeException("Classe Principal não encontrada"));

        character.setName(dto.name());
        character.setRace(race);
        character.setPrincipalClass(principalClass);

        if (dto.additionalClassIds() != null) {
            List<PlayerClass> additionalClasses = playerClassRepository.findAllById(dto.additionalClassIds());
            character.setAdditionalClasses(additionalClasses);
        } else {
            character.setAdditionalClasses(List.of());
        }

        if (dto.featureIds() != null) {
            List<Feature> features = featureRepository.findAllById(dto.featureIds());
            character.setFeatures(features);
        } else {
            character.setFeatures(List.of());
        }

        if (dto.magicIds() != null) {
            List<Magic> magics = magicRepository.findAllById(dto.magicIds());
            character.setMagics(magics);
        } else {
            character.setMagics(List.of());
        }

        return convertToDTO(characterRepository.save(character));
    }

    private CharacterDTO convertToDTO(Character character) {
        List<String> featureIds = character.getFeatures() != null
                ? character.getFeatures().stream().map(Feature::getId).collect(Collectors.toList())
                : List.of();

        List<String> magicIds = character.getMagics() != null
                ? character.getMagics().stream().map(Magic::getId).collect(Collectors.toList())
                : List.of();

        List<String> additionalClassIds = character.getAdditionalClasses() != null
                ? character.getAdditionalClasses().stream().map(PlayerClass::getId).collect(Collectors.toList())
                : List.of();

        return new CharacterDTO(
                character.getId(),
                character.getUser().getId(),
                character.getName(),
                character.getRace().getId(),
                character.getRace().getName(),
                character.getPrincipalClass().getId(),
                character.getPrincipalClass().getName(),
                additionalClassIds,
                featureIds,
                magicIds);
    }
}
