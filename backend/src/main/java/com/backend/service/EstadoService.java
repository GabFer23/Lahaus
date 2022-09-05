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

    public List<Estado> getAll() {
        return estadoRepository.findAll(Sort.by("id"));
    }

}
