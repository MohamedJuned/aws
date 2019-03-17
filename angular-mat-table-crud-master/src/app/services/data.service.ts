import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Issue} from '../models/issue';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  //private readonly API_URL = 'http://localhost:7070/api/customers';
  private readonly PYTHON_API_URL = 'http://localhost:3030/';
  private readonly API_URL = 'http://localhost:3000/dalembert';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
   getAllIssues(): void {
     this.httpClient.get<Issue[]>(this.API_URL).subscribe(data => {
         this.dataChange.next(data);
       },
       (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

    // getAllIssues(): Observable<Issue[]> {
    //    return this.httpClient.get<Issue[]>(this.API_URL)
    //  }
  // DEMO ONLY, you can find working methods below
  addIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }


  //juned  changes

  // getCustomers (): Observable<Issue[]> {
  //   return this.httpClient.get<Issue[]>(this.customersUrl)
  // }

  // getCustomer(id: number): Observable<Issue> {
  //   const url = `${this.customersUrl}/${id}`;
  //   return this.httpClient.get<Issue>(url);
  // }

  // addCustomer (customer: Issue): Observable<Issue> {
  //   return this.httpClient.post<Issue>(this.customersUrl, customer, httpOptions);
  // }

  // deleteCustomer (customer: Issue | number): Observable<Issue> {
  //   const id = typeof customer === 'number' ? customer : customer.id;
  //   const url = `${this.customersUrl}/${id}`;

  //   return this.httpClient.delete<Issue>(url, httpOptions);
  // }

  // updateCustomer (customer: Issue): Observable<any> {
  //   return this.httpClient.put(this.customersUrl, customer, httpOptions);
  // }
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




