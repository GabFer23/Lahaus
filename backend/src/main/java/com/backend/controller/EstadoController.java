package com.backend.controller;

import com.backend.entity.Estado;
import com.backend.service.EstadoService;
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
@RequestMapping("/api/v1/estado")
public class EstadoController {

    @Autowired
    private EstadoService estadoService;

    @GetMapping
    public List<Estado> listarEstados() {
        return estadoService.listAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> listarEstado(@PathVariable int id) {
        try {

            Estado estado = estadoService.getById(id);
            return new ResponseEntity<>(estado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<?> registrarEstado(@RequestBody Estado estado) {
        try {

            Estado guardarEstado = estadoService.save(estado);

            return new ResponseEntity<>(guardarEstado, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEstado(@PathVariable int id, @RequestBody Estado estado) {
        try {
            Estado estadoExistente = estadoService.getById(id);
            estadoExistente.setNombre(estado.getNombre());
            Estado estadoActualizado = estadoService.save(estadoExistente);
            return new ResponseEntity<>(estadoActualizado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEstado(@PathVariable Integer id) {

        try {
            estadoService.delete(id);
            return new ResponseEntity<>("Estado eliminado", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
}
