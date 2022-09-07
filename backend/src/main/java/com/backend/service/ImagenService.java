package com.backend.service;

import com.backend.entity.Imagen;
import com.backend.repository.ImagenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    public void save(Imagen imagen) {
        imagenRepository.save(imagen);
    }
    
    public Imagen get(int id) {
        return imagenRepository.findById(id).get();
    }
}
