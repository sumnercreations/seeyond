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

  acoustic_foam: boolean;

  constructor(
    public feature: Feature
  ) { }

  ngOnInit() {
    this.acoustic_foam = this.feature.acoustic_foam;
  }

  public updateSelectedTessellation(tessellation: number) {
    this.selectedTessellation = this.feature.tessellation = tessellation;
    // update the visualization
    this.feature.reloadVisualization();
  }

  public updateSelectedMaterial(material: string) {
    this.selectedMaterial = this.feature.material = material;
    this.feature.sheet_part_id = this.feature.felt_sheet_mapping[material];
    // update the visualization
    this.feature.redrawVisualization();
  }

  public updatePatternStrength(strength: number) {
    this.pattern_strength = this.feature.pattern_strength = strength;

    // update the visualization
    this.feature.reloadVisualization();
  }

  public updateAcousticFoam() {
    this.feature.updateAcousticFoam(this.acoustic_foam);
  }

}
