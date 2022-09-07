package com.backend.controller;

import com.backend.entity.Objetivo;
import com.backend.service.ObjetivoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/objetivo")
public class ObjetivoController {

    @Autowired
    private ObjetivoService objetivoService;

    @GetMapping
    public List<Objetivo> listarObjetivos() {
        return objetivoService.getAll();
    }
}
