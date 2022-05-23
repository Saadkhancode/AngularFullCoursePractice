import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
} )
export class HeaderComponent implements OnInit ,OnDestroy{
  isAuthenticated=false;
  userSubsz!:Subscription;
  constructor(private dataStore:DataStorageService,private authService:AuthService) {}

  ngOnInit(): void {
  this.userSubsz=  this.authService.user.subscribe(user=>{
    console.log(!user);
    console.log('!!user: ', !!user);
    this.isAuthenticated=!!user;
  }); 
}
  onSaveData() {
    this.dataStore.storeRecipes();

  }
  onFetchData() {
    this.dataStore.fetchRecipes().subscribe();
 
 }
 ngOnDestroy(): void {
     this.userSubsz.unsubscribe();
 }
 }