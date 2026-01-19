package com.hefti.rpgzume.repository;

import com.hefti.rpgzume.model.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, String> {
    List<Character> findByUserId(Long userId);
}
