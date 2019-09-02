import 'jest-preset-angular';

import { createSpyObject } from './create-spy-object';

const globalVar = (global as any);

globalVar.createSpyObject = createSpyObject;
globalVar.console = {
  ...globalVar.console,
  log: jest.fn() // calls to console.log will be ignored in tests
};
