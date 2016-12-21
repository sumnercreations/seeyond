import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seeyond-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	featureTitle = 'Freestanding Curved Partition';

  constructor() { }

  ngOnInit() {
  }

}