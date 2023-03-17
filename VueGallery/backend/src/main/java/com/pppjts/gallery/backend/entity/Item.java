package com.pppjts.gallery.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name="items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length=1000, nullable=false)
    private String name;
    @Column(length = 100 )
    private String img_path;
    @Column
    private int price;
    @Column
    private int discountPer;

}
