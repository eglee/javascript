/*
	Edward Lee
	Calendar Part V
*/

/*global window document*/

function isLeapYear(){}
function isDaysInMonth(){}
function isValidDate(){}
function getDayFromYYYYMMDD(){}
function getMonthFromYYYYMMDD(){}
function getYearFromYYYYMMDD(){}
function getStartOfEpoch(){}
function setYYYYMMDD(){}
function getDaysAfterStartOfEpoch(){}
function updateLargeMonth(){}
function getDayOfWeekFor(){}
function incrementDecrementMonth(){}
function getCurrentMonthNumber(){}
function changeAndUpdateDisplay(){}
function isThisToday(){}

window.onload = function()
	{	
		var now;
		
		document.getElementById("calendarContainer").style.visibility = "visible";
		
		now = new Date();
		
		updateLargeMonth(now.getFullYear(), now.getMonth() + 1);
		
		//window.alert(incrementDecrementMonth(20101101, false));
		/*year = window.prompt("Enter year:","");
		year = Number(year);
		month = window.prompt("Enter month","");
		month = Number(month);
		updateLargeMonth(year, month);*/
		document.onmousedown = function() {return false;};
		document.onselectstart = function () {return false;};
		document.getElementById("leftArrow").onclick = function() {changeAndUpdateDisplay(false);};
		document.getElementById("rightArrow").onclick = function() {changeAndUpdateDisplay(true);};
		};
		
function getStartOfEpoch()
	{
		var result;
		
		result = new Array(2);
		result[0] = 17520914;
		result[1] = 4;
		
		return result;
		}
		
function isLeapYear(data)
	{
		//passed a non-negative integer
		
		return true && data%400 === 0 || (data%4 === 0 && data%100 !== 0);//fixed, was found to be faulty when getDaysAfterEpoch was producing incorrect results
		}

function getDaysInMonth(month, year)
	{
		//passed a one-based month number and year, assuming both values are in correct range
		var days;

		days = [31,28,31,30,31,30,31,31,30,31,30,31];
		
		if(isLeapYear(year) && month === 2)
			{
				days[1] = 29;
				}
				
		return days[month - 1];
		}
		
function getDayFromYYYYMMDD(yyyymmdd)
	{
		//assumes it is passed a valid date in yyyymmdd format
		return (yyyymmdd%10000)%100;
		}

function getMonthFromYYYYMMDD(yyyymmdd)
	{
		//assumes it is passed a valid date in yyyymmdd format
		return ((yyyymmdd%10000) - ((yyyymmdd%10000)%100))/100;
		}

function getYearFromYYYYMMDD(yyyymmdd)
	{
		//assumes it is passed a valid date in yyyymmdd format
		return (yyyymmdd - (yyyymmdd%10000))/10000;
		}
									
function isPositiveInteger(data)
	{
		return (Math.ceil(data) === Math.floor(data) && data > 0);
		}//determines it's a number and if it's rounded up or down to the nearest integer.
		
function isValidDate(month, day, year)
	{
		var valid;
		var yyyymmdd;
		var epoch;
		
		epoch = getStartOfEpoch();
		valid = isPositiveInteger(month) && isPositiveInteger(day) && isPositiveInteger(year);
		
		if (!valid)
			{
				yyyymmdd = NaN;
				}
		else
			{
				month = Number(month);
				day = Number(day);
				year = Number(year);
				}
				
		if(year >= getYearFromYYYYMMDD(epoch[0]))
			{
				year = year;
				}
		else
			{
				yyyymmdd = NaN;
				}
				
		if(month <= 12)
			{
				month = month;
				}
		else
			{
				yyyymmdd = NaN;
				}
				
		if(day <= 31)
			{
				day = day;
				}
		else
			{
				yyyymmdd = NaN;
				}
				
		if(yyyymmdd >= epoch[0])
			{
				setYYYYMMDD(month, day, year);
				}
		else
			{
				yyyymmdd = NaN;
				}
				
		return yyyymmdd;
		}
		
