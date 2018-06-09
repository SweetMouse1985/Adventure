#pragma strict
//die eigene Klasse
public class ListItem {
	//die Eigenschaften	
	private var count :int;
	private var name  : String;
	private var description : String;

	//der Konstruktor zum Setzen der Daten
	public function ListItem (countArg :int, nameArg : String, descriptionArg : String) { 
		count  = countArg;
		name = nameArg;
		description = descriptionArg;
	}
	
	//zum Beschaffen der Werte
	public function GetName() : String {
		return name;
	}
	
	public function GetCount() : int {
		return count;
	}
	
	public function GetDescription() : String {
		return description;
	}

	//zum Ändern der Anzahl
	//zum Reduzieren müssen negative Werte übergeben werden
	public function ChangeCount(amount : int) {
		count = count + amount;
	}
}
