export class Notification {
    title: string = '';
    message: string = '';
    severity: string = 'default'; // default | info | success | wait | error | warning
    data?: { [key: string]: any } = {};

    constructor(data?) {
        if (data) {
            this.title = data.title;
            this.message = data.message;
            this.data = data.data;
        }
    }
}
