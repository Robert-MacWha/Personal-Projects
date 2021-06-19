static class Calc {

  public static double sigmoid(double x) {

    return (1/( 1 + Math.pow(Math.E,(-1*x))));

  }

  public static double dist_Squared (PVector a, PVector b) {

      return (
          Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
      );

  }

}