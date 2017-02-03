import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seeyond-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  // tooltip position
  position = 'above';

  // slider settings
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 1;
  showTicks = true;
  tickInterval = 1;
  step = 1;
  thumbLabel = true;
  patternStrength = 1;
  vertical = false;

  selectedPattern = 'billow';
  selectedMaterial = 'burnt_umber';

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
