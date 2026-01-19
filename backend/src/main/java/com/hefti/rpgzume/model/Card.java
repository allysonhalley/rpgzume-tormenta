package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "card") // Not a real table in TABLE_PER_CLASS, but logical name
@Entity(name = "card")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public abstract class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String resume;
    private String description;
    private String book;
    private Integer page;
    private String type;
}
