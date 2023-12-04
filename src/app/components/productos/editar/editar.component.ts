import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/shared/productos.service';
import { environment } from 'src/environment.local';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CatalogosService } from 'src/app/shared/catalogos.service';
import { Form, FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';

declare var tinymce: any;

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  cargando:boolean = false;
  config:any={};
  categorias:any;
  checkboxGrabado = false;

  // RegistroProducto:FormGroup;
  RegistroProducto = new FormGroup({
    id_productos:new FormControl(0),
    producto: new FormControl(),
    RFC: new FormControl(),
    id_categoria: new FormControl(),
    peso: new FormControl(),
    descripcion: new FormControl(''),
    grabado: new FormControl(false),
    productocustom: new FormControl(false),
    productofabrica: new FormControl(false),
    tipoanillo:new FormControl(false),
    piedras:new FormControl(false),
    activo:new FormControl(false),
    productocadena:new FormControl(false)
  });
  constructor(
    private route: ActivatedRoute,
    private ProductosService: ProductosService,
    private location: Location,
    private toastr:ToastrService,
    private CatalogosService: CatalogosService,
    ) {
      this.config ={
        height:300
      }
    }
  ngOnInit() {
    this.cargadatos();
    this.getCategorias();
  }
  cargadatos(){
    const clave = this.route.snapshot.paramMap.get('id');
    this.ProductosService.productoinfo(clave).subscribe(
      (data) => {
        // this.producto = data;
        // this.RegistroProducto.patchValue(data);
        const valores = this.RegistroProducto.value;
        console.log(data);
        this.RegistroProducto.patchValue({
          id_productos: data.id_productos,
          producto: data.producto,
          RFC: data.RFC,
          id_categoria: data.id_categoria,
          peso: data.peso,
          descripcion: data.descripcion,
        });
        if (data.productofabrica === 1) {
          this.RegistroProducto.patchValue({
            productofabrica: true
          });
        }
        if (data.grabado === 1) {
          this.RegistroProducto.patchValue({
            grabado: true
          });
        }
        if (data.activo == 1) {
          this.RegistroProducto.patchValue({
            activo: true
          });
        }
        if (data.productocustom == 1) {
          this.RegistroProducto.patchValue({
            productocustom: true
          });
        }
        if (data.piedras == 1) {
          this.RegistroProducto.patchValue({
            piedras: true
          });
        }
        if (data.tipoanillo == 1) {
          this.RegistroProducto.patchValue({
            tipoanillo: true
          });
        }
        if (data.productocadena == 1) {
          this.RegistroProducto.patchValue({
            productocadena: true
          });
        }
      },
      (error) => {
        this.toastr.error('Ocurrio un error al obtener los datos.', 'info!');
        console.error('Error al obtener los metales', error);
      }
    )
  }
  fabricacheck(){
    const valores = this.RegistroProducto.value;
    if (valores.productofabrica) {
      this.RegistroProducto.patchValue({
        piedras: false
      });
      this.RegistroProducto.patchValue({
        productocustom: false
      });
    }
  }
  customcheck(){
    const valores = this.RegistroProducto.value;
    if (valores.productocustom) {
      this.RegistroProducto.patchValue({
        productofabrica: false
      });
    }
  }
  piedracheck(){
    const valores = this.RegistroProducto.value;
    if (valores.piedras) {
      this.RegistroProducto.patchValue({
        productofabrica: false
      });
      this.RegistroProducto.patchValue({
        productocustom: true
      });
    }

  }
  getCategorias(): void {
    this.CatalogosService.lcategoria().subscribe(
      data => {
        this.categorias = data.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  toggleCheckbox() {
    if (this.checkboxGrabado) {
      this.checkboxGrabado = false;
    }else{
      this.checkboxGrabado = true;
    }
    // this.checkboxGrabado = !this.checkboxGrabado;
  }
  cadenacheck(){
    const valores = this.RegistroProducto.value;
    if (valores.productocadena) {
      this.RegistroProducto.patchValue({
        tipoanillo: false
      });
    }
  }
  anillocheck(){
    const valores = this.RegistroProducto.value;
    if (valores.tipoanillo) {
      this.RegistroProducto.patchValue({
        productocadena: false
      });
    }
  }
  Editarproducto(){
    this.ProductosService.editarproducto(this.RegistroProducto.value).subscribe(
      data => {
        this.toastr.success(data.mensaje, 'Editado!');
      },
      error => {
        console.log(error);
      }
    )
  }
}
