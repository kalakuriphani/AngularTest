import { Component } from '@angular/core';
// import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent {
  appTitle:string;
}
