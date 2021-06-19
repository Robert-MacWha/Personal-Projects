int pinCount = 8;
int pins[8] = {2, 3, 4, 5, 6, 7, 8, 9};
int values[8];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  for(int i = 0; i < pinCount; i ++) {
    pinMode(pins[i], OUTPUT);
  }
}

void loop() {
  // put your main code here, to run repeatedly:

  // loop over each value & increment it
  int carry = 1;
  for(int i = 0; i < pinCount; i ++) {

    if (carry == 1) {

      if (values[i] == 0) {
        
        values[i] = 1;
        carry = 0;
        
      } else {

        values[i] = 0;
        carry = 1;
        
      }
    }
  }

  for(int i = 0; i < pinCount; i ++) {

    if (values[i] == 0) {
      digitalWrite(pins[i], LOW);
    } else {
      digitalWrite(pins[i], HIGH);
    }
  }

  delay(100);
}
