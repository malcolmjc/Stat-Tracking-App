import 'jest-preset-angular';

import { createSpyObject } from './create-spy-object';

(global as any).createSpyObject = createSpyObject;
