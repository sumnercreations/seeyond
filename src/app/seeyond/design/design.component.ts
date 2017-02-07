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
  selectedTessellation = this.feature.tessellation? this.feature.tessellation : 'billow';
  selectedMaterial = this.feature.material? this.feature.material : 'burnt_umber';
  patternStrength = this.feature.patternStrength? this.feature.patternStrength : 3;
  strengths = [1,2,3,4,5,6,7,8,9,10];

  constructor(private feature: Feature) { }

  ngOnInit() {
    console.log(this.feature);
  }

  public updateSelectedTessellation(tessellation: string) {
    console.log(tessellation);
    var tessellations: {
      0: "court",
      1: "cusp",
      2: "kink",
      3: "tilt",
      4: "billow"
    };

    switch (tessellation) {
      case "court":
        this.feature.tessellation = 0;
        break;

      case "cusp":
        this.feature.tessellation = 1;
        break;

      case "kink":
        this.feature.tessellation = 2;
        break;

      case "tilt":
        this.feature.tessellation = 3;
        break;

      case "billow":
        this.feature.tessellation = 4;
        break;

      default:
        alert(tessellation + " is not a supported tessellation");
        break;
    }
    // this.selectedTessellation = this.feature.tessellation = tessellation;
    this.selectedTessellation = tessellation;

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
