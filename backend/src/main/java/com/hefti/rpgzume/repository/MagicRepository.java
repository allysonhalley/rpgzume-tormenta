package com.hefti.rpgzume.repository;

import com.hefti.rpgzume.model.Magic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MagicRepository extends JpaRepository<Magic, String> {
    List<Magic> findByCardId(String cardId);
}
