import {Component, ContentChildren, QueryList, AfterContentInit} from '@angular/core';

import {TabElementComponent} from './tab.element.component';

@Component({
    selector: 'tab-collection',
    template: `
    <ul class="nav nav-tabs">
      <li attr.id="tab-{{tab.title}}" *ngFor="let tab of tabCollection" (click)="selectTab(tab)"
        [ngClass]="checkValidity(tab)"
        [class.active]="tab.active">  
                <!--#205081  #e7e7e7-->
        <!--<a  [ngClass]="checkValidity(tab)">{{tab.title}}</a>-->
        <a>{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
})
export class TabCollectionComponent implements AfterContentInit {

    @ContentChildren(TabElementComponent)
    tabCollection:QueryList<TabElementComponent>;

    ngAfterContentInit():void {
        if (!_hasActiveTab(this.tabCollection)) {
            this.selectTab(this.tabCollection.first);
        }

        function _hasActiveTab(tabs:QueryList<TabElementComponent>):Boolean {
            let activeTabs = tabs.filter((tab)=>tab.active);
            return Boolean(activeTabs.length);
        }
    }

    selectTab(tab:TabElementComponent):void {
        _deactivateAllTabs(this.tabCollection.toArray());
        tab.active = true;

        function _deactivateAllTabs(tabs:TabElementComponent[]) {
            tabs.forEach((tab)=>tab.active = false);
        }
    }

    checkValidity(tab:TabElementComponent):Object {
        if (tab.formElement.formProperty.valid) {
            return "valid-tab";
        } else {
            return "invalid-tab";
        }
    }

    // checkValidity(tab:TabElementComponent):string {
    //
    //     if (tab.formElement.formProperty.valid) {
    //         return 'ng-valid';
    //     } else {
    //         return 'ng-invalid';
    //     }
    // }

}


