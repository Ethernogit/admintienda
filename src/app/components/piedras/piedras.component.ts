import { Component, OnInit } from '@angular/core';
import { CatalogosService } from 'src/app/shared/catalogos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment.local';

@Component({
  selector: 'app-piedras',
  templateUrl: './piedras.component.html',
  styleUrls: ['./piedras.component.css']
})
export class PiedrasComponent {
  piedra: string = '';
  selectedFile: File | null = null;
  piedras:any;
  constructor(
    private CatService: CatalogosService,
    public fb: FormBuilder,
    private toastr:ToastrService
  ){

  }
  apiUrl: string = environment.apiUrl;

  ngOnInit() {
    this.getPiedras();
  }
  getPiedras(){
    this.CatService.limgpiedras().subscribe(
      (response) => {
        this.piedras = response;
      },
      (error) => {
        console.error('Error al obtener las imágenes', error);
      }
    )
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(){
    if (!this.selectedFile) {
      this.toastr.error('No se ha seleccionado ninguna imagen.', 'info!');
      return;
    }

    this.CatService.rpiedras(this.selectedFile, this.piedra).subscribe(
      (response) => {
        this.toastr.success(response.mensaje, 'Guardada!');
        this.getPiedras();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      }
    );
  }
}
