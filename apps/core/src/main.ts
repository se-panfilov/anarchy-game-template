import '@/style.scss';

import { setBrowserSafeguards } from '@hellpig/anarchy-engine';

import { start } from '@/Levels/Demo';
import { WebErrorTrackingService } from '@/Services';

//Runs only for envs with defined VITE_SENTRY_DSN (productions for web, desktop, mobile)
await WebErrorTrackingService().start();

setBrowserSafeguards(window);

start();
