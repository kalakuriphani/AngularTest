import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By}              from '@angular/platform-browser';
import {DebugElement}    from '@angular/core';
import {AboutComponent} from '../about/about.component';

let comp: AboutComponent;
let fixture: ComponentFixture<AboutComponent>;
let de: DebugElement;
let el: HTMLElement;

describe('AboutComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent], // declare the test component

    });

    fixture = TestBed.createComponent(AboutComponent);
    comp = fixture.componentInstance; // HomeComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;

  });

  it('should display original deliveryTime', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.appTitle);
  });

  it('should display a different deliveryTime', () => {
    let oldAppTitle = comp.appTitle;
    comp.appTitle = 'Google App';
    fixture.detectChanges();
    expect(el.textContent).toContain(oldAppTitle);
  });

});
