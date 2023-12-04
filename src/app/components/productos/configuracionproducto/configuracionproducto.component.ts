import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../shared/productos.service';
import { environment } from 'src/environment.local';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Form, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CatalogosService } from '../../../shared/catalogos.service';

declare var window: any;

@Component({
  selector: 'app-configuracionproducto',
  templateUrl: './configuracionproducto.component.html',
  styleUrls: ['./configuracionproducto.component.css']
})
export class ConfiguracionproductoComponent {
  productos: any[] = [];
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Cantidad de elementos por página
  metales:any;
  variantes:any;
  clave_variante:any;
  amarillo:boolean=false;
  blanco:boolean=false;
  rosa:boolean=false;
  plata:boolean=false;
  id_amarillo:number=0;
  id_blanco:number=0;
  id_rosa:number=0;
  id_plata:number=0;
  tipoanillo:boolean=false;
  tipocustom:boolean=false;
  tipopiedras:boolean=false;
  producto:any={producto:"NINGUNO"};
  metalelegido:boolean=false;
  numeros:any;
  piedras:any;
  variantesmetal:any;
  NumerosForm = new FormGroup({
    numero: new FormControl(),
    peso: new FormControl()
  });
  MedidaForm = new FormGroup({
    medida: new FormControl(),
    peso: new FormControl(),
    stock: new FormControl(),
    id_producto: new FormControl()
  });
  //FORMULARIO EDITAR MEDIAD
  editarMedidaForm= new FormGroup({
    medida: new FormControl(),
    peso: new FormControl(),
    stock: new FormControl(),
    id_producto: new FormControl(),
    id_medida:new FormControl(),
  });
  VariantesForm = new FormGroup({
    piedrauno: new FormControl(),
    piedrados: new FormControl()
  });
  ImgVarianteForm = new FormGroup({
    imgvariante: new FormControl()
  });
  ImgProductoForm = new FormGroup({
    img: new FormControl()
  });
  //archivos img para variantes img
  FotoUnovariante: File | null = null;
  FotoDosvariante: File | null = null;
  FotoTresvariante: File | null = null;
  Fileimgvariante: File | null = null;
  ProductoIMG: File | null = null;

  //imgvarian modal
  imgvariantemodal:any;
  //modal crear numero
  NumeroModal: any;
  //MODAL CADENA
  cadenamodal:any;
  //editar medida
  editmedidamodal:any
  //modalvariante
  rvariantemodal:any;
  amarilloBorde:boolean=false;
  plataBorde:boolean=false;
  blancoBorde:boolean=false;
  rosaBorde:boolean=false;
  cargando = false;
  medidasproducto:any;
  constructor(
    private ProductosService: ProductosService,
    public fbnumero: FormBuilder,
    private toastr:ToastrService,
    private CatalogosService:CatalogosService
  ){

  }
  apiUrl: string = environment.apiUrl;

