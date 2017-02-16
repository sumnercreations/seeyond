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
    // switch (tessellation) {
    //   case "court":
    //     this.feature.tessellation = 0;
    //     break;

    //   case "cusp":
    //     this.feature.tessellation = 1;
    //     break;

    //   case "kink":
    //     this.feature.tessellation = 2;
    //     break;

    //   case "tilt":
    //     this.feature.tessellation = 3;
    //     break;

    //   case "billow":
    //     this.feature.tessellation = 4;
    //     break;

    //   default:
    //     alert(tessellation + " is not a supported tessellation");
    //     break;
    // }
    this.selectedTessellation = this.feature.tessellation = tessellation;

    // update the visualization
    this.feature.reloadVisualization()
  }

  public updateSelectedMaterial(material: string) {
    this.selectedMaterial = this.feature.material = material;
    // // image file path
    // this.feature.material = '/assets/images/materials/' + material + '.jpg';
    // update the visualization
    this.feature.reloadVisualization()
  }

  public updatePatternStrength(strength: number) {
    this.patternStrength = this.feature.patternStrength = strength;

    // update the visualization
    this.feature.reloadVisualization()
  }

}
