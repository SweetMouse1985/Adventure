#pragma strict
//für den neuen Cursor
var newCursor : Texture2D;
//für den Namen des Objekts
var itemName : String;
//für die maximale Anzahl
var itemMax : int;
//für die Eigenschaft
var itemDescription : String;

//für das andere Skript
var otherScript : inventory;
//für die Meldung
private var myMessage : String;
//für die Anzeige der Meldung
private var showMessage : float = 0.0f;

function OnMouseEnter () {
	//den neuen Cursor zeigen
	Cursor.SetCursor(newCursor, Vector2.zero, CursorMode.Auto);
}

function OnMouseExit () {
	//und wieder den Standardcursor zeigen
	Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto);
}

function OnMouseDown() {
	if (otherScript != null) {
		if (otherScript.FindSlot(itemName, itemDescription, itemMax)) {
			//den Cursor wiederherstellen
			Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto);
			//das Objekt zerstören
			Destroy(gameObject);
		}
		else
			myMessage = "Das Objekt kann nicht noch einmal aufgenommen werden.";
	}
	else
		Debug.Log("Das andere Skript muss angegeben werden");
}

function Start () {
}

function Update () {
}

function OnGUI() {
	if (myMessage != "") {
		//für die Meldung
		var textSize : Vector2 = GUI.skin.button.CalcSize(GUIContent(myMessage));
		var left : int = (Screen.width - textSize.x) / 2;
		GUI.Label(Rect(left, Screen.height / 2,  textSize.x, 20), myMessage);
		showMessage = showMessage + Time.deltaTime;
		if (showMessage > 3) {
			showMessage = 0;
			myMessage = "";
		}
	}
}
