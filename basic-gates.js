const { TruthTableGate } = require("./truth-table-gate");

/**
 * Defines the Not (logical complement) operator
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
