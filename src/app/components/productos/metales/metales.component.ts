import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/shared/productos.service';
import { environment } from 'src/environment.local';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
declare var tinymce: any;

@Component({
  selector: 'app-metales',
  templateUrl: './metales.component.html',
  styleUrls: ['./metales.component.css']
})
export class MetalesComponent {
  parametro: string | undefined;
  metales:any;
  switchesData: any = [];
  amarillo:boolean=false;
  blanco:boolean=false;
  rosa:boolean=false;
  plata:boolean=false;
  id_amarillo:number=0;
  id_rosa:number=0;
  id_blanco:number=0;
  producto:any;
  a10k:boolean=false;a14k:boolean=false;a18k:boolean=false;
  b10k:boolean=false;b14k:boolean=false;b18k:boolean=false;
  r10k:boolean=false;r14k:boolean=false;r18k:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private ProductosService: ProductosService,
    private location: Location,
    private toastr:ToastrService,

    ) { }
    apiUrl: string = environment.apiUrl;

  ngOnInit() {
    this.cargaestado();
  }
  cargaestado(){
    const parametro = this.route.snapshot.paramMap.get('id');
    if (parametro !== null) {
      this.parametro = parametro;

      this.ProductosService.metalesproducto(this.parametro).subscribe(
        (data) => {
          if (data.oroamarillo == 1) {
            this.amarillo = true;
            this.id_amarillo = data.id_amarillo;
          }
          if (data.ororosa == 1) {
            this.rosa = true;
            this.id_rosa = data.id_rosa;
          }
          if (data.oroblanco == 1) {
            this.blanco = true;
            this.id_blanco = data.id_blanco;
          }
          if (data.plata == 1) {
            this.plata = true;
          }
          console.log(this.id_amarillo);
          console.log(this.id_blanco);
          console.log(this.id_rosa);

          for (let index in data.variantes) {
            if (data.variantes[index].oroamarillo == 1) {
              if (data.variantes[index].diez == 1) {
                this.a10k = true;
              }
              if (data.variantes[index].catorce == 1) {
                this.a14k = true;
              }
              if (data.variantes[index].dieciocho == 1) {
                this.a18k = true;
              }
            }
            if (data.variantes[index].oroblanco == 1) {
              if (data.variantes[index].diez == 1) {
                this.r10k = true;
              }
              if (data.variantes[index].catorce == 1) {
                this.r14k = true;
              }
              if (data.variantes[index].dieciocho == 1) {
                this.r18k = true;
              }
            }
          }
        },
        (error) => {
          console.error('Error al obtener los metales', error);
        }
      )
      this.ProductosService.productoinfo(this.parametro).subscribe(
        (data) => {
          this.producto = data;
        },
        (error) => {
          console.error('Error al obtener el producto', error);
        }
      )

    }
  }
  Guardarmetales(){}
  orostatus(oro:number,status:boolean){
    this.cambiarstatus(oro,status);
    this.ProductosService.metalstatus(oro,status,this.parametro).subscribe(
      (respuesta) => {
        console.log(respuesta);
      },
      (error) => {
        console.error('Error al cambiar el estado del metal', error);
      }
    )
  }
  cambiarstatus(oro:number,status:boolean){
    if (oro == 1) {
      if (status) {
        this.amarillo = false;
      }else{
        this.amarillo = true;
      }
    }
    if (oro == 2) {
      if (status) {
        this.rosa = false;
      }else{
        this.rosa = true;
      }
    }
    if (oro == 3) {
      if (status) {
        this.blanco = false;
      }else{
        this.blanco = true;
      }
    }
    if (oro == 4) {
      if (status) {
        this.plata = false;
      }else{
        this.plata = true;
      }
    }
  }
  volverAtras() {
    this.location.back();
  }
  orokilate(kilate:number,tipo:number,status:boolean){
    var clavevariante:any;
    var estado:any;
    switch (tipo) {
        case 1:
          clavevariante = this.id_amarillo;
        break;
        case 2:
          clavevariante = this.id_rosa;
        break;
        case 3:
          clavevariante = this.id_blanco;
        break;
    }
    if (status) {
      estado = 0;
    }else{
      estado = 1;
    }
    this.ProductosService.changekilate(clavevariante,kilate,estado).subscribe(
      (data) => {
        this.toastr.success(data.mensaje, 'Guardada!');

        this.cargaestado();
      },
      (error) => {
        console.error('Error al obtener el producto', error);
      }
    )
  }
}
