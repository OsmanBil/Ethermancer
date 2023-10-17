import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NgForm } from '@angular/forms';
import { SubscribeService } from '../../services/subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {

  constructor(private subscribeService: SubscribeService, private toastService: ToastService) { }

  email: string = '';
  emailLength: number = 0;
  emailValid: boolean = false;

  public showToast: boolean = false;

  show() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000); // The toast will disappear after 3 seconds
  }

  handleEmailChange(newValue: string): void {
    if (newValue !== null && newValue !== undefined) {
      this.emailLength = newValue.length;
      // Check for a valid email format
      this.emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newValue);
    }
  }

  submitForm(form: NgForm): void {
    const data = {
      email: this.email,
    };

    this.subscribeService.sendSubscribeForm(data).subscribe(
      response => {
        console.log("Formulardaten erfolgreich gesendet:", response);

        // Reset the form data

        this.email = '';



        this.emailLength = 0;



        // Reset the form and its validation
        form.resetForm();



      },
      error => {
        form.resetForm();


      }
    );
  }




}
