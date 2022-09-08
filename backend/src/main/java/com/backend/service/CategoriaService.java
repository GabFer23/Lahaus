package com.backend.service;

import com.backend.entity.Categoria;
import com.backend.repository.CategoriaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> getAll() {
        return categoriaRepository.findAll(Sort.by("id"));
    }

    public Categoria get(int id) {
        return categoriaRepository.findById(id).get();
    }
}
