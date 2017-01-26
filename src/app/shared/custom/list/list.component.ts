
import {Component, QueryList, ContentChildren, AfterContentInit, Directive} from "@angular/core";
// user code
    // <my-list>
    // <li *ngFor="let item of items"> {{item}} </li>
    // </my-list>

@Directive({ selector: 'li' })
export class ListItem {}


// component code
@Component({
    selector: 'list'
})
export class List implements AfterContentInit {
    @ContentChildren(ListItem) items: QueryList<ListItem>;

    ngAfterContentInit() {

    }
}