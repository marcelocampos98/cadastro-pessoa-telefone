import { OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ template: '' })
export class BaseComponent implements OnDestroy {
    protected subscription = new Subscription();

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
