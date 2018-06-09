#pragma strict
//für den Namensraum System.IO
import System.IO;

//zum Setzen der Größe
var myX : int = 800;
var myY : int = 600;

//zur einfacheren Handhabung
private var myScreen : Rect;

//für die gespeicherten Buchstaben
private var letters : String;
//für das gespeicherte Suchwort
private var word : String;
//für die Schaltflächen im SelectionGrid
private var menuStrings : String[];
//für die Eingabe
private var input : String = "";

function Start () {
	//hier werden die Daten geladen
	//den Dateinamen erstellen
	var filename : String;
	filename = Path.Combine(Application.persistentDataPath, "letters.txt");
	//gibt die Datei?
	if (File.Exists(filename) == false) {
		Debug.Log("Die Datei konnte nicht geladen werden.");
		//einen Level mit einer Fehlermeldung laden
		Application.LoadLevel(6);
	}
	
	//eine neue Instanz von StreamReader erzeugen
	var myFile : StreamReader = new StreamReader(filename);
	if (myFile != null) {
		//die Daten lesen
		letters = myFile.ReadLine();
		word = myFile.ReadLine();
		//die Anzahl der Schaltflächen für das Grid berechnen
		//wir nehmen mindestens 18
		var buttons : int = 18;
		//wenn wir mehr brauchen, sorgen wir dafür, dass die Anzahl durch 3 teilbar ist
		if (letters.Length > 18)
			if (letters.Length % 3 != 0) 
				buttons = letters.Length + (3 - (letters.Length % 3));
			else
				buttons = letters.Length;
		menuStrings = new String[buttons];
		//das SelectionGrid setzen
		for (var index : int = 0; index < letters.Length; index++)
			menuStrings[index] = letters[index].ToString();
	}
	else {
		Debug.Log("Die Datei konnte nicht gelesen werden!");
		//einen Level mit einer Fehlermeldung laden
		Application.LoadLevel(6);
	}
	//Datei schließen
	myFile.Close();
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
	if (selected != -1 && selected < letters.Length && letters[selected] != "")
		input = input + letters[selected];
}

function OnGUI() {
	var boxFrame : Rect;
	var buttonFrame : Rect;
	//für das Menü
	var menuSelection : int = -1;
    
    //ein wenig Abstand für den inneren Rahmen
    var offset : int = 120;
    
	//für das Positionieren der Schaltfläche Abchließen
	var textSize : Vector2 = GUI.skin.button.CalcSize(GUIContent("  Abschließen  "));
    
	//der Beginn der Gruppe
    GUI.BeginGroup(myScreen);
    
    //das Rechteck für die Box
    boxFrame = Rect(0, 0 ,myX, myY);
	GUI.Box(boxFrame,"Das finale Rätsel");
	
	//das Rechteck für das SelectionGrid
	//es hat ein wenig Abstand zur Box
	buttonFrame = Rect(offset, offset, myX - offset * 2 , myY - offset * 2);
	//das SelectionGrid erstellen
	menuSelection = GUI.SelectionGrid(buttonFrame, menuSelection, menuStrings, 3);
	
	//ein Eingabefeld 
	input = GUI.TextField(Rect(offset, myY - 100,  myX - offset * 2, 25), input);
	
	//wenn die Zurück-Schaltfläche angeklickt wird, geht es von vorne los
	if (GUI.Button(Rect(offset, myY - 25,  textSize.x, 20), "Zurücksetzen"))
		Restart();
		
	if (GUI.Button(Rect(myX - offset - textSize.x, myY - 25,  textSize.x, 20), "Abschließen"))
		CheckQuest();

	//das Ende der Gruppe
	GUI.EndGroup ();
	
	//wurde etwas geändert?
	//dann auswerten
	if (GUI.changed) 
		CheckSelection(menuSelection);
	
}
 
function Restart() {
	//hier die Eingabe gelöscht
	input = String.Empty;
}

function CheckQuest() {
	//stimmen die Eingabe und das Suchwort überein?
	//verglichen werden nur die Kleinbuchstaben
	if (input.ToLower() == word.ToLower())
		//einen Level mit einer Meldung laden
		Application.LoadLevel(5);
}