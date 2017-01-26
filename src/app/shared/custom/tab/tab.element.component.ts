import {Component, Input, ContentChild, AfterContentInit} from '@angular/core';
import {FormElementComponent} from "angular2-schema-form/src/schema-form/formelement.component";

@Component({
  selector: 'tab-element',
  styles: [`
    .pane{
      padding:1em;
    }
  `],
  template: `
    <div class="tab-element" [hidden]="!active">
      <ng-content></ng-content>
      <ol>
         <li class="small-font" style="color:red" 
             *ngFor="let error of formElement.formProperty.errorsChanges |async"><b>{{getFieldName(error.path)}}</b>:{{error.message | errorMessage:getFieldName(error.path)}}
             <!--*ngFor="let error of formElement.formProperty.errorsChanges |async"><b>{{error.path.substr(2)}}</b>:{{error.message | errorMessage:error.path.substr(2)}}-->
      </ol>
    </div>
  `
})

export class TabElementComponent implements AfterContentInit{

  @Input()
  public title:string ;

  public active:boolean = false;

  @ContentChild('formElementRef')
  formElement:FormElementComponent;

  constructor(){

  }

  ngAfterContentInit():void {
    // console.log('this.formElement.formProperty.schema');
    // console.dir(this.formElement.formProperty.schema);
    // this.formElement.control.disable();
  }

  getFieldName(path:string):string {
    let str = path.substr(path.lastIndexOf('/')+1);
    return str;
  }
}
