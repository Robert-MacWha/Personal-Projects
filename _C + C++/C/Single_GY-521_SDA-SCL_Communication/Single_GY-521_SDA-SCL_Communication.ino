#include "Wire.h" // Communication with I2C devices

const int MPU_ADDR=0x68; // I2C address of the device.  When pin AD0 is set to high the address will be 0x69

int16_t accelerometer_x, accelerometer_y, accelerometer_z; // raw accelerometer data
int16_t gyro_x, gyro_y, gyro_z;                            // raw gyro data
int16_t temperature;                                       // raw temperature data

char tmp_str[7];  // temporary var used in convert function

char* convert_int16_to_str(int16_t i) {

  sprintf(tmp_str, "%6d", i);
  return tmp_str;
  
}

void setup() {
  
  Serial.begin(9600);
  Wire.begin();
  Wire.beginTransmission(MPU_ADDR); // begin transmission to the I2C slabe
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);
  
}

void loop() {

  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 7*2, true);

  // "wire.read()<<8 | Wire.read(); means two registers are read and stored in the same variable"
  accelerometer_x = Wire.read()<<8 | Wire.read();
  accelerometer_x = accelerometer_x / 256;
  accelerometer_y = Wire.read()<<8 | Wire.read();
  accelerometer_y = accelerometer_y / 256;
  accelerometer_z = Wire.read()<<8 | Wire.read();
  accelerometer_z = accelerometer_z / 256;
  temperature = Wire.read()<<8 | Wire.read();
  gyro_x = Wire.read()<<8 | Wire.read();
  gyro_y = Wire.read()<<8 | Wire.read();
  gyro_z = Wire.read()<<8 | Wire.read();

  // print out the data
  Serial.print("aX = "); Serial.print(convert_int16_to_str(accelerometer_x));
  Serial.print(" | aY = "); Serial.print(convert_int16_to_str(accelerometer_y));
  Serial.print(" | aZ = "); Serial.print(convert_int16_to_str(accelerometer_z));
  Serial.print(" | gX = "); Serial.print(convert_int16_to_str(gyro_x));
  Serial.print(" | gY = "); Serial.print(convert_int16_to_str(gyro_y));
  Serial.print(" | gZ = "); Serial.print(convert_int16_to_str(gyro_z));
  Serial.println();

  delay(100);
  
}
