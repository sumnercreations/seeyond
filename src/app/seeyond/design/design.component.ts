import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seeyond-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  // tooltip position
  position = 'above';
  // Selected Defaults
  selectedPattern = 'billow';
  selectedMaterial = 'burnt_umber';
  patternStrength = 3;

  constructor() { }

  ngOnInit() {
  }

  public updateSelectedPattern(pattern: string) {
    this.selectedPattern = pattern;
  }

  public updateSelectedMaterial(material: string) {
    this.selectedMaterial = material;
  }

  public updatePatternStrength(strength: number) {
    console.log(strength);
    this.patternStrength = strength;
  }

}
