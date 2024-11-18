const { AndGate, NotGate } = require("../src/basic-gates.js");
const { describe, test, expect } = require("@jest/globals");

class ComposedGate {
   #input_gate;
   #output_gate;

   constructor() {
      this.#input_gate = new AndGate();
      this.#output_gate = new NotGate();
      this.#input_gate.on((value, channel) => this.#output_gate.set(value, 0));
   }

   set(value, channel) {
      this.#input_gate.set(value, channel);
      return this.#output_gate.evaluate();
   }

   on(handler, channel) {
      this.#output_gate.on(handler, channel);
   }

   evaluate() {
      return this.#output_gate.evaluate();
   }
};

describe("NAND composed gate", () => {
   test("composed gate returns same results as NAND", () => {
      const gate = new ComposedGate();
      gate.set(false, 0);
      gate.set(false, 1);
      expect(gate.evaluate()).toEqual([ !(false && false) ]);
      gate.set(true, 1);
      expect(gate.evaluate()).toEqual([ !( false && true )]);
      gate.set(true, 0);
      gate.set(false, 1);
      expect(gate.evaluate()).toEqual([ !(true && false) ]);
      gate.set(true, 1);
      expect(gate.evaluate()).toEqual([ !(true && true) ]);
   });
});
