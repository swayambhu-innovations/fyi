import { Component } from '@angular/core';
import { HeaderWithBackComponent } from '../sharedComponent/header-with-back/header-with-back.component';
import { NavbarComponent } from '../sharedComponent/navbar/navbar.component';
import { TaxComponent } from './tax/tax.component';
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component"; 
import { Router } from '@angular/router';
import { EventComponent } from "./event/event.component";
import { NgIf } from '@angular/common';
import { AreaComponent } from "./area/area.component";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { DonationComponent } from "./donation/donation.component";


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [HeaderWithBackComponent, NavbarComponent, TaxComponent, HeaderWithMenuComponent, EventComponent, NgIf, AreaComponent, CatalogueComponent, DonationComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
selected=""
  constructor(private router: Router) {}
  submit(select:string){
    this.selected=select;
  }
}
