import { Component, OnInit, Input } from '@angular/core';
import { BookDetails } from '../book-details';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  @Input()
  data: any;

  totalBill = 0;

  constructor() { }

  ngOnInit() {

    for (const item of this.data) {
      this.totalBill += item.totalPrice;
    }
  }

}
