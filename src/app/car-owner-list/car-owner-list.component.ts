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
  public carWithOwner: CarWithOwner;
  public list: CarWithOwner[] = [];


  constructor(private carService: CarService, private ownerService: OwnerService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe((result: any) => {
      this.owners = result._embedded.owners;
    });
    this.carService.getAll().subscribe(data => {
      for (const car of data) {
        if (car.ownerDni) {
          this.carWithOwner = car;
          console.log(this.carWithOwner);

          this.giphyService.get(this.carWithOwner.name)
            .subscribe(url => {
              this.carWithOwner.giphyUrl = url;
              for (const owner of this.owners) {
                if (this.carWithOwner.ownerDni === owner.dni) {
                  this.carWithOwner.profession = owner.profession;
                  this.carWithOwner.ownerName = owner.name;
                }
              }
            });
          this.list.push(this.carWithOwner);
        }
      }
    });

  }

}
