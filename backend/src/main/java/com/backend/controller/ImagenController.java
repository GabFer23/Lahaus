package com.backend.controller;

import com.backend.entity.Imagen;
import com.backend.service.ImagenService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/imagen")
public class ImagenController {

    @Autowired
    private ImagenService imagenService;

    @PostMapping
    public ResponseEntity<?> guardarImagen(@RequestBody @Valid Imagen imagen) {
        try {

            imagenService.save(imagen);

            return new ResponseEntity<>("Creada correctamente", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPropiedad(@PathVariable Integer id, @RequestBody @Valid Imagen imagen) {
        try {
            Imagen imagenExistente = imagenService.get(id);

            imagenExistente.setUrl(imagen.getUrl());
            imagenExistente.setPropiedad(imagen.getPropiedad());

            imagenService.save(imagenExistente);
            return new ResponseEntity<>("Actualizado correctamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
