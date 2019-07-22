import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Separador } from '../../interfaces/equipos';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { actionDialog } from 'src/app/types/types-dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  public action: actionDialog;
  public localData: Separador;

  public form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Separador) {
    this.action = data.action;
    this.localData = {...data};
  }

  ngOnInit(): void {
    this.fromInit();
    if (this.action === 'Editar') {
      this.setValuesFrom();
    }
  }

  private fromInit(): void {
    this.form = this.fb.group({
      nombre: new FormControl({
        value: '',
        disabled: false
      }, { validators: Validators.required, updateOn: 'blur' }),
      lat: new FormControl({
        value: '',
        disabled: false
      }, { validators: Validators.required, updateOn: 'blur' }),
      lng: new FormControl({
        value: '',
        disabled: false
      }, { validators: Validators.required, updateOn: 'blur' }),
      zoom: new FormControl({
        value: '',
        disabled: false
      }, { validators: Validators.required, updateOn: 'change' })
    });
  }

  private setValuesFrom(): void {
    this.form.setValue({
                         nombre:  this.data.nombre,
                         lat: this.data.mapData.center.lat,
                         lng: this.data.mapData.center.lng,
                         zoom: this.data.mapData.zoom
                       });
  }

  get formCtrl() { return this.form.controls; }

  private formCtrlVal = (path: string): any => this.formCtrl[path].value;

  doAction(): void {

    if (this.action !== 'Eliminar') {
      const data: Separador = {
                                _id: this.data._id,
                                nombre: this.formCtrlVal('nombre'),
                                mapData: {
                                    center: {
                                      lat: this.formCtrlVal('lat'),
                                      lng: this.formCtrlVal('lng')
                                    },
                                    zoom: this.formCtrlVal('zoom')
                                },
                              };
      this.localData = {...data};
    }
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
