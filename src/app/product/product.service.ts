import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response, RequestOptionsArgs, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {ProductModel} from "../shared/model/product.model";
import {AuthService} from "../shared/services/auth.service";
import {environment} from './../../environments/environment';

@Injectable()
export class ProductService {

    private baseRestUrl:string;
    pcaHSBCSchema:any = null;
    bcaSchema:any = null;
    smeSchema:any = null;
    cccSchema:any = null;
    pcaMNSSchema:any = null;
    pcaFDSchema:any = null;

    constructor(private http:Http, private authService:AuthService) {
        console.log('environment restUrl = ' + environment.restUrl);
        this.baseRestUrl = environment.restUrl;
        this.loadPcaHSBCSchema();
        this.loadSmeSchema();
        this.loadBcaSchema();
        this.loadCccSchema();
        this.loadPcaMNSSchema();
        this.loadPcaFDSchema();
    }

    loadPcaHSBCSchema():void {
        if (this.pcaHSBCSchema === null) {
            let fullPath = this.baseRestUrl + '/product-template/PCAHSBC';
            this.http.get(fullPath)
                .map((response:Response) => response.json()).subscribe((result) => this.pcaHSBCSchema = result.schema);
        }
    }

    loadBcaSchema():void {
        if (this.bcaSchema === null) {
            let fullPath = this.baseRestUrl + '/product-template/BCA';
            this.http.get(fullPath)
                .map((response:Response) => response.json()).subscribe((result) => this.bcaSchema = result.schema);
        }
    }

    loadSmeSchema():void {
        if (this.smeSchema === null) {
            let fullPath = this.baseRestUrl + '/product-template/SMEL';
            this.http.get(fullPath)
                .map((response:Response) => response.json()).subscribe((result) => this.smeSchema = result.schema);
        }
    }

    loadCccSchema():void {
        if (this.smeSchema === null) {
            let fullPath = this.baseRestUrl + '/product-template/CCC';
            this.http.get(fullPath)
                .map((response:Response) => response.json()).subscribe((result) => this.cccSchema = result.schema);
        }
    }

    loadPcaMNSSchema():void {
        if (this.pcaMNSSchema === null) {
            let fullPath = this.baseRestUrl + '/product-template/PCAMNS';
            this.http.get(fullPath)
                .map((response:Response) => response.json()).subscribe((result) => this.pcaMNSSchema = result.schema);
        }
    }

    loadPcaFDSchema():void {
        if (this.pcaFDSchema === null) {
            let fullPath = this.baseRestUrl + '/product-template/PCAFD';
            this.http.get(fullPath)
                .map((response:Response) => response.json()).subscribe((result) => this.pcaFDSchema = result.schema);
        }
    }

    getSchema(schemaType:string):any{
        switch(schemaType){
            case 'PCAHSBC':
                return this.pcaHSBCSchema;
            case 'BCA':
                return this.bcaSchema;
            case 'SMEL':
                return this.smeSchema;
            case 'CCC':
                return this.cccSchema;
            case 'PCAMNS':
                return this.pcaMNSSchema;
            case 'PCAFD':
                return this.pcaFDSchema;

        }
    }

    createProduct(data:any):Observable<any> {
        let fullPath = this.baseRestUrl + '/workflow/product';
        return this.http.post(fullPath, data)
            .map((response:Response) => response);
    }

    updateProduct(id:string, data:any):Observable<any> {
        let headers = new Headers({ 'x-pdm-workflow-action': 'UPDATE'});
        let options = new RequestOptions({ headers: headers });
        let fullPath = this.baseRestUrl + '/workflow/product/' + id;
        return this.http.put(fullPath, data, options)
            .map((response:Response) => response.status);
    }

    deleteProduct(id:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let fullPath = this.baseRestUrl + '/workflow/product/' + id;
        return this.http.delete(fullPath,options)
            .map((response:Response) => response.status);
    }

    getProducts(schemaType:string):Observable<ProductModel[]> {
        // fix for Internet Explorer cache
        let options:RequestOptions = new RequestOptions({});
        let search = new URLSearchParams();
        search.set('timestamp', ''+(new Date()).getTime());
        options.search = search;

        let fullPath = this.baseRestUrl + '/product/'+ schemaType + '/collection';
        return this.http.get(fullPath, options)
            .map((response:Response) => response.json());
    }

    getProduct(id:string):Observable<ProductModel> {

        // fix for Internet Explorer cache
        let options:RequestOptions = new RequestOptions({});
        let search = new URLSearchParams();
        search.set('timestamp', ''+(new Date()).getTime());
        options.search = search;

        let fullPath = this.baseRestUrl + '/product/' + id;
        return this.http.get(fullPath,options)
            .map((response:Response) => response.json());
    }

    approveProduct(id:string, data:any):Observable<any> {

        let headers = new Headers({ 'x-pdm-workflow-action': 'APPROVE'});
        let options = new RequestOptions({ headers: headers });
        let fullPath = this.baseRestUrl + '/workflow/product/' + id;
        return this.http.put(fullPath, data, options)
            .map((response:Response) => response.status);
    }


}
