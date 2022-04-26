import { NgModule } from "@angular/core";
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { ShoppingListService } from './shoppoing-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import  { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [
        ShoppingListService, 
        RecipeService, 
        {provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptorService, 
        multi: true}
    ],
    
})
export class CoreModule{

}