package com.backend.controller;

import com.backend.entity.Categoria;
import com.backend.service.CategoriaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Categoria> listarCategorias() {
        return categoriaService.listAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> listarUnaCategoria(@PathVariable int id) {
        try {

            Categoria categoria = categoriaService.getById(id);
            return new ResponseEntity<>(categoria, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ==============================================================================
    @PostMapping
    public ResponseEntity<?> registrarCategoria(@RequestBody Categoria categoria) {
        try {

            Categoria categoriaGuardada = categoriaService.save(categoria);

            return new ResponseEntity<>(categoriaGuardada, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // ==============================================================================
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCategoria(@PathVariable int id, @RequestBody Categoria categoria) {
        try {
            Categoria categoriaExistente = categoriaService.getById(id);
            categoriaExistente.setNombre(categoria.getNombre());
            Categoria categoriaActualizada = categoriaService.save(categoriaExistente);
            return new ResponseEntity<>(categoriaActualizada, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ==============================================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Integer id) {

        try {
            categoriaService.delete(id);
            return new ResponseEntity<>("Categoria eliminada", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    // ==============================================================================

}
