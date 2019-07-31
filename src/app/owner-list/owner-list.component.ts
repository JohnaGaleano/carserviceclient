import { Component, OnInit } from '@angular/core';
import { OwnerService } from './../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  public owners: Array<any>;
  public deleteOwners: Array<any>;

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe((data: any) => {
      this.owners = data._embedded.owners;
    });
  }

  funPrint() {
    console.log(this.deleteOwners);
  }

}
