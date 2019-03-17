import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import {SubscriberService} from '../../../services/subscription.service';
import {HttpClient, HttpErrorResponse,HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div 
      class="dynamic-field form-select"
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <select [formControlName]="config.name" [disabled]="config.name" (click)="firstDropDownChanged($event.target.selectedIndex - 1)">
        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options">
          {{ option }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent implements Field {
  
  constructor(
    public dataService: SubscriberService,public httpClient: HttpClient) {
     
     }
    
    
  config: FieldConfig;
  group: FormGroup;
  // publisher:Array<any> = [];
  // sku:Array<any>=[];
  
  firstDropDownChanged(val: any) {  
    console.log(" val============"+val);
    if(isNaN(val) ||val === "NaN"){
      val =0;           //use str_val at the place you want
      console.log(" val============"+val);
    }
    if(val>=0){
    const obj = this.config.options[val];
    console.log(" val============"+val,"obj------------" +obj,"config---------"+this.config );
  }
    var groupcon=this.group.controls;
    if (this.config.name === "Subscription_ID") {
      // if(obj !=="" &&  )
      // undefined  location name
    //  if()
  //   if(val >= 0){
  //   this.dataService.getLocation(this.group.get("Subscription_ID").value).subscribe(
  //     datas => { 
  //       console.log ("dataaaaaaaa------"+datas);
  //       arr=JSON.parse(datas[0]);
  //       groupcon["location"]["options"]=arr;
       
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log (err.name + ' ' + err.message);
  //   }  
  // );
  // }
      // group["location"]["options"]=["xyz", "abc"];
      console.log(this.group.getRawValue(),"--------------------", this.config.options );
    }
    else if(this.config.name === "nic"){
      var arr=[];
      console.log ("nic00000000000000000000000000000");
      
      this.dataService.getnic(this.group.get("Subscription_ID").value,this.group.get("resgrp").value).subscribe(
        datanic=> { 
          console.log ("dataaaaaaaanic------"+datanic);
          arr=JSON.parse(datanic[0]);
          this.config.options=arr; 
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
      }
    );
      // console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "location"){
      var arr=[];
      // var group=this.group.controls;
      // this.config.options=groupcon["location"]["options"];
      
      this.dataService.getLocation(this.group.get("Subscription_ID").value).subscribe(
        datas => { 
          console.log ("dataaaaaaaa------"+datas);
          arr=JSON.parse(datas[0]);
          this.config.options=arr;
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
      }
    );
      // this.config.options=["abc", "xyz"];
      console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "resgrp"){
      var arr=[];
      
      this.dataService.getresgrp(this.group.get("Subscription_ID").value).subscribe(
        datares=> { 
          console.log ("dataaaaaaaa------"+datares);
          arr=JSON.parse(datares[0]);
          this.config.options=arr; 
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
      }
    );
      console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "vname"){
      var arr=[];
      console.log ("vname00000000000000000000000000000");
      
      this.dataService.getvname(this.group.get("Subscription_ID").value,this.group.get("resgrp").value).subscribe(
        datavn=> { 
          console.log ("dataaaaaaaavname------"+datavn);
          arr=JSON.parse(datavn[0]);
          this.config.options=arr; 
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
      }
    );
      console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "subnet_name"){
      var arr=[];
      console.log ("subname00000000000000000000000000000");
      
      this.dataService.getsubnet_name(this.group.get("Subscription_ID").value,this.group.get("resgrp").value,this.group.get("vname").value).subscribe(
        datasn=> { 
          console.log ("dataaaaaaaav------"+datasn);
          arr=JSON.parse(datasn[0]);
          this.config.options=arr; 
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
      }
    );
      console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "vmsize"){
      var arr=[];
      console.log ("subname00000000000000000000000000000");
      
      this.dataService.getvmsize(this.group.get("Subscription_ID").value,this.group.get("location").value).subscribe(
        datavms=> { 
          console.log ("dataaaaaaaavmsize------"+datavms);
          arr=JSON.parse(datavms[0]);
          this.config.options=arr; 
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
      }
    );
      console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "offer"){
      var arr=[];
      console.log ("offer======");
      
      this.dataService.getimage(this.group.get("Subscription_ID").value).subscribe(
        dataimage=> { 
          
          console.log ("dataaaaaaaavmsize------"+dataimage);
          var a =JSON.parse(dataimage);
          var offer=[];
          var publisher=[];
          var sku=[];
         
        for(var i=0;i<a.length;i++){
          
            offer.push(a[i].offer);  
            publisher.push(a[i].publisher) ;
            sku.push(a[i].sku); 
          } ;
          localStorage.setItem("publisher", JSON.stringify(publisher));
          localStorage.setItem("sku", JSON.stringify(sku));
          this.config.options=offer; 
          // console.log ("publisher" + this.publisher ,"sku"+ this.sku);
          // this.group.setValue({"publisher":this.publisher ,"sku":this.sku});
        },
        (err: HttpErrorResponse) => {
          console.log (err.name + ' ' + err.message);
      }
    );
      // console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "publisher"){
      // console.log ("publisher======"+this.publisher);
      var retrievedData = localStorage.getItem("publisher");
          var publisher = JSON.parse(retrievedData);
      this.config.options=publisher;
      // console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }
    else if(this.config.name === "sku"){
      var retrievedData = localStorage.getItem("sku");
          var sku = JSON.parse(retrievedData);
      this.config.options=sku;
      // console.log(this.group.get("Subscription_ID").value,"----else if----------------", this.config.options );
    }

    
   
  }

}
