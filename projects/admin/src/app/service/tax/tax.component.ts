import { Component } from '@angular/core';
import { NavbarComponent } from '../../sharedComponent/navbar/navbar.component';
import { NgFor } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-tax',
  standalone: true,
  imports: [NavbarComponent,NgFor,MatSlideToggleModule],
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.scss',
})
export class TaxComponent {
  taxes = [
    {
      taxName: 'CGST',
      taxType: 'percentage',
      taxRate: 18,
      active: true,
    },
    {
      taxName: 'CGST',
      taxType: 'percentage',
      taxRate: 18,
      active: true,
    },
    {
      taxName: 'CGST',
      taxType: 'percentage',
      taxRate: 18,
      active: true,
    },
    {
      taxName: 'CGST',
      taxType: 'percentage',
      taxRate: 18,
      active: true,
    },
  ];
}
