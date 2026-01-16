package com.hefti.rpgzume.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "card")
@Entity(name = "card")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String resume;
    private String description;
    private String book;
    private Integer page;
    private String type;

    @OneToOne(mappedBy = "card")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Feature feature;

    @OneToOne(mappedBy = "card")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Magic magic;

}
