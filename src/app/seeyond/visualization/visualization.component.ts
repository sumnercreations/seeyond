import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seeyond-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  constructor() { }

ngOnInit() {
    var syd_t = require( 'syd-tessellation' );
    var syd_v = require( 'syd-visualization' );
    
    syd_t.QT.UpdateFeature();
    var data = syd_t.QT.GetTessellationArray();
    syd_v.QT.Visualization.visualizeWall(data, 8, 6, 0x80ff00);
  }
}