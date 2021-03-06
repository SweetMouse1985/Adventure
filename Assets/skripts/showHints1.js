#pragma strict
//für die Meldung
private var myMessage : String;
//für die Anzeige der Meldung
private var showMessage : float = 0.0f;

//zur einfacheren Handhabung
private var myScreen : Rect;

//zum Setzen der Größe
var myX : int = 400;
var myY : int = 300;

//für die Styles
var myBox : GUIStyle;

function Start () {
	myMessage = "Search for 5 coins at the first Oasis.\nFind the second Oasis and search for a Key\n"+
				"and the box, to get access to the next level.";
}

function Update () {
	//die Position und Dimension des Anzeigebereichs berechnen
	var startSize : Vector2 = new Vector2(myX, myY);
	//die linke obere Ecke
	myScreen.x = (Screen.width / 2) - (startSize.x / 2);
	myScreen.y = (Screen.height / 2) - (startSize.y / 2);
	//Breite und Höhe
	myScreen.width = startSize.x;
	myScreen.height = startSize.y;
}

function OnGUI() {
	//für die Anzeigebereiche
	var boxFrame : Rect;
	var buttonFrame : Rect;
	//ein wenig Abstand für den inneren Rahmen
	//var offset : int = 60;
	
	//der Beginn der Gruppe
	GUI.BeginGroup(myScreen);
	//das Rechteck für die Box
	boxFrame = Rect(0, 0, myX, myY);
	GUI.Box(boxFrame, myMessage, myBox);
	GUI.EndGroup();
	
	//nach kurzer Zeit zerstören wir das Game Objekt
	showMessage = showMessage + Time.deltaTime;
	if (showMessage > 18) 
		Destroy(gameObject);
}
