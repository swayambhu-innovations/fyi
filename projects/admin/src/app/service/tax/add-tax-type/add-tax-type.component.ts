import { Component } from '@angular/core';
import { TaxService } from '../service/tax.service';
@Component({
  selector: 'app-add-tax-type',
  standalone: true,
  imports: [],
  templateUrl: './add-tax-type.component.html',
  styleUrl: './add-tax-type.component.scss',
  providers:[TaxService],

})
export class AddTaxTypeComponent {
  constructor(private taxService:TaxService) {}
  ngOnInit() {
    console.log('add tax type component')
    this.taxService.addTax(
      {
        taxName: "CGST",
        taxType: "percentage",
        taxRate: 18,
        active : true
      }
    )
    this.taxService.getTax().subscribe((data:any)=>{
      console.log(data);
    })
  }
  
}
