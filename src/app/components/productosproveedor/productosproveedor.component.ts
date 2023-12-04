import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { ProductosService } from 'src/app/shared/productos.service';
import { CatalogosService } from 'src/app/shared/catalogos.service';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
  selector: 'app-productosproveedor',
  templateUrl: './productosproveedor.component.html',
  styleUrls: ['./productosproveedor.component.css']
})
export class ProductosproveedorComponent {
  rProveedorModal:Boolean=false
  proveedores:any;
  editModal: any;
  formProveedor = new FormGroup({
    nombre_proveedor: new FormControl(),
    email_proveedor: new FormControl('generalproveedor@gmail.com'),
    telefono: new FormControl(123),
    diez: new FormControl(0),
    catorce: new FormControl(0),
    dieciocho: new FormControl(0),
    ganancia: new FormControl(30),
  });
  EditarProveedor = new FormGroup({
    id_proveedor: new FormControl(),
    nombre_proveedor: new FormControl(),
    diez: new FormControl(0),
    catorce: new FormControl(0),
    dieciocho: new FormControl(0),
    ganancia: new FormControl(30),
  });
  constructor(
    private ProductosService: ProductosService,
    private toastr:ToastrService,
    private CatalogosService: CatalogosService,
    private formb: FormBuilder
  ){

  }
  ngOnInit() {
    this.lproveedores();
    this.editModal = new window.bootstrap.Modal(
      document.getElementById('editarproveedormodal')
    );
  }
  openproveedor(){
    this.rProveedorModal = true;
  }
  closeproveedor(){
    this.rProveedorModal = false;
  }
  submitProveedor(){
    this.CatalogosService.rproveedor(this.formProveedor.value).subscribe(
      data => {
        this.toastr.success(data.mensaje);
        this.lproveedores()

      },
      error => {
        console.log(error);
      }
    )
  }
  lproveedores(){
    this.CatalogosService.lproveedor().subscribe(
      data => {
        this.proveedores = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  openedit(id_proveedor:any){
    this.CatalogosService.infoproveedor(id_proveedor).subscribe(
      data => {
        console.log(data);

        this.EditarProveedor.patchValue({
          id_proveedor: data.id_proveedor,
          nombre_proveedor: data.nombre_proveedor,
          diez: data.diez,
          catorce: data.catorce,
          dieciocho: data.dieciocho,
          ganancia: data.ganancia,
        });
        this.editModal.show()
      },
      error => {
        console.log(error);
      }
    )
  }
  GuardarProveedorEdit(){
    this.CatalogosService.guardaproveedoredit(this.EditarProveedor.value).subscribe(
      data => {
       this.lproveedores()
        this.editModal.hide();
        this.toastr.success(data.mensaje, 'Editado!');

      },
      error => {
        console.log(error);
      }
    )
  }
}
