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
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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

    @NotEmpty(message = "El tiulo de la propiedad es obligatorio")
    @Column(length = 200, nullable = false)
    private String titulo;

    @NotEmpty(message = "La descripción de la propiedad es obligatorio")
    @Column(length = 1000, nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private int habitaciones;

    @Column(nullable = false)
    private int wc;

    @Min(1)
    @Column(nullable = false)
    private float precio;

    @NotNull(message = "El objetivo de la propiedad es obligatorio")
    @ManyToOne
    @JoinColumn(name = "id_Objetivo")
    private Objetivo objetivo;

    @NotEmpty(message = "La dirección e la propiedad es obligatorio")
    @Column(length = 100, nullable = false)
    private String direccion;

    @Min(1)
    @Column(nullable = false)
    private double area;

    @Min(1)
    @Max(6)
    @Column(nullable = false)
    private int estrato;

    @NotNull(message = "El estado de la propiedad es obligatorio")
    @ManyToOne
    @JoinColumn(name = "id_Estado")
    private Estado estado;

    @NotNull(message = "La localidad de la propiedad es obligatorio")
    @ManyToOne
    @JoinColumn(name = "id_Localidad")
    private Localidad localidad;

    @NotNull(message = "La categoría de la propiedad es obligatorio")
    @ManyToOne
    @JoinColumn(name = "id_Categoria")
    private Categoria categoria;

    @NotEmpty(message = "El teléfono de contacto es obligatorio")
    @Column(length = 20, nullable = false)
    private String telefono;

    @NotEmpty(message = "El correo de contacto")
    @Email(message = "Correo no válido")
    @Column(length = 50, nullable = false)
    private String correo;

    @OneToMany(mappedBy = "propiedad", cascade = CascadeType.ALL)
    private List<Imagen> imagenes = new ArrayList<>();

    @Column(updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;
}
