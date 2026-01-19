package com.hefti.rpgzume.model;

import com.hefti.rpgzume.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "race_card_id", nullable = false)
    private Card race;

    @ManyToOne
    @JoinColumn(name = "class_card_id", nullable = false)
    private Card classAbility;

    @ManyToMany
    @JoinTable(name = "character_features", joinColumns = @JoinColumn(name = "character_id"), inverseJoinColumns = @JoinColumn(name = "card_id"))
    private List<Card> features;

    @ManyToMany
    @JoinTable(name = "character_magics", joinColumns = @JoinColumn(name = "character_id"), inverseJoinColumns = @JoinColumn(name = "card_id"))
    private List<Card> magics;
}
