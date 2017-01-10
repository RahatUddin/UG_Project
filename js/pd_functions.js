	var patch;
	
//Pedestrian_Crossing.html-------------------------------------------------------------------------
	function Ped_PlayStopPd(){
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
			
	function Ped_Reset(){
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
			
	function Ped_changeTempo(){
		Pd.send('Metro', [parseFloat(document.getElementById('Metro').value)])
	}
			
	function Ped_changePitch(){
		Pd.send('Osc', [parseFloat(document.getElementById('Osc').value)])
	}
			
	function Ped_changeAmp(){
		Pd.send('Amp', [parseFloat(document.getElementById('Amp').value)])
	}
	
	function Ped_truckReverse(){
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
