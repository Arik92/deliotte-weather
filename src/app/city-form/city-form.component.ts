import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { WeatherService } from '../weather.service';

export function customUnitValidator(): ValidatorFn {
  return (control: AbstractControl): null | ValidationErrors => {
    const value: string = control.value;
    const isMetric = value.toLowerCase().localeCompare('metric') === 0;
    const isStandard = value.toLowerCase().localeCompare('standard') === 0;
    const isImperial = value.toLowerCase().localeCompare('imperial') === 0;

    const isValidUnit = isMetric || isStandard || isImperial;
    
    return isValidUnit ? null: { invalidUnitErr: true };
  }
}
@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})


export class CityFormComponent implements OnInit {
  cityForm: FormGroup;
  cityOptions: string [] = [
    'jerusalem',
    'tokyo',
    'kiev',
    'new york',
    'london',
    'madrid'
  ];
  
  constructor(private fb: FormBuilder, private weather: WeatherService) { }

  ngOnInit() {
    this.cityForm = this.fb.group({
      cityControl: new FormControl(this.cityOptions[0]),
      unitControl: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.pattern(/\w+/), customUnitValidator()]) 
    });    
  }

  async addCity() {    
    await this.weather.getWeatherInCity(this.cityForm.value.cityControl, this.cityForm.value.unitControl);
  }

}
