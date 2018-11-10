using UnityEngine;
using System.Collections;

public class CursorHideShow : MonoBehaviour {

	bool isLocked;
	void Start () {
		SetCursorLock(true);
	
	}
	
	void SetCursorLock(bool isLocked){
		this.isLocked = isLocked;
		Screen.lockCursor = isLocked;
		Screen.showCursor = !isLocked;
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown( KeyCode.C))
			SetCursorLock(!isLocked);
	
	}
}
