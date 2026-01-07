import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './post/index/index.component';
import { ViewComponent } from './post/view/view.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';


const routes: Routes = [
  {path:"",component:IndexComponent},
  { path: 'post/index', component: IndexComponent },
    { path: 'post/:postId/view', component: ViewComponent },
    { path: 'post/create', component: CreateComponent,canDeactivate:[UnsavedChangesGuard]},
    { path: 'post/:postId/edit', component: EditComponent,canDeactivate:[UnsavedChangesGuard]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
