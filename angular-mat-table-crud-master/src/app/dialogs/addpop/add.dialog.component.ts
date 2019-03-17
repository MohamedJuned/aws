import { Component, ViewChild, AfterViewInit, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Subscribers} from '../../models/subscription';
import {SubscriberService} from '../../services/subscription.service';
import {HttpClient, HttpErrorResponse,HttpHeaders, HttpParams} from '@angular/common/http';
import { FieldConfig } from '../../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { tap, retry } from 'rxjs/operators';


@Component({
  selector: 'app-add.dialog',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app" >
      <dynamic-form
        [config]="config "
        #form="dynamicForm"
        (submit)="submit($event)">
      </dynamic-form>
      <div class="no-results" *ngIf="showdyn">
      please contact admin.File Missing
      </div>
    </div>
   
  `
})
export class AddPopDialogComponent implements AfterViewInit,OnInit {
  constructor(public dialogRef: MatDialogRef<AddPopDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: SubscriberService,public httpClient: HttpClient,private fb: FormBuilder) { }
    @ViewChild(DynamicFormComponent) form:DynamicFormComponent
    private isLoaded: any;
   // df:DynamicFormComponent=new DynamicFormComponent(this.fb);
   subscriptions:[any]=this.data.x
   locations = ['East-US','Asia-pacific','West-US'];
   fileName:[any]=[this.data.y];
   private showdyn= false;
   

    ngOnInit() {
      //this.dataService = new SubscriberService(this.httpClient);
      console.log("filename-----"+this.fileName);
      this.dataService.getJsonData(this.fileName).subscribe(
        datas => { 
         if(datas!=null && datas!="nofile"){
          this.config=[];
         for (var i = 0; i < datas.length; i++) {
          if (datas[i].type === "select") {
            if (datas[i].name === "Subscription_ID") {
              datas[i].options=this.subscriptions;
             // this.config.push(data);
            }
          //  else if (datas[i].name === "location") {
          //   datas[i].options=this.locations;
              
          //   }
           
          }
          this.config.push(datas[i]);
        }
      }
      else{
        
        this.showdyn=true;
        this.isLoaded=true;
        this.form.setDisabled('submit', true);
       
      }
      
     
      //this.form.ngOnInit();
     // this.config=data
     
         // this.fileNames=data;
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
          if(document.getElementsByClassName('loading').item(0)!=null) {
            let loadingContainer: HTMLElement = document.getElementsByClassName('loading').item(0) as HTMLElement;
            loadingContainer.style.display = 'none';
          }
          this.dialogRef.close();
      }
    );
    //this.form.setDisabled('submit', true);
     //this. getJson();
    }
  
 
  config: FieldConfig[] =[];
  // config: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: 'Full name',
  //     name: 'name',
  //     placeholder: 'Enter your name',
  //     validation: [Validators.required, Validators.minLength(4)]
  //   },
  //   // {
  //   //   type: 'select',
  //   //   label: 'Subscription_ID',
  //   //   name: 'Subscription_ID',
  //   //   options: ["abc"],
  //   //   placeholder: 'Select an option',
  //   //   validation: [Validators.required]
  //   // }
  //   ,
  //   {
  //     type: 'select',
  //     label: 'Location',
  //     name: 'location',
  //     options: this.locations,
  //     placeholder: 'Select an option',
  //     validation: [Validators.required]
  //     },
  //   // },
  //   // {
  //   //   label: 'Submit',
  //   //   name: 'submit',
  //   //   type: 'button'
  //   // }
  // ];
  

  ngAfterViewInit() {
    // this.getJson();
    console.log('Values on ngAfterViewInit():');

    console.log("form:", this.form);
    this.isLoaded=false;
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
   // this.form.setValue('name', 'Todd Motto');
    
    // this.dialogRef.close();
  }
  // ngAfterViewChecked() {
  //   // this.getJson();
  //  // this.isLoaded=false;
  //   let previousValid = this.form.valid;
  //   this.form.changes.subscribe(() => {
  //     if (this.form.valid !== previousValid) {
  //       previousValid = this.form.valid;
  //       this.form.setDisabled('submit', !previousValid);
  //     }
  //   });
  //   this.form.setDisabled('submit', true);
  // }

  //   this.form.setDisabled('submit', true);
  //  // this.form.setValue('name', 'Todd Motto');
    
  //   // this.dialogRef.close();
  // }
//  getJson():any{
//   this.dataService = new SubscriberService(this.httpClient);
//     this.dataService.getJsonData("").subscribe(
//       data => { 
//        // let json = JSON.parse(var x:data);
//        if(data!=null){
//        for (var i = 0; i < data.length; i++) {
//         if (data[i].type === "select") {
//           if (data[i].name === "Subscription_ID") {
//             data[i].options=this.subscriptions;
           
//           }
//          else if (data[i].name === "location") {
//             data[i].options=this.locations;
            
//           }
         
//         }
//       }
//     }
//     this.isLoaded=true;
//     this.config =data    
//        // this.fileNames=data;
//       },
//       (err: HttpErrorResponse) => {
//         console.log (err.name + ' ' + err.message);
//     }
//   );

//  }
  submit(value: {[name: string]: any}) {
    var file=this.fileName;
    this.dataService.runCommand(value,file).subscribe(
      data => { 
      var datavalue=data;
      });
      this.dialogRef.close();
    console.log(value);
  }
}
