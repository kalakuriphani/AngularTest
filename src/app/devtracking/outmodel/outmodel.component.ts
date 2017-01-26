import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'outmodel',
    templateUrl: 'outmodel.component.html',
    styleUrls: ['outmodel.component.css']
})
export class OutmodelComponent implements OnInit {

    @Input()
    model:any;

    @ViewChild('outmodelModal')
    outmodelModal:any;

    constructor() {
    }

    ngOnInit() {
    }

    showModal() {
        this.outmodelModal.show();
    }
}

//  <product #modal [productObject]="prod" [quantity]="1"  (basketEntryEvent)="saveBasketEntry($event)"></product>