  ngOnInit(): void {
    this.imgvariantemodal = new window.bootstrap.Modal(
      document.getElementById('rimgvariantemodal')
    );
    this.NumeroModal = new window.bootstrap.Modal(
      document.getElementById('numerosModal')
    );
    this.rvariantemodal = new window.bootstrap.Modal(
      document.getElementById('rvariantemodal')
    );
    this.cadenamodal= new window.bootstrap.Modal(
      document.getElementById('medidaModal')
    );
    this.editmedidamodal= new window.bootstrap.Modal(
      document.getElementById('editMedidaModal')
    );
    this.CatalogosService.limgpiedras().subscribe(
      (response) => {
        this.piedras = response;
      }
    )
    this.getProductos();
  }
  openNumeroModal() {
    this.NumeroModal.show();
  }
  openVarianteModal() {
    this.rvariantemodal.show();
  }
  openimagenvariante(){
    this.imgvariantemodal.show();
  }
  getProductos(): void {
    this.ProductosService.listarproductos(this.currentPage,this.itemsPerPage).subscribe(
      (response) => {
        this.productos = response.data;
      },
      (error) => {
        console.error('Error al obtener las imágenes', error);
      }
    )
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProductos();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.getProductos();
  }
  custompriedras:boolean=false;
  solocustom:boolean=false;
  solofabrica:boolean=false;
  soloproducto:boolean=false;
  tipocadena:boolean=false;
  configuracionproducto(idproducto:string){
    this.cargando = true;
    this.ProductosService.productoinfo(idproducto).subscribe(
      (data) => {
        this.producto = data;
        console.log(data);

        //SI EL PRODUCTO ES FABRICA SIGNIFICA QUE NO PUEDE SER CUSTOM NI TIPO PIEDRA
        //usara la tabla de img para guardar varias imagenes del producto
        if (data.productofabrica == 1) {
          this.solofabrica = true
          this.custompriedras=false
          this.solocustom=false
          this.soloproducto=false
          this.listaimgfabrica()
        }
        //SI EL PRODUCTO ES TIPO CUSTOM Y PIEDRAS
        //se hára uso de de los metales y de las piedras con la tabla de variante fabrica para los metales y variantes para guardar las imagenes.
        else if (data.productocustom == 1 && data.piedras==1) {
          this.solofabrica = false
          this.custompriedras=true
          this.solocustom=false
          this.soloproducto=false
          this.metalesproducto(idproducto);
        }
        //EL PRODUCTO ES TIPO CUSTOM PERO NO PIEDRAS
        //esto significa que se pueden elegir diferentes metales y la imagenes se guardaran en imgvariante las cuales
        //las imgvariante estan enlazadas con variantefabrica, esta es una tabla con los tipos de oro
        else if (data.productocustom == 1 && data.piedras==0) {
          this.solofabrica = false
          this.custompriedras=false
          this.solocustom=true
          this.soloproducto=false
          this.metalesproducto(idproducto);
        }else{
          this.solofabrica = false
          this.custompriedras=false
          this.solocustom=false
          this.soloproducto=true
        }
        if (data.tipoanillo == 1) {
          this.tipoanillo = true;
          this.ProductosService.numeroscustom(this.producto.id_productos).subscribe(
            (data) => {
              this.numeros = data;
            }
          )
        }else{
          this.tipoanillo = false;
        }
        if (data.productocadena == 1) {
          this.tipocadena = true;
          this.MedidaForm.patchValue({
            id_producto: data.id_productos
          });
          //CARGAR LA LISTA DE CADENAS
          this.listamedidas()

        }else{
          this.tipocadena = false;
        }
        this.cargando = false;
      },(error) => {
        this.cargando = false;
        console.error('Error al obtener las imágenes', error);
      }
    )
  }
  metalesproducto(idproducto:string){
    this.ProductosService.metalesproducto(idproducto).subscribe(
      (data) => {
        console.log(data);
        this.cargando = false;
        this.id_amarillo = data.id_amarillo;
        this.id_blanco = data.id_blanco;
        this.id_rosa = data.id_rosa;
        this.id_plata = data.id_plata;
        if (data.oroamarillo == 1) {
          this.amarillo = true;
        }else{
          this.amarillo = false;
        }
        if (data.ororosa == 1) {
          this.rosa = true;
        }else{
          this.rosa = false;
        }
        if (data.oroblanco == 1) {
          this.blanco = true;
        }else{
          this.blanco = false;
        }
        if (data.plata == 1) {
          this.plata = true;
        }else{
          this.plata = false;
        }this.nuevoproductoconsultado();
        this.variantesmetal = {};
        // si el producto consultado es tipo anillo consultamos los numeros creados
        if (this.tipoanillo) {
          this.numeroscustom();
        }
      },
      (error) => {
        console.error('Error al obtener las imágenes', error);
    })
  }
  metalvariantes(idvariante:number,index:number){
    this.metalelegido = true;
    this.plataBorde = false;
    this.amarilloBorde = false;
    this.rosaBorde = false;
    this.blancoBorde = false;
    switch (index) {
      case 1:
        this.plataBorde = true;
        this.clave_variante = this.id_plata;
      break;
      case 2:
        this.amarilloBorde = true;
        this.clave_variante = this.id_amarillo;
      break;
      case 3:
        this.rosaBorde = true;
        this.clave_variante = this.id_rosa;
      break;
      case 4:
        this.blancoBorde = true;
        this.clave_variante = this.id_blanco;
      break;
    }
    this.getvariantemetal();
    //aqui se consultara todas las variantes creadas
  }
  onSubmitNumero(){
    let numerop = this.NumerosForm.get('numero')?.value;
    let peso = this.NumerosForm.get('peso')?.value;
    this.ProductosService.registrarnumero(numerop,peso,this.producto.id_productos).subscribe(
      (response) => {
        this.NumeroModal.hide();
        this.toastr.success(response.mensaje, 'Exitoso!');
        this.numeroscustom();
      },
      (error) => {
        console.error('Error al registrar', error);
      }
    )
  }
  Unoimgvariante(event: any){
    this.FotoUnovariante = event.target.files[0];
  }
  Dosimgvariante(event: any){
    this.FotoDosvariante = event.target.files[0];
  }
  Tresimgvariante(event: any){
    this.FotoTresvariante = event.target.files[0];
  }
  imgvariantefile(event: any){
    this.Fileimgvariante = event.target.files[0];
  }
  onSubmitvariante(){
    let piedraunop = this.VariantesForm.get('piedrauno')?.value;
    let piedradosp = this.VariantesForm.get('piedrados')?.value;
    if (!this.FotoUnovariante) {
      this.toastr.error('No se ha seleccionado la imagen 1.', 'info!');
      return;
    }
    if (!this.FotoDosvariante) {
      this.toastr.error('No se ha seleccionado la imagen 2.', 'info!');
      return;
    }
    if (!this.FotoTresvariante) {
      this.toastr.error('No se ha seleccionado la imagen 3.', 'info!');
      return;
    }
    this.cargando = true;
    this.ProductosService.registrarVariante(this.FotoUnovariante,this.FotoDosvariante,this.FotoTresvariante,piedraunop,piedradosp,this.clave_variante).subscribe(
      (response) => {
        this.cargando = false;
        this.toastr.success(response.mensaje, 'Guardada!');
        this.rvariantemodal.hide();
        this.getvariantemetal();
      },
      (error) => {
        this.cargando = false;
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  getvariantemetal(){
    this.cargando = true;
    this.ProductosService.listarvariantes(this.clave_variante,this.producto.id_productos).subscribe(
      (response) => {
        this.cargando = false;
        this.variantesmetal = response;
      }
    )
  }
  SaveImgVariante(){

    if (!this.Fileimgvariante) {
      this.toastr.error('No se ha seleccionado la imagen 1.', 'info!');
      return;
    }
    this.cargando = true;
    this.ProductosService.registrarimgVariante(this.Fileimgvariante,this.clave_variante).subscribe(
      (response) => {
        this.cargando = false;
        this.toastr.success(response.mensaje, 'Guardada!');
        this.imgvariantemodal.hide();
        this.getvariantemetal();
      },
      (error) => {
        this.cargando = false;
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  nuevoproductoconsultado(){
    this.metalelegido = false;
    this.plataBorde = false;
    this.amarilloBorde = false;
    this.rosaBorde = false;
    this.blancoBorde = false;
  }
  numeroscustom(){
    this.ProductosService.numeroscustom(this.producto.id_productos).subscribe(
      (data) => {
        this.numeros = data;
      }
    )
  }
  opencadenamodal(){
    this.cadenamodal.show()
  }
  cadenacustom(){

  }
  destroyvariante(id_variante:any){
    if (window.confirm('¿Estás seguro de que deseas eliminar esta variante?')) {
      // La acción se ejecuta si el usuario hace clic en "Aceptar"
      this.cargando = true;
      this.ProductosService.destroyvariante(id_variante).subscribe(
        (response) => {
          this.cargando = false;
          this.toastr.success(response.mensaje, 'Eliminada!');
          this.getvariantemetal()
        },
        (error) => {
          this.toastr.error('Ocurrio un error al registrar', 'info!');
        }
      )
      console.log('Acción confirmada');
    } else {
      // La acción se cancela si el usuario hace clic en "Cancelar" o cierra el diálogo
      console.log('Acción cancelada');
    }
  }
  onSwitchChange(producto: any) {
    console.log('Producto:', producto);
    // Aquí puedes realizar una llamada HTTP al backend para enviar el id_producto y el estado actualizado
    // utilizando un servicio o HttpClient de Angular
    // Ejemplo:
    // this.tuServicio.actualizarProducto(producto.id_producto, producto.activo).subscribe(
    //   response => {
    //     // Lógica después de la actualización exitosa
    //   },
    //   error => {
    //     // Lógica en caso de error
    //   }
    // );
  }
  formproductoimg:boolean=false;
  openimgfabrica(){
    this.formproductoimg = true;
  }
  closeimgfabrica(){
    this.formproductoimg = false;
  }
  imgproductofile(event: any){
    this.ProductoIMG = event.target.files[0];
  }
  SaveimgProducto(){
    if (!this.ProductoIMG) {
      this.toastr.error('No se ha seleccionado la imagen.', 'info!');
      return;
    }
    this.cargando = true;
    this.ProductosService.registrarimgProducto(this.ProductoIMG,this.producto.id_productos).subscribe(
      (response) => {
        this.cargando = false;
        this.toastr.success(response.mensaje, 'Guardada!');
        this.listaimgfabrica();
      },
      (error) => {
        this.cargando = false;
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  listimgfabrica:any;
  listaimgfabrica(){
    this.cargando = true;
    this.ProductosService.listaimgfabrica(this.producto.id_productos).subscribe(
      (response) => {
        this.cargando = false;
        this.listimgfabrica = response;
      }
    )
  }
  listamedidas(){
    this.ProductosService.lmedidasproducto(this.producto.id_productos).subscribe(
      (response) => {

        this.medidasproducto = response
        console.log(this.medidasproducto);

      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  onSubmitMedida(){
    this.ProductosService.registrarmedida(this.MedidaForm.value).subscribe(
      (response) => {
        this.toastr.success(response.mensaje, 'Guardada!');
        this.listamedidas()
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  openeditamedida(id_medida:any){
    this.ProductosService.stockmedida(id_medida).subscribe(
      (response) => {
        console.log(response);
        this.editarMedidaForm.patchValue({
          id_producto: response.id_producto,
          peso:response.peso,
          medida:response.medida,
          stock:response.stock,
          id_medida: response.id_productocadena
        });
        this.editmedidamodal.show()
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  onSubmitEditMedida(){
    this.ProductosService.updatemedida(this.editarMedidaForm.value).subscribe(
      (response) => {
        this.listamedidas()
        this.toastr.success(response.mensaje, 'Guardada!');
        this.editmedidamodal.hide()
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
  eliminarmedida(id_medida:any){
    this.ProductosService.eliminarmedida(id_medida).subscribe(
      (response) => {
        this.listamedidas()
        this.toastr.info(response.mensaje,  'info!');
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    )
  }
}
