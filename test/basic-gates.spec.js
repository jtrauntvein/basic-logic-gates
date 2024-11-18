const { TruthTableGate } = require("../src/truth-table-gate.js");
const { describe, test, expect } = require("@jest/globals");

describe("test error handling for basic truth table gate", () => {
   test("throws an exception without an array", () => {
      expect(() => {
         const test = new TruthTableGate(null)
      }).toThrow();
   });
   test("throws an exception for missing inputs", () => {
      expect(() => {
         const truth_table = [
            { outputs: [ false ]}
         ];
         const test = new TruthTableGate(truth_table);
      }).toThrow();
   });
   test("throws an exception for inconsistent inputs", () => {
      expect(() => {
         const truth_table = [
            { inputs: [false, false], outputs: [ false ] },
            { inputs: [false], outputs: [ false ] }
         ];
         const test = new TruthTableGate(truth_table);
      }).toThrow();
   });
   test("throws an exception for inconsistent outputs", () => {
      expect(() => {
         const truth_table = [
            { inputs: [ false, false ], outputs: [ true ] },
            { inputs: [ false, true ], outputs: [ false, true ] }
         ];
         const test = new TruthTableGate(truth_table);
      });

   });
   test("throws an exception for missing table entry", () => {
      expect(() => {
         const truth_table = [
            { inputs: [ false, false ], outputs: [ false ] },
            { inputs: [ true, false ], outputs: [ false ]},
            { inputs: [ true, true ], outputs: [ false ] }
         ];
         truth_table.set(true, 1);
      }).toThrow();
   })
});
