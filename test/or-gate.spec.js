const { describe, test, expect } = require("@jest/globals");
const { OrGate, NorGate } = require("../basic-gates.js");

describe("OR gate tests", () => {
   test("logic values", () => {
      const gate = new OrGate();
      gate.set(false, 0);
      gate.set(false, 1);
      expect(gate.evaluate()).toEqual([ false || false ]);
      gate.set(true, 1);
      expect(gate.evaluate()).toEqual( [ false || true ]);
      gate.set(true, 0);
      gate.set(false, 1);
      expect(gate.evaluate()).toEqual([ true || false ]);
      gate.set(true, 1);
      expect(gate.evaluate()).toEqual( [ true || true ]);
   });
});

describe("NOR gate tests", () => {
   test("logic values", () => {
      const gate = new NorGate();
      gate.set(false, 0);
      gate.set(false, 1);
      expect(gate.evaluate()).toEqual([ !(false || false) ]);
      gate.set(true, 1);
      expect(gate.evaluate()).toEqual([ !( false || true) ]);
      gate.set(true, 0);
      gate.set(false, 1);
      expect(gate.evaluate()).toEqual([ !(true || false) ]);
      gate.set(true, 1);
      expect(gate.evaluate()).toEqual([ !( true || true) ]);
   })
});
