import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from './../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { CarWithOwner } from '../models/carAndowner.model';


@Component({
  selector: 'app-car-owner-list',
  templateUrl: './car-owner-list.component.html',
  styleUrls: ['./car-owner-list.component.css']
})
export class CarOwnerListComponent implements OnInit {
  public cars = [];
  public owners: Array<any>;
  public list: Array<any>;

  constructor(private carService: CarService, private ownerService: OwnerService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.list = [];
    this.ownerService.getAll().subscribe((result: any) => {
      this.owners = result._embedded.owners;
      this.carService.getAll().subscribe(data => {
        for (const car of data) {
          if (car.ownerDni) {
            this.giphyService.get(car.name)
              .subscribe(url => {
                car.giphyUrl = url;
                for (const owner of this.owners) {
                  if (car.ownerDni === owner.dni) {
                    this.list.push({
                      carName: car.name,
                      ownerDni: car.ownerDni,
                      ownerName: owner.name,
                      profession: owner.profession,
                      giphyUrl: car.giphyUrl
                    });
                  }
                }
              });
          }
        }
      });
    });

  }
}
