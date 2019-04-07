import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { GeneratePdfRoutingModule } from './generate-pdf-routing.module';
import { GeneratePdfComponent } from './generate-pdf.component';
import { PdfComponent } from './pdf/pdf.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GeneratePdfComponent, PdfComponent],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    GeneratePdfRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DecimalPipe]
})
export class GeneratePdfModule { }
