import {Component, NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {IndexRoutingModule} from "./index-routing.module";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {}

@NgModule({
  declarations: [],
  imports: [CommonModule, IndexRoutingModule]
})
export class IndexModule {}
