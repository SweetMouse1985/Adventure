#pragma strict




function Start () {
}

function Update () {
 Debug.Log("ich bin da");
}

function OnMouseDown() {


	generateLetter.redu = generateLetter.redu -1;
	
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

function OnGUI(){

GUI.Label(Rect(50,100,200,20),"ich bin da");


}