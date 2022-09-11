package com.backend.controller;

import com.backend.entity.Localidad;
import com.backend.service.LocalidadService;
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
@RequestMapping("/api/v1/localidad")
public class LocalidadController {

    @Autowired
    private LocalidadService localidadService;

    @GetMapping
    public List<Localidad> listarLocalidades() {
        return localidadService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarUnaLocalidad(@PathVariable int id) {
        try {

            Localidad localidad = localidadService.getById(id);
            return new ResponseEntity<>(localidad, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ==============================================================================
    @PostMapping
    public ResponseEntity<?> registrarLocalidad(@RequestBody Localidad localidad) {
        try {

            Localidad localidadGuardada = localidadService.save(localidad);

            return new ResponseEntity<>(localidadGuardada, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // ==============================================================================
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarLocalidad(@PathVariable int id, @RequestBody Localidad localidad) {
        try {
            Localidad localidadExistente = localidadService.getById(id);
            localidadExistente.setNombre(localidad.getNombre());
            Localidad localidadActualizada = localidadService.save(localidadExistente);
            return new ResponseEntity<>(localidadActualizada, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ==============================================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarLocalidad(@PathVariable Integer id) {

        try {
            localidadService.delete(id);
            return new ResponseEntity<>("Localidad eliminada", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    // ==============================================================================

}
