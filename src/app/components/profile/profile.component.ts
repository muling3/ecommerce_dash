import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { FileUploadHandlerEvent } from "primeng/fileupload";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent {
  constructor(private messageService: MessageService) {
    this.genderOpts = [
      { name: "MALE", code: "M" },
      { name: "FEMALE", code: "F" },
      { name: "OTHER", code: "O" },
    ];
  }

  genderOpts: any[];
  submitting: boolean = false;
  editDetails: boolean = true;
  firstName: string | undefined;

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl("Alexander"),
      lastName: new FormControl("Muli"),
      middleName: new FormControl("Mulinge"),
      userName: new FormControl("alexam"),
      email: new FormControl("alexandermuli4@gmail.com", [Validators.email]),
      phoneNumber: new FormControl("0702051060"),
      gender: new FormControl({ name: "MALE", code: "M" }),
      mainImage: new FormControl(""),
    });
  }

  onMainImageFileUpload(event: FileUploadHandlerEvent) {
    this.messageService.add({
      severity: "info",
      detail: "Product Images upload",
      summary: "All product images will be uploaded on submit",
    });
  }

  profileFormSubmit(): void {}

  get profileFormValue() {
    return this.profileForm.value;
  }

  editFormClick(): void {
    this.editDetails = !this.editDetails;
    if (this.editDetails) {
      this.profileForm.setValue({
        firstName: "Alexander",
        lastName: "Muli",
        middleName: "Mulinge",
        userName: "alexam",
        email: "alexandermuli4@gmail.com",
        phoneNumber: "0702051060",
        gender: { name: "MALE", code: "M" },
        mainImage: "",
      });
    }
  }
}
