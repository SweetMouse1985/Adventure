#pragma strict

function Start () {
}

function Update () {

}

function OnLevelWasLoaded(level : int) {
	PlayerPrefs.SetInt("Level", level);
}
