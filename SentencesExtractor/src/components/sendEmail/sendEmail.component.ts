import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MyErrorStateMatcher } from 'src/app/Helpers/MyErrorStateMatcher';
import { UserLetter } from 'src/app/Entities/UserLetter';
import { SendMailService } from 'src/services/SendMail/SendMail.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './sendEmail.component.html',
  styleUrls: [
    './sendEmail.component.css' ]
})
export class SendEmailComponent implements OnInit  {
  form: FormGroup;
  commentFormControl: FormControl;
  nameFormControl: FormControl;
  emailFormControl: FormControl;
  matcher: MyErrorStateMatcher;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
    });

    this.matcher = new MyErrorStateMatcher();
  }

  constructor(
    public dialogRef: MatDialogRef<SendEmailComponent>,
    private formBuilder: FormBuilder,
    private sendEmailService: SendMailService) {}

  close(): boolean {
    this.dialogRef.close();
    return false;
  }

  send(): void {
    const userLetter: UserLetter = new UserLetter();
    userLetter.name = this.form.get('name').value;
    userLetter.email = this.form.get('email').value;
    userLetter.comment = this.form.get('comment').value;
    // TODO сделать уведомление  об отправке / ошибке после закрытия с помощью alertify
    this.sendEmailService.sendEmailService(userLetter);
    console.log('Письмо отправлено');
    this.dialogRef.close();
  }
}
