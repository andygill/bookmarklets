(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
    var f = navigator.getGamepads;
    navigator.getGamepads = function(){ 
        function GamepadButton(b) {
            this.pressed = b;
            this.value = b?1:0;
        }
        var trueButton = new GamepadButton(true);
        var falseButton = new GamepadButton(false);

        function Gamepad(o) {
            var that = this;
            this.axes = [0,1,2,5].map(function(v) {
              return o.axes[v]
    	    });
            this.buttons = 
    	    [0,1,3,4,6,7,null,null,null,11,
    	     13,14,null,null,null,null].map(function(v) {
    		     if (v == null) {
    			 return falseButton;
    		     } else {
                return o.buttons[v]
    		     }
    		 });
            if (o.axes[9] <= 1) {
    	    var dir = Math.round((1 + o.axes[9]) * 3.5);
    	    var updates = [[12],[12,15],[15],[15,13],[13],[13,14],[14],[14,12]]
    		updates[dir].map(function(i) {
    			console.log(that.buttons,i,trueButton)
    			that.buttons[i] = trueButton;
    		    })
    		}
            if (o.axes[3] < 1) {
    	    that.buttons[6] = trueButton;
            }
            if (o.axes[4] < 1) {
    	    that.buttons[7] = trueButton;
            }
            this.connected = true;
            this.id        = o.id;
            this.index     = o.index;
        }
        var r = f.call(navigator);
        function GamepadList(r) {
            this.length = 4;
            for(i = 0;i < this.length;i++) {
    	    if (r[i] != undefined) {
    		this[i] = new Gamepad(r[i]);
    	    } else {
    		this[i] = undefined;
    	    }
            }
        }
        return new GamepadList(r); 
    }
})();


},{}]},{},[1]);
