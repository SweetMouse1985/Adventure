#pragma strict
//für das andere Skript
var otherScript : inventory;
//für das Aktionsobjekt
var actionObject : GameObject;
//für die Meldung
private var myMessage : String;
//für die Anzeige der Meldung
private var showMessage : float = 0.0f;

//für die Bedingung
var condition : String;
var count : int;

function OnMouseDown() {
	//hier muss die Bedingung übergeben werden
	//die wird als Member-Variable öffentlich übergeben
	//wenn true zurückkommt, wird eine Aktion getriggert
	//für die Bedingung
	var checkResult : boolean;
	var item : String;
	if (otherScript != null) {
		//das Item beschaffen
		item = otherScript.ReturnItem();
		//passt das Item hier?
		if (otherScript.CheckItem(condition, count) == true) {
			//wurde eine Aktion angegeben?
			if (actionObject != null)
				//dann starten wir die Funktion DoAction() in dem Objekt über eine Nachricht
				actionObject.SendMessage("DoAction");
		}
		else
			myMessage = "Sie können das Item " + item + " hier nicht einsetzen oder die Menge reicht nicht.";
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
