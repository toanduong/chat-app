import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // ✅ Redirect to a default page (optional)
  { path: 'home', component: ChatComponent }, // Example default page
  { path: '/chat', component: ChatComponent }, // ✅ Ensure this route exists
  { path: '**', redirectTo: '/home' } // ✅ Redirect unknown routes (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }