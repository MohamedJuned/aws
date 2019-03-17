import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {SubscriberService} from '../../services/subscription.service';
import {FormControl, Validators} from '@angular/forms';
import {Subscribers} from '../../models/subscription';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/addpop/add.dialog.html',
  styleUrls: ['../../dialogs/addpop/add.dialog.css']
})

export class AddPopDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddPopDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Subscribers,
              public dataService: SubscriberService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  // locations = [
  //   {
  //   id : 'USA',
  //   value : 'united states'
  //   },
  //   {
  //   id : 'IND',
  //   value : 'india'
  //   },
  //   {
  //   id : 'INS',
  //   value : 'indonesia'
  //   }
  //   ]
  //   resultLocation = [this.locations[1], this.locations[2]]
  subscriptions=this.data;

    locations = [
      {value: 'East-US', viewValue: 'East-US'},
      {value: 'Asia-pacific', viewValue: 'Asia-pacific'},
      {value: 'West-US', viewValue: 'West-US'}
    ];
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

  public confirmAdd(subscriptionid:string,location:string): void {
    this.dataService.runCommand(subscriptionid,location).subscribe(
      data => { 
      ;
      }
  );;
  }
}
