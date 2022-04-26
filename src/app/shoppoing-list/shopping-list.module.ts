
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppoingListComponent } from "./shoppoing-list.component";

@NgModule({
declarations: [
    ShoppoingListComponent,
    ShoppingEditComponent,
],
imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
    { path: '', component: ShoppoingListComponent },
    ])
]
})
export class ShoppingListModule{
}