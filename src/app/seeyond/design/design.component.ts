import { Component, OnInit } from '@angular/core';
import { Feature } from '../Feature';

@Component({
  selector: 'seeyond-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  // tooltip position
  position = 'above';
  // Selected Defaults
  selectedPattern = this.feature.pattern? this.feature.pattern : 'billow';
  selectedMaterial = this.feature.material? this.feature.material : 'burnt_umber';
  patternStrength = this.feature.patternStrength? this.feature.patternStrength : 3;
  strengths = [1,2,3,4,5,6,7,8,9,10];

  constructor(private feature: Feature) { }

  ngOnInit() {
    console.log(this.feature);
  }

  public updateSelectedPattern(pattern: string) {
    console.log(pattern);
    this.selectedPattern = this.feature.pattern = pattern;

    // update the visualization
    this.feature.reloadVisualization()
  }

  public updateSelectedMaterial(material: string) {
    console.log(material);
    this.selectedMaterial = this.feature.material = material;

    // update the visualization
    this.feature.reloadVisualization()
  }

  public updatePatternStrength(strength: number) {
    console.log(strength);
    this.patternStrength = this.feature.patternStrength = strength;

    // update the visualization
    this.feature.reloadVisualization()
  }

}
