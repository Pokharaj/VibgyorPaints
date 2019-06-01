import { FormGroup } from '@angular/forms';

export class GenericValidator {

  constructor(private validationMsg: { [key: string]: {[key: string]: string}}) {}

  validate(container: FormGroup, onsubmit: boolean): {[key: string]: string} {
    const msg = {};
    for (const cntrlkey in container.controls) {
      if (container.controls.hasOwnProperty(cntrlkey)) {
        const cntrl = container.controls[cntrlkey];
        if (cntrl instanceof FormGroup) {
          if (cntrl.errors) {
            Object.keys(cntrl.errors).map(masgkey => {
              msg[cntrlkey] = '';
              msg[cntrlkey] += this.validationMsg[cntrlkey][masgkey] + ' ';
            });
          }
          const childmsgs = this.validate(cntrl, onsubmit);
          Object.assign(msg, childmsgs);
        } else {
          if (this.validationMsg[cntrlkey]) {
            msg[cntrlkey] = '';
            if ((cntrl.dirty || cntrl.touched || onsubmit) && cntrl.errors) {
              Object.keys(cntrl.errors).map(msgkey => {
                if (this.validationMsg[cntrlkey][msgkey]) {
                  msg[cntrlkey] += this.validationMsg[cntrlkey][msgkey] + ' ';
                }
              });
            } else {
              delete msg[cntrlkey];
            }
          }
        }
      }
    }
    return msg;
  }
}
