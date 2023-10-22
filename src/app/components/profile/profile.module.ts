import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileRoutingModule } from "./products-routing.module";
import { InputTextModule } from "primeng/inputtext";
import { ProfileComponent } from "./profile.component";
import { FileUploadModule } from "primeng/fileupload";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FileUploadModule, DropdownModule, ProfileRoutingModule],
})
export class ProfileModule {}
