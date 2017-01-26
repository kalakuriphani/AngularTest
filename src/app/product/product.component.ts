import {Component, ViewChild, OnInit, AfterViewInit, ViewContainerRef} from '@angular/core';

import {FormControl} from '@angular/forms'
import {ProductService} from "./product.service";
import {WidgetRegistry, FormComponent, Validator} from "angular2-schema-form";
import {TinyMCEWidget} from "ng2sf-tinymce";
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {ProductModel} from "../shared/model/product.model";
import {ModalComponent} from '../shared/modal/modal.component';
import {BehaviorSubject} from "rxjs/Rx";

@Component({
    selector: 'product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

    @ViewChild('schemaForm')
    schemaFormRef:FormComponent;

    @ViewChild('modalRef')
    cancelConfirmationModal:ModalComponent;

    isModelValid:boolean = false;
    edit:boolean = false;
    readOnly:boolean = false;
    feedback = {title: '', message: ''};
    titleHeader:string;

    currentProduct:ProductModel = new ProductModel();
    schema:any = {};
    model:any = {};
    fieldValidators:{ [fieldId:string]:Validator} = {};

    modalSubject:BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(public viewContainerRef:ViewContainerRef, private registry:WidgetRegistry,
                private productService:ProductService,
                private route:ActivatedRoute) {
        this.registry.register("tinymce", TinyMCEWidget);
    }

    ngAfterViewInit():void {
        this.schemaFormRef.rootProperty.errorsChanges.subscribe(value => {
            if (value === null) {
                this.isModelValid = true;

            } else {
                this.isModelValid = false;
            }
        });
    }

    ngOnInit():void {

        this.modalSubject.filter(value => value === true).subscribe((value)=> {
            if (value) {
                if (!this.edit) {
                    this.edit = true;
                    this.titleHeader = 'View ' + this.titleHeader.substr(3);
                }
                this.cancelConfirmationModal.show();
            }
        });

        let urlSegmens:UrlSegment[] = this.route.snapshot.url;
        for (let i = 1; i < urlSegmens.length; i++) {
            if (urlSegmens[i].path === 'new') {
                this.edit = false;
                switch (urlSegmens[i + 1].path) {
                    case 'PCAHSBC':
                        this.schema = this.productService.getSchema('PCAHSBC');
                        this.currentProduct.productType = 'PCAHSBC';
                        this.setTitleHeader(this.currentProduct.productType);
                        return;
                    case 'SMEL':
                        this.schema = this.productService.getSchema('SMEL');
                        this.currentProduct.productType = 'SMEL';
                        this.setTitleHeader(this.currentProduct.productType);
                        return;
                    case 'BCA':
                        this.schema = this.productService.getSchema('BCA');
                        this.currentProduct.productType = 'BCA';
                        this.setTitleHeader(this.currentProduct.productType);
                        return;
                    case 'CCC':
                        this.schema = this.productService.getSchema('CCC');
                        this.currentProduct.productType = 'CCC';
                        this.setTitleHeader(this.currentProduct.productType);
                        return;
                    case 'PCAMNS':
                        this.schema = this.productService.getSchema('PCAMNS');
                        this.currentProduct.productType = 'PCAMNS';
                        this.setTitleHeader(this.currentProduct.productType);
                        return;
                    case 'PCAFD':
                        this.schema = this.productService.getSchema('PCAFD');
                        this.currentProduct.productType = 'PCAFD';
                        this.setTitleHeader(this.currentProduct.productType);
                        return;
                }
            }
        }
        if (this.route.snapshot.data['product']) {
            this.currentProduct = this.route.snapshot.data['product'];
            this.schema = this.productService.getSchema(this.currentProduct.productType);
            this.schemaFormRef.model = this.currentProduct.productDetails;
            this.edit = true;
            this.setTitleHeader(this.currentProduct.productType);
        }
    }


    setTitleHeader(productType:string):void {
        let title:string;

        switch (productType) {
            case 'PCAHSBC':
                title = 'Personal Current Account (HSBC)';
                break;
            case 'SMEL':
                title = 'SME Lending';
                break;
            case 'BCA':
                this.schema = this.productService.getSchema('BCA');
                title = 'Business Current Account';
                break;
            case 'CCC':
                this.schema = this.productService.getSchema('CCC');
                title = 'Commerical Credit Cards';
                break;
            case 'PCAMNS':
                this.schema = this.productService.getSchema('PCAMNS');
                title = 'Personal Current Account (Marks & Spencers)';
                break;
            case 'PCAFD':
                this.schema = this.productService.getSchema('PCAFD');
                title = 'Personal Current Account (First Direct)';
                break;
        }
        this.titleHeader = title;
    }

    cancelConfirmationModalLoaded(modal:ModalComponent) {
        // this.cancelConfirmationModal = modal; // Here you get a reference to the modal so you can control it programmatically
    }

    onCancelConfirmation(event:any) {
        // console.log('cancel feedback ' + event.action);
        // this.cancelConfirmationModal.cancelAction();
    }

    reflectModelChange(value):void {
        this.model = value;
    }

    saveProduct():void {
        if (this.currentProduct.id) {
            this.currentProduct.productDetails = this.model
            this.productService.updateProduct(this.currentProduct.id, this.currentProduct.productDetails).subscribe(status =>this.feedbackHandler(status));
        } else {
            this.currentProduct.productDetails = this.model;
            this.productService.createProduct(this.currentProduct).subscribe(
                (response) => {
                    console.log('new product feedback:');
                    console.dir(response);
                    // this.currentProduct.id = response.headers.get('location').substr(foundIndex + 1);
                    // let foundIndex = response.headers.get('location').lastIndexOf('/');
                    this.currentProduct.id = response.json().id;
                    this.feedbackHandler(response.status);
                });
        }
    }

    deleteProduct():void {
        this.currentProduct.productDetails = this.model;
        this.productService.deleteProduct(this.currentProduct.id).subscribe(status =>this.feedbackHandler(status));
    }

    approveProduct():void {
        this.currentProduct.productDetails = this.model;
        this.productService.approveProduct(this.currentProduct.id, this.currentProduct.productDetails).subscribe(
            status =>{
                if (status === 200 || status === 201) {
                    this.currentProduct.status = 'APPROVED';
                }
                this.feedbackHandler(status)
            });
    }

    feedbackHandler(status:number):void {
        if (status === 200 || status === 201) {
            this.feedback.message = "Operation: success";
            this.feedback.title = "Product Confirmation";
            console.log('success');
        } else {
            this.feedback.message = "Operation: failure";
            this.feedback.title = "Error";
            console.log('error with status = ' + status);
        }
        this.modalSubject.next(true);
    }

}

