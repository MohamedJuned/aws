import { Component,ViewChild, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LoaderService } from './../interceptor/loader.service';

@Component({
  selector: 'test-tabs',
  templateUrl: './test-tabs.component.html',
  styleUrls: ['./test-tabs.component.css']
})
export class TestTabsComponent extends AppComponent implements OnInit  {
  selectedTabIndex;
  selectedTab = 0;
  selectTab(event) {
    console.log("in tabs event ----------------------"+ event);
    this.selectedTab = event;
    }
  // constructor() { }
  @ViewChild(AppComponent) private _child: 
  AppComponent;
  ngOnInit() {
    console.log("in tabs ----------------------");
  }

}
