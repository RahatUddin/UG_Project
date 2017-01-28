// Create custom [sqrt~] object using ScriptProcessorNode

var customSqrt = Pd.core.PdObject.extend({

    inletDefs: [Pd.core.portlets.DspInlet],

    outletDefs: [Pd.core.portlets.DspOutlet],

    start: function() {
        var self = this,
            bufferSize = 1024,
            i, inputArray, outputArray


        this._scriptProcessor = Pd.getAudio().context.createScriptProcessor(bufferSize, 1, 1)

        this._scriptProcessor.onaudioprocess = function(event) {

            inputArray = event.inputBuffer.getChannelData(0)

            outputArray = event.outputBuffer.getChannelData(0)

            for (i = 0; i < bufferSize; i++) {
                var sampleVal = Math.max(0, inputArray[i % inputArray.length]);
                outputArray[i] = Math.sqrt(sampleVal);
            }

        }

        this.i(0).setWaa(this._scriptProcessor, 0)
        this.o(0).setWaa(this._scriptProcessor, 0)
    },

    stop: function() {
        this._scriptProcessor = null
    }

})

//Call `Pd.registerExternal` to register our new external
Pd.registerExternal('sqrt~', customSqrt)