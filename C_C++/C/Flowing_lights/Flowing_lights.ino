void setup() {                
  // initialize the pins 10-13 as output pins
  pinMode(8, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
}

void loop() {
  // Enable and disable the pins in an flowing pattern
  digitalWrite(12, LOW);
  digitalWrite(8, HIGH);
  delay(100);
  digitalWrite(13, LOW);
  digitalWrite(11, HIGH);
  delay(100);
  digitalWrite(8, LOW);
  digitalWrite(12, HIGH);
  delay(100);
  digitalWrite(11, LOW);
  digitalWrite(13, HIGH);
  delay(100);
}
