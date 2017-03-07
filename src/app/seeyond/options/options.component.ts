import { Component, OnInit } from '@angular/core';
import { Feature } from '../feature';

@Component({
  selector: 'seeyond-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  boxCost: number;
	estimatedAmt: number;

	// activeTab will be determined by the seeyond-navigation component
	activeTab = 'dimensions';

	// buttonText and chevronPosition are determined by the value of activeTab
	buttonText = '';
	chevronPosition = '';
  buttonLink = '';

  constructor(private feature: Feature) {
  }

  ngOnInit() {
    this.updateActiveTab(this.activeTab);
    this.estimatedAmt = this.feature.getFormattedAmount();
  }

  onFeatureUpdated() {
    console.log("$$$$$ Feature Updated $$$$$");
    this.estimatedAmt = this.feature.updateEstimatedAmount();
  }

  public updateActiveTab(tab: string) {
    this.activeTab = tab;
    switch (this.activeTab) {
      case 'dimensions':
        this.buttonText = 'step 2: design';
        this.chevronPosition = 'right';
        this.buttonLink = 'design';
        break;

      case 'design':
        this.buttonText = 'step 1: dimensions';
        this.chevronPosition = 'left';
        this.buttonLink = 'dimensions';
        break;

      default:
        alert('Active Tab ' + this.activeTab + ' is not valid.');
    }
  }
}
