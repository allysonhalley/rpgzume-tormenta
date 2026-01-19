package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "magic")
@Entity(name = "magic")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Magic extends Card {

    @Column(name = "magic_type")
    private String magicType;
    private String level;
    private String components;
    private String castTime;
    private String range;
    private String targetArea;
    private String duration;
    private String savingThrow;
    private String spellResistance;
    private String school;
    private String effect;

    public Magic(String name, String resume, String description, String book, Integer page, String type,
            String magicType, String school, String level, String components, String castTime,
            String range, String targetArea, String duration, String savingThrow, String spellResistance,
            String effect) {
        super(null, name, resume, description, book, page, type);
        this.magicType = magicType;
        this.school = school;
        this.level = level;
        this.components = components;
        this.castTime = castTime;
        this.range = range;
        this.targetArea = targetArea;
        this.duration = duration;
        this.savingThrow = savingThrow;
        this.spellResistance = spellResistance;
        this.effect = effect;
    }
}
