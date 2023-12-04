import { Component } from '@angular/core';
import { CatalogosService } from 'src/app/shared/catalogos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  CategoriaForm: FormGroup;
  categorias: any;
  currentPage: number = 1;
  totalPages: number = 10 ;
  constructor(
    private CatService: CatalogosService,
    public fb: FormBuilder,
    private toastr:ToastrService
  ){
    this.CategoriaForm = this.fb.group({
      categoria: [],
    });
  }

  ngOnInit() {
    this.getCategorias();
  }
  getCategorias(): void {
    this.CatService.lcategoria()
      .subscribe(
        data => {
          this.categorias = data.data;
        },
        error => {
          console.log(error);
        });
  }
  setPage(page: number): void {
    this.getCategorias();
  }
  onSubmit(){
    this.CatService.rcategoria(this.CategoriaForm.value).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Guardada!');
        this.getCategorias();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
  }
}
