package com.hefti.rpgzume.repository;

import com.hefti.rpgzume.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeatureRepository extends JpaRepository<Feature, String> {
    List<Feature> findByCardId(String cardId);
}
