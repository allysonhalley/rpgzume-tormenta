package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name = "player_class")
@Entity(name = "player_class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PlayerClass extends Card {

    @Column(name = "trait_class", columnDefinition = "TEXT")
    private String traitClass;

    @OneToMany(mappedBy = "playerClass", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClassAbility> abilities;
}
