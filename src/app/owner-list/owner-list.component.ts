import { Component, OnInit } from '@angular/core';
import { OwnerService } from './../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  public owners: Array<any>;
  public deleteOwners: Array<any>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService,
  ) { }

  ngOnInit() {
    this.deleteOwners = [];
    this.ownerService.getAll().subscribe((data: any) => {
      this.owners = data._embedded.owners;
    });
  }

  onChange(owner) {
    this.deleteOwners.push(owner);
  }

  delete() {
    for (const owner of this.deleteOwners) {
      this.ownerService.remove(owner._links.self.href).subscribe(result => {
        const dni = owner.dni;
        this.carService.getAll().subscribe((data) => {
          for (const car of data) {
            if (car.ownerDni === dni) {
              car.ownerDni = null;
              this.carService.save(car).subscribe(() => {
              });
            }
          }
        });
        this.gotoList();
      });
    }
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

}
