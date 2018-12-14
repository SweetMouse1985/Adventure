#pragma strict

//soll das Menü angezeigt werden?
private var showMenu : boolean = false;

//zum Setzen der Größe
var myX : int = 800;
var myY : int = 600;

//zur einfacheren Handhabung
private var myScreen : Rect;

//zum Sichern von timeScale
private var saveTimeScale : float;

function Start () {
}

function Update () {
	//ist die Dimension ungleich 0?
	if ((myX == 0) || (myY == 0)) {
		myX = 800;
		myY = 600;
		Debug.Log("Dimension fest auf 800 * 600 gesetzt!");
	}
	//die Position und Dimension des Anzeigebereichs berechnen
	var startSize : Vector2 = new Vector2(myX, myY);
	//die linke obere Ecke
	myScreen.x = (Screen.width / 2) - (startSize.x / 2);
	myScreen.y = (Screen.height / 2) - (startSize.y / 2);
	//Breite und Höhe
	myScreen.width = startSize.x;
	myScreen.height = startSize.y;

	//wurde P gedrückt?
	//dann das Menü anzeigen
	if (Input.GetKey("m")) 
		showMenu = true;
}

function CheckSelection(selected : int) {
	switch (selected) {
		case 0: Application.LoadLevel(0);
			break;
		//Spiel anhalten
		case 1: saveTimeScale = Time.timeScale;
				Time.timeScale = 0;
			break;
		//Spiel fortsetzen
		case 2: Time.timeScale = saveTimeScale;
				showMenu = false;
			break;
		default:
			Debug.Log("Ungültige Auswahl!");
		break;
	}
}


function OnGUI() {
	//für die Anzeigebereiche
	var boxFrame : Rect;
	var buttonFrame : Rect;
	//für das Menü
	var menuSelection : int = 0;
	//die Texte für die Schaltflächen
	var menuStrings : String[] = ["Main Menu", "Pause", "Resume"];
    //ein wenig Abstand für den inneren Rahmen
    var offset : int = 30;
    
	if (showMenu) {
		//der Beginn der Gruppe
	    GUI.BeginGroup(myScreen);
    
    	//das Rechteck für die Box
    	boxFrame = Rect(0,0,myX,myY);
		GUI.Box(boxFrame,"Game Menu");
	
		//das Rechteck für die Toolbar
		//es hat ein wenig Abstand zur Box
		buttonFrame = Rect(offset, offset, myX - offset * 2 , myY - offset * 2);
		//die Toolbar erstellen
		menuSelection = GUI.Toolbar(buttonFrame, menuSelection, menuStrings);
		
		//das Ende der Gruppe
		GUI.EndGroup ();
	
		//wurde etwas geändert?
		//dann auswerten
		if (GUI.changed) 
			CheckSelection(menuSelection);
	}
}