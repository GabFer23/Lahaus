package com.backend.service;

import com.backend.entity.Estado;
import com.backend.repository.EstadoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

    public List<Estado> listAll() {
        return estadoRepository.findAll(Sort.by("id"));
    }
    public Estado save(Estado estado) {
        return estadoRepository.save(estado);
    }
        
    public Estado getById(int id) {
        return estadoRepository.findById(id).get();
    }
    public void delete(int id) {
        estadoRepository.deleteById(id);
    } 

}
