import {Component, Input, Output, AfterViewInit, EventEmitter} from '@angular/core';
import '@angular/router';
import 'ng2-bootstrap/components/collapse';
import {ProductModel} from "../model/product.model";
import {ProductService} from "../../product/product.service";

@Component({
    selector: 'menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements AfterViewInit {


    @Input()
    public oneMenuOpenAtATime:boolean;

    @Input()
     id:number;

    @Input()
     title:string;

    @Input()
     createRoute:string;

    @Input()
     viewRoute:string;

    @Input()
     isVisible:boolean;

    @Input()
     isDisabled:boolean;

    @Input()
     isOpen:boolean;

    @Input()
     productType:string;

    @Input()
     productList:Array<ProductModel>;

    @Output()
     opened:EventEmitter<any> = new EventEmitter();

    currentPage:number = 1;
    maxSize:number = 5;
    itemsPerPage = 5

    productPager:Array<ProductModel>;

    constructor(public productService:ProductService) {
    }

    ngAfterViewInit():void {

        this.productService.getProducts(this.productType).subscribe((products => {
                this.productList = products;
                this.pageChanged({page:1,itemsPerPage:this.itemsPerPage});
            }
        ));
    }

    setPage(pageNo:number):void {
        this.currentPage = pageNo;
    };

    toggle():void {
        if (this.oneMenuOpenAtATime) {
            this.opened.emit({id: this.id});
        } else {
            this.isOpen = !this.isOpen;
        }
    }

    getActiveClass():string {
        if (this.isOpen)
            return 'glyphicon glyphicon-minus-sign';
        else
            return 'glyphicon glyphicon-plus-sign';
    }

    pageChanged(event):void{
        let index = event.page;
        let size = event.itemsPerPage;
        this.productPager = this.productList.slice( (index-1)*size, index*size);
    }

    formattedDate(date):string {
        if(!date)
            return '';
        return new Date(date).toDateString();
        // return d;
        //     month = '' + (d.getMonth() + 1),
        //     day = '' + d.getDate(),
        //     year = d.getFullYear();
        //
        // if (month.length < 2) month = '0' + month;
        // if (day.length < 2) day = '0' + day;
        //  return [month, day, year].join('/');
    }

    getLastUpdatedDate(product):string {
      if (product.updatedAt) {
        return this.formattedDate(product.updatedAt);
      }
      return this.formattedDate(product.createdAt);
    }

    getUpdatedBy(product):string {
      if (product.updatedBy) {
        return product.updatedBy;
      }
      return product.createdBy;
    }
}

