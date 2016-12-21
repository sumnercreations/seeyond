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
	buttonText = 'step 2: design';
	chevronPosition = 'right';

  constructor() { }

  ngOnInit() {
  }

}
