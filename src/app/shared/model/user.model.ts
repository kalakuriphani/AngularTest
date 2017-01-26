
export class UserModel  {

    public id:number;
    public username:string = '';
    public firstname:string = '';
    public lastname:string = '';
    public password:string = '';
    public email:string = '';
    public tel:string  = '';
    public active:boolean = false;
    public roles:Array<String> = new Array();

    constructor () {
      // super();
    }
}
