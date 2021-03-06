import { NgModule } from "@angular/core";
import { RouterModule, Routes, UrlSegment } from "@angular/router";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";
import { LoginComponent } from "./pages/login/login.component";
import { MainComponent } from "./pages/main/main.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";

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
		path: "reset-password",
		component: ResetPasswordComponent
	},

	{
		path: "change-password",
		component: ChangePasswordComponent
	},
	
	{
		matcher: url => {
			if (url.length === 1) {
				const matches = url [0].path.match (/@(\w+)/);
				
				if (matches !== null) {
					return {
						consumed: url,
						
						posParams: {
							username: new UrlSegment (matches [1], {})
						}
					};
				}
			}
			
			return null;
		},
		
		component: ProfileComponent
	},
	
	{
		path: "**",
		component: MainComponent
	}
];

@NgModule ({
	imports: [RouterModule.forRoot (routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }