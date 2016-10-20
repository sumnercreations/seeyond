import { Component } from '@angular/core';

@Component({
  selector: 'seeyond-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  header = 'Welcome to the Seeyond Design Tool';
  title = 'Begin by choosing the type of feature you are working on';
  features = [
	{
		type: 'wall',
		title: 'Wall Feature',
		image: 'http://dummyimage.com/300x300'
	},
	{
		type: 'wall_to_ceiling',
		title: 'Wall-to-Ceiling Feature',
		image: 'http://dummyimage.com/300x300'
	},
	{
		type: 'linear_partition',
		title: 'Freestanding Linear Partition',
		image: 'http://dummyimage.com/300x300'
	},
	{
		type: 'curved_partition',
		title: 'Freestanding Curved Partition',
		image: 'http://dummyimage.com/300x300'
	}
  ]
}
