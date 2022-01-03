import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { MainComponent } from "./pages/main/main.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { HeaderComponent } from "./components/header/header.component";
import { PostComponent } from "./components/post/post.component";
import { CommentComponent } from "./components/comment/comment.component";
import { UserComponent } from "./components/user/user.component";
import { CreatePostComponent } from "./components/create-post/create-post.component";
import { FormsModule } from "@angular/forms";

@NgModule ({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		MainComponent,
		ProfileComponent,
		HeaderComponent,
		PostComponent,
		CommentComponent,
		UserComponent,
		CreatePostComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }