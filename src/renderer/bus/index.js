import Vue from 'vue';
console.log("DID IT ")

class WindowEventBus {
  constructor() {
    this.listeners = [];
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
    let listners = this.listeners
    eventer(messageEvent, function(e) {
      for (var i = 0; i < listners.length; i++) {
        console.log(e)
        console.log("#####################################")
        listners[i](e);
      }
    }, false);
  }

  addListener(callback) {
    this.listeners.push(callback)
  }

  removeListener(callback) {
    this.listeners.splice(this.listeners.indexOf(callback), 1);
  }
}
export default new WindowEventBus()
