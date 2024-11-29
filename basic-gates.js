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

module.exports = {
   NotGate,
   AndGate,
   OrGate,
   XorGate,
   NandGate,
   NorGate
};
