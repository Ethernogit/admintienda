import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Form, FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ProductosService } from 'src/app/shared/productos.service';
import { CatalogosService } from 'src/app/shared/catalogos.service';


@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent {
  cargando:boolean=false;

  // producto: any = {
  //   nombre: '',
  //   codigo: '',
  //   categoria: '',
  //   peso: '',
  //   descripcion: '',
  //   grabado: false,
  //   custom: false,
  //   fabrica:true,
  //   anillo: false,
  //   piedras: false
  // };

  // RegistroProducto = new FormGroup({
  //   nombre: new FormControl(),
  //   codigo: new FormControl(),
  //   categoria: new FormControl(),
  //   peso: new FormControl(),
  //   descripcion: new FormControl(''),
  //   grabado: new FormControl(false),
  //   custom: new FormControl(false),
  //   fabrica: new FormControl(true),
  //   anillo:new FormControl(false),
  //   piedras:new FormControl(false),
  // });
  Fileuno: File | null = null;
  Filegrabado: File | null = null;
  checkboxGrabado = false;
  checkboxFabrica = true;
  checkboxPiedra = false;

  categorias:any;
  proveedores:any;
  proveedorcheck:boolean=false;
  public config:any={};
  RegistroProducto:FormGroup;
  constructor(
    private ProductosService: ProductosService,
    private toastr:ToastrService,
    private CatalogosService: CatalogosService,
    private formb: FormBuilder
  ){
    this.config ={
      height:300
    }
    this.RegistroProducto = this.formb.group({
      nombre: new FormControl(),
      codigo: new FormControl(),
      categoria: new FormControl(),
      peso: new FormControl(),
      descripcion: new FormControl(''),
      grabado: new FormControl(false),
      custom: new FormControl(false),
      fabrica: new FormControl(true),
      anillo:new FormControl(false),
      piedras:new FormControl(false),
      productoproveedor:new FormControl(false),
      id_proveedor: new FormControl(0),
      kilate: new FormControl('10'),
      pesoproveedor:new FormControl('0'),
      productocadena:new FormControl(false),
    });
  }
  ngOnInit(): void {
    this.getCategorias();
    this.lproveedores()
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
  fabricacheck(){
    const fabricav = this.RegistroProducto.get('fabrica');
    if (fabricav?.value) {
      const piedras = this.RegistroProducto.get('piedras');
      if (piedras?.value) {
        piedras.setValue(false);
      }
      const custom = this.RegistroProducto.get('custom');
      if (custom?.value) {
        custom.setValue(false);
      }

    }
  }
  customcheck(){
    const custom = this.RegistroProducto.get('custom');
      if (custom?.value) {
        const fabricav = this.RegistroProducto.get('fabrica');
        if (fabricav?.value) {
          fabricav.setValue(false);
        }
      }
  }
  checkproveedor(){
    const proveedor = this.RegistroProducto.get('productoproveedor');
    if (proveedor?.value) {
      this.proveedorcheck = true;
    }else{
      this.proveedorcheck = false;
    }
  }
  piedracheck(){
    const piedrasv = this.RegistroProducto.get('piedras');
    if (piedrasv?.value) {
      const fabricav = this.RegistroProducto.get('fabrica');
      if (fabricav?.value) {
        fabricav.setValue(false);
      }
      const custom = this.RegistroProducto.get('custom');
      if (custom?.value === false) {
        custom.setValue(true);
      }

    }
  }
  selectImgUno(event:any){
    this.Fileuno = event.target.files[0];
  }
  selectImgGrabado(event:any){
    this.Filegrabado = event.target.files[0];
  }
  onSubmitProductos(){
    if (!this.Fileuno) {
      this.toastr.error('No se ha seleccionado ninguna imagen.', 'info!');
      return;
    }
    if (!this.Filegrabado) {
      this.Filegrabado = this.Fileuno;
    }
    this.cargando = true;
    this.ProductosService.registrarproducto(this.Fileuno,this.Filegrabado,this.RegistroProducto.value).subscribe(
      (response) => {
        this.cargando = false;
        this.toastr.success(response.mensaje, 'Guardada!');
      },
      (error) => {
        this.cargando = false;
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  lproveedores(){
    this.CatalogosService.lproveedor().subscribe(
      (response) => {
        this.cargando = false;
        this.proveedores = response;
      },
      (error) => {
        this.cargando = false;
        this.toastr.error('Ocurrio un error al cargar', 'info!');
      }
    )
  }
  cadenacheck(){
    const cadena = this.RegistroProducto.get('productocadena');
    if (cadena?.value) {
      const anillo = this.RegistroProducto.get('anillo');
      if (anillo?.value) {
        anillo.setValue(false);
      }
    }
  }
  anillocheck(){
    const anillo = this.RegistroProducto.get('anillo');
    if (anillo?.value) {
      console.log(anillo);

      const cadena = this.RegistroProducto.get('productocadena');
      if (cadena?.value) {
        cadena.setValue(false);
      }
    }
  }
}
