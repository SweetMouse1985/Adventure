#pragma strict
//für das Mauerstück
var wallItem : Transform;
//für die Anzahl in X- und Z-Richtung
var countX : int;
var countZ : int;

function Start () {
	//einige Hilfsvariablen
	var sizeX : int;
	var position: Vector3;
	
	//wurde ein Objekt übergeben?
	if (wallItem == null) {
		Debug.Log("Es wurde kein Objekt übergeben");
		return;
	}
		
	//zum Zwischenspeichern der Position
	var newPosX : int = wallItem.position.x;
	var newPosZ : int = wallItem.position.z;
	
	
	//das untergeordnete Objekt beschaffen
	var myChild: Transform = wallItem.transform.GetChild(0);
	if (myChild == null) {
		Debug.Log("Es wurde kein untergeordnetes Objekt gefunden");
		return;
	}
	
	//die Größe beschaffen über den MeshFilter
	var mesh : Mesh = myChild.GetComponent(MeshFilter).mesh;
	if (mesh == null) {
		Debug.Log("Es wurde kein Mesh gefunden");
		return;
	}
	var meshSize : Vector3 = mesh.bounds.size;

	//die Skalierung beschaffen
	var scale : Vector3 = myChild.transform.localScale;	
	//die Größe berechnen
	sizeX = meshSize.x * (scale.x);
	
	//in einer geschachtelten Schleife werden die Mauerstücke erzeugt
	for (var runX : int = 0; runX < countX; runX++) {
		for (var runZ : int = 0; runZ < countZ; runZ++) {
			//die neue Position zwischenspeichern
			newPosX = wallItem.position.x + sizeX * runX;
			newPosZ = wallItem.position.z + sizeX * runZ;
			//die neue Position setzen
			position = Vector3(newPosX,  wallItem.position.y, newPosZ);
			//die Instanz des Objekts erzeugen
			//die Drehung erfolgt im Bereich zwischen 0 und 270 ((0 - 3) * 90)
			Instantiate(wallItem, position, Quaternion.Euler(0, Random.Range(0, 4) * 90, 0));
		}
	}
}

function Update () {

}