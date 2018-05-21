

/* SETS UP ACCORDION - ENDEAVOR ONLY */
function setAccordion(){
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	    acc[i].onclick = function(){
	        this.classList.toggle("active");
	        var panel = this.nextElementSibling;
	        if (panel.style.display === "block") {
	            panel.style.display = "none";
	        } else {
	            panel.style.display = "block";
	        }
	    }
	}
}

/* SETS UP ACCORDION SPECIFYING AN ACTIVE PANEL */
function setAccordionWithActivePanel(panelNum){
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	    acc[i].onclick = function(){
	        this.classList.toggle("active");
	        var panel = this.nextElementSibling;
	        if (panel.style.display === "block") {
	            panel.style.display = "none";
	        } else {
	            panel.style.display = "block";
	        }
	    }
			if (i==panelNum-1){
				acc[i].classList.toggle("active");
				var activePanel = acc[i].nextElementSibling;
				activePanel.style.display = "block";
			}
	}
}

/* SETS UP col-3 CLASS TO THE DIV THAT CONTAINS THE MENU OF THE DAY - CAFETERIA ONLY */
function menuDay(){
	var formatDate = new Date();
	//var formatDate = new Date(new Date().getTime() + _spPageContextInfo.clientServerTimeDelta); // gets the server DateTime
	var weekDate = formatDate.getDay();
	var element = document.getElementById('sh-' + days[weekDate]);
	element.className = "col-6";
}

/* GETS THE CURRENT DATE NUMBER - FROM 1 TO 366 */

function currentDay(){
	var dayValue = 86400000;
	//var tDate = new Date(new Date().getTime() + _spPageContextInfo.clientServerTimeDelta); // gets the server DateTime
	var tDate = new Date();
	var tYear = tDate.getFullYear();
	var firstDateCurrentYear = new Date(tYear, 0, 0, 0, 0, 0, 0);
	var numericTDate = tDate.getTime();
	var numericFirstDateCurrentYear = firstDateCurrentYear.getTime();
	var numericYear = numericTDate - numericFirstDateCurrentYear;
	var dateYear = Math.floor(numericYear/dayValue);
	return dateYear;
}

/* GETS THE INTEGER VALUE FOR THE DATE RECEIVED AS A PARAMETER */
function getDateYearCalendar(dateEval){
	var dayValue = 86400000;
	var tDate = dateEval;
	var tYear = tDate.getFullYear();
	var firstDateCurrentYear = new Date(tYear, 0, 0, 0, 0, 0, 0);
	var numericTDate = tDate.getTime();
	var numericFirstDateCurrentYear = firstDateCurrentYear.getTime();
	var numericYear = numericTDate - numericFirstDateCurrentYear;
	var dateYear = Math.floor(numericYear/dayValue);
	return dateYear;
}

/* SELECTS THE CURRENT DATE FOR THE PAYROLL CALENDAR */
function markCurrentDay(){
	var xCurrentDay = currentDay();
	var printedDays = document.getElementsByClassName('day');
	printedDays[xCurrentDay-1].parentNode.className = printedDays[xCurrentDay-1].parentNode.className + " currentDay";
}

/* RETURNS THE MONTH NAME BY RECEIVING MONTH VALUE IN JAVASCRIPT FORMAT (Month = Month - 1) */
function getMonthName(xMonth){
	if(isNumber(xMonth)){
		var Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		return Months[xMonth];
	}else{
		console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	}
}

/* RETURNS THE DAY NAME BY RECEIVING DAY VALUE */
function getDayName(xDay){
	if(isNumber(xDay)){
		var Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		return Days[xDay];
	}else{
		console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	}
}

/* RETURNS THE ORDINAL NUMBER FOR THE POSITIVE NUMBER RECEIVED */
function getOrdinalNumber(xNumber){
	if(isNumber(xNumber)&&xNumber>0){
		if(xNumber==11||xNumber==12||xNumber==13){
			return xNumber+"th";
		}
		else{
			var dayString = xNumber.toString();
			var dayLastDigit = dayString.substring(dayString.length-1,dayString.length);
			if(dayLastDigit=="1"){
				return xNumber+"st";
			}else{
				if(dayLastDigit=="2"){
					return xNumber+"nd";
				} else{
					if(dayLastDigit=="3"){
						return xNumber+"rd";
					}
					else{
						return xNumber+"th";
					}
				}
			}
		}
	}else{
		console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	}
}

/* RETURNS THE PROPORTION BETWEEN THE NUMBER AND THE DIVIDER VALUE */
function getProportion(xNumber,divider){
	if(isNumber(xNumber)&&isNumber(divider)){
		var i = 0;
		while(((xNumber/divider)-i)>1 && ((xNumber/divider)-i)>0){
			i++;
		}
		return (xNumber/divider)-i;
	}
}

/* VERIFIES IF VALUE IS NUMERIC */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* RETURNS THE TIME IN SHORT FORMAT */
function getShortTime(xDate){
	var xHours = xDate.getHours()+2;
	var xMinutes = xDate.getMinutes();
	if (xMinutes<10){
		xMinutes = '0' + xMinutes;
	}
	if (xHours>12){
		return (xHours-12) + ":" + xMinutes + " pm";
	}
	else{
		return xHours + ":" + xMinutes + " am";
	}
}

