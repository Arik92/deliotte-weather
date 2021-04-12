import { Component, OnInit } from '@angular/core';
import { WeatherService, city } from '../weather.service';
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cityList: city[];

  constructor(private weather: WeatherService) { }

  ngOnInit() {
    this.weather.citySubscription.subscribe(newCityList => {
      this.cityList = newCityList;
    });
  
  }

}
