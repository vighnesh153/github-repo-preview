import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { RepoLsComponent } from 'src/app/components/repo-ls/repo-ls.component';
import { RepoLsGuard } from 'src/app/services/repo-ls.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'repo-ls', component: RepoLsComponent, canActivate: [RepoLsGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
