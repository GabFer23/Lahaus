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

    public List<Categoria> listAll() {
        return categoriaRepository.findAll(Sort.by("id"));
    }
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria getById(int id) {
        return categoriaRepository.findById(id).get();
    }
    public void delete(int id) {
        categoriaRepository.deleteById(id);
    }
}
