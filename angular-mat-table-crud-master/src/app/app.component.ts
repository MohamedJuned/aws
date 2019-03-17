import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {SubscriberService} from './services/subscription.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Issue} from './models/issue';
import {Subscribers} from './models/subscription';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {AddSubscriptionDialogComponent} from './dialogs/add/add.subscription.component';

import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
 import { loadingInterceptor } from './interceptor/interceptor';
 import { LoaderService } from './interceptor/loader.service';
declare var bodymovin: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns = ['id', 'name', 'state','actions'];
  exampleDatabase: SubscriberService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: string;
  HTTPActivity: boolean;
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: SubscriberService,private loaderService: LoaderService
             ) {
                // this.httpStatus.getHttpStatus().subscribe((status: boolean) => {this.HTTPActivity = status; console.log(status)});
              }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  
  ngOnInit() {
    this.loaderService.showLoader();
    // console.log(this.loaderService);
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Subscribers) {
    const dialogRef = this.dialog.open(AddSubscriptionDialogComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  startEdit(i: number, subscription_id: string, tenant: string, client_id: string, secret: string) {
    this.id = subscription_id;
    // index row is used just for debugging proposes and can be removed
    //this.index = i;
    console.log(subscription_id);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {i:i,subscription_id: subscription_id, tenant: tenant, client_id: client_id, secret: secret}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.subscription_id=== this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, subscription_id: string, subscriber_name: string, state: string, amount: number) {
    this.index = i;
    this.id = subscription_id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {subscription_id: subscription_id, subscriber_name: subscriber_name, state: state, cost: amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.subscription_id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }


  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new SubscriberService(this.httpClient,this.loaderService);
    this.loaderService.showLoader();
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort,this.loaderService);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
       
        this.HTTPActivity=false;
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        //this.loaderService.hideLoader();
      });
  }
}


export class ExampleDataSource extends DataSource<Subscribers> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Subscribers[] = [];
  renderedData: Subscribers[] = [];

  constructor(public _exampleDatabase: SubscriberService,
              public _paginator: MatPaginator,
              public _sort: MatSort,private loaderService: LoaderService) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Subscribers[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];
    
    this._exampleDatabase.getAllIssues();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      //this.loaderService.hideLoader();
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: Subscribers) => {
        this.loaderService.hideLoader();
        const searchStr = (issue.id+issue.state+issue.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
    
  }



  /** Returns a sorted copy of the database data. */
  sortData(data: Subscribers[]): Subscribers[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'subscription_id': [propertyA, propertyB] = [a.subscription_id, b.subscription_id]; break;
        case 'subscriber_name': [propertyA, propertyB] = [a.username, b.username]; break;
        // case 'lastname': [propertyA, propertyB] = [a.lastname, b.lastname]; break;
        // case 'age': [propertyA, propertyB] = [a.age, b.age]; break;
        // case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
        // case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
