import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//import {Issue} from '../models/issue';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {HttpClient, HttpErrorResponse,HttpHeaders, HttpParams} from '@angular/common/http';
import { Subscribers } from '../models/subscription';
import { LoaderService } from './../interceptor/loader.service';
// import { HTTPStatus } from '../interceptor/interceptor';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
//    httpParams : new HttpParams(),
  
// };

@Injectable()
export class SubscriberService {
  //private readonly API_URL = 'http://localhost:7070/api/customers';
  private readonly DB_API_URL = 'https://localhost:6060/api/subscription';
  private readonly API_URL = 'https://localhost:7070/dalembert';

  dataChange: BehaviorSubject<Subscribers[]> = new BehaviorSubject<Subscribers[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  apiData:any;
  HTTPActivity: boolean;
  constructor (private httpClient: HttpClient,private loaderService: LoaderService
    ) {
  }
  // private loaderService: LoaderService;
  get data(): Subscribers[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
   getAllIssues(): void {
    // this.loaderService.showLoader();
    this.httpClient.get<any>(this.API_URL).subscribe(subdata => {  
      subdata = subdata.replace(/;\s*$/, "");
      var res = subdata.split(";");
      var arr=[];
      for(var i=0;i<res.length;i++){
       var obj = JSON.parse(res[i]);
        arr.push(obj[0]);   
      } 
      // this.loaderService.hideLoader();
      if(this.dialogData!=null && this.dialogData!=undefined )
      {
     this.dialogData=arr[0];
     this.dataChange.value.push(this.dialogData);
      }
      else{
       this.dataChange.next(arr);}
       this.loaderService.hideLoader();
      },
      (error: HttpErrorResponse) => {
        this.loaderService.hideLoader();
       console.log (error);
       
     });
  }
//  getDataFromApi(data):void {
//    //for(var i=0;i<=)
  
//    var x=[];
//    for (var i=0;i<data.length;i++){
//      x[i]=data[i].subscription_id};
//   let httpParams = new HttpParams().set('data', data);
// //this.httpClient.get('/api/people', {params: httpParams});
     
//    this.httpClient.get<any>(this.API_URL, {params: {x}}).subscribe(data => {
//      //var obj = JSON.parse(data);
//      data = data.replace(/;\s*$/, "");
//      var res = data.split(";");
//      var arr=[];
//      for(var i=0;i<res.length;i++){
//       var obj = JSON.parse(res[i]);
//        arr.push(obj);
//      } 
//      if(this.dialogData!=null && this.dialogData!=undefined )
//      {
//     this.dialogData=arr[0];
//     this.dataChange.value.push(this.dialogData);
//      }
//      else{
      
//       this.dataChange.next(arr);}
       
//       this.HTTPActivity=false;

//      },
//      (error: HttpErrorResponse) => {
//      console.log (error.name + ' ' + error.message);
//     });
//  }


//  getfileName(data):any{
//   this.httpClient.get<any>(this.API_URL+"/readFile").subscribe(data => {
// console.log(data);
// return data;
//   },
//   (error: HttpErrorResponse) => {
//   console.log (error.name + ' ' + error.message);
//  });

//  }
deletesa(dataserver):void {
  this.HTTPActivity=true;
  var data=[]
  data[0]=dataserver.subscription_id
  data[1]=dataserver.resource_group
  data[2]=dataserver.name
  
  console.log (data);
  this.httpClient.get<any>(this.API_URL+"/deleteSa", {params: {data}}).subscribe(datasadelete => {
    
    if(datasadelete!=null && datasadelete!=undefined )
    {
      // window.location.reload(true);
      // this.getAllIssues();
    }
    this.loaderService.hideLoader();
    },
    (error: HttpErrorResponse) => {
      this.loaderService.hideLoader();
    console.log (error.name + ' ' + error.message);
   });

}
deleterg(dataserver):void {
  this.HTTPActivity=true;
  var data=[]
  data[0]=dataserver.subscription_id
  data[1]=dataserver.name
  
  console.log (data);
  this.httpClient.get<any>(this.API_URL+"/deleteRg", {params: {data}}).subscribe(datadelete => {
    
    if(datadelete!=null && datadelete!=undefined )
    {
      // window.location.reload(true);
      // this.getAllIssues();
    }
    this.loaderService.hideLoader();
    },
    (error: HttpErrorResponse) => {
      this.loaderService.hideLoader();
    console.log (error.name + ' ' + error.message);
   });

}
deleteserver(dataserver):void {
  this.HTTPActivity=true;
  var data=[]
  data[0]=dataserver.subscriptionid
  data[1]=dataserver.resource_group_name
  data[2]=dataserver.vm_name
  console.log (data);
  this.httpClient.get<any>(this.API_URL+"/deleteServer", {params: {data}}).subscribe(datadelete => {
    
    if(datadelete!=null && datadelete!=undefined )
    {
      // window.location.reload(true);
      // this.getAllIssues();
    }
    this.loaderService.hideLoader();
    },
    (error: HttpErrorResponse) => {
      this.loaderService.hideLoader();
    console.log (error.name + ' ' + error.message);
   });

}	
stopserver(dataserver):void {
  this.HTTPActivity=true;
  var data=[]
  data[0]=dataserver.subscriptionid
  data[1]=dataserver.resource_group_name
  data[2]=dataserver.vm_name
  console.log (data);
  this.httpClient.get<any>(this.API_URL+"/stopServer", {params: {data}}).subscribe(datastop => {
    
    if(datastop!=null && datastop!=undefined )
    {
      // window.location.reload(true);
      // this.getAllIssues();
    }
    this.loaderService.hideLoader();
    },
    (error: HttpErrorResponse) => {
      this.loaderService.hideLoader();
    console.log (error.name + ' ' + error.message);
   });

}	
startserver(dataserver):void {
  this.HTTPActivity=true;
  var data=[]
  data[0]=dataserver.subscriptionid
  data[1]=dataserver.resource_group_name
  data[2]=dataserver.vm_name
  console.log (data);
  this.httpClient.get<any>(this.API_URL+"/startServer", {params: {data}}).subscribe(datastart => {
    
    if(datastart!=null && datastart!=undefined )
    {
      // window.location.reload(true);
      // this.getAllIssues();
    }
    this.loaderService.hideLoader();
    },
    (error: HttpErrorResponse) => {
      this.loaderService.hideLoader();
    console.log (error.name + ' ' + error.message);
   });

}	
getnic(subid,resgrp): Observable<any> {
  this.HTTPActivity=true;
  var data=[];
  data[0]=subid
  data[1]=resgrp
  return this.httpClient.get(this.API_URL+"/getnic",{params: {data}});
}	
getimage(subid): Observable<any> {
  this.HTTPActivity=true;
  var data=[];
  data[0]=subid
  // data[1]=location
  return this.httpClient.get(this.API_URL+"/getimage",{params: {data}});
}	
getvmsize(subid,location): Observable<any> {
  this.HTTPActivity=true;
  var data=[];
  data[0]=subid
  data[1]=location
  return this.httpClient.get(this.API_URL+"/getvmsize",{params: {data}});
}	
getsubnet_name(subid,resgrp,vname): Observable<any> {
  this.HTTPActivity=true;
  var data=[];
  
  data[0]=subid
  data[1]=resgrp
  data[2]=vname
  return this.httpClient.get(this.API_URL+"/getsubnetname",{params: {data}});
}	
getvname(subid,resgrp): Observable<any> {
  this.HTTPActivity=true;
  var data=[];
  
  data[0]=subid
  data[1]=resgrp
  return this.httpClient.get(this.API_URL+"/getvname",{params: {data}});
}	
getresgrp(data): Observable<any> {
  this.HTTPActivity=true;
  return this.httpClient.get(this.API_URL+"/getresgrp",{params: {data}});
}	
runCommand(value,file): Observable<any> {
  var arrCommand=[];
  var myJsonString = JSON.stringify(value);
  arrCommand.push(myJsonString);
  this.HTTPActivity=true;
  //var obj = JSON.parse(value);
  return this.httpClient.get(this.API_URL+"/runcommand",  {params: {arrCommand,file}});
}	
 getfileName(data): Observable<any> {
  this.HTTPActivity=true;
  return this.httpClient.get(this.API_URL+"/readFile", {responseType: 'json'});
}	

getJsonData(data): Observable<any> {
  this.HTTPActivity=true;
  return this.httpClient.get(this.API_URL+"/readJson",{params: {data}});
}	

getLocation(data): Observable<any> {
  this.HTTPActivity=true;
  return this.httpClient.get(this.API_URL+"/getlocation",{params: {data}});
}	
// loadUser() {
//   return of<User>(fakeData).pipe(
//     delay(2000)
//   );

    // getAllIssues(): Observable<Issue[]> {
    //    return this.httpClient.get<Issue[]>(this.API_URL)
    //  }
  // add subscriber
  addIssue (issue: any): void {
    var secret=encodeURIComponent(issue.secret)
    // secret=issue.secret;
    var x=[issue.subscription_id,issue.tenant,issue.client_id,secret];
    console.log (x);
    this.httpClient.get<any>(this.API_URL+"/addNewSub", {params: {x}}).subscribe(adddata => {
      
      if(adddata!=null && adddata!=undefined )
      {
        window.location.reload(true);
        // this.getAllIssues();
      }
      this.loaderService.hideLoader();
      },
      (error: HttpErrorResponse) => {
        this.loaderService.hideLoader();
      console.log (error.name + ' ' + error.message);
     });

   
  }

  updateIssue (issue: Subscribers): void {
    this.dialogData = issue;
  }
  
  getAllSub():Observable<any> {
    return this.httpClient.get(this.API_URL+"/getSub", {responseType: 'json'});
  }	

  // DELETE METHOD
  deleteIssue(id: string): void {
    this.httpClient.delete(this.DB_API_URL+"/"+id).subscribe(data => {
      console.log(data['']);
       // this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // vm-------------------------
  getVm() : void {
    
     this.httpClient.get<any>(this.API_URL+"/vm").subscribe(vmdata => {
      
      if(vmdata!=null ||vmdata != undefined){
        var rgArr=[];
        vmdata = vmdata.replace(/;\s*$/, "");
        var res = vmdata.split(";");
        if(res!=null && res!="" && res.length>0){
        for(var i=0;i<res.length;i++){
          if(res[i]!="{}" ){
        var obj1=JSON.parse(res[i]);
        
        var length=Object.keys(obj1).length;
        
        for(var j=0;j<length;j++){
          var newTemp = obj1[j].replace(/'/g, '"');
          var obj2=JSON.parse(newTemp);
          rgArr.push(obj2)
  
        }
        
          }
        }
       }
       this.dataChange.next(rgArr);
      }
      this.loaderService.hideLoader();
    },
       (error: HttpErrorResponse) => {
        // this.HTTPActivity=false;
        this.loaderService.hideLoader();
      console.log (error.name + ' ' + error.message);
       });
  }

  // RG-------------------------
  getRg() : void {
    
    this.httpClient.get<any>(this.API_URL+"/rg").subscribe(rgdata => {

     
     if(rgdata!=null || rgdata != undefined){
      var rgArr=[];
      rgdata = rgdata.replace(/;\s*$/, "");
      var res = rgdata.split(";");
      if(res!=null && res!="" && res.length>0){
      for(var i=0;i<res.length;i++){
        if(res[i]!="{}" ){
      var obj1=JSON.parse(res[i]);
      
      var length=Object.keys(obj1).length;
      
      for(var j=0;j<length;j++){
        var newTemp = obj1[j].replace(/'/g, '"');
        var obj2=JSON.parse(newTemp);
        rgArr.push(obj2)

      }
      
        }
      }
     }
     this.dataChange.next(rgArr);
    }
    this.loaderService.hideLoader();
   },
      (error: HttpErrorResponse) => {
        this.loaderService.hideLoader();
       // this.HTTPActivity=false;
     console.log (error.name + ' ' + error.message);
      });
 }

 //getvn

 getVn() : void {
    
  this.httpClient.get<any>(this.API_URL+"/vn").subscribe(vndata => {

   
   if(vndata!=null || vndata != undefined){
    var vnArr=[];
    vndata = vndata.replace(/;\s*$/, "");
    var res = vndata.split(";");
    if(res!=null && res!="" && res.length>0){
    for(var i=0;i<res.length;i++){
      if(res[i]!="{}" ){
    var obj1=JSON.parse(res[i]);
    
    var length=Object.keys(obj1).length;
    
    for(var j=0;j<length;j++){
      var newTemp = obj1[j].replace(/'/g, '"');
      var obj2=JSON.parse(newTemp);
      vnArr.push(obj2)

    }
    
      }
    }
   }
   this.dataChange.next(vnArr);
  }
  this.loaderService.hideLoader();
 },
    (error: HttpErrorResponse) => {
     // this.HTTPActivity=false;
     this.loaderService.hideLoader();
   console.log (error.name + ' ' + error.message);
    });
}

//getsa
getSa() : void {
    
  this.httpClient.get<any>(this.API_URL+"/sa").subscribe(sadata => {
   if(sadata!=null || sadata != undefined){
    var saArr=[];
    sadata = sadata.replace(/;\s*$/, "");
    var res = sadata.split(";");
    if(res!=null && res!="" && res.length>0){
    for(var i=0;i<res.length;i++){
      if(res[i]!="{}" ){
    var obj1=JSON.parse(res[i]);
    
    var length=Object.keys(obj1).length;
    
    for(var j=0;j<length;j++){
      var newTemp = obj1[j].replace(/'/g, '"');
      var obj2=JSON.parse(newTemp);
      saArr.push(obj2)

    }
    
      }
    }
   }
   this.dataChange.next(saArr);
  }
  this.loaderService.hideLoader();
 },
    (error: HttpErrorResponse) => {
     // this.HTTPActivity=false;
     this.loaderService.hideLoader();
   console.log (error.name + ' ' + error.message);
    });
}
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




