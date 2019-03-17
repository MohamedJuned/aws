import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {SubscriberService} from '../services/subscription.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Issue} from '../models/issue';
import {Subscribers} from '../models/subscription';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {AddSubscriptionDialogComponent} from '../dialogs/add/add.subscription.component';

import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import { LoaderService } from './../interceptor/loader.service';

@Component({
  selector: 'vn-root',
  templateUrl: './vn.component.html',
  styleUrls: ['./vn.component.css']
})
export class VnComponent implements OnInit {
  displayedColumns = ['name','resource_group_name', 'location', 'subscription_id'];
  exampleDatabase: SubscriberService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: SubscriberService,private loaderService: LoaderService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loaderService.showLoader();
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
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, subscriptionid: string, azure_tenant_id: string, application_id: string, azure_Key: string) {
    this.id = subscriptionid;
    // index row is used just for debugging proposes and can be removed
    //this.index = i;
    console.log(subscriptionid);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {i:i,subscriptionid: subscriptionid, azure_tenant_id: azure_tenant_id, application_id: application_id, azure_Key: azure_Key}
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

  deleteItem(i: number,subscriptionid: string, azure_tenant_id: string, application_id: string, azure_Key: string) {
    this.index = i;
    this.id = subscriptionid;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: subscriptionid, azure_tenant_id: azure_tenant_id, application_id: application_id, azure_Key: azure_Key}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.subscription_id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
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
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort,this.loaderService);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
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

    this._exampleDatabase.getVn();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: Subscribers) => {
        this.loaderService.hideLoader();
        const searchStr = (issue.subscription_id+issue.location + issue.resource_group_name +issue.name).toLowerCase();
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
