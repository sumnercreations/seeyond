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
  selectedTessellation = 'billow';
  selectedMaterial = 'burnt_umber';
  patternStrength = this.feature.patternStrength? this.feature.patternStrength : 3;
  strengths = [1,2,3,4,5,6,7,8,9,10];

  constructor(private feature: Feature) { }

  ngOnInit() {
  }

  public updateSelectedTessellation(tessellation: string) {
    console.log(tessellation);

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
    this.selectedTessellation = tessellation;

    // update the visualization
    this.feature.reloadVisualization()
  }

  public updateSelectedMaterial(material: string) {
    console.log(material);
    this.selectedMaterial = material;
    // image file path
    this.feature.material = '/assets/images/materials/' + material + '.jpg';
    // pantone backup
    // switch (material) {
    //   // 7589 U
    //   case "burnt_umber":
    //     this.feature.material = 0x5C4738;
    //     break;
    //   // 7529 U
    //   case "cashmere":
    //     this.feature.material = 0xB7A99A;
    //     break;
    //   // 2334 U
    //   case "cast":
    //     this.feature.material = 0x6C6463;
    //     break;
    //   // Cool Gray 11 U
    //   case "dark_gray":
    //     this.feature.material = 0x53565A;
    //     break;
    //   // Black U
    //   case "ebony":
    //     this.feature.material = 0x2D2926;
    //     break;
    //   // 427 U
    //   case "nickel":
    //     this.feature.material = 0xD0D3D4;
    //     break;
    //   // 418 U
    //   case "ore":
    //     this.feature.material = 0x51534A;
    //     break;
    //   // Warm Gray 1 CP
    //   case "zinc":
    //     this.feature.material = 0xD7D2CB;
    //     break;

    //   default:
    //     alert(material + " is not a supported material");
    //     break;
    // }

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
