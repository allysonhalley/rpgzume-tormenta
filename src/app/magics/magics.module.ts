import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MagicsRoutingModule} from "./magics-routing.module";
import {MagicListComponent} from "./magic-list/magic-list.component";



@NgModule({
  declarations: [],
  imports: [CommonModule, MagicsRoutingModule, MagicListComponent  ]
})
export class MagicsModule { }
