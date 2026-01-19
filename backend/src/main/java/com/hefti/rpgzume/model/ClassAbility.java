package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "class_abilities")
@Entity(name = "class_abilities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ClassAbility extends Card {

    @ManyToOne
    @JoinColumn(name = "player_class_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore // Prevent recursion
    private PlayerClass playerClass;
}
