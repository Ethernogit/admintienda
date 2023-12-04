import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/shared/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  isLoading$= this.spinnerSvc.idLoading$;
  constructor(public spinnerSvc: SpinnerService){

  }
}
