import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seeyond-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
	// we will have an algorithm to figure this out.
	estimatedAmt = '$100,000.00';

	// activeTab will be determined by the seeyond-navigation component
	activeTab = 'dimensions';

	// buttonText and chevronPosition are determined by the value of activeTab
	buttonText = '';
	chevronPosition = '';

  constructor() { }

  ngOnInit() {
    switch (this.activeTab) {
      case 'dimensions':
        this.buttonText = 'step 2: design';
        this.chevronPosition = 'right';
        break;

      case 'design':
        this.buttonText = 'step 1: dimensions';
        this.chevronPosition = 'left';
        break;

      default:
        alert('Active Tab ' + this.activeTab + ' is not valid.');
      }
  }

  public updateActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
