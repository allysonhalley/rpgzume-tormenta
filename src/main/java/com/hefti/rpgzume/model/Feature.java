package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "feature")
@Entity(name = "feature")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true) // Cascata e remoção de órfãos
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    private Card card;

    private String prerequisites;
    private String benefit;
    private String normal;
    private String featureType;
    private String special;

    public Feature(Card card, String featureType, String prerequisites, String benefit, String normal, String special) {
        this.card = card;
        this.card.setType("feature");
        this.featureType = featureType;
        this.prerequisites = prerequisites;
        this.benefit = benefit;
        this.normal = normal;
        this.special = special;
    }
}
