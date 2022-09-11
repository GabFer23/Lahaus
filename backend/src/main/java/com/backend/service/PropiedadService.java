package com.backend.service;

import com.backend.entity.Propiedad;
import com.backend.repository.PropiedadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepository;

    //=====================================================================================================
    public Page<Propiedad> listAll(
            int pageNumber,
            int pageSize,
            String sortField,
            String sortDir,
            String q,
            int categoria,
            int habitaciones,
            int wc,
            int estrato,
            int objetivo,
            int estado,
            int localidad,
            int min,
            int max
    ) {

        Sort sort = Sort.by(sortField);
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort);

        return propiedadRepository.findAll(
                q,
                categoria,
                habitaciones,
                wc,
                estrato,
                objetivo,
                estado,
                localidad,
                min,
                max,
                pageable
        );
    }

    //=====================================================================================================
    public Propiedad save(Propiedad propiedad) {
        return propiedadRepository.save(propiedad);
    }

    public Propiedad getById(int id) {
        return propiedadRepository.findById(id).get();
    }

    public void delete(int id) {
        propiedadRepository.deleteById(id);
    }
}
