/**
 * @typedef TruthTableType Defines the expected schema for truth tables
 * @property {boolean[]} inputs specifies the input channels for the gate
 * @property {boolean[]} outputs specifies the output channels for the gate.  Most gates will have only one
 * output channel but some, particularly composite devices will have more than one output
 */

/**
 * @callback OutputHandlerType specifies the expected signature of output handlers that can be registered
 * by calling gate.on()
 * @param {boolean} value specifies the evaluated output channel value
 * @param {number} channel specifies the output channel number
 * @param {TruthTableGate} gate specifies the gate object reporting the event
 */

/**
 * @typedef {OutputHandlerType[]} OutputHandlerVector
 */

/**
 * Defines a base class that uses a truth table lookup to resolve basic logic operators
 */
class TruthTableGate {
   /**
    * @property {TruthTableType} #truth_table specifies the truth table that will be used for operator resolution
    */
   #truth_table;

   /**
    * @property {boolean[]} #inputs caches the last values set for input channels.
    */
   #inputs;

   /**
    * @property {OutputHandlerVector[]} #outputs specifies the collection of output event handlers for each output channel
    */
   #outputs;

   /**
    * constructor
    * @param {TruthTableType} truth_table specifies the truth table that this gate will use to calculate the logical function
    * @throws {Error} throws an error for any of the following conditions:
    *   - no input channels are defined
    *   - no output channels are defined
    *   - inconsistent number of input channels
    *   - inconsistent number of output channels
    */
   constructor(truth_table) {
      this.#truth_table = truth_table;
      if(!Array.isArray(truth_table))
         throw Error("invalid truth table type");
      if(truth_table.length === 0)
         throw Error("empty truth table");
      truth_table.forEach((test, test_idx) => {
         if(!Array.isArray(test.inputs))
            throw("case inputs is not an array");
         if(test.inputs.length === 0)
            throw("no input channels are defined");
         if(!Array.isArray(test.outputs))
            throw("case outputs is not an array");
         if(test.outputs.length === 0)
            throw("no output chanhels defined");
         if(test_idx === 0) {
            this.#inputs = [...test.inputs];
            this.#outputs = test.outputs.map(() => []);
         }
         else {
            if(test.inputs.length != this.#inputs.length)
               throw Error("inconsistent number of input channels");
            if(test.outputs.length != this.#outputs.length)
               throw Error("inconsistent number of test outputs");
         }
      });
   }

   /**
    * Sets the value the specified input channel.  If the channel value has changed, the gate
    * will be evaluated and all handlers on output channels will be called
    * @param {boolean} value specifies the boolean value for the input channel
    * @param {number} channel specifies the input channel number
    * @return {boolean[]} returns the matching outputs
    */
   set(value, channel) {
      let outputs;
      if(channel >= this.#inputs.length)
         throw Error("invalid input channel number");
      if(this.#inputs[channel] !== value) {
         this.#inputs[channel] = value;
         outputs = this.evaluate();
         outputs.forEach((out_value, out_channel) => {
            this.#outputs[out_channel].forEach((handler) => handler(out_value, out_channel, this));
         });
      }
      return outputs;
   }

   /**
    * Sets an output handler function for the given output channel.
    * @param {OutputHandlerType} handler specifies the output function that will be registered
    * @param {number=0} channel optionally specifies the output channel number.  since basic
    * gates are limited to one output channel, this value will default to 0.
    */
   on(handler, channel = 0) {
      if(channel >= this.#outputs.length)
         throw Error("invalid output channel");
      this.#outputs[channel].push(handler);
   }

   /**
    * evaluates the logic function using the truth table.
    * @return {boolean[]} returns logical output values for each channel
    */
   evaluate() {
      // search for the test case where the truth table inputs match the cached inputs
      const match = this.#truth_table.find((entry) => {
         return entry.inputs.every((value, channel) => this.#inputs[channel] === value);
      });
      if(match === undefined)
         throw Error("logic case not found");
      return match.outputs;
   }
}

module.exports = {
   TruthTableGate
}