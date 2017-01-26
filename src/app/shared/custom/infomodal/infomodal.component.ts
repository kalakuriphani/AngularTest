import {Component, Input, ViewChild} from '@angular/core';

@Component({
    selector: 'infomodal',
    templateUrl: 'infomodal.component.html'
})
export class InfomodalComponent  {

    @Input()
    data:any;

    @Input()
    title:string;

    @ViewChild('infoModal')
    infoModal:any;

    constructor() {
    }

    showModal() {
        this.infoModal.show();
    }
}



