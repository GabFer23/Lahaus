package com.backend.controller;

import com.backend.entity.Propiedad;
import com.backend.service.PropiedadService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
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
@RequestMapping("/api/v1/propiedad")
public class PropiedadController {

    @Autowired
    private PropiedadService propiedadService;

    // ==============================================================================
    @GetMapping
    public ResponseEntity<?> listarPropiedades(
            @Param("page") int page,
            @Param("pageSize") int pageSize,
            @Param("q") String q,
            @Param("sortField") String sortField,
            @Param("sortDir") String sortDir,
            @Param("categoria") int categoria,
            @Param("habitaciones") int habitaciones,
            @Param("wc") int wc,
            @Param("estrato") int estrato,
            @Param("objetivo") int objetivo,
            @Param("estado") int estado,
            @Param("localidad") int localidad,
            @Param("min") int min,
            @Param("max") int max
    ) {
        try {

            Page<Propiedad> propiedadesContent = propiedadService.listAll(
                    page,
                    pageSize,
                    sortField,
                    sortDir,
                    q,
                    categoria,
                    habitaciones,
                    wc,
                    estrato,
                    objetivo,
                    estado,
                    localidad,
                    min,
                    max
            );

            return new ResponseEntity<>(propiedadesContent, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ==============================================================================
    @GetMapping("/{id}")
    public ResponseEntity<?> listarUnaPropiedad(@PathVariable int id) {
        try {

            Propiedad propiedad = propiedadService.getById(id);
            return new ResponseEntity<>(propiedad, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ==============================================================================
    @PostMapping
    public ResponseEntity<?> guardarPropiedad(@RequestBody @Valid Propiedad propiedad) {
        try {

            Propiedad propiedadGuardada = propiedadService.save(propiedad);

            return new ResponseEntity<>(propiedadGuardada, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // ==============================================================================
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPropiedad(@PathVariable int id, @RequestBody @Valid Propiedad propiedad) {
        try {
            Propiedad propiedadExistente = propiedadService.getById(id);

            propiedadExistente.setTitulo(propiedad.getTitulo());
            propiedadExistente.setDescripcion(propiedad.getDescripcion());
            propiedadExistente.setHabitaciones(propiedad.getHabitaciones());
            propiedadExistente.setWc(propiedad.getWc());
            propiedadExistente.setPrecio(propiedad.getPrecio());
            propiedadExistente.setObjetivo(propiedad.getObjetivo());
            propiedadExistente.setDireccion(propiedad.getDireccion());
            propiedadExistente.setArea(propiedad.getArea());
            propiedadExistente.setEstrato(propiedad.getEstrato());
            propiedadExistente.setEstado(propiedad.getEstado());
            propiedadExistente.setLocalidad(propiedad.getLocalidad());
            propiedadExistente.setCategoria(propiedad.getCategoria());
            propiedadExistente.setTelefono(propiedad.getTelefono());
            propiedadExistente.setCorreo(propiedad.getCorreo());

            Propiedad propiedadActualizada = propiedadService.save(propiedadExistente);
            return new ResponseEntity<>(propiedadActualizada, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ==============================================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPropiedad(@PathVariable Integer id) {

        try {
            propiedadService.delete(id);
            return new ResponseEntity<>("Publicación eliminada", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    // ==============================================================================

}
