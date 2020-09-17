/**
 * Base class to implement the pattern State in a elegant and fancy way
 */
export default class State {
    /**
     * Class Constructor
     * @param {*} data Any type of data, it would be accesible within the state methods throw the $data variable
     */
    constructor(data){
      //Setting default data
      this.$data = data || {};
      this.$base = undefined;
      this.$states = {};
      this.$state = undefined;
      //Create the base state
      this.createBaseState()
      //Create the available states
      this.createStates();
      //Adds all state functions to the base state
      //this.addFunctionsToRootInstance();
    }
    /**
     * Establish the a state to the instance
     * 
     * @param {string} stateName The name of the wished state
     */
    $setState(stateName){
      const parameters=[].slice.call(arguments,1)
      try{
        this.$state = undefined;
        this.$state = new this.$states[stateName](this.getInstanceProperties(),...parameters)
      }catch(error){
        throw new Error(`The state ${stateName} is not defined`);
      }
    }
    /**
     * Get an object with the properties that can be accessed within a state method
     * 
     * @returns {object} A object with the $data and $setState propreties.
     */
    getInstanceProperties(){
      const resp = {
        $data:this.$data
        , $setState:this.$setState.bind(this)
      }
      return resp
    }
    /**
     * Create a closure for not to lose the reference to the methods of the actual state
     * 
     * @param {string} nameFunction The name of the function
     * @returns {function} A function with the reference to a function state
     */
    stateFunctionReference(stateFunction, dataFunction){
      const data = dataFunction;
      return function(){
        const parameters = [].slice.call(arguments);
        return stateFunction.call(this,data,...parameters);
      }
    }
    /**
     * Create the base state, merging all the state methods to it
     */
    createBaseState(){
      const [functions, states] = [this.base(), this.states()];
      this.$base = function(){ console.log("Base State") }
      const dataFunction = this.getInstanceProperties();
      Object.keys(functions).forEach(functionName=>{
        this.$base.prototype[functionName] = this.stateFunctionReference(functions[functionName], dataFunction);
      })
      this.addRemainingBaseStates(states, Object.keys(functions))
    }
    /**
     * Add all the diferent state functions excluding the functions defined within the base
     * 
     * @param {object} states All the defined state methods
     * @param {array} baseFunctions All the names' functions defined on the base state
     */
    addRemainingBaseStates(states, baseFunctions){
      const allDiferentMethods = Object.keys(states)
        .reduce((total, stateName, index)=>total
          .concat(
            Object.keys(states[stateName])
            .filter(functionName=>functionName!="$constructor")
          )
        , [])
        . filter((functionName,index, list)=>index===list.indexOf(functionName))
        .forEach(functionName=>{
          if(baseFunctions.indexOf(functionName)==-1)
            this.$base.prototype[functionName] = function(){console.log(`${functionName} not implemented in this state`)}
        });
    }
    /**
     * Create all the states with its functions attach to them
     */
    createStates(){
      const [baseState, states] = [this.$base, this.states()]
      const dataFunction = this.getInstanceProperties();
      Object.getOwnPropertyNames(states)
        .map(stateName=>{
          this.$states[stateName] = states[stateName].$constructor
          this.$states[stateName].prototype = Object.create(baseState.prototype);
          this.$states[stateName].prototype.constructor = this.$states[stateName].constructor;
          return [this.$states[stateName], states[stateName], Object.keys(states[stateName])]
        })
        .map(([state,stateFunctions,stateNameFunctions])=>{
          stateNameFunctions.forEach(nameFunction=>{
            if(nameFunction !== "$constructor")
              state.prototype[nameFunction]=this.stateFunctionReference(stateFunctions[nameFunction],dataFunction);
          })
        })
    }
    /**
     * Add all the functions from all the states to the main instance 
     */
    /*addFunctionsToRootInstance(){
      const dataFunction = this.getInstanceProperties();
      Object.keys(this.$base.prototype).forEach(nameFunction=>{
        this[nameFunction]=this.baseStateFunctionReference(nameFunction, dataFunction)
      })
    }*/
    /**
     * Create a closure for not to lose the reference to the methods of the actual state
     * 
     * @param {string} nameFunction The name of the function
     * @returns {function} A function with the reference to a function state
     */
    /*baseStateFunctionReference(nameFunction, dataFunction){
      const data = dataFunction;
      return function(){
        const params = [].slice.call(arguments);
        return this.$state[nameFunction](data, ...params);
      }
    }*/
  }