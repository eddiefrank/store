import { Cursor } from './cursor';
import { tap, take } from 'rxjs/operators';

export class Update {
    constructor(action: (state: any) => void, wrapToWithMutations: boolean = true) {
        let updated = false;
        let actionWrapper = function (state) {
            if (updated) {
                return;
            }

            const cursor = Cursor.bind(this).call(this);

            updated = true;
            try {
                if (wrapToWithMutations) {
                    cursor.withMutations((state: any) => {
                        action(state);
                    });
                } else {
                    action(cursor);
                }
            } catch (exception) {
                console.error(exception);
            }

        }.bind(this);

        (<any>this).pipe(
            tap(actionWrapper),
            take(1)
        ).subscribe();

        return this;
    }
}

export interface UpdateSignature<T> {
    <R>(action: (state: T) => void, wrapToWithMutations?: boolean): R;
}