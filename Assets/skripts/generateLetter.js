#pragma strict
//für den Namensraum System.IO
import System.IO;

//für das Prefab
var letter : TextMesh;
//für die Positionen
var minX : int;
var maxX : int;
var minZ : int;
var maxZ : int;

//für die bereits gesammelten Buchstaben
private var collectedLetters : String;

//für die Wörter
var words : String[] = ["Baum", "Blatt", "Ast"];
private var word : String;

function Start () {
	//ist ein TextMesh übergeben worden?
	if (letter == null) {
		Debug.Log("Sie müssen ein TextMesh angeben.");
		return;
	}
	//ein zufälliges Wort ermitteln
	//word ist eine private Member-Variable
	word = words[Random.Range(0, words.Length)];
	//die Buchstaben im vorgegebenen Bereich verteilen
	for (var i : int = 0; i < word.Length; i++) {
		var position: Vector3 = Vector3(Random.Range(minX, maxX), 1, Random.Range(minZ, maxZ));	
		var letterBox : TextMesh = Instantiate(letter,position, transform.rotation);
		letterBox.text = word[i].ToString();
	}
}

function Update () {

}

function CollectLetters (letter : String) {
	//die Buchstaben anhängen
	collectedLetters = collectedLetters + letter;
}

function OnDestroy() {
	//den Dateinamen erstellen
	var filename : String;
	filename = Path.Combine(Application.persistentDataPath, "letters.txt");

	//eine neue Instanz von StreamWriter erzeugen
	var myFile : StreamWriter = new StreamWriter(filename);
	//die Zeichenkette speichern
	myFile.WriteLine(collectedLetters);
	//und das Suchwort
	myFile.WriteLine(word);
	//Datei schließen
	myFile.Close();
}