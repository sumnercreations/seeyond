import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SeeyondService } from '../seeyond.service';
import { Router } from '@angular/router';

@Component({
  selector: 'seeyond-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(private service: SeeyondService, public router: Router) { }

  ngOnInit() {
  }

  saveFeature(id: number, uid: number) {
    console.log('saving feature: ' + id);
    this.service.updateFeature(id, uid);
  }

  loadFeature(id: number) {
    console.log('loading feature: ' + id);
    let serviceResponse = this.service.loadFeature(id).subscribe((res: Response) => {
      let loadedFeature = res.json();
      console.log(loadedFeature);
      this.router.navigate(['/feature', loadedFeature.name, loadedFeature.id]);
    });
  }

}
