# Basic Emulated Logic Gates

This package exports JavaScript classes that can be used to create and connect objects that simulate basic Boolean 
operations.

- [1. Example Usage](#1-example-usage)
- [2. API](#2-api)
  - [2.1. class `TruthTableGate`](#21-class-truthtablegate)
    - [2.1.1. constructor](#211-constructor)
    - [2.1.2. method `set()`](#212-method-set)
    - [2.1.3. method `on()`](#213-method-on)
    - [2.1.4. method `evaluate()`](#214-method-evaluate)
  - [2.2. class `NotGate`](#22-class-notgate)
  - [2.3. class `AndGate`](#23-class-andgate)
  - [2.4. class `OrGate`](#24-class-orgate)
  - [2.5. class `NandGate`](#25-class-nandgate)
  - [2.6. class `NorGate`](#26-class-norgate)
  - [2.7. class `XorGate`](#27-class-xorgate)
- [3. Building Composite Gates](#3-building-composite-gates)


## 1. Example Usage

```javascript
const { AndGate } = require("@jhtrauntvein/basic-logic-gates");
const gate = new AndGate();
gate.on((value, channel) => {
   console.log(`output ${channel} value is ${value}`);
});
gate.set(true, 0);
console.log(`output value is ${gate.evaluate()[0]}`);
```

## 2. API

### 2.1. class `TruthTableGate`

This class is the class from which all other basic gates are derived.  It evaluates a boolean
function by searching a provided truth table for values that match its current input.  It
caches the most recent input values so that the logic function can be evaluated at any time.

#### 2.1.1. constructor

This class requires a single argument passed as an array of objects that convey the truth 
table entries that will be used by the gate.  Each object in this array must have the
following properties:

* `inputs` (boolean[], required): specifies the collection of boolean values that will be 
   matched during evaluation.  Each argument in the truth table array must have the same 
   number of elements and must not be empty.
* `outputs` (boolean[], required): specifies an array of one or more boolean values that
  will be the result for the given set of inputs.  All basic gates have only one output channels
  but composed objects may have multiple outputs.  Each entry in the truth table array must have
  the same number of outputs and must not be empty.

#### 2.1.2. method `set()`

This method sets the logical value of one of the input channels.  If the input value is actually
changed, the logical function will be evaluated and its results will be reported to any handlers
that have been registered with the `on()` method.  This function requires the following parameters:

* `value` (boolean, required): specifies the assigned value for the input channel
* `channel` (number, required): specifies the index of the input value to be set.

This method will return the output vector for the matching truth table entry.

#### 2.1.3. method `on()`

This method allows the application to register and event handler function that will be invoked
any time one of the input channel values have been changed.  It supports the following parameters:

* `handler` (function(value, channel, gate), required): specifies a callback function that will be
  registered for the given output channel.  This function will be called by the gate any time one of
  its input values have been set and changed.  This function will be passed the following parameters:
  * `value` (boolean): reports the value of the output channel
  * `channel` (number): reports the output channel index (usually zero)
  * `gate` (TruthTableGate): reports the gate that is posting this event.
* `channel` (number, optional): optionally specifies the output channel index on which the handler 
   will be registered.  If not specified, this value will default to zero.

#### 2.1.4. method `evaluate()`

This method may be called at any time to evaluate the gate function based upon the current, cached values
in the input channels.  Its return value will be the output vector for the entry that matches
the current set of inputs.

### 2.2. class `NotGate` 

The `NotGate` class extends class `TruthTableGate` and is the simplest of all of the basic gates.  It 
has a single input channel and a single output channel that evaluates to the logical complement of 
its input.

### 2.3. class `AndGate`

The `AndGate` class extends class `TruthTableGate` and has two input channels  and a signle output
channel that evaluates to the logical `AND` operator.

### 2.4. class `OrGate`

The `OrGate` class extends class `TruthTableGate`, has two input channels, and a single output channel 
that evaluates to the logical `OR` operator.

### 2.5. class `NandGate`

The `NandGate` class extends class `TruthTableGate`, has two input channels, and a single output 
channel that evaluates to the logical Not(And) operator.

### 2.6. class `NorGate`

The `NorGate` class extends class `TruthTableGate`, has two input channels, and a single output channel
that evaluates to the logical Not(Or) operator.

### 2.7. class `XorGate`

The `XorGate` class extends class `TruthTableGate`, has two input channels, and a single output channel
that evaluates to the logical XOR operator.  This means that it is asserted only when one, but not both,
of its input channels are asserted.

## 3. Building Composite Gates

More complex logical function gates can be constructed by creating an object that composes basic 
gates and "wires" inputs to outputs of composed gate components.  Such a class should not extend 
class `TruthTableGate` but rather should provide its own methods that call the methods of
the composed gates.  In order to function, a composite gate object must override the `set()`, `on()`, 
and `evaluate()` functions.  The following example declares a four input AND gate:

```javascript
class AndGate4 {
   #input_gates;
   #output_gate;

   constructor() {
      this.#input_gates = [ new AndGate(), new AndGate() ];
      this.#output_gate = new AndGate();
      this.#input_gates.forEach((gate, gate_idx) => {
         gate.on((value) => this.#output_gate.set(value, gate_idx));
      });
   }

   set(value, channel) {
      if(channel <= 1)
         this.#input_gates[0].set(value, channel);
      else
         this.input_gates[1].set(value, Math.floor(channel / 2));
   }

   on(handler, channel) {
      this.#output_gate.on(handler, channel);
   }
}
```
