#pragma strict
//für den Namensraum System.IO
import System.IO;


//gui style
var style: GUIStyle;
//buchstaben reduzieren
static var redu: int = 5;


//für das Prefab
var letter : TextMesh;
//für die Positionen
var minX : int;
var maxX : int;
var minZ : int;
var maxZ : int;

//für die bereits gesammelten Buchstaben
private var collectedLetters : String;



private var word: String;
private var word1: String;
private var word2: String;


//zufallszahl für die buchstaben
private var randomInt: int;


//wert für das saven der buchstaben
private var next: int;



function Zufall() {
var min = 0;
var max = 3;

randomInt  = Random.Range(min,max);
}





function Start () {
Zufall();



var filename: String;
filename = Path.Combine(Application.dataPath, "einsende.txt");

//neue instanz von streamreader
var testfile: StreamReader = new StreamReader(filename);



word = testfile.ReadLine();
word1 = testfile.ReadLine();
word2 = testfile.ReadLine();




switch(randomInt){
case 0: 
redu = 4;
next = 0;
for (var i : int = 0; i < word.length; i++) {
		var position: Vector3 = Vector3(Random.Range(minX, maxX), 15, Random.Range(minZ, maxZ));	
		var letterBox : TextMesh = Instantiate(letter,position, transform.rotation);
		letterBox.text = word[i].ToString();
		};
break;
case 1: 
redu = 3;
next = 1;
 for (var i1 : int = 0; i1 < word1.length; i1++) {
		var position1: Vector3 = Vector3(Random.Range(minX, maxX), 15, Random.Range(minZ, maxZ));	
		var letterBox1 : TextMesh = Instantiate(letter,position1, transform.rotation);
		letterBox1.text = word1[i1].ToString();
		};
break;
case 2:
redu = 5;
next = 2;
 for (var i2 : int = 0; i2 < word2.length; i2++) {
		var position2: Vector3 = Vector3(Random.Range(minX, maxX), 15, Random.Range(minZ, maxZ));	
		var letterBox2 : TextMesh = Instantiate(letter,position2, transform.rotation);
		letterBox2.text = word2[i2].ToString();
		};
break;
default: print("ungültig");

}






testfile.Close();


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
	filename = Path.Combine(Application.dataPath, "letters.txt");

	//eine neue Instanz von StreamWriter erzeugen
	var myFile : StreamWriter = new StreamWriter(filename);
	//die Zeichenkette speichern
	myFile.WriteLine(collectedLetters);
	//und das Suchwort

	switch(next){
	case 0: myFile.WriteLine(word); ;
	break;
	case 1: myFile.WriteLine(word1);
	break;
	case 2: myFile.WriteLine(word2);
	break;
	default: print("ungültig");
	break;
	}
	//Datei schließen
	myFile.Close();
}



function OnGUI() {

GUI.Label(Rect(10,20,200,20),"Collect Letters: " + redu,style);


}