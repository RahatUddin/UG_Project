	var patch;
	var space_keyPressed = false;
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
		if (currentURL == "https://rahatuddin.github.io/UG_Project/Horn_Sounds.html" && event.keyCode == 32 && space_keyPressed == false){
			space_keyPressed = true;
			Horn_PlayStopPd();
		}
	});

	$(window).keyup(function(event){
		var currentURL = window.location.href;
		if (currentURL == "https://rahatuddin.github.io/UG_Project/Horn_Sounds.html" && event.keyCode == 32){
			space_keyPressed = false;
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

function Siren_PlayStopPd(){
		if (window.patch != null){
			document.getElementById("PlayStop").innerHTML = "Start Sound Board";
			Pd.destroyPatch(window.patch)
			window.patch = null;
			
		}
		else{
			$.get('patches/Police_Siren/Police_Siren.pd', function(mainStr) {
				$.get('patches/Police_Siren/environment.pd', function(envStr){
					$.get('patches/Police_Siren/logosc.pd', function(oscStr){
						$.get('patches/Police_Siren/plastichorn.pd', function(hornStr){
							Pd.registerAbstraction('logosc', oscStr)
							Pd.registerAbstraction('plastichorn', hornStr)
							Pd.registerAbstraction('environment', envStr)
							window.patch = Pd.loadPatch(mainStr)
							Pd.send('highFrequency', [parseFloat(document.getElementById('siren_freq_1').value)])
							Pd.send('lowFrequency', [parseFloat(document.getElementById('siren_freq_2').value)])
							Pd.send('Rate', [parseFloat(document.getElementById('siren_rate').value)])
							Pd.send('Amplitude', [parseFloat(document.getElementById('siren_amp').value)])
							Pd.start()
							document.getElementById("PlayStop").innerHTML = "Stop Sound Board";
						})
					})	
				})
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
	Pd.send('Rate', [parseFloat(document.getElementById('siren_rate').value)])
}

function Siren_changeAmp(){
	Pd.send('Amplitude', [parseFloat(document.getElementById('siren_amp').value)])
}

function Siren_policeUK(){
		Pd.send('highFrequency', [959])
		Pd.send('lowFrequency', [722])
		Pd.send('Rate', [0.2])
				
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
		Pd.send('Rate', [0.1])
				
		document.getElementById('siren_freq_1').value = 280;
		document.getElementById('siren_freqText_1').innerHTML = "280";
		document.getElementById('siren_freq_2').value = 250;
		document.getElementById('siren_freqText_2').innerHTML = "250";
		document.getElementById('siren_rate').value = 0.1;
		document.getElementById('siren_rateText').innerHTML = "0.1";
}


//--------------------------------------------------------------------------------------------------
