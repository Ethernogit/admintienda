import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MetodospagoService } from '../../shared/metodospago.service';
declare var window: any;

@Component({
  selector: 'app-metodospago',
  templateUrl: './metodospago.component.html',
  styleUrls: ['./metodospago.component.css']
})
export class MetodospagoComponent {
  MetodosForm: any;
  metodos:any;
  EditarMetodo:any;
  editarModal: any;

  constructor(
    private toastr:ToastrService,
    private MetodosService: MetodospagoService
  ){
    this.MetodosForm = new FormGroup({
      metodo: new FormControl(),
      activo: new FormControl()
    });
    this.EditarMetodo = new FormGroup({
      metodo: new FormControl(),
      activo: new FormControl(),
      id_metodo:new FormControl()
    })
  }
  ngOnInit() {
    this.listarmetodos();
    this.editarModal = new window.bootstrap.Modal(
      document.getElementById('editarmetodo')
    );
  }
  onSubmit(){
    this.MetodosService.RegistraMetodo(this.MetodosForm).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Guardada!');
        this.listarmetodos();
      },
      (error) => {
        console.log(error);
      }
    )
  }
  listarmetodos(){
    this.MetodosService.listarMetodos().subscribe(
      (result) => {
        this.metodos=result;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  openEditModal(activo:any,metodo:any,clave:any){
    const active = this.EditarMetodo.get('activo');
    if (active) {
      if (activo == 1) {
        active.setValue(true);
      }else{
        active.setValue(false);
      }
    }
    const metodon = this.EditarMetodo.get('metodo');
    if (metodon) {
      metodon.setValue(metodo);
    }
    const id_metodo = this.EditarMetodo.get('id_metodo');
    if (id_metodo) {
      id_metodo.setValue(clave);
    }
    this.editarModal.show();
  }
  EditarMetodoPago(){
    this.MetodosService.EditarMetodo(this.EditarMetodo).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Editado!');
        this.listarmetodos();
        this.editarModal.hide();
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
