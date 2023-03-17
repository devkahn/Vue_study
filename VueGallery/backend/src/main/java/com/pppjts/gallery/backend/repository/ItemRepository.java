package com.pppjts.gallery.backend.repository;

import com.pppjts.gallery.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository  extends JpaRepository<Item, Integer> {


}
