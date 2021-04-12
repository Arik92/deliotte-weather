import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';

export interface city {
  name: string,
  temperature: number,
  description: string,
  unit: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  citySubscription: Subject<city[]> = new Subject();
  cityList: city[] = [];
  apiKey: string = '';


  constructor() { }  

  determineUnitMethod(name: string) { // metric = Celsius, imperial = Fahrenheit, standard = kelvin?

    switch (name) {
      case 'metric':
        return 'C';        
      case 'standard':
        return 'K'; 
      case 'imperial':
        return 'F';        

      default: return 'K';
    }
  }
  
  async getWeatherInCity(cityName: string, chosenUnit: string) {
    try {      
      const weatherReq = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + this.apiKey + '&units=' + chosenUnit);
      const responseData = weatherReq.data;

      const cityObj: city = {
        name: responseData.name,
        temperature: responseData.main.temp,
        description: responseData.weather[0].description,
        unit: this.determineUnitMethod(chosenUnit)
      };
      this.cityList.push(cityObj);
      this.citySubscription.next(this.cityList);

    } catch(error) {
      console.log('error fetching weather data: ', error);
    }
    
    
  }
}
