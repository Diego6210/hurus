import { Component, OnInit, Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-account',
  templateUrl: './dialog-account.component.html',
  styleUrls: ['./dialog-account.component.scss']
})
export class DialogAccountComponent implements OnInit {

  url:string = '';
  correo:string = '';
  password:string = '';

  constructor(  
    private dialogRef: MatDialogRef<DialogAccountComponent>,
    @Inject(MAT_DIALOG_DATA) data) {  
  }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }

  crear(){

    let data = [{
      Url: this.url,
      Correo: this.correo,
      Password: this.password
    }]

    this.dialogRef.close(data);
  }

}
