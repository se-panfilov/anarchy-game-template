import type { TFromGuiEvent, TToGuiEvent } from '@Shared';
import { Subject } from 'rxjs';

export const fromGuiEventsBus$: Subject<TFromGuiEvent> = new Subject<TFromGuiEvent>();
export const toGuiEventsBus$: Subject<TToGuiEvent> = new Subject<TToGuiEvent>();
