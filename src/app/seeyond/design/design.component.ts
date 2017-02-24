import { Component, OnInit } from '@angular/core';
import { Feature } from '../feature';

@Component({
  selector: 'seeyond-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  // tooltip position
  position = 'above';
  // Selected Defaults
  selectedTessellation = this.feature.tessellation;
  selectedMaterial = this.feature.material;
  patternStrength = this.feature.patternStrength? this.feature.patternStrength : 3;
  strengths = [1,2,3,4,5,6,7,8,9,10];

  constructor(private feature: Feature) { }

  ngOnInit() {
  }

  public updateSelectedTessellation(tessellation: number) {
    this.selectedTessellation = this.feature.tessellation = tessellation;
    // update the visualization
    this.feature.reloadVisualization();
  }

  public updateSelectedMaterial(material: string) {
    this.selectedMaterial = this.feature.material = material;
    // update the visualization
    this.feature.reloadVisualization();
  }

  public updatePatternStrength(strength: number) {
    this.patternStrength = this.feature.patternStrength = strength;

    // update the visualization
    this.feature.reloadVisualization();
  }

}
