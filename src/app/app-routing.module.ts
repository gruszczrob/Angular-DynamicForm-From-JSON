import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }, { path: 'instruction', loadChildren: () => import('./instruction/instruction.module').then(m => m.InstructionModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