// Checks the lowest register index from multiple registers with the same value in the 2-dim array
function checkBeginCoincidence(arr,low,column){
		var rep = -1;
		var counter = low;
		while((rep==-1)&&(counter<arr.length-1)){
			if(arr[counter][column]==arr[counter+1][column]){
				rep = counter;
				return rep;
			}
			counter++;
		}
		return rep;
}

// Checks the highest register index from multiple registers with the same value in the 2-dim array
function checkEndCoincidence(arr,low,column){
		var top = 0;
		var counter = low;
		while(counter<arr.length-1){
			if(arr[counter][column]==arr[counter+1][column]){
				top = counter+1;
			}
			else{
				return top;
			}
			counter++;
		}
		return top;
}

// Orders the 2-dim array specifying the column value reference and the range (first and last rows) of records to order
function quicksort2DArray(L, first, last, pointerV){
    var i = first;
    var j = last;
		var elements = L[0].length;
		var pointer = pointerV;
    var pivote = (L[i][pointer] + L[j][pointer])/2;

    // # iteramos hasta que i no sea menor que j
    while (i < j){
        // # iteramos mientras que el valor de L[i] sea menor que pivote
        while (L[i][pointer] < pivote){
          //  # Incrementamos el índice
            i+=1;
				}
        //# iteramos mientras que el valor de L[j] sea mayor que pivote
        while (L[j][pointer] > pivote){
            //# decrementamos el índice
            j-=1;
				}
        //# si i es menor o igual que j significa que los índices se han cruzado
        if (i <= j){
          //  # creamos una variable temporal para guardar el valor de L[j]
						var x = new Array();

						for(var k=0;k<elements;k++){
						//  # intercambiamos los valores de L[j] y L[i]
							x[k] = L[j][k];
							L[j][k] = L[i][k];
							L[i][k] = x[k];
						}

          //  # incrementamos y decrementamos i y j respectivamente
            i+=1;
            j-=1;
			  }
	}
  //  # si first es menor que j mantenemos la recursividad
    if (first < j){
        L = quicksort2DArray(L, first, j, pointer);
		}
    //# si last es mayor que i mantenemos la recursividad
    if (last > i){
        L = quicksort2DArray(L, i, last, pointer);
		}
    //# devolvemos la lista ordenada
    return L;
}

function getPassedTimeUntilToday(date){
	var today = new Date();
	var refDate = date;

	var passedTime = new Date(today.valueOf()-refDate.valueOf());
	return passedTime;
}

//VALIDATES SELECTED VALUES ON FORMS USING STYLED CHECKBOXES
function valSelection(oSource,max,counter,n){
	if(oSource.checked){
		if(counter==max){
			toggleCheckBoxesByNum(oSource.checked,n);
		}
	}
	else{
		if(counter==(max-1)){
		//if(counter<max&&counter>=0){
			toggleCheckBoxesByNum(oSource.checked,n);
		}
	}
}

//TOGGLES VISIBILITY FOR STYLED CHECKBOXES
function toggleCheckBoxesByNum(toggleBoolean,nelements){
	var checkboxes = new Array();
	var idname = '';
	for(var i=0;i<nelements;i++){
		idname = 'check' + (i+1);
		checkboxes[i] = document.getElementById(idname);
		var checkbox_div = checkboxes[i].parentNode.parentNode;
		var checkbox_label = checkboxes[i].nextElementSibling;
		if(toggleBoolean){ // To deactivate elements
			if(!checkboxes[i].checked){
				checkboxes[i].disabled = true;
				checkbox_div.className = 'checkbox-disabled';
				checkbox_label.className = 'lbl-disabled';
			}
		}else{ // To activate elements
			if(!checkboxes[i].checked){
				checkboxes[i].disabled = false;
				checkbox_div.className = 'checkbox';
				checkbox_label.className = '';
			}
		}
	}
}

//HELPS PARSING DATA TO BE SAVED FOR SHAREPOINT LIST
function setNumericVideoConValues(selectedValues){
		var numValues = new Array();
		var indxBottom = 0;
		var indxTop = 0;
		var nextSValue = 0;
		var indxSelectedValues = 0;
		for(var i=0;i<ncheckboxes;i++){
			indxSelectedValues+=1;
			if(indxSelectedValues<=selectedValues.length){
				indxTop = Games[selectedValues[indxSelectedValues-1]];
				nextSValue=indxTop;
			}
			else{
				indxTop = ncheckboxes-1;
				nextSValue = 0;
			}
			var aux = 0;
			for(var j=indxBottom;j<=indxTop;j++){
				aux+=1;
				if(j==nextSValue){
						numValues[j] = 1;
				}
				else{
						numValues[j] = 0;
				}
			}
			indxBottom = indxTop + 1;
			if(aux>1){i+=(aux-1);}
		}
		return numValues;
}

function redirect(resource){
	window.location = resource;
}

/* FILLS UP THE DEFINED COMBO WITH THE VALUES RECEIVED */
function fillsUpCombos(valueOptions,comboID){
	var comboElement = document.getElementById(comboID);
	for(var i=0;i<=valueOptions.length-1;i++){
		var optionElement = document.createElement('option');
		optionElement.value = valueOptions[i][1];
		optionElement.appendChild(document.createTextNode(valueOptions[i][0]));
		comboElement.appendChild(optionElement);
	}
}
