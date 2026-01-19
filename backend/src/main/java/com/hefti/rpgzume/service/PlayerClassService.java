package com.hefti.rpgzume.service;

import com.hefti.rpgzume.model.PlayerClass;
import com.hefti.rpgzume.repository.PlayerClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerClassService {

    @Autowired
    private PlayerClassRepository playerClassRepository;

    public List<PlayerClass> findAll() {
        return playerClassRepository.findAll();
    }
}
