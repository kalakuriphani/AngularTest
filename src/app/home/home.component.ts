import {Component, ViewChildren, QueryList, OnInit} from '@angular/core';
import {ProductService} from "../product/product.service";
import '@angular/router';
import 'ng2-bootstrap/components/collapse';
import {ProductModel} from "../shared/model/product.model";
import {MenuComponent} from "../shared/menu/menu.component";

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit{

    oneMenuOpenAtATime:boolean = true;
    selectedMenuId:number;

    @ViewChildren(MenuComponent)
    menuComponentList:QueryList<MenuComponent>;

    pList:Array<ProductModel> = new Array();

    menuList:Array<MenuItem> =
        [
            {
                id: 1,
                title: 'Personal Current Account (HSBC)',
                productType: 'PCAHSBC',
                createRoute: '/product/new/PCAHSBC',
                viewRoute: '/product',
                isDisabled: false,
                isVisible: true,
                isOpen: false,
                productList: this.pList
            },

            {
                id: 2,
                title: 'Business Current Account',
                productType: 'BCA',
                createRoute: '/product/new/BCA',
                viewRoute: '/product',
                isDisabled: false,
                isVisible: true,
                isOpen: false,
                productList: this.pList
            },
            {
                id: 3,
                title: 'SME Lending',
                productType: 'SMEL',
                createRoute: '/product/new/SMEL',
                viewRoute: '/product',
                isDisabled: false,
                isVisible: true,
                isOpen: false,
                productList: this.pList
            },
            {
                id: 4,
                title: 'Commercial Credit Cards',
                productType: 'CCC',
                createRoute: '/product/new/CCC',
                viewRoute: '/product',
                isDisabled: false,
                isVisible: true,
                isOpen: false,
                productList: this.pList
            },
            {
                id: 5,
                title: 'Personal Current Account (Marks & Spencer)',
                productType: 'PCAMNS',
                createRoute: '/product/new/PCAMNS',
                viewRoute: '/product',
                isDisabled: false,
                isVisible: true,
                isOpen: false,
                productList: this.pList
            },
            {
                id: 6,
                title: 'Personal Current Account (First Direct)',
                productType: 'PCAFD',
                createRoute: '/product/new/PCAFD',
                viewRoute: '/product',
                isDisabled: false,
                isVisible: true,
                isOpen: false,
                productList: this.pList
            }

        ];

    validators:any = {};

    constructor(public productService:ProductService) {
    }

    ngOnInit():void{
    }

    setSelectedMenuId(event):void {

        if (this.selectedMenuId === event.id) {
            this.menuList[this.selectedMenuId - 1].isOpen = !this.menuList[this.selectedMenuId - 1].isOpen;
            return;
        } else
            this.selectedMenuId = event.id;
        for (let index in this.menuList) {
            if (this.menuList[index].id !== this.selectedMenuId) {
                this.menuList[index].isOpen = false;
            } else {
                this.menuList[index].isOpen = true;

                //TODO: to be implemented for lazy loading !
                // if(!this.menuList[index].productList && this.menuList[index].productType === 'PCA'){
                //    this.loadList('PCA', this.menuList[index].productList);
                // }
                // else if(!this.menuList[index].productList && this.menuList[index].productType === 'SME'){
                //     this.loadList('SME', this.menuList[index].productList);
                // }else{
                //     this.loadList('SME', this.menuList[index].productList);
                // }

            }
        }
    }

    loadList(schemaType:string, list:Array<ProductModel>):void {
        //TODO: filtering products with productType. to be implemented on microsystem
        this.productService.getProducts(schemaType).subscribe((products) => {
            list = products;
        });
    }

    validateId(value, property, form) {
        if (value.length === 11) {
            let list = value.substr(0, 10).split('');
            if (list.reduce((p, c, i) => {
                    return p - (i % 2 ? +c : -c);
                }, 0)) {
                let error = {"INE": {"checksum": "INVALID CHECKSUM"}};
                return error;
            }
        }
        return null;
    }
}

interface MenuItem {
    id:number;
    title:string;
    productType:string;
    createRoute:string;
    viewRoute:string;
    isDisabled:boolean;
    isVisible:boolean;
    isOpen:boolean;
    productList:Array<ProductModel>;
}

