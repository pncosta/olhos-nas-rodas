import { Component, OnInit } from '@angular/core';
import { Event } from '../events/event';
import { EventService } from '../events/event.service';
import { DistrictService } from '../districts/district.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService,
    private ds: DistrictService) { }

  ngOnInit() {

  }

  populate() {
    this.ds.populateDistricts();
  }

  
}
