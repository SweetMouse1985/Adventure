#pragma strict
//zum Setzen der Größe
var myX : int = 800;
var myY : int = 600;

//zur einfacheren Handhabung
private var myScreen : Rect;

//für die Anzeige der Credits
private var showCredits : boolean = false;
var credits : String = "Dieser Text erscheint in einer Laufschrift... Programmiert von ... mit Unity 4";
var scrollSpeed : float = 150;
private var creditsRect : Rect;

//für das Hintergrundbild
var backPicture : Texture;

//für den aktuellen Level
private var level : int;

function Start () {
	//gibt es einen gespeicherten Level?
	//dann laden wir ihn
	//level muss als Member-Variable vereinbart sein
	if (PlayerPrefs.HasKey("Level"))
		level = PlayerPrefs.GetInt("Level");
	//sonst setzen wir level auf -1
	else
		level = -1;
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
}

function CheckSelection(selected : int) {
	switch (selected) {
		case 0: Application.LoadLevel(1);
			break;
		//wenn der Level ungleich -1 ist, laden wir die zweite Welt
		case 1: if (level != -1)
					Application.LoadLevel(2);
			break;
		case 2: showCredits = !showCredits;
			break;
		//das Beenden funktioniert nicht im Editor
		case 3: Application.Quit();
			break;
		default:
			Debug.Log("Ungültige Auswahl!");
		break;
	}
}

function ShowCredits() {
	// beim ersten Mal die Größe ermitteln
	if (creditsRect.width == 0) {
		var creditSize : Vector2 = GUI.skin.label.CalcSize(GUIContent(credits));
		creditsRect.width = creditSize.x;
		creditsRect.height = creditSize.y;
		creditsRect.x = Screen.width;
		creditsRect.y = Screen.height - creditsRect.height;
	}
	
	//x verändern
	creditsRect.x = creditsRect.x -(Time.deltaTime * scrollSpeed);
	
	//wenn wir links angekommen sind, geht es wieder rechts los
	if (creditsRect.x + creditsRect.width < 0)
			creditsRect.x = Screen.width;

 	//das Label anzeigen 
	GUI.Label(creditsRect, credits);
}

function OnGUI() {
	var boxFrame : Rect;
	var buttonFrame : Rect;
	//für das Menü
	var menuSelection : int = 0;
	//die Texte für die Schaltflächen
	var menuStrings : String[];
	if (Application.isWebPlayer == false)
    	menuStrings = ["Desert", "Forest", "Credits", "Exit"];
    else
    	menuStrings = ["Desert", "Forest", "Credits"];
    
    //ein wenig Abstand für den inneren Rahmen
    var offset : int = 30;
    
    //gibt es ein Hintergrundbild
    if (backPicture == null) {
    	Debug.Log("Das Hintergrundbild fehlt!");
    	return;
    }

	//das Hintergrundbild anzeigen
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backPicture, ScaleMode.ScaleToFit);

	//der Beginn der Gruppe
    GUI.BeginGroup(myScreen);
    
    //das Rechteck für die Box
    boxFrame = Rect(0,0,myX,myY);
	GUI.Box(boxFrame,"Main Menu");
	
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
		
	if (showCredits)
		ShowCredits();
}
 