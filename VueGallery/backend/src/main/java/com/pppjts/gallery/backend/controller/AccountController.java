package com.pppjts.gallery.backend.controller;

import com.pppjts.gallery.backend.entity.Member;
import com.pppjts.gallery.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
public class AccountController {

    @Autowired
    MemberRepository memberRepository;

    @PostMapping("/api/account/login")
    public  int login(@RequestBody Map<String, String> params){
       Member member =  memberRepository.findByEmailAndPassword(params.get("email"), params.get("password"));
       if(member != null)  return member.getId();

       throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }





}
