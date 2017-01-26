import { ObjectLayoutWidget } from "angular2-schema-form";
import {Component, AfterViewInit, ElementRef} from "@angular/core";

import {TabCollectionComponent} from "../../custom/tab/tab.collection.component";
import {TabElementComponent} from "../../custom/tab/tab.element.component";

@Component({
  selector: "tabs-widget",
  template:require('./tabs.widget.component.html')
})

export class TabsWidgetComponent extends ObjectLayoutWidget implements  AfterViewInit{

  constructor(private elementRef:ElementRef){
    super();
  }

  ngAfterViewInit():void {

  }

}
