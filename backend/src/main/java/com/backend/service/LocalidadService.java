package com.backend.service;

import com.backend.entity.Localidad;
import com.backend.repository.LocalidadRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class LocalidadService {
    
    @Autowired
    private LocalidadRepository localidadRepository;
    
    public List<Localidad> getAll() {
        return localidadRepository.findAll(Sort.by("id"));
    }
    
}
