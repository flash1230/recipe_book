import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth/auth.guard";

const appRoutes: Routes = [ 
    { path:'', redirectTo: '/recipes', pathMatch: 'full'},
    { path:'recipes', 
    loadChildren: () => import('./recipes/recipe.module').then(m=> m.RecipesModule) },
    { path:'shopping-list', canActivate: [AuthGuard],
    loadChildren: () => import('./shoppoing-list/shopping-list.module').then(m=> m.ShoppingListModule) },
    { path:'auth', 
    loadChildren: () => import('./auth/auth/auth.module').then(m=> m.AuthModule) }
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule {

}