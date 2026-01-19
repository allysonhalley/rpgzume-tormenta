package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "feature")
@Entity(name = "feature")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Feature extends Card {

    private String prerequisites;
    private String benefit;
    private String normal;
    private String featureType;
    private String special;

    public Feature(String name, String resume, String description, String book, Integer page, String type,
            String featureType, String prerequisites, String benefit, String normal, String special) {
        super(null, name, resume, description, book, page, type);
        this.featureType = featureType;
        this.prerequisites = prerequisites;
        this.benefit = benefit;
        this.normal = normal;
        this.special = special;
    }
}
