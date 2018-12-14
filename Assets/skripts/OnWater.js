#pragma strict

private var footsteps : PlayerFootsteps;

function Start()
{
	footsteps = GameObject.Find("First Person Controller").GetComponent(PlayerFootsteps);
}

function OnTriggerEnter (Col : Collider)
{
	if(Col.gameObject.tag == "Player")
	{
		footsteps.inWater = true;
	}
}

function OnTriggerExit (Col : Collider)
{
	if(Col.gameObject.tag == "Player")
	{
		footsteps.inWater = false;
	}
}