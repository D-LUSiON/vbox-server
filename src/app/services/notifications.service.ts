import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Notification } from '@app/models';

@Injectable()
export class NotificationsService {

    private events: Subject<any> = new Subject();

    constructor() { }

    emit(message: Notification) {
        this.events.next(message);
    }

    listener(): Observable<any> {
        return this.events.asObservable();
    }

}
