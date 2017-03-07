//Wind_Sounds.html----------------------------------------------------------------------------------

//==========================================Custom Objects==========================================

// Create custom [cos~] object using ScriptProcessorNode
var customCos = Pd.core.PdObject.extend({

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
                var sampleIndex = 2 * Math.PI * inputArray[i % inputArray.length]
                outputArray[i] = Math.cos(sampleIndex);
            }

        }

        this.i(0).setWaa(this._scriptProcessor, 0)
        this.o(0).setWaa(this._scriptProcessor, 0)
    },

    stop: function() {
        this._scriptProcessor = null
    }

})

var sampleRate = Pd.getSampleRate();

// Create custom filter object using ScriptProcessorNode
var customLOP = Pd.core.PdObject.extend({
  

    inletDefs: [Pd.core.portlets.DspInlet, Pd.core.portlets.Inlet.extend({
        message: function(args) {
            var newFreq = args[0]
            newCoef = (newFreq * (2 * Math.PI) / sampleRate)
            this.obj.coef = newCoef
        }
    })],

    outletDefs: [Pd.core.portlets.DspOutlet],

    init: function(args) {
        this.frequency = args[0] || 0

    },

    start: function() {

        var self = this,
            bufferSize = 1024,
            i, inputArray, outputArray, f = this.frequency,
            last = 0;

        this.coef = (f * (2 * Math.PI) / sampleRate);

        if (this.coef < 0) {
            this.coef = 0;
        } else if (this.coef > 1) {
            this.coef = 1;
        }

        // DSP goes in a Script Processor Node
        this._scriptProcessor = Pd.getAudio().context.createScriptProcessor(bufferSize, 1, 1)
        this._scriptProcessor.onaudioprocess = function(event) {
            inputArray = event.inputBuffer.getChannelData(0)
            outputArray = event.outputBuffer.getChannelData(0)

            for (i = 0; i < bufferSize; i++) {
                outputArray[i] = ((self.coef * inputArray[i % inputArray.length]) + ((1 - self.coef) * last));
                last = outputArray[i];

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
Pd.registerExternal('cos~', customCos)
Pd.registerExternal('lop~', customLOP)
//==================================================================================================

function Wind_PlayStopPd(){
		if (window.patch != null){
			document.getElementById("PlayStop").innerHTML = "Start Sound Board";
			Pd.destroyPatch(window.patch)
			window.patch = null;
			
		}
		else{
			$.get('patches/Wind/Wind.pd', function(patchStr) {
				$.get('patches/Wind/fcpan.pd', function(fcpanStr){
					Pd.registerAbstraction('fcpan', fcpanStr)
					window.patch = Pd.loadPatch(patchStr)
					Pd.send('w_speed', [800])
					Pd.send('w_level', [1])
					Pd.send('w_Amp', [1])
					Pd.start()
					document.getElementById("PlayStop").innerHTML = "Stop Sound Board";
				})

			})
		}	
}