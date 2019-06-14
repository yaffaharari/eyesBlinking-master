import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';


const modules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  declarations: [],
  imports: [
    ...modules,
    CommonModule
  ],
  exports: modules
})
export class MaterialModule {

}
