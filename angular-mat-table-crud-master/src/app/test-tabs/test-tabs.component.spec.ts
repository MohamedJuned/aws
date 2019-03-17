import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTabsComponent } from './test-tabs.component';

describe('TestTabsComponent', () => {
  let component: TestTabsComponent;
  let fixture: ComponentFixture<TestTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
