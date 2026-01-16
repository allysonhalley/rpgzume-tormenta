import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeaturesRoutingModule} from "./features-routing.module";
import {FeatureListComponent} from "./feature-list/feature-list.component";



@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, FeatureListComponent]
})
export class FeaturesModule { }
