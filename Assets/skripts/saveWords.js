#pragma strict

import System.IO;
var arr: String[] = ["Baum","Ast","Blatt"];



function Start() {

//den pfad erstellen
var filename: String;
filename = Path.Combine(Application.dataPath, "einsende.txt");

//eine neue instanz von streamwriter erzeugen
var test: StreamWriter = new StreamWriter(filename);

//alle daten übermitteln 
for(var i: int = 0; i < arr.length; i++){
test.WriteLine(arr[i]);
}
test.WriteLine();
test.Close();

}