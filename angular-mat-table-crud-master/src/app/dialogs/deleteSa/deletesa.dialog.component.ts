import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {SubscriberService} from '../../services/subscription.service';


@Component({
  selector: 'apprg-delete.dialog',
  templateUrl: '../../dialogs/deleteSa/deletesa.dialog.html',
  styleUrls: ['../../dialogs/deleteSa/deletesa.dialog.css']
})
export class DeleteSaDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteSaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: SubscriberService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deletesa(this.data);
  }
}
