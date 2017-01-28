// Create custom [pow~] object using ScriptProcessorNode and ChannelMergerNode

var customPOW = Pd.core.PdObject.extend({

    inletDefs: [Pd.core.portlets.DspInlet, Pd.core.portlets.DspInlet.extend({
        message: function(args) {
            var val = args[0]
            this.obj.val = val
            if (!this.hasDspSource()) this._setValNoDsp(val)
        },

        disconnection: function(outlet) {
            portlets.DspInlet.prototype.disconnection.apply(this, arguments)
            if (outlet instanceof portlets.DspOutlet && !this.hasDspSource())
                this._setValNoDsp(this.obj.val)
        }
    }, {
        _setValNoDsp: function(val) {
            //if (this.obj._gainNode)
            //this.obj._gainNode.gain.setValueAtTime(val, pdGlob.futureTime / 1000 || 0)
        }
    })],

    outletDefs: [Pd.core.portlets.DspOutlet],

    init: function(args) {
        var val = args[0] || 0
        this.val = val
    },

    setVal: function(val) {
        this.val = val
            //if (!this.hasDspSource()) this.obj.test = 1
            //else this.obj.test = 0
    },

    start: function() {
        var self = this,
            bufferSize = 1024,
            i, inputArrayL, inputArrayR, outputArray


        this._scriptProcessor = Pd.getAudio().context.createScriptProcessor(bufferSize, 2, 1)
            // Use channel merger to combine the two inlets into one stereo signal
        this._channelMerger = Pd.getAudio().context.createChannelMerger(2)

        this.i(0).setWaa(this._channelMerger, 0)
        this.i(1).setWaa(this._channelMerger, 1)

        this._channelMerger.connect(this._scriptProcessor)

        this._scriptProcessor.onaudioprocess = function(event) {

            inputArrayL = event.inputBuffer.getChannelData(0)
            inputArrayR = event.inputBuffer.getChannelData(1)

            outputArray = event.outputBuffer.getChannelData(0)

            for (i = 0; i < bufferSize; i++) {
                outputArray[i] = Math.pow(inputArrayL[i % inputArrayL.length], inputArrayR[i % inputArrayR.length]);

            }

        }

        this.o(0).setWaa(this._scriptProcessor, 0)
    },

    stop: function() {
        this._scriptProcessor = null
    }

})

//Call `Pd.registerExternal` to register our new external
Pd.registerExternal('pow~', customPOW)