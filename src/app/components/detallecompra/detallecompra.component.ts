import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment.local';
import { ComprasService } from '../../shared/compras.service';

@Component({
  selector: 'app-detallecompra',
  templateUrl: './detallecompra.component.html',
  styleUrls: ['./detallecompra.component.css']
})
export class DetallecompraComponent {
  id_compra:any;
  itemscar:any;
  usuario:any;
  datosenvio:any;
  cesta:any;
  compra:any;
  constructor(
    private route: ActivatedRoute,
    private ComprasServicem: ComprasService
  ){

  }
  apiUrl: string = environment.apiUrl;

  ngOnInit() {
    this.detallescompra();
  }
  detallescompra(){
    const compra = this.route.snapshot.paramMap.get('idcompra');
    if (compra !== null) {
      this.id_compra = compra;
      this.ComprasServicem.detallecompra(this.id_compra).subscribe(
        (data) => {
          this.itemscar = data.itemscar;
          console.log(this.itemscar);

          this.compra = data.compra;
          this.cesta = data.cesta;
          this.datosenvio = data.datosenvio;
          this.usuario = data.usuario;
        },
        (error) => {
          console.error('Error al obtener los metales', error);
        }
      )
    }
  }

}
