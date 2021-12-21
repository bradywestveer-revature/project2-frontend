import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
	{
		path: "login",
		component: LoginComponent
	},
	
	{
		path: "register",
		component: RegisterComponent
	},
	
	{
		path: "@/:username",
		component: ProfileComponent
	},
	
	{
		path: "**",
		component: MainComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
