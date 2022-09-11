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
    
    public List<Localidad> listAll() {
        return localidadRepository.findAll(Sort.by("id"));
    }
    public Localidad save(Localidad localidad) {
        return localidadRepository.save(localidad);
    }
        
    public Localidad getById(int id) {
        return localidadRepository.findById(id).get();
    }
    public void delete(int id) {
        localidadRepository.deleteById(id);
    }   
}
