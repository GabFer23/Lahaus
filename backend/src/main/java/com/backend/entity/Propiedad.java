package com.backend.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Propiedad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 200, nullable = false)
    private String titulo;

    @Column(length = 1000, nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private int habitaciones;

    @Column(nullable = false)
    private int wc;

    @Column(nullable = false)
    private float precio;

    @ManyToOne
    @JoinColumn(name = "id_Objetivo")
    private Objetivo objetivo;

    @Column(length = 100, nullable = false)
    private String direccion;

    @Column(nullable = false)
    private double area;

    @Column(nullable = false)
    private int estrato;

    @ManyToOne
    @JoinColumn(name = "id_Estado")
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "id_Localidad")
    private Localidad localidad;

    @ManyToOne
    @JoinColumn(name = "id_Categoria")
    private Categoria categoria;

    @Column(length = 20, nullable = false)
    private String telefono;

    @Column(length = 50, nullable = false)
    private String correo;

    @OneToMany(mappedBy = "propiedad", cascade = CascadeType.ALL)
    private List<Imagen> imagenes = new ArrayList<>();

    @Column(updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;
}
