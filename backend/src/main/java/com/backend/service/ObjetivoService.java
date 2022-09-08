package com.backend.service;

import com.backend.entity.Objetivo;
import com.backend.repository.ObjetivoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ObjetivoService {

    @Autowired
    private ObjetivoRepository objetivoRepository;

    public List<Objetivo> getAll() {
        return objetivoRepository.findAll(Sort.by("id"));
    }
}
