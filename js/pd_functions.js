	var patch;
	var h_keyPressed = false;
//Beep_Sounds.html-------------------------------------------------------------------------

	function Beep_PlayStopPd(){
		if (window.patch != null){
			document.getElementById("PlayStop").innerHTML = "Start Sound Board";
			Pd.destroyPatch(window.patch)
			window.patch = null;
		}
		else{
			$.get('patches/Pedestrian_Crossing.pd', function(patchStr) {
				window.patch = Pd.loadPatch(patchStr)
				Pd.send('Metro', [parseFloat(document.getElementById('Metro').value)])
				Pd.send('Osc', [parseFloat(document.getElementById('Osc').value)])
				Pd.send('Amp', [parseFloat(document.getElementById('Amp').value)])
				Pd.start()
				document.getElementById("PlayStop").innerHTML = "Stop Sound Board";
			})
		}		
	}
			
	function Beep_Reset(){
		if (window.patch != null){
			Pd.send('Metro', [130])
			Pd.send('Osc', [2800])
			Pd.send('Amp', [0.2])
					
			document.getElementById('Metro').value = 130;
			document.getElementById('tempoText').innerHTML = "130";
			document.getElementById('Osc').value = 2800;
			document.getElementById('pitchText').innerHTML = "2800";
			document.getElementById('Amp').value = 0.2;
			document.getElementById('ampText').innerHTML = "0.2";
		}
	}
			
	function Beep_changeTempo(){
		Pd.send('Metro', [parseFloat(document.getElementById('Metro').value)])
	}
			
	function Beep_changePitch(){
		Pd.send('Osc', [parseFloat(document.getElementById('Osc').value)])
	}
			
	function Beep_changeAmp(){
		Pd.send('Amp', [parseFloat(document.getElementById('Amp').value)])
	}

	function Beep_pedCrossing(){
		Pd.send('Metro', [130])
		Pd.send('Osc', [2800])
		Pd.send('Amp', [0.2])
					
		document.getElementById('Metro').value = 130;
		document.getElementById('tempoText').innerHTML = "130";
		document.getElementById('Osc').value = 2800;
		document.getElementById('pitchText').innerHTML = "2800";
		document.getElementById('Amp').value = 0.2;
		document.getElementById('ampText').innerHTML = "0.2";

	}
	
	function Beep_truckReverse(){
		Pd.send('Metro', [500])
		Pd.send('Osc', [1100])
		Pd.send('Amp', [0.2])
					
		document.getElementById('Metro').value = 500;
		document.getElementById('tempoText').innerHTML = "500";
		document.getElementById('Osc').value = 1100;
		document.getElementById('pitchText').innerHTML = "1100";
		document.getElementById('Amp').value = 0.2;
		document.getElementById('ampText').innerHTML = "0.2";
				
	}
//-------------------------------------------------------------------------------------------------

//Horn_Sounds.html---------------------------------------------------------------------------------
	$(window).keydown(function(event){
		var currentURL = window.location.href;
		if (currentURL == "https://rahatuddin.github.io/UG_Project/Horn_Sounds.html" && event.keyCode == 72 && h_keyPressed == false){
			h_keyPressed = true;
			Horn_PlayStopPd();
		}
	});

	$(window).keyup(function(event){
		var currentURL = window.location.href;
		if (currentURL == "https://rahatuddin.github.io/UG_Project/Horn_Sounds.html" && event.keyCode == 72){
			h_keyPressed = false;
			Horn_PlayStopPd();
		}
	});

	function Horn_PlayStopPd(){
		if (window.patch != null){
			document.getElementById("PlayStop").innerHTML = "Start Sound Board";
			Pd.destroyPatch(window.patch)
			window.patch = null;
			
		}
		else{
			$.get('patches/Car_Horn.pd', function(patchStr) {
				window.patch = Pd.loadPatch(patchStr)
				Pd.send('Freq_1', [parseFloat(document.getElementById('horn_freq_1').value)])
				Pd.send('Freq_2', [parseFloat(document.getElementById('horn_freq_2').value)])
				Pd.start()
				document.getElementById("PlayStop").innerHTML = "Stop Sound Board";
			})
		}		
	}
			
	function Horn_Reset(){
		if (window.patch != null){
			Pd.send('Freq_1', [500])
			Pd.send('Freq_2', [400])
					
			document.getElementById('horn_freq_1').value = 500;
			document.getElementById('horn_freqText_1').innerHTML = "500";
			document.getElementById('horn_freq_2').value = 400;
			document.getElementById('horn_freqText_2').innerHTML = "400";
		}
	}
			
	function Horn_changeFreq_1(){
		Pd.send('Freq_1', [parseFloat(document.getElementById('horn_freq_1').value)])
	}
			
	function Horn_changeFreq_2(){
		Pd.send('Freq_2', [parseFloat(document.getElementById('horn_freq_2').value)])
	}

	function Horn_Car(){
		Pd.send('Freq_1', [500])
		Pd.send('Freq_2', [400])
					
		document.getElementById('horn_freq_1').value = 500;
		document.getElementById('horn_freqText_1').innerHTML = "500";
		document.getElementById('horn_freq_2').value = 400;
		document.getElementById('horn_freqText_2').innerHTML = "400";
		
	}

	function Horn_Boat(){
		Pd.send('Freq_1', [125])
		Pd.send('Freq_2', [184])
					
		document.getElementById('horn_freq_1').value = 125;
		document.getElementById('horn_freqText_1').innerHTML = "125";
		document.getElementById('horn_freq_2').value = 184;
		document.getElementById('horn_freqText_2').innerHTML = "184";
		
	}

	function Horn_TTrain(){
		Pd.send('Freq_1', [680])
		Pd.send('Freq_2', [920])
					
		document.getElementById('horn_freq_1').value = 680;
		document.getElementById('horn_freqText_1').innerHTML = "680";
		document.getElementById('horn_freq_2').value = 920;
		document.getElementById('horn_freqText_2').innerHTML = "920";
		
	}
