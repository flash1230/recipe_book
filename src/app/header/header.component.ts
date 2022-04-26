import { Component, OnDestroy, OnInit, } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component(
    {
        selector: 'app-header',
        templateUrl: './header.component.html'
    }
)
export class HeaderComponent implements OnInit, OnDestroy{
    private userSub: Subscription;
    isAuthenticated= false;

    

    constructor(private datastorageservice: DataStorageService,
                private authservice: AuthService){}
    
                ngOnInit(){
                    this.userSub = this.authservice.user.subscribe(
                        user=>{
                        this.isAuthenticated =!!user;
                        console.log(this.isAuthenticated);
                        }
                    );
            
                }

    onsave(){
        this.datastorageservice.storerecipes();
    }
    onfetch(){
        this.datastorageservice.fetchrecipes().subscribe();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();

    }

    onlogout(){
        this.authservice.logout();
    }
}