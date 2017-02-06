import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'seeyond-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() activeTab: String = 'dimensions';
  @Output() activeTabEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
}
