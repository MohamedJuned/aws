import { Component, EventEmitter, Input, OnChanges,SimpleChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  template: `
    <form
      class="dynamic-form"
      [formGroup]="form"
      (submit)="handleSubmit($event)" style="overflow:scroll; height:450px;">
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form">
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input()
  config: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === "config") {
       
//this.config= changes[property].currentValue;
if(!changes[property].firstChange){
if (this.form) {
  this.form.setValidators([Validators.required]);
  const controls = Object.keys(this.form.controls);
  const configControls = this.controls.map((item) => item.name);
 
  controls
    .filter((control) => !configControls.includes(control))
    .forEach((control) => this.form.removeControl(control));

  configControls
    .filter((control) => !controls.includes(control))
    .forEach((name) => {
      const config = this.config.find((control) => control.name === name);
      this.form.addControl(name, this.createControl(config));
    });

}
     } 
     else{
       return;
    }
     console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);
      } 
  }
   
  }

  createGroup() {
    const group = this.fb.group(this.config);
   
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    this.form.updateValueAndValidity();
    config.validation=[Validators.required]
    const { disabled, validation, value } = config;
    
    
//     var str = validation.toString();
// // var arr = (new Function( "return [" + str + "]")());
//     var data = str.substring(1, str.length-1);
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable': 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
}
