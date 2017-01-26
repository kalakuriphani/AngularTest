import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {ProductService} from "./product.service";
import {ProductModel} from "../shared/model/product.model";


@Injectable()
export class ProductResolver implements Resolve<Observable<any>|Promise<any>|any> {
    constructor(private productService:ProductService) {
    }

    resolve(route:ActivatedRouteSnapshot):Observable<any>|Promise<any>|any {

        let product:ProductModel;
        return this.productService.getProduct(route.params['id']);

    }
}