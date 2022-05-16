
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EmitService {
    public _eventEmit: EventEmitter<any> = new EventEmitter();
    public get eventEmit(): EventEmitter<any> {
        if (this._eventEmit === null) {
            this._eventEmit = new EventEmitter();
        }
        return this._eventEmit;
    }
}
