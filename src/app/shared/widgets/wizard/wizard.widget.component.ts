import { ObjectLayoutWidget } from "angular2-schema-form";
import { Component } from "@angular/core";

@Component({
  selector: "wizard-widget",
  template:require('./wizard.widget.component.html') ,
  styles: [require("./wizard.widget.component.css")]
})
export class WizardWidgetComponent extends ObjectLayoutWidget {
  private currentPage = null;

  ngOnInit() {
    this.currentPage = 0;
  }

  nextPage() {
    if (this.hasNextPage())
      ++this.currentPage;
  }

  previousPage() {
    if (this.currentPage>0)
      --this.currentPage;
  }

  hasPreviousPage() {
    return this.currentPage > 0;
  }

  hasNextPage() {
    return this.currentPage + 1 < this.schema.fieldsets.length;
  }

}
