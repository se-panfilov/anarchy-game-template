import type { TFromMenuEvent, TMenuOptions, TToMenuEvent } from '@Shared';
import type { Observable, Subject } from 'rxjs';

//Suppress TS check for menu app (assume it's always "any")
export const initMenuApp: (id: string, fromMenuEventsBus$: Subject<TFromMenuEvent>, toMenuEventsBus$: Observable<TToMenuEvent>, options?: TMenuOptions) => Promise<void>;
export default {};