function setYYYYMMDD(month, day, year)
	{
		return year * 10000 + month * 100 + day;
		}
		
function getReferenceToCalendarGridContainerElement()
	{
		return document.getElementById("boxContainer");
		}
		
function getReferenceToMonthNameElement()
	{
		return document.getElementById("month");
		}

function getReferenceToYearNameElement()
	{
		return document.getElementById("year");
		}
		
function getNameOfMonth(month)
	{
		//passed a one-based month number, assuming value is in correct range, result in a string of the name of the month
		var months;
		
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		return months[month - 1];
		}

function getDayNumberInYear(yyyymmdd)
	{
		var dayNumber;
		var i;
		
		i = 1;
		dayNumber = 0;
		
		while(i < getMonthFromYYYYMMDD(yyyymmdd))
			{
				dayNumber = dayNumber + getDaysInMonth(i, getYearFromYYYYMMDD(yyyymmdd));
				i = i + 1;
				}
				
		dayNumber = dayNumber + getDayFromYYYYMMDD(yyyymmdd);
		
		return dayNumber;
		}
		
function getDaysAfterStartOfEpoch(yyyymmdd)
	{
		var i;
		var days;
		var count;
		var year;
		
		i = 0;
		days = 0;
		count = 0;
		
		if(getYearFromYYYYMMDD(yyyymmdd) === getYearFromYYYYMMDD(getStartOfEpoch()[0]))
			{
				days = getDayNumberInYear(yyyymmdd) - getDayNumberInYear(getStartOfEpoch()[0]);
				}//if date is within the year of the epoch, find out the difference from that date and epoch date
				
		if(getYearFromYYYYMMDD(yyyymmdd) > getYearFromYYYYMMDD(getStartOfEpoch()[0]))
			{
				days = 108;//total number of days since epoch to December 31st of that year
				
				if(getYearFromYYYYMMDD(yyyymmdd) === getYearFromYYYYMMDD(getStartOfEpoch()[0]) + 1)
					{
						days = days + getDayNumberInYear(yyyymmdd);
						}//if given date is still within the year directly after the epoch, count in that year 
						//up until the given date and add it to previous value of days since epoch
				else
					{
						while(count < (getYearFromYYYYMMDD(yyyymmdd) - 1) - getYearFromYYYYMMDD(getStartOfEpoch()[0]) )
							{
								count	=	count + 1;
								}//counts the number of years between the end of the epoch year and given date
						
						i = 1;
						
						while(i <= count)
							{
								year = getYearFromYYYYMMDD(getStartOfEpoch()[0]) + i;
								
								if(isLeapYear(year))
									{
										days = days + 366;
										}
								else
									{
										days = days + 365;
										}
								i = i + 1;
								}//goes through each year after the epoch year, and before the given date, determines
								//if it is a leap year or not, and adds the days in a year accordingly

						days = days + getDayNumberInYear(yyyymmdd);//adds the day number of the given date to the total						
						}
				}
		//return count;	
		return days;
		//return year;
		}

function getDayOfWeekFor(yyyymmdd)
	{
		return (getDaysAfterStartOfEpoch(yyyymmdd) + getStartOfEpoch()[1])%7;//fixed
		}

