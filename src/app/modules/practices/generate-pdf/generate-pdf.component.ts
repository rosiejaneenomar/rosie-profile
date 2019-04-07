import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { BookDetails, BookDetailsList } from './book-details';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.scss']
})
export class GeneratePdfComponent implements OnInit {
  data: BookDetails[] = BookDetailsList;
  sourceForm: FormGroup;
  hasCurrentEdit: boolean;

  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.processData();
  }

  initForm(data?: BookDetails): void {
    this.sourceForm = new FormGroup({
      checkInDate: new FormControl(data.checkInDate, [Validators.required]),
      checkOutDate: new FormControl(data.checkOutDate, [Validators.required]),
      hotelName: new FormControl(data.hotelName, [Validators.required]),
      roomType: new FormControl(data.roomType, [Validators.required]),
      unitPrice: new FormControl(data.unitPrice, [Validators.required]),
      qty: new FormControl(data.qty, [Validators.required]),
    });
  }

  processData() {
    this.data.map(item => {
      item['edit'] = true;
      item['totalPrice'] = this.getTotalPrice(item);
      return item;
    });
  }

  getTotalPrice(data: BookDetails): number {
    return this.getTotalDays(data) * data.unitPrice * data.qty;
  }

  onSave(index: number): void {
    this.data[index] = this.sourceForm.value;
    this.data[index]['totalPrice'] = this.getTotalPrice(this.data[index]);
    this.data[index]['edit'] = true;
    this.hasCurrentEdit = false;
  }

  onEdit(index: number) {
    this.hasCurrentEdit = true;
    this.actionSettings(this.data[index]);
    this.initForm(this.data[index]);

  }

  actionSettings(data: BookDetails): void {
    this.data.map(item => {
      if (item === data) {
        item['edit'] = false;
      } else {
        item['edit'] = true;
      }

      return item;
    });
  }

  onAddRow(): void {
    const newBookDetails = new BookDetails(new Date, new Date);
    newBookDetails['edit'] = true;
    this.hasCurrentEdit = true;

    this.data.push(newBookDetails);
    this.initForm(newBookDetails);
    this.actionSettings(newBookDetails);
  }

  onExportBilling(): void {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFont('helvetica');

    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.setFontType('bold');
    doc.setFontSize(18);
    doc.text('Cebu Islands Travel and Tours', pageWidth / 2, 20, 'center');

    doc.setFontType('normal');
    doc.setFontSize(12);
    doc.text('Room 104, NDX Commercial Complex, AS Fortuna St. Mandaue City', pageWidth / 2, 30, 'center');
    doc.text('Tel No: 032-4168892', pageWidth / 2, 40, 'center');
    doc.setFontType('bold');
    doc.setFontSize(18);
    doc.text('Billing Statement', pageWidth / 2, 55, 'center');

    doc.setFontType('normal');
    doc.setFontSize(18);
    doc.text('Code: FE-2201', 14, 65, 'left');


    const tableBody = new Array();
    let totalBilling = 0;

    for (const item of this.data) {
      const totalDays = this.getTotalDays(item);
      const arrayData = new Array();
      arrayData[0] = 'HOTEL:';
      arrayData[1] = item.hotelName;
      arrayData[2] = this.decimalPipe.transform(item['totalPrice'], '0.2-2');
      arrayData[3] =
        item.qty + ' ' + item.roomType + ' @ ' +
        item.unitPrice + ' each for ' + totalDays + ' ' + (totalDays > 1 ? 'nights' : 'night');

      totalBilling += item['totalPrice'];
      tableBody.push(arrayData);
    }

    doc.autoTable({
      startY: 75,
      head: [['', '', 'Total', 'Remarks']],
      body: [...tableBody]
    });

    doc.text('Total Billing: ' + this.decimalPipe.transform(totalBilling, '0.2-2'), 14, doc.autoTableEndPosY() + 20);

    doc.save('table.pdf');
  }

  getTotalDays(data: BookDetails): number {
    const totalDays = (data.checkOutDate.valueOf() - data.checkInDate.valueOf()) / (1000 * 3600 * 24);
    return totalDays <= 0 ? 1 : totalDays;
  }

}
