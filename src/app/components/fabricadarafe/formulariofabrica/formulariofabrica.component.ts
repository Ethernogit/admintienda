import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalmetalesComponent } from '../modalmetales/modalmetales.component';
import { CatalogosService } from '../../../shared/catalogos.service';
import { Form, FormBuilder, FormGroup , FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../shared/productos.service';

declare var tinymce: any;

declare var window: any;

@Component({
  selector: 'app-formulariofabrica',
  templateUrl: './formulariofabrica.component.html',
  styleUrls: ['./formulariofabrica.component.css']
})
export class FormulariofabricaComponent {
  public producto: any = {};
  public config:any={};
  formModal: any;
  enviosModal: any;
  kilatesModal: any;
  tipografiasModal: any;
  metales:any;
  kilates:any;
  enviosdata:any;
  categorias:any;
  EnviosForm: FormGroup;

  MinimoEnviosForm = new FormGroup({
    minimocantidad: new FormControl(),
  });

  Amarrillogramo: FormGroup;
  Rosagramo: FormGroup;
  Blancogramo: FormGroup;
  Platagramo: FormGroup;
  selectedOption: string | undefined;
  cantidad:any;

  amarillos:any;
  a18:any;a10:any;a14:any;
  r18:any;r10:any;r14:any;
  b18:any;b10:any;b14:any;
  p18:any;p10:any;p14:any;
  plata:any;
  public bsModalRef!: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private CatalogosService: CatalogosService,
    public fbenvio: FormBuilder,
    public fbamarillo : FormBuilder,
    public fbrosa:FormBuilder,
    public fbblanco:FormBuilder,
    public fbplata:FormBuilder,
    private toastr:ToastrService,
    private ProductosService: ProductosService
    ) {
      this.config ={
        height:300
      }
      this.EnviosForm = this.fbenvio.group({
        cantidad: [],
      });
      this.Amarrillogramo = this.fbamarillo.group({
        a10:'',
        a14:'',
        a18:'',
        tipo:1
      });
      this.Rosagramo = this.fbrosa.group({
        r10:'',
        r14:'',
        r18:'',
        tipo:2
      });
      this.Blancogramo = this.fbblanco.group({
        b10:'',
        b14:'',
        b18:'',
        tipo:3
      });
      this.Platagramo = this.fbplata.group({
        plata:'',
        tipo:4
      });
    }
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalmetalgramos')
    );
    this.enviosModal = new window.bootstrap.Modal(
      document.getElementById('enviosmodal')
    );
    this.kilatesModal = new window.bootstrap.Modal(
      document.getElementById('kilatesmodal')
    );
    this.tipografiasModal = new window.bootstrap.Modal(
      document.getElementById('tipografiasModal')
    );
    this.CatalogosService.lmetales().subscribe(
      data => {
        this.metales = data;
      },
      error => {
        console.log(error);
    });
    this.CatalogosService.lkilates().subscribe(
      data => {
        this.kilates = data;
      },
      error => {
        console.log(error);
    });
    tinymce.init({
      selector: '#descripcionproducto'
      // Aquí puedes agregar más opciones de configuración según tus necesidades
    });
    this.lenvio();
    this.menvio();
    this.getAmarilloGramos();
    this.getRosaGramos();
    this.getBlancoGramos();
    this.getPlataGramos();
    this.getCategorias();
  }
  openFormModal() {
    this.formModal.show();
  }
  openenviosModal() {
    this.enviosModal.show();
  }
  openkilatesModal() {
    this.kilatesModal.show();
  }
  openTipografias() {
    this.tipografiasModal.show();
  }
  //trae los costos del envio
  lenvio(){
    this.CatalogosService.lenvios().subscribe(
      data => {
        this.EnviosForm.patchValue({
          cantidad: data.cantidad
        });
      },
      error => {
        console.log(error);
    });
  }
  //trae los datos para cantidad minima y que aplique el envio gratis
  menvio(){
    this.CatalogosService.menvios().subscribe(
      data => {
        console.log(data);

        const cantidad = this.MinimoEnviosForm.get('minimocantidad');
        if (cantidad) {
          cantidad.setValue(data.cantidad);
        }
      },
      error => {
        console.log(error);
    });
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
  onSubmitEnvios(){
    this.CatalogosService.genvio(this.EnviosForm.value).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Guardada!');
        this.lenvio();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
  }
  getAmarilloGramos(){
    this.CatalogosService.lorogramo(1).subscribe(
      data => {
        for (let index in data) {
          if (data[index].id_kilate == 1) {
            this.a10 = data[index].preciogramo;
          }
          if (data[index].id_kilate == 2) {
            this.a14 = data[index].preciogramo;
          }
          if (data[index].id_kilate == 3) {
            this.a18 = data[index].preciogramo;
          }
        }
      },
      error => {
        console.log(error);
      })
  }
  getRosaGramos(){
    this.CatalogosService.lorogramo(2).subscribe(
      data => {
        for (let index in data) {
          if (data[index].id_kilate == 1) {
            this.r10 = data[index].preciogramo;
          }
          if (data[index].id_kilate == 2) {
            this.r14 = data[index].preciogramo;
          }
          if (data[index].id_kilate == 3) {
            this.r18 = data[index].preciogramo;
          }
        }
      },
      error => {
        console.log(error);
      })
  }
  getBlancoGramos(){
    this.CatalogosService.lorogramo(3).subscribe(
      data => {
        for (let index in data) {
          if (data[index].id_kilate == 1) {
            this.b10 = data[index].preciogramo;
          }
          if (data[index].id_kilate == 2) {
            this.b14 = data[index].preciogramo;
          }
          if (data[index].id_kilate == 3) {
            this.b18 = data[index].preciogramo;
          }
        }
      },
      error => {
        console.log(error);
      })
  }
  getPlataGramos(){
    this.CatalogosService.lorogramo(4).subscribe(
      data => {
        for (let index in data) {
          if (data[index].id_kilate == 4) {
            this.plata = data[index].preciogramo;
          }
        }
      },
      error => {
        console.log(error);
      })
  }
  onSubmitamarillog(){
    this.CatalogosService.lorosave(this.Amarrillogramo.value).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Exitoso!');
        this.getAmarilloGramos();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
  }
  onSubmitrosag(){
    this.CatalogosService.lorosave(this.Rosagramo.value).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Exitoso!');
        this.getRosaGramos();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
  }
  onSubmitblancog(){
    this.CatalogosService.lorosave(this.Blancogramo.value).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Exitoso!');
        this.getRosaGramos();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
  }
  onSubmitplatag(){
    this.CatalogosService.lorosave(this.Platagramo.value).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Exitoso!');
        this.getPlataGramos();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
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
  onSubmitMinimoEnvios(){
    this.CatalogosService.minimoenvio(this.MinimoEnviosForm).subscribe(
      (result) => {
        this.toastr.success(result.mensaje, 'Guardada!');
        this.menvio();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al registrar', 'info!');
      },
    )
  }
}
