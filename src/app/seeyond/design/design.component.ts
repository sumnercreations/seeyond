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
  pattern_strength = this.feature.pattern_strength;
  strengths = [1,2,3,4,5,6,7,8,9,10];

  acousticFoam: boolean;

  constructor(private feature: Feature) { }

  ngOnInit() {
    this.acousticFoam = this.feature.acousticFoam;
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
    this.pattern_strength = this.feature.pattern_strength = strength;

    // update the visualization
    this.feature.reloadVisualization();
  }

  public updateAcousticFoam() {
    // this.feature.acousticFoam = this.acousticFoam;
    this.feature.updateAcousticFoam(this.acousticFoam);
  }

}
