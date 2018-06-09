#pragma strict
var cameraNormal : Camera;
var cameraGod : Camera;

function Start () {
	cameraNormal.enabled = true;
	cameraGod.enabled = false;
}
	

function Update () {
	if (Input.GetKeyDown(KeyCode.C)) {
		cameraNormal.enabled = !cameraNormal.enabled;
		cameraGod.enabled = !cameraGod.enabled;
	}
}