import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {SubscriberService} from '../../services/subscription.service';
import {FormControl, Validators} from '@angular/forms';
import {Subscribers} from '../../models/subscription';

@Component({
  selector: 'app-subscription.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddSubscriptionDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddSubscriptionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Subscribers,
              public dataService: SubscriberService) { }

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

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }
}
