import { Component } from '@angular/core';
import { ProductosService } from '../../../shared/productos.service';
import { environment } from 'src/environment.local';

@Component({
  selector: 'app-listarproductos',
  templateUrl: './listarproductos.component.html',
  styleUrls: ['./listarproductos.component.css']
})
export class ListarproductosComponent {
  productos:any;
  constructor(
    private ProductosService: ProductosService
  ){

  }
  apiUrl: string = environment.apiUrl;

  ngOnInit(): void {
    // this.getProductos();
  }
  // getProductos(){
  //   this.ProductosService.listarproductos().subscribe(
  //     (response) => {
  //       this.productos = response;
  //     },
  //     (error) => {
  //       console.error('Error al obtener las imágenes', error);
  //     }
  //   )
  // }
  configuracionproducto(idproducto:number){
    console.log(idproducto);
    this.ProductosService.configuracionproducto(idproducto).subscribe(
      (response) => {
        console.log(response);

      },
      (error) => {
        console.error('Error al obtener las imágenes', error);
      }
    )
  }

}
