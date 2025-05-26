const { TruthTableGate } = require("./truth-table-gate");

/**
 * Defines the Not (logical complement) operator
 * @type {import("./truth-table-gate").GateInterface} Implements the gate interface
 */
class NotGate extends TruthTableGate {
   constructor() {
      const truth_table = [
         { inputs: [ false ], outputs: [ true ] },
         { inputs: [ true ], outputs: [ false ]}
      ];
      super(truth_table);
   }
};

/**
 * Defines a two input AND gate operator
 * @type {import("./truth-table-gate").GateInterface} Implements the gate interface
 */
class AndGate extends TruthTableGate {
   constructor() {
      const truth_table = [
         { inputs: [ false, false ], outputs: [ false ] },
         { inputs: [ false, true ], outputs: [ false ] },
         { inputs: [ true, false ], outputs: [ false ] },
         { inputs: [ true, true ], outputs: [ true ] }
      ];
      super(truth_table);
   }
};

/**
 * Converts the given integer argument into an array of boolean bits
 * @return {bool[]} returns the calculated array
 * @param {number} address specifies the integer value to convert
 * @param {number} count specifies the number of bits in the array
 */
function decode_address(address, count) {
   const rtn = [];
   for(let i = 0; i < count; ++i) {
      const mask = (1 << i);
      rtn[i] = ((address & mask) != 0);
   }
   return rtn;
}

/** 
 * Defines an AND gate operator with a configurable number of inputs
 * @type {import("./truth-table-gate").GateInterface} Implements the gate interface
 */
class AndGateN extends TruthTableGate {
   /**
    * constructs the gate with the given number of inputs
    * @param {number} count specifies the number of input signals (must be greater than or equal to two)
    */
   constructor(count) {
      // validate the number of inputs
      let combinations;
      if(typeof count != "number" || count < 2) {
         throw Error("invalid type of or value for count")
      }
      combinations = Math.pow(2, count);

      // we can now construct the true table
      const truth_table = [];
      for(let i = 0; i < combinations; ++i) {
         const row = { inputs: decode_address(i, count), outputs: [ (i + 1 === combinations) ]};
         truth_table.push(row);
      }
      super(truth_table);
   }
};

/**
 * Defines a NAND gate operator with a configurable number of inputs
 * @type {import("./truth-table-gate").GateInterface} Implements the logic gate interface
 */
class NandGateN extends TruthTableGate {
   /**
    * constructs the gate with the given number of inputs
    * @param {number} count specifies the number of input signals (must be greater than or equal to two)
    */
   constructor(count) {
      // validate the number of inputs
      let combinations;
      if(typeof count != "number" || count < 2) {
         throw Error("invalid type of or value for count")
      }
      combinations = Math.pow(2, count);

      // we can now construct the true table
      const truth_table = [];
      for(let i = 0; i < combinations; ++i) {
         const row = { inputs: decode_address(i, count), outputs: [ (i + 1 !== combinations) ]};
         truth_table.push(row);
      }
      super(truth_table);
   }
};

/**
 * Defines a two input OR gate operator
 * @type {import("./truth-table-gate").GateInterface} Implements the Gate interface
 */
class OrGate extends TruthTableGate {
   constructor() {
      const truth_table = [
         { inputs: [ false, false ], outputs: [ false ] },
         { inputs: [ false, true ], outputs: [ true ] },
         { inputs: [ true, false ], outputs: [ true ] },
         { inputs: [ true, true ], outputs: [ true ] }
      ];
      super(truth_table);
   }
};

/**
 * Defines an OR gate operator with a configurable number of inputs
 * @type {import("./truth-table-gate").GateInterface} Implements the gate interface
 */
class OrGateN extends TruthTableGate {
   /**
    * constructs the gate with the given number of inputs
    * @param {number} count specifies the number of input signals (must be greater than or equal to two)
    */
   constructor(count) {
      // validate the number of inputs
      let combinations;
      if(typeof count != "number" || count < 2) {
         throw Error("invalid type of or value for count")
      }
      combinations = Math.pow(2, count);

      // we can now construct the true table
      const truth_table = [];
      for(let i = 0; i < combinations; ++i) {
         const row = { inputs: decode_address(i, count), outputs: [ (i !== 0) ]};
         truth_table.push(row);
      }
      super(truth_table);
   }
}

/**
 * Defines a two input XOR gate
 * @type {import("./truth-table-gate").GateInterface} implements the Gate interface
 */
class XorGate extends TruthTableGate {
   constructor() {
      const truth_table = [
         { inputs: [ false, false ], outputs: [ false ] },
         { inputs: [ false, true ], outputs: [ true ] },
         { inputs: [ true, false ], outputs: [ true ] },
         { inputs: [ true, true ], outputs: [ false ] }
      ];
      super(truth_table);
   }
};

/**
 * Defines a two input NAND gate
 * @type {import("./truth-table-gate").GateInterface} implements the Gate interface
 */
class NandGate extends TruthTableGate {
   constructor() {
      const truth_table = [
         { inputs: [ false, false ], outputs: [ true ] },
         { inputs: [ false, true ], outputs: [ true ] },
         { inputs: [ true, false ], outputs: [ true ] },
         { inputs: [ true, true ], outputs: [ false ] }
      ];
      super(truth_table);
   }
};

/**
 * Defines a two input NOR gate
 * @type {import("./truth-table-gate").GateInterface} implements the Gate interface
 */
class NorGate extends TruthTableGate {
   constructor() {
      const truth_table = [
         { inputs: [ false, false ], outputs: [ true ] },
         { inputs: [ false, true ], outputs: [ false ] },
         { inputs: [ true, false ], outputs: [ false ] },
         { inputs: [ true, true ], outputs: [ false ] }
      ];
      super(truth_table);
   }
};

/**
 * Defines an OR gate operator with a configurable number of inputs
 * @type {import("./truth-table-gate").GateInterface} implements the gate interface
 */
class NorGateN extends TruthTableGate {
   /**
    * constructs the gate with the given number of inputs
    * @param {number} count specifies the number of input signals (must be greater than or equal to two)
    */
   constructor(count) {
      // validate the number of inputs
      let combinations;
      if(typeof count != "number" || count < 2) {
         throw Error("invalid type of or value for count")
      }
      combinations = Math.pow(2, count);

      // we can now construct the true table
      const truth_table = [];
      for(let i = 0; i < combinations; ++i) {
         const row = { inputs: decode_address(i, count), outputs: [ (i !== 0) ]};
         truth_table.push(row);
      }
      super(truth_table);
   }
};

module.exports = {
   NotGate,
   AndGate,
   AndGateN,
   OrGate,
   OrGateN,
   XorGate,
   NandGate,
   NandGateN,
   NorGate,
   NorGateN
};
