// TODO: get [max~] to work for DSP input to right inlet
var customMax = Pd.core.PdObject.extend({

    inletDefs: [Pd.core.portlets.DspInlet, Pd.core.portlets.Inlet.extend({
        message: function(args) {
            var newLevel = args[0]
            this.obj.level = newLevel
        }
    })],

    outletDefs: [Pd.core.portlets.DspOutlet],

    init: function(args) {
        this.level = args[0] || 0
    },

    start: function() {

        var self = this,
            bufferSize = 1024,
            i, inputArray, outputArray

        // DSP goes in a Script Processor Node
        this._scriptProcessor = Pd.getAudio().context.createScriptProcessor(bufferSize, 1, 1)
        this._scriptProcessor.onaudioprocess = function(event) {
            inputArray = event.inputBuffer.getChannelData(0)
            outputArray = event.outputBuffer.getChannelData(0)

            for (i = 0; i < bufferSize; i++) {
                if (inputArray[i % inputArray.length] < self.level)
                    outputArray[i] = self.level;
                else last = outputArray[i] = inputArray[i % inputArray.length];

            }
        }

        this.o(0).setWaa(this._scriptProcessor, 0)
        this.i(0).setWaa(this._scriptProcessor, 0)
    },

    stop: function() {
        this._scriptProcessor = null
    }

})

//Call `Pd.registerExternal` to register our new external
Pd.registerExternal('max~', customMax)
