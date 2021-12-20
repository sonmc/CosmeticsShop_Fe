import { BlogDetailComponent } from "./blog-detail.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: BlogDetailComponent,
    data: {
      title: "BlogDetailComponent",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogDetailRoutingModule {}
