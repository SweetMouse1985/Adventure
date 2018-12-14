#pragma strict
//für den Typ List
import System.Collections.Generic;
//für den Namensraum System.IO
import System.IO;
//für den BinaryFormatter
import System.Runtime.Serialization.Formatters.Binary;

//zum Setzen der Größe
var myX : int = 800;
var myY : int = 600;

//für die Anzeige der Items
//die Konstruktion ist vorläufig
private var itemStrings : String[];

//die Liste
private var itemList : List.<ListItem> = new List.<ListItem>();

//für die Anzahl der Items
var itemCount : int;
//für das aktuelle Item
private var selectedIndex : int;
//private var currentItem : ListItem;

//für die Anzeige des Inventories
private var showInventory : boolean = false;

//zum Unterbrechen des Spiels
private var saveTimeScale : float;

//zur einfacheren Handhabung
private var myScreen : Rect;

//für den Dateinamen
private var filename : String;


function ReturnItem() : String {
	return itemList[selectedIndex].GetName();
}

function CheckItem(condition : String, count : int) : boolean {
	var result : boolean = false;
	//können wir das aktuell ausgewählte Item einsetzen?
	//und haben wir genug?
	if ((condition == itemList[selectedIndex].GetDescription()) && (count <= itemList[selectedIndex].GetCount())) {
		result = true;
		//den negativen Wert von count abziehen
		itemList[selectedIndex].ChangeCount(count * -1);
		//wenn es das letzte war, löschen wir das Item durch Überschreiben
		if (itemList[selectedIndex].GetCount() == 0) 
			itemList[selectedIndex] = new ListItem(0, "Empty", "Empty");
		//die Liste neu erstellen
		CopyList();
	}
	return result;
}

function FindSlot(itemName : String, itemDescription : String, maxCount : int) : boolean {
	//hier prüfen wir zuerst, ob das Item schon in der Liste ist und noch weitere aufgenommen werden dürfen
	//dann suchen wir nach einem freien Platz
	//wenn das Item nicht abgelegt wird, geben wir false zurück
	var found : boolean = false;
	var i : int = 0;
	//gibt es das Element schon?
	while (i < itemCount) {
		if (itemList[i].GetName() == itemName) {
			//ist die maximale Anzahl erreicht?
			if (itemList[i].GetCount() == maxCount)
				return false;
			//wenn nicht, erhöhen wir die Anzahl
			else {
				itemList[i].ChangeCount(1);
				found = true;
			}
		}
		i++;
	}
	
	//i zurücksetzen
	i = 0;
	
	//gibt es noch einen freien Platz
	while (found == false && i < itemCount) {
		if (itemList[i].GetName() == "Empty") {
			//dann setzen wir die neue Instanz an diese Stelle
			itemList[i] = new ListItem(1, itemName, itemDescription);
			found = true;
		}
		i++;
	}
	//die Liste aktualisieren
	CopyList();
	return found;
}

function ChangeItem(selected : int) {
	if (itemList[selected].GetCount() != 0)
		selectedIndex = selected;
}

function ContinueGame(flag : boolean) {
	if (flag == false) {
		showInventory = true;
		saveTimeScale = Time.timeScale;
		Time.timeScale = 0;
	}
	else {
		showInventory = false;
		Time.timeScale = saveTimeScale;
	}
}

function CopyList() {
	//die Informationen aus der Liste kopieren
	for (var count : int = 0; count < itemCount; count++) 
		itemStrings[count] = itemList[count].GetName() + "\n" + itemList[count].GetCount().ToString();
	//die Liste speichern
	SaveList();
}

function LoadList() {
	//für den FileStream
	var myFileStream : FileStream;
	//gibt es die Datei?
	if (File.Exists(filename)) {
		//eine neue Instanz von FileStream erzeugen
		//die Datei wird zum Lesen geöffnet
		myFileStream = new FileStream(filename, FileMode.Open, FileAccess.Read);
		//eine Instanz von BinaryFormatter erzeugen
		var binaryformat : BinaryFormatter = new BinaryFormatter();
		//die Daten deserialisieren und in highscore ablegen
		itemList = binaryformat.Deserialize(myFileStream) as List.<ListItem>;
		myFileStream.Close();
	}
	//sonst 10 leere Einträge erzeugen
	else {
		for (var count :int = 0; count < itemCount; count++)
			itemList.Add(new ListItem(0, "Empty", "Empty"));
	}
}

function SaveList() {
	//für den FileStream
	var myFileStream : FileStream;
	//eine neue Instanz von FileStream erzeugen
	//der Inhalt wird überschrieben
	myFileStream = new FileStream(filename, FileMode.Create);
	//eine Instanz von BinaryFormatter erzeugen
	var binaryformat : BinaryFormatter = new BinaryFormatter();
	//die Daten speichern, dazu wird einfach die Liste serialisiert
	binaryformat.Serialize(myFileStream, itemList);
	myFileStream.Close();
}
	
function Start () {
	//den Dateinamen setzen
	filename = Path.Combine(Application.persistentDataPath, "objects.bin");
	//die Liste laden bzw. neu erzeugen
	LoadList();
	//die Elemente in der Liste für die Anzeige erzeugen
	itemStrings = new String[itemCount];
	//die Liste umkopieren
	CopyList();
	//aktuell ist das erste Element ausgewählt
	selectedIndex = 0;
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

	//wenn die Taste i gedrückt wird und das Inventory nicht gezeigt wird, unterbrechen wir das Spiel
	if (Input.GetKeyDown("i") && showInventory == false)
		ContinueGame(false);
}

function OnGUI() {
	//für die Anzeigebereiche
	var boxFrame : Rect;
	var buttonFrame : Rect;
	//für das Menü
	var menuSelection : int = 0;
	//ein wenig Abstand für den inneren Rahmen
	var offset : int = 60;
	
	//für das Zentrieren der Schaltfläche Schließen
	var textSize : Vector2 = GUI.skin.button.CalcSize(GUIContent("Close Inventory"));
	var left : int = (myX - textSize.x) / 2;
	
	//zum Schließen über die Esc-Taste
	var e : Event = Event.current;

	//wenn die Liste gezeigt werden soll
	if (showInventory == true) {
		//der Beginn der Gruppe
		GUI.BeginGroup(myScreen);
		//das Rechteck für die Box
		boxFrame = Rect(0, 0, myX, myY);
		GUI.Box(boxFrame, "You are carrying: " + itemList[selectedIndex].GetName());
	
		//das Rechteck für das SelectionGrid
		//es hat ein wenig Abstand zur Box
		buttonFrame = Rect(offset, offset, myX - offset * 2 , myY - offset * 2);
		//das SelectionGrid erstellen
		menuSelection = GUI.SelectionGrid(buttonFrame, menuSelection, itemStrings, 3);
		
		//wurde etwas geändert?
		//dann setzen wir das angeklickte Item
		if (GUI.changed)
			ChangeItem(menuSelection);

		//wenn die Schließen-Schaltfläche angeklickt wird, geht es weiter
		if (GUI.Button(Rect(left, myY - 25,  textSize.x, 20), "Close Inventory"))
			ContinueGame(true);
		//das Ende der Gruppe
		GUI.EndGroup();
	
		//auch mit der Escape-Taste geht es weiter
		if (e.keyCode == KeyCode.Escape)
			ContinueGame(true);	
	}
}

