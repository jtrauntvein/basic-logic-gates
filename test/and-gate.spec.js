const { describe, test, expect } = require("@jest/globals");
const { AndGate, AndGateN, NandGate } = require("../basic-gates.js");

describe("and gate tests", () => {
   test("logic values", () => {
      const gate = new AndGate();
      gate.set([ false, false ]);
      expect(gate.evaluate()).toEqual([ false && false ]);
      gate.set([ false, true ]);
      expect(gate.evaluate()).toEqual( [ false && true ]);
      gate.set([ true, false ]);
      expect(gate.evaluate()).toEqual([ false && true ]);
      gate.set([ true, true ])
      expect(gate.evaluate()).toEqual( [ true && true ]);
   });

   describe("configurable and gate tests", () => {
      const gate = new AndGateN(4);
      gate.set([ false, false, false, false ]);
      expect(gate.evaluate()).toEqual( [ false ]);
      gate.set([ true, true, true, true ]);
      expect(gate.evaluate()).toEqual([ true ]);
   })

   describe("NAND gate tests", () => {
      test("logic values", () => {
         const gate = new NandGate();
         gate.set(false, 0);
         gate.set(false, 1);
         expect(gate.evaluate()).toEqual([ !(false && false) ]);
         gate.set(true, 1);
         expect(gate.evaluate()).toEqual([ !( false && true) ]);
         gate.set(true, 0);
         gate.set(false, 1);
         expect(gate.evaluate()).toEqual([ !(true && false) ]);
         gate.set(true, 1);
         expect(gate.evaluate()).toEqual([ !( true && true) ]);
      })
   });
   
   test("and gate event handling", () => {
      const gate = new AndGate();
      let changed_count = 0;
      gate.on(() => ++changed_count);
      gate.set(false, 0);
      expect(changed_count).toBe(0);
      gate.set(false, 1);
      expect(changed_count).toBe(0);
      gate.set(true, 0);
      expect(changed_count).toBe(1);
   });
});
