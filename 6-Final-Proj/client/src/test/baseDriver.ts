import { RenderResult } from "@testing-library/react";
import { configure } from "@testing-library/react";

export abstract class BaseDriver {
    protected wrapper?: RenderResult;

    constructor() {
        configure({testIdAttribute: 'data-hook'});
    }
  
    withWrapper(hook: string) {
      if (!this.wrapper) {
        throw new Error('Component must be rendered before accessed!');
      }
  
      return this.wrapper.getByTestId(hook);
    }
  }