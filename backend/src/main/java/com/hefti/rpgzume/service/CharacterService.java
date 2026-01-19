package com.hefti.rpgzume.service;

import com.hefti.rpgzume.dto.CharacterDTO;
import com.hefti.rpgzume.model.Card;
import com.hefti.rpgzume.model.Character;
import com.hefti.rpgzume.user.User;
import com.hefti.rpgzume.repository.CardRepository;
import com.hefti.rpgzume.repository.CharacterRepository;
import com.hefti.rpgzume.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;

    public CharacterService(CharacterRepository characterRepository,
            UserRepository userRepository,
            CardRepository cardRepository) {
        this.characterRepository = characterRepository;
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
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

        Card race = cardRepository.findById(dto.raceId())
                .orElseThrow(() -> new RuntimeException("Raça não encontrada"));

        Card classAbility = cardRepository.findById(dto.classId())
                .orElseThrow(() -> new RuntimeException("Classe não encontrada"));

        Character character = new Character();
        character.setUser(user);
        character.setName(dto.name());
        character.setRace(race);
        character.setClassAbility(classAbility);

        if (dto.featureIds() != null && !dto.featureIds().isEmpty()) {
            List<Card> features = cardRepository.findAllById(dto.featureIds());
            character.setFeatures(features);
        }

        if (dto.magicIds() != null && !dto.magicIds().isEmpty()) {
            List<Card> magics = cardRepository.findAllById(dto.magicIds());
            character.setMagics(magics);
        }

        return convertToDTO(characterRepository.save(character));
    }

    @Transactional
    public void deleteCharacter(String id) {
        characterRepository.deleteById(id);
    }

    private CharacterDTO convertToDTO(Character character) {
        List<String> featureIds = character.getFeatures() != null
                ? character.getFeatures().stream().map(Card::getId).collect(Collectors.toList())
                : List.of();

        List<String> magicIds = character.getMagics() != null
                ? character.getMagics().stream().map(Card::getId).collect(Collectors.toList())
                : List.of();

        return new CharacterDTO(
                character.getId(),
                character.getUser().getId(),
                character.getName(),
                character.getRace().getId(),
                character.getRace().getName(),
                character.getClassAbility().getId(),
                character.getClassAbility().getName(),
                featureIds,
                magicIds);
    }
}
