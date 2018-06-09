#pragma strict
//für das andere Skript
var otherScript : inventory;

function DoAction() {
	if (otherScript.FindSlot("Schlüssel 1", "Key1", 1)) {
			//das Objekt zerstören
			Destroy(gameObject);
		}
}