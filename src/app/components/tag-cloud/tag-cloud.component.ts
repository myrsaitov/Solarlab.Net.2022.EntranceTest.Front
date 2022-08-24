import { Component } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'tag-cloud.component',
  templateUrl: './tag-cloud.component.html'
})
export class TagCloudComponent  {
  
  options: CloudOptions = {
    width : 0.8,
    height : 400,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: .3
    },
    realignOnResize: true
  };

  data: CloudData[] = [
    {
      "text": "w1-color-link-ext",
      "weight": 1,
      "color": "#3a3e02",
      "link": "http://example.org",
      "external": true,
      "rotate": 0,
      "tooltip": "tooltip w1-color-link-ext"
    },
    {
      "text": "w4-color-link",
      "weight": 4,
      "color": "#4590fe",
      "link": "http://example.org",
      "rotate": 0,
      "tooltip": "tooltip w4-color-link"
    }
  ];

}
