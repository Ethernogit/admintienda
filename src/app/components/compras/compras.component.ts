import { Component } from '@angular/core';
import { ComprasService } from '../../shared/compras.service';
import { Form, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var window: any;

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  comprasitems:any;
  guiaModal: any;
  statuscompra: any;

  NuevaGuia: FormGroup;
  StatusCompra: FormGroup;

  constructor(
    private ComprasService: ComprasService,
    private toastr:ToastrService,

  ){
    this.NuevaGuia = new FormGroup({
      guia: new FormControl(),
      id_compra: new FormControl()
    });
    this.StatusCompra = new FormGroup({
      status: new FormControl(),
      id_compra: new FormControl()
    });
  }
  ngOnInit(): void {
    this.CargaCompras();
    this.guiaModal = new window.bootstrap.Modal(
      document.getElementById('guiamodal')
    );
    this.statuscompra = new window.bootstrap.Modal(
      document.getElementById('statuscompra')
    );
  }
  CargaCompras(){
    this.ComprasService.consultarcompras().subscribe(
      (result) => {
        // this.toastr.success(result.mensaje, 'Guardada!');
        console.log(result);
        this.comprasitems = result;
        this.comprasitems.forEach((compra: { enviado: number | boolean; entregado: number | boolean; }) => {
          compra.enviado = compra.enviado === 1; // Si enviado es 1, se convertirá a true, de lo contrario, a false
          compra.entregado = compra.entregado === 1; // Lo mismo aquí
        });
      },
      (error) => {
        // this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
  }
  OpenModalGuia(guia:any,id_compra:any){
    const guian = this.NuevaGuia.get('guia');
    if (guian) {
      guian.setValue(guia);
    }
    const id_com = this.NuevaGuia.get('id_compra');
    if (id_com) {
      id_com.setValue(id_compra);
    }
    this.guiaModal.show();
  }
  GuardarGuia(){
    this.ComprasService.guardarguia(this.NuevaGuia).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Guardada!');
        this.guiaModal.hide();
      },
      (error) => {
        console.log(error);
      },
    )
  }
  OpenModalStatus(id_compra:any,enviado:any,entregado:any){
    const estado = this.StatusCompra.get('status');
    let value:any;
    if (estado) {
      if(!enviado && !entregado){
        value=1
      }
      if(enviado && !entregado){
        value=2
      }
      if (enviado && entregado) {
        value=3
      }
      estado.setValue(value);
    }
    const id_com = this.StatusCompra.get('id_compra');
    if (id_com) {
      id_com.setValue(id_compra);
    }
    this.statuscompra.show();
  }
  GuardarStatus(){
    this.ComprasService.GuardarStatus(this.StatusCompra).subscribe(
      (result) => {
        this.CargaCompras();
        this.toastr.success(result.mensaje, 'Guardada!');
        this.statuscompra.hide();
      },
      (error) => {
        console.log(error);
      },
    )
  }
}
