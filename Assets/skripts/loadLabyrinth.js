#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(other : Collider) {
	if (other.gameObject.name == "First Person Controller") 
		Application.LoadLevel(3);
}

