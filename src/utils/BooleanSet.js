const assert = require("assert");
const GenUtils = require("../utils/GenUtils");

/**
 * Allows an infinite array of booleans to be set to true or false using ranges
 * to efficiently compress consecutive values.
 * 
 * TODO: optimize ranges using arrays and single numbers
 * TODO: don't set inverted by default
 */
class BooleanSet {

  /**
   * Constructs a BooleanSet.
   * 
   * @param stateOrObj is a state to initialize by reference, an existing
   *        BooleanSet to deep copy, or defaults to a cleared state
   */
  constructor(stateOrObj) {
    
    // deep copy state object if BooleanSet given
    if (stateOrObj instanceof BooleanSet) {
      this._setState(GenUtils.copyProperties(stateOrObj.getState()));
    }
    
    // set state directly by reference if internal state object given
    else if (stateOrObj) {
      this._setState(state);
    }
    
    // otherwise start new
    else {
      this.state = {};
      this.state.ranges = [];
    }
  }
  
  /**
   * Returns the internal state of this set.
   * 
   * @returns {Object} with internal state.
   */
  getState() {
    return this.state;
  }
  
  /**
   * Sets all booleans to false.
   * 
   * @returns {BooleanSet} is this instance
   */
  clear() {
    return this.set(false);
  }
  
  /**
   * Copies this BooleanSet to a new one.
   * 
   * @returns {BooleanSet} is a copy of this instance
   */
  copy() {
    return new BooleanSet(this);
  }
  
  /**
   * Sets one or all booleans.
   * 
   * @param {boolean} val is the boolean value to set
   * @param {number} idx is the index of the value to set, sets all if not provided
   * @returns {BooleanSet} is this instance
   */
  set(val, idx) {
    assert(typeof val === "boolean", "Value to set must be a boolean");
    
    // set all
    if (idx === undefined || idx === null) {
      delete this.state.inverted;
      this.state.ranges.length = 0;
      if (val) this.inverted = true;
      return;
    }
    
    // set single index
    assert(GenUtils.isInt(idx) && idx >= 0, "Index must be an integer >= 0 but was " + idx);
    throw new Error("Not implemented");
  }
  
  /**
   * Sets booleans in a range.
   * 
   * @param {boolean} val is the boolean value to set in the range
   * @param {number} start is the start of the range (defaults to 0)
   * @param {number} end is the end of the range (defaults to infinity)
   * @returns {BooleanSet} is this instance
   */
  setRange(val, start, end) {
    throw new Error("Not implemented");
  }
  
  /**
   * Flips one or all booleans.
   * 
   * @param {number} idx is the index to flip, flips all if not provided
   * @returns {BooleanSet} is this instance
   */
  flip(idx) {
    throw new Error("Not implemented");
  }
  
  /**
   * Flips booleans in a range.
   * 
   * @param start is the start of the range (defaults to 0)
   * @param end is the end of the range (defaults to infinit)
   * @returns {BooleanSet} is this instance
   */
  flipRange(start, end) {
    throw new Error("Not implemented");
  }
  
  /**
   * Gets the boolean value at a given index.
   * 
   * @param {number} idx is the index of the value to get
   * @returns {boolean} the value at the index
   */
  get(idx) {
    
    // validate input
    assert(GenUtils.isInt(idx) && idx >= 0, "Index must be an integer >= 0 but was " + idx);
    
    // determine if index is in range
    let inRange = false;
    for (let range of this.state.ranges) {
      if (range.start <= index && range.end >= index) {
        inRange = true;
        break;
      }
    }
    
    // apply inversion if applicable
    return inRange ? !this.state.inverted : this.state.inverted;
  }
  
  /**
   * Gets the first index in a range with the given value.
   * 
   * @param {boolean} val is the value to get the first index of
   * @param start is the start of the range (defauls to 0)
   * @param end is the end of the range (defaults to infinity)
   * @returns {number} is the first index in the range with the value, null if none found
   */
  getFirst(val, start = 0, end) {
    throw new Error("Not implemented");
  }
  
  /**
   * Gets the last index in a range with the given value.
   * 
   * @param {boolean} val is the value to get the last index of
   * @param start is the start of the range (defauls to 0)
   * @param end is the end of the range (defaults to infinity)
   * @returns {number} is the last index in the range with the value, null if none found, undefined if infinity
   */
  getLast(val, start, end) {
    throw new Error("Not implemented");
  }
  
  /**
   * Indicates if all booleans in a range are set to a given value.
   * 
   * @param {boolean} val is the value to test in the range
   * @param {number} start is the start of the range (defaults to 0)
   * @param {number} end is the end of the range (defaults to infinity)
   * @returns {boolean} is true if all booleans in the range are the given value, false otherwise
   */
  allSet(val, start, end) {
    assert(typeof val === "boolean", "Value to check must be a boolean");
    return this.getFirst(!val, start, end) === null;
  }
  
  /**
   * Indicates if any booleans in a range are set to a given value.
   * 
   * @param {boolean} val is the value to test in the range
   * @param {number} start is the start of the range (defaults to 0)
   * @param {number} end is the end of the range (defaults to infinity)
   * @returns {boolean} is true if any booleans in the range are the given value, false otherwise
   */
  anySet(val, start = 0, end) {
    assert(typeof val === "boolean", "Value to check must be a boolean");
    return this.getFirst(val, start, end) !== null;
  }
  
  /**
   * Converts the given range to an array.
   * 
   * @param {number} start is the start index of the range
   * @param {number} is the end index of the range (defaults to length())
   * @returns {boolean[]} is an array representation of the given range
   */
  toArray(start = 0, end = this.length()) {
    //if (end === undefined || end === null) end = this.length();
    throw new Error("Not implemented");
  }
  
  /**
   * Returns the index of the last boolean before all remaining booleans are infinitely false
   * or true (depending on if flip() was called which flips infinity).
   * 
   * @returns {number} is the last set boolean before the remaining are infinitely true or false
   */
  length() {
    return this.flipped ? getLast(false) : getLast(true);
  }
  
  // ---------------------------------- PRIVATE -------------------------------
  
  /**
   * Sets the internal state of this set.
   * 
   * @param {Object} is the internal state object to set
   * @returns {BooleanSet} is this instance
   */
  _setState(state) {
    BooleanSet._validateState(state);
    delete this.state;
    this.state = state;
    return this;
  }
  
  static _validateState(state) {
    assert(state);
    assert(state instanceof Object)
    assert(typeof state.inverted === "boolean");  // TODO: state.inverted === undefined || 
    assert(state.ranges !== undefined);
    assert(Array.isArray(state.ranges));
    for (let range of state.ranges) {
      assert(range.start >= 0);
      assert(range.end >= 0);
    }
  }
}

module.exports = BooleanSet;