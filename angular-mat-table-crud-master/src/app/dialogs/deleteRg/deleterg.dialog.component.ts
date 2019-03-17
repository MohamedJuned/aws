import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {SubscriberService} from '../../services/subscription.service';


@Component({
  selector: 'apprg-delete.dialog',
  templateUrl: '../../dialogs/deleteRg/deleterg.dialog.html',
  styleUrls: ['../../dialogs/deleteRg/deleterg.dialog.css']
})
export class DeleteRgDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteRgDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: SubscriberService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleterg(this.data);
  }
}
