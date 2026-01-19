package com.hefti.rpgzume.repository;

import com.hefti.rpgzume.model.PlayerClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerClassRepository extends JpaRepository<PlayerClass, String> {
    List<PlayerClass> findByType(String type);
}
