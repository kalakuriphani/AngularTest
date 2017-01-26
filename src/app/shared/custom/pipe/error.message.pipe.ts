import {Pipe, PipeTransform} from '@angular/core';

import  data from './errorDictionary.json';

@Pipe({name:'errorMessage'})

export class ErrorMessagePipe implements PipeTransform{

    transform(input:string, path:string):string{

        let transformed:string = input;

        let result = data.filter( (element:any) => {
          return (element.fieldName === path) ;
        });

        if(result[0] && result[0].friendlyError) {
            transformed = result[0].friendlyError;
        }

        return transformed;
    }
}


