#pragma strict
function Start () {
}

function Update () {

}

function OnMouseDown() {
	//das andere Skript beschaffen
	var otherScript : generateLetter = GameObject.Find("Quest").GetComponent(generateLetter);
	if (otherScript == null) {
		Debug.Log("Das Skript wurde nicht gefunden.");
		return;
	}
	//die Funktion aufrufen
	otherScript.CollectLetters(GetComponent(TextMesh).text);
	//das Objekt zerstören
	Destroy(gameObject);
}