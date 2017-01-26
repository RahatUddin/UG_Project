	var patch;
	
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
	
	function Beep_truckReverse(){
		if (window.patch != null){
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
				
	}
//-------------------------------------------------------------------------------------------------

//Horn_Sounds.html---------------------------------------------------------------------------------
	$(window).keypress(function(event){
		var currentURL = window.location.href;
		alert(event.keyCode);
		if (currentURL == "https://rahatuddin.github.io/UG_Project/Horn_Sounds.html" && (event.charCode == 72 || event.charCode == 104)){
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
				Pd.send('Freq_1', [parseFloat(document.getElementById('Frequency_1').value)])
				Pd.send('Freq_2', [parseFloat(document.getElementById('Frequency_2').value)])
				Pd.start()
				document.getElementById("PlayStop").innerHTML = "Stop Sound Board";
			})
		}		
	}
			
	function Horn_Reset(){
		if (window.patch != null){
			Pd.send('Freq_1', [500])
			Pd.send('Freq_2', [400])
					
			document.getElementById('Frequency_1').value = 500;
			document.getElementById('freqText_1').innerHTML = "500";
			document.getElementById('Frequency_1').value = 400;
			document.getElementById('freqText_2').innerHTML = "400";
		}
	}
			
	function Horn_Freq_1(){
		Pd.send('Freq_1', [parseFloat(document.getElementById('Frequency_1').value)])
	}
			
	function Horn_Freq_2(){
		Pd.send('Freq_2', [parseFloat(document.getElementById('Frequency_2').value)])
	}

	function Horn_Car(){
		if (window.patch != null){
			Pd.send('Freq_1', [500])
			Pd.send('Freq_2', [400])
					
			document.getElementById('Frequency_1').value = 500;
			document.getElementById('freqText_1').innerHTML = "500";
			document.getElementById('Frequency_2').value = 400;
			document.getElementById('freqText_2').innerHTML = "400";
		}
	}
//-------------------------------------------------------------------------------------------------
