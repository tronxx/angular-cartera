import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { Cliente } from '../../models/clientes';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-dlgimpriletras',
  templateUrl: './dlgimpriletras.component.html',
  styleUrls: ['./dlgimpriletras.component.css']
})

export class DlgimpriletrasComponent implements OnInit {

  ltaini = 0;
  ltafin = 0;
  ltamin = 0;
  ltamax = 0;
  letrasimpresas = [];
  title ="";
  enpdf = true;
  constructor(
    public dialogRef: MatDialogRef<DlgimpriletrasComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    public dialog: MatDialog, 

  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.ltaini = params_z.ltaini;
    this.ltafin = params_z.ltafin;
    this.ltamin = this.ltaini;
    this.ltamax = this.ltafin;
    this.title = params_z.title;
    this.letrasimpresas = params_z.letrasimpresas
  }

  closeyes () {
    if(this.checar_rango_letras()) {
      let resultado = {
        ltaini: this.ltaini,
        ltafin: this.ltafin,
        formapdf: this.enpdf
      }
      this.dialogRef.close(resultado);
    }
  }

  checar_rango_letras() {
    let result = true;
    if(this.ltaini < this.ltamin )  {
        this.alerta("Le letra Inicial es muy baja");
        result = false;
        return (result)

    }
    if(this.ltaini > this.ltamax )  {
      this.alerta("Le letra Inicial es muy alta");
      result = false;
      return (result)
    }
  if(this.ltafin < this.ltamin )  {
    this.alerta("Le letra Final es muy baja");
    result = false;
    return (result)
  }
  if(this.ltafin > this.ltamax )  {
    this.alerta("Le letra Final es muy alta");
    result = false;
    return (result)
  }
  if(this.ltaini > this.ltafin )  {
    this.alerta("Le letra Inicial es mas grande que la final");
    result = false;
  }
  
  return (result)

  }

  closeno() {
    this.dialogRef.close(false);
  }

  alerta(mensaje: string) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
    });
  
  }


}