//--------------------------------------------------------------------------------------------------

//Siren_Sounds.html---------------------------------------------------------------------------------

//==========================================Custom Objects==========================================
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

//Custom [min~] object to work for Police_Siren patch
var customMin = Pd.core.PdObject.extend({

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
                if (inputArray[i % inputArray.length] > self.level)
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
//Custom [max~] object to work for Police_Siren patch
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

Pd.registerExternal('min~', customMin)
Pd.registerExternal('max~', customMax)
Pd.registerExternal('pow~', customPOW)
Pd.registerExternal('sqrt~', customSqrt)

//==================================================================================================

$(window).keydown(function(event){
	var currentURL = window.location.href;
	if (currentURL == "https://rahatuddin.github.io/UG_Project/Siren_Sounds.html" && event.keyCode == 72 && window.patch != null){
		Pd.send('sirenRate', [3])
		document.getElementById('siren_rate').value = 3;
		document.getElementById('siren_rateText').innerHTML = "3";
	}
});

function Siren_PlayStopPd(){
		if (window.patch != null){
			document.getElementById("PlayStop").innerHTML = "Start Sound Board";
			Pd.destroyPatch(window.patch)
			window.patch = null;
			
		}
		else{
			$.get('patches/Police_Siren.pd', function(patchStr) {
				window.patch = Pd.loadPatch(patchStr)
				Pd.send('highFrequency', [parseFloat(document.getElementById('siren_freq_1').value)])
				Pd.send('lowFrequency', [parseFloat(document.getElementById('siren_freq_2').value)])
				Pd.send('sirenRate', [parseFloat(document.getElementById('siren_rate').value)])
				Pd.send('Amplitude', [parseFloat(document.getElementById('siren_amp').value)])
				Pd.start()
				document.getElementById("PlayStop").innerHTML = "Stop Sound Board";

			})
		}	
}

function Siren_changeFreq_1(){
	Pd.send('highFrequency', [parseFloat(document.getElementById('siren_freq_1').value)])
}

function Siren_changeFreq_2(){
	Pd.send('lowFrequency', [parseFloat(document.getElementById('siren_freq_2').value)])
}

function Siren_changeRate(){
	Pd.send('sirenRate', [parseFloat(document.getElementById('siren_rate').value)])
}

function Siren_changeAmp(){
	Pd.send('Amplitude', [parseFloat(document.getElementById('siren_amp').value)])
}

function Siren_policeUK(){
		Pd.send('highFrequency', [959])
		Pd.send('lowFrequency', [722])
		Pd.send('sirenRate', [0.2])
				
		document.getElementById('siren_freq_1').value = 959;
		document.getElementById('siren_freqText_1').innerHTML = "959";
		document.getElementById('siren_freq_2').value = 722;
		document.getElementById('siren_freqText_2').innerHTML = "722";
		document.getElementById('siren_rate').value = 0.2;
		document.getElementById('siren_rateText').innerHTML = "0.2";
}

function Siren_WW2(){
		Pd.send('highFrequency', [280])
		Pd.send('lowFrequency', [250])
		Pd.send('sirenRate', [0.1])
				
		document.getElementById('siren_freq_1').value = 280;
		document.getElementById('siren_freqText_1').innerHTML = "280";
		document.getElementById('siren_freq_2').value = 250;
		document.getElementById('siren_freqText_2').innerHTML = "250";
		document.getElementById('siren_rate').value = 0.1;
		document.getElementById('siren_rateText').innerHTML = "0.1";
}


//--------------------------------------------------------------------------------------------------


//Waves_Sounds.html---------------------------------------------------------------------------------

function Waves_PlayStopPd(){
		if (window.patch != null){
			document.getElementById("PlayStop").innerHTML = "Start Sound Board";
			Pd.destroyPatch(window.patch)
			window.patch = null;
			
		}
		else{
			$.get('patches/Waves/Waves.pd', function(patchStr) {
				$.get('patches/Waves/lfo~.pd', function(lfoStr){
					Pd.registerAbstraction('lfo~', lfoStr)
					window.patch = Pd.loadPatch(patchStr)
					Pd.send('wavesRate', [0.05])
					Pd.send('wavesDepth', [1])
					Pd.send('wavesAmp', [0.5])
					Pd.start()
					document.getElementById("PlayStop").innerHTML = "Stop Sound Board";
				})
			})
		}	
}

//--------------------------------------------------------------------------------------------------



//Wind_Sounds.html----------------------------------------------------------------------------------
/*
function Wind_PlayStopPd(){
		if (window.patch != null){
			document.getElementById("PlayStop").innerHTML = "Start Sound Board";
			Pd.destroyPatch(window.patch)
			window.patch = null;
			
		}
		else{
			$.get('patches/...', function(patchStr) {
				window.patch = Pd.loadPatch(patchStr)
				Pd.send('highFrequency', [parseFloat(document.getElementById('siren_freq_1').value)])
				Pd.send('lowFrequency', [parseFloat(document.getElementById('siren_freq_2').value)])
				Pd.send('sirenRate', [parseFloat(document.getElementById('siren_rate').value)])
				Pd.send('Amplitude', [parseFloat(document.getElementById('siren_amp').value)])
				Pd.start()
				document.getElementById("PlayStop").innerHTML = "Stop Sound Board";

			})
		}	
}
*/
//--------------------------------------------------------------------------------------------------
