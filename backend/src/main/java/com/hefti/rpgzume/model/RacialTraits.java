package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "racial_traits")
@Entity(name = "racial_traits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RacialTraits extends Card {

    @Column(columnDefinition = "TEXT")
    private String traits;

    public RacialTraits(String name, String resume, String description, String book, Integer page, String type,
            String traits) {
        super(null, name, resume, description, book, page, type);
        this.traits = traits;
    }
}
