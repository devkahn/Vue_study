package com.pppjts.gallery.backend.repository;

import com.pppjts.gallery.backend.entity.Item;
import com.pppjts.gallery.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByEmailAndPassword(String email, String password);


}
