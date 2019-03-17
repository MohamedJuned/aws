// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {SubscriberService} from '../services/subscription.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AddPopDialogComponent} from '../dialogs/addpop/add.dialog.component';
import { LoaderService } from './../interceptor/loader.service';



@Component({
  selector: 'azure-app',
  templateUrl: './azure-action.html',
  styleUrls: [ './azure-action.css' ]
})
export class AzureComponent implements OnInit {
  HTTPActivity: boolean;
  constructor(public httpClient: HttpClient,
    public dataService: SubscriberService, public dialog: MatDialog,private loaderService: LoaderService) {
      // this.httpStatus.getHttpStatus().subscribe((status: boolean) => {this.HTTPActivity = status; console.log("azure"+status)});
    }
 // private readonly API_URL = 'http://localhost:3000/readFile';
 private fileNames:any;
 public show:boolean = false;

  exampleDatabase: SubscriberService | null;
  //dataSource: ExampleDataSource | null;
 // declare var require: any
  ngOnInit() {
    this.loaderService.showLoader();
    this.loadData();
    this.getFileNames();
  }

  loadData(){

    
    //this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   });

    
  }

  getFileNames() {
    this.exampleDatabase = new SubscriberService(this.httpClient,this.loaderService);
    var f=[];
	  this.exampleDatabase.getfileName("").subscribe(
	      data => { 
          if(data!="nodata"){
          for(var i=0;i<data.length;i++){
             f [i]= data[i].substr(0, data[i].lastIndexOf('.')) || data[i];
         
          }
          this.fileNames=f;
        }
        else{
          this.show = !this.show;
        }
        this.loaderService.hideLoader();
	      }
	  );
   }

   addNew(fileName) {
    var x=[];
    var f = fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
    var y=[f];
     
      this.exampleDatabase = new SubscriberService(this.httpClient,this.loaderService);
      this.exampleDatabase.getAllSub().subscribe(
          data => { 
            var res = data[0].split(",");
            res = res.map(function(el) {
              return el.trim();
          }).filter(Boolean);

            // for (var i=0;i<res.length;i++){
            //   x[i]=res[i]
            // };
            console.log("dataaaaaaaaaaaaaaaa"  +  data  + " res " + res)
            this.openPopUp(res,y);
          }
      );
    
  };
  openPopUp(x,y){
    const dialogRef = this.dialog.open(AddPopDialogComponent, {
     data: {x,y}
  })
;

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService
     // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
    //  this.refreshTable();
    }
  });}
  
}