import { Component, OnInit } from '@angular/core';
import { Feature } from '../feature';

@Component({
  selector: 'seeyond-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private feature: Feature) { }

  ngOnInit() {
  }

}
