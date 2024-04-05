import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dlgcartas',
  templateUrl: './dlgcartas.component.html',
  styleUrls: ['./dlgcartas.component.css']
})

export class DlgcartasComponent {

  carta = {
    codigo:"",
    archivo:"",
    descripcion:""
  };

  codigo = "";
  codcarta = "";

  cartas = [
    {
      codigo:"",
      archivo:"",
      descripcion:""
    } 
  ];

  
  constructor(
    public dialogRef: MatDialogRef<DlgcartasComponent>,
    private servicioclientes: ClientesService,
    @Inject(MAT_DIALOG_DATA) public message : string    

  ) { }

  ngOnInit(): void {
    this.cartas = JSON.parse(this.message);
    if(this.cartas) {
      this.codcarta = this.cartas[0].archivo;
    }

  }


  closeyes() {
    let result = {
      carta: this.codcarta,
      codigo: this.codigo
    }
    this.servicioclientes.genera_carta_morosos(JSON.stringify(result));
    this.dialogRef.close(JSON.stringify(result));
  }

  closeno() {
    this.dialogRef.close(false);
  }


}
