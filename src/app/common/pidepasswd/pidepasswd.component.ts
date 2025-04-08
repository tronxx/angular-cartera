import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { Md5 } from 'ts-md5';
import { DatePipe } from '@angular/common';
import { PolizasService } from '../../services/polizas.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-pidepasswd',
  templateUrl: './pidepasswd.component.html',
  styleUrls: ['./pidepasswd.component.css']
})
export class PidepasswdComponent implements OnInit {

  password_z = "";
  miubi_z = "";
  pwdcorrecto_z = false;
  nvopwd_z = "";
  cadena_z ="";
  cadpas_z = "";
  fechasrv_z = "";
  debug = false;
  
  constructor(
    public dialogRef: MatDialogRef<PidepasswdComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    private serviciosPolizas: PolizasService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public message : string    

  ) { }

  ngOnInit(): void {
    let misdatos = JSON.parse(this.message);
    this.busca_fecha();
    this.miubi_z = misdatos.ubicacion;
  }

  async busca_fecha() {
    this.obten_fecha_servidor();
  }

  async obten_fecha_servidor() {
    const misdatos = await lastValueFrom (this.serviciosPolizas.obten_fecha_servidor ());
    this.fechasrv_z = misdatos.fechayhora.substring(0,4);
    this.fechasrv_z += misdatos.fechayhora.substring(5,7);
    this.fechasrv_z += misdatos.fechayhora.substring(8,13);
  
  }

  
  verfica_password() {
    let strfecha =  this.fechasrv_z;
    let mipass_z = this.miubi_z + strfecha;
    this.cadena_z = mipass_z;
    let pwd_z = Md5.hashStr(mipass_z).toString().toUpperCase();
    this.nvopwd_z = pwd_z;
    this.pwdcorrecto_z = (this.password_z == pwd_z);
  }

  closeyes () {
    let resultado = {
      "proferta": "OK"
    }
    this.dialogRef.close(resultado);
  }

  closeno() {
    this.dialogRef.close(false);
  }



}
