#pragma strict
//zum Setzen der Größe
public var myX : int = 800;
public var myY : int = 600;

//zur einfacheren Handhabung
private var myScreen : Rect;

private var showQuestion : boolean = false;

function Start () {
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

	if (PlayerPrefs.HasKey("Level"))
		showQuestion = true;
	else
		Application.LoadLevel(1);
}

function Update () {

}

function CheckSelection(selected : int) {
	switch (selected) {
		case 0: Application.LoadLevel(PlayerPrefs.GetInt("Level"));
			break;
		case 1: Application.LoadLevel(1);
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
	var menuStrings : String[];
	if (showQuestion) {
		menuStrings = ["Zum letzten Level gehen?", "Zum Hauptmenü"];
	
	        //ein wenig Abstand für den inneren Rahmen
	    var offset : int = 30;
	    
		//der Beginn der Gruppe
	    GUI.BeginGroup(myScreen);
	    
	    //das Rechteck für die Box
	    boxFrame = Rect(0,0,myX,myY);
		GUI.Box(boxFrame,"Levelabfrage");
		
		//das Rechteck für das SelectionGrid
		//es hat ein wenig Abstand zur Box
		buttonFrame = Rect(offset, offset, myX - offset * 2 , myY - offset * 2);
		//das SelectionGrid erstellen
		menuSelection = GUI.SelectionGrid(buttonFrame, menuSelection, menuStrings, 1);
		
		//das Ende der Gruppe
		GUI.EndGroup ();
		
		//wurde etwas geändert?
		//dann auswerten
		if (GUI.changed) 
			CheckSelection(menuSelection);
	}
}
 