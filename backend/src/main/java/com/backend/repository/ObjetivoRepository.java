package com.backend.repository;

import com.backend.entity.Objetivo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ObjetivoRepository extends JpaRepository<Objetivo, Integer> {
    
}
