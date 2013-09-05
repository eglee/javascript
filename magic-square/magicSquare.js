/*
	Edward Lee
	Magic Square
*/

/*global window document*/

function isNumeric(){}
function isInteger(){}
function trim(){}
function createMagicSquare(){}

window.onload = function()
	{	
		var input;
		
		input = window.prompt("Please enter an odd integer greater than two:","");
		
		if(isInteger(input) && input > 0)
			{

				if(input > 2)
					{
						if(input%2 !== 0)
							{
								input = Number(input);
								document.getElementById("boxContainer").style.visibility = "visible";
								createMagicSquare("boxContainer",input);
								}
						else
							{	
								window.alert("No bueno, " + input + " is not odd.");
								}
						}
				else
					{	
						window.alert("No bueno, " + input + " is not greater than 2.");
						}
				}
		else
			{	
				window.alert("No bueno, " + input + " is not an integer.");
				}
		};
		
function isInteger(data)
	{
		return (true && isNumeric(data) &&  Math.ceil(data) === Math.floor(data));
		}
		
function isNumeric(data)
	{
		return ((!isNaN(data) && trim(data).length>0) || typeof data === "number");
		}
		
function trim(word)
	{
		var i;
		var start;
		var whitespace;
		var end;
		
		count = 0;
		i = 0;
		
		if (typeof word === "string")
			{
				whitespace = " \n\r\t\f";
				start = 0;
				
				while (start < word.length && whitespace.indexOf(word.charAt(start)) >= 0)
					{
						start = start + 1;
						}
						
				end = word.length - 1;
				
				while (end >= 0 && whitespace.indexOf(word.charAt(end)) >= 0)
					{
						end = end - 1;
						}
						
				if (end < start)
					{
						word = "";
						}
				else
					{
						word = word.substring(start, end + 1);
						}	
				}
		return word;
		}

function createMagicSquare(containerElement, order)
	{
		var i;
		var j;
		var k;
		var sampleArray;
		var currentSquare;
		var container;
		var node;
		var element;

		sampleArray = new Array(order);
		
		i = 0;
		
		while(i < sampleArray.length)
			{
				sampleArray[i] = new Array(order);
				i = i + 1;
				}
				
		for(i=0; i < sampleArray.length; i = i + 1)
			{
				for(j=0; j <sampleArray[i].length; j = j + 1) 
				{
					sampleArray[i][j] = 0;
					}
				}
		k = 1;
		i = 0;
		j = (order - 1)/2;
		
		k = 1;
		
		while(k < Math.pow(order, 2) + 1)
			{

				if (sampleArray[i] === undefined)
					{
						i = sampleArray.length - 1;
						}
				else
					{
						i = i;
						}
				if(j > order - 1)
					{
						j = 0;
						}
				else
					{
						j = j;
					 }		 
				if (sampleArray[i][j] > 0)
					{
						i = currentSquare[0] ;
						j = currentSquare[1]
						
						i = i + 1;
						j = j;
						}
	
				sampleArray[i][j] = k;
				currentSquare = [i,j];
			
				k = k + 1;
				i = i - 1;
				j = j + 1;
				}
				
		container = document.getElementById(containerElement);
		
		container.style.height = ((order*5) + ((order - 1)*2)/16) + "em";//2 is the pixel width of each border, dividing by 16 converts to em
		container.style.width = ((order*5) + ((order)*2)/16) + "em";//creates container size based on order
		
		element = "";
		i = 0
		
		while (i < Math.pow(order, 2))
			{
				element = element  + "<div id=\"" + "box" + i + "\"" + " class=\"" + "box boxRightBot\">" + "<span class=\"number\"></span>" + "</div>";
				
				i = i + 1;
				}//generates all the boxes needed
				
		document.getElementById(containerElement).innerHTML = element;//puts boxes boxes in container
		
		node = container.childNodes;
		
		i = 0;
		j = 0;
		k = 0;
		
		while(i < Math.pow(order,2))
			{
				if(node[i].nodeType === 1)
					{
						if(k > order -1)
							{
								j = j + 1;
								k = 0;
								}
						node[i].childNodes[0].innerHTML = sampleArray[j][k];
						k = k + 1;
						}
				i = i + 1;
				}//populates boxes with magic numbers
		
		return sampleArray;
		}