#pragma strict

var inWater : boolean = false;
var waterStepSound : AudioClip;

var waterTimer : float = 0;
var waterCool : float = 0.6;

private var chMotor : CharacterMotor;
private var controller : CharacterController;

function Start()
{
	chMotor = GetComponent(CharacterMotor);
	controller = GetComponent(CharacterController);
}

function Update()
{
	if(controller.velocity.magnitude > 0 && Input.GetKey(KeyCode.LeftShift))
	{
		chMotor.movement.maxForwardSpeed = 10;
		chMotor.movement.maxSidewaysSpeed = 10;
	}
	
	else
	{	
		chMotor.movement.maxForwardSpeed = 6;
		chMotor.movement.maxSidewaysSpeed = 6;
	}
	
	if(controller.velocity.magnitude > 0 && inWater == true)
	{
		WaterSound();
	}
	
	if(controller.velocity.magnitude > 0 && Input.GetKey(KeyCode.LeftShift) && inWater == true)
	{
		waterCool = 0.4;
		WaterSound();
	}
	
	else
	{
		waterCool = 0.6;
	}
	
	if(waterTimer > 0)
	{
		waterTimer -= Time.deltaTime;
	}
	
	if(waterTimer < 0)
	{
		waterTimer = 0;
	}
}

function WaterSound()
{
	if(waterTimer == 0)
	{
		audio.PlayOneShot(waterStepSound);
		waterTimer = waterCool;
	}
}