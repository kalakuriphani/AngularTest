import {
    Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})
export class ModalComponent implements  OnInit{

    @Input()
    message:string;

    @Input()
    title:string;

    @Input()
    singleButton:boolean;


    @Input('cancel-label') cancelLabel:string = 'Cancel';
    @Input('positive-label') positiveLabel:string = 'OK';


    @Output('closed') closeEmitter:EventEmitter<ModalResult> = new EventEmitter<ModalResult>();
    @Output('loaded') loadedEmitter:EventEmitter<ModalComponent> = new EventEmitter<ModalComponent>();

    // @Output('open') openEmitter:EventEmitter<any> = new EventEmitter<any>();


    showModal:boolean = false;

    constructor() {

    }

    // ngOnChanges(value:SimpleChanges):void {
    //     this.openEmitter.emit({data:value});
    // }

    ngOnInit():void {
        // have a grap of this modal reference in the parent component
        this.loadedEmitter.emit(this);
    }


    show() {
        this.showModal = true;
    }

    positiveAction():boolean {
        this.showModal = false;
        this.closeEmitter.emit({
            action: ModalAction.POSITIVE
        });
        return false;
    }

    cancelAction():boolean {
        console.log('sending close event');
        this.showModal = false;
        this.closeEmitter.emit({
            action: ModalAction.CANCEL
        });
        return false;
    }
}

export enum ModalAction { POSITIVE, CANCEL }

export interface ModalResult {
    action:ModalAction;
}


