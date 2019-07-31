import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service'
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
  public owner: any = {};
  public sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              private carService: CarService,
              private giphyService: GiphyService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      const dni = params.dni;
      if (dni) {
        this.ownerService.getAll().subscribe((owners: any) => {
          for (const owner of owners._embedded.owners) {
            if (owner.dni === dni) {
              this.owner = owner;
              this.owner.href = owner._links.self.href;
            }
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(owner: any) {
    this.ownerService.remove(owner.href).subscribe(result => {
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
