import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {SubscriberService} from '../../services/subscription.service';
import {Subscribers} from '../../models/subscription';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/stop/stop.dialog.html',
  styleUrls: ['../../dialogs/stop/stop.dialog.css']
})
export class StopDialogComponent {

  constructor(public dialogRef: MatDialogRef<StopDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: SubscriberService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }
  stopserver():void{
    this.dataService.stopserver(this.data);
  }
}