function updateLargeMonth(year, month)
	{
		var largeMonth;
		var updateYear;
		var startOfMonth;
		var daysInMonth;
		var node;
		var containerElement;
		var i;
		var j;
		var count;
		var nodeConvert;
		var todayClass;
		var newClassName;

		todayClass = " today";
		largeMonth = getReferenceToMonthNameElement().innerHTML = getNameOfMonth(month);
		updateYear = getReferenceToYearNameElement().innerHTML = year;
		startOfMonth = getDayOfWeekFor(setYYYYMMDD(month, 1, year));
		daysInMonth = getDaysInMonth(month, year);
		containerElement = document.getElementById("boxContainer");
		node = containerElement.childNodes;
		nodeConvert = [1,2,3,4,5,6,7];
		
		i = 0;
		
		while(i < 84)
		{
		if(node[i].nodeType === 1)
			{
				node[i].style.visibility = "visible";
				node[i].childNodes[0].innerHTML = ".";
				}
								i = i + 1;
								}//resets all nodes that aren't whitespace back to "visible"
		
		if(startOfMonth > 0)
			{
				i = 1;
				count = 0;
				
				while(i < startOfMonth + nodeConvert[startOfMonth])
					{
						if(node[i].nodeType === 1)
							{
								node[i].style.visibility = "hidden";
								count = count + 1;
								}
						i = i + 1;
						}
				}
		else
			{
				count = 0;
				}//hides unused days at beginning of month
				

		i = startOfMonth + nodeConvert[startOfMonth];
		j = 1;
		
		while(i < (daysInMonth * 2) + count * 2)
			{
				if(node[i].nodeType === 1)
					{
						node[i].childNodes[0].innerHTML = j;
						if(isThisToday(getCurrentMonthNumber(), j, Number(getReferenceToYearNameElement().innerHTML)) === true)
							{
								node[i].className = node[i].className + todayClass;
								}
						else
							{
								if(node[i].className.indexOf("today") > -1)
									{
										newClassName = node[i].className.substring(0, node[i].className.indexOf("today") - 1) ;
										node[i].className = newClassName;
										}
								}
						j = j + 1;
						}
				i = i + 1;
				}//populates boxes with day numbers
				
		i = (daysInMonth * 2) + count * 2 + 1;
		
		while(i < node.length - 1)
			{
				if(node[i].nodeType === 1)
					{
						node[i].style.visibility = "hidden";
						}
						i = i + 2;
				}//hides rest of unused days in the month
		}

function incrementDecrementMonth(yyyymmdd, incrementDecrement)
	{
		var newMonth;
		var newDay;
		var newYear;
		var newDate;
		
		newMonth = getMonthFromYYYYMMDD(yyyymmdd);
		newDay = getDayFromYYYYMMDD(yyyymmdd);
		newYear = getYearFromYYYYMMDD(yyyymmdd);
		newDate = yyyymmdd;
		
		if(incrementDecrement === true)
			{
				newMonth = newMonth + 1;
				
				if(newMonth > 12)
					{
						newYear = newYear + 1;
						newMonth = 1;
						}
					
				newDate = setYYYYMMDD(newMonth, newDay, newYear);
				}
		
		if(incrementDecrement === false)
			{
				newMonth = newMonth - 1;
				
				if(newMonth === 0)
					{
						newYear = newYear - 1;
						newMonth = 12;
						}
				
				newDay = getDaysInMonth(newMonth, newYear);
				newDate = setYYYYMMDD(newMonth, newDay, newYear);
				}
		
		if(newDate < getStartOfEpoch()[1])
			{
				newDate = getStartOfEpoch()[1];
				}
				
		return newDate;
		}
		
function getCurrentMonthNumber()
	{
		var textMonth = getReferenceToMonthNameElement().innerHTML;
		var i;
		
		i = 0;

		while(getNameOfMonth(i) !== textMonth)
			{		
				i = i + 1;
				}
				
		return i;
		}
		
function changeAndUpdateDisplay(incrementDecrement)
	{
		var year;
		var month;
		var newYear;
		
		year = Number(getReferenceToYearNameElement().innerHTML);
		month = getCurrentMonthNumber();
		newYear = incrementDecrementMonth(setYYYYMMDD(month, 1, year), incrementDecrement);
		
		updateLargeMonth(getYearFromYYYYMMDD(newYear), getMonthFromYYYYMMDD(newYear));
		}

function isThisToday(month, day, year)
	{
		var now;

		now = new Date();
		
		return true && setYYYYMMDD( now.getMonth() + 1, now.getUTCDate(), now.getFullYear()) === setYYYYMMDD(month, day, year);
		}