package com.hefti.rpgzume.repository;

import com.hefti.rpgzume.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface CardRepository extends JpaRepository<Card, String> {

    @Query("SELECT c FROM card c ORDER BY CASE WHEN c.type = 'feature' THEN 1 WHEN c.type = 'magic' THEN 2 ELSE 3 END, c.name ASC")
    List<Card> findAllOrderByType();

}
