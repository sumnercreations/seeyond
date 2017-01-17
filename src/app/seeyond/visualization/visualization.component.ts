import { Component, OnInit } from '@angular/core';
import { Feature } from '../Feature';

@Component({
  selector: 'seeyond-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  constructor(private feature: Feature) { }

ngOnInit() {
  }
}
