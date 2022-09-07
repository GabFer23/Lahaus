package com.backend.repository;

import com.backend.entity.Propiedad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PropiedadRepository extends JpaRepository<Propiedad, Integer> {

    @Query(value = "SELECT p FROM Propiedad p WHERE"
            + " CONCAT(p.titulo, p.descripcion, p.direccion, p.localidad.nombre,"
            + " p.categoria.nombre, p.estado.nombre, p.objetivo.nombre)"
            + " LIKE %?1% "
            + " AND (?2 = 0 or p.categoria.id = ?2)"
            + " AND (?3 = 0 or p.habitaciones = ?3)"
            + " AND (?4 = 0 or p.wc = ?4) "
            + " AND (?5 = 0 or p.estrato = ?5) "
            + " AND (?6 = 0 or p.objetivo.id = ?6) "
            + " AND (?7 = 0 or p.estado.id = ?7) "
            + " AND (?8 = 0 or p.localidad.id = ?8) "
            + " AND (?9 = 0 or p.precio >= ?9) "
            + " AND (?10 = 0 or p.precio <= ?10) ")
    public Page<Propiedad> findAll(
            String q,
            int category,
            int rooms,
            int wc,
            int stratum,
            int objective,
            int condition,
            int locality,
            int min,
            int max,
            Pageable pageable
    );

}
