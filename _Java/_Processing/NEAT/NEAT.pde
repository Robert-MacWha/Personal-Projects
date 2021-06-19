Network netA;
Network netB;
Network netC;
Network netD;

void setup() {
    size(1000, 800);
    background(255);
    randomSeed(0);

    netA = new Network(2, 3, 2);
    netB = new Network(2, 3, 2);
    netC = new Network(netA, netB);
    netD = netC.copy();
    netD.mutate(0.1, 0.3, 0.6);

}

void draw() {
    background(255);
    
    push();

    translate(100, 100);
    netA.render_Summary(20, 4, 50, 150, 5, 0.018);

    pop();

    push();  

    translate(300, 100);
    netB.render_Summary(20, 4, 50, 150, 5, 0.018);

    pop();

    push();

    translate(500, 100);
    netC.render_Summary(20, 4, 50, 150, 5, 0.018);

    pop();

    push();

    translate(700, 100);
    netD.render_Summary(20, 4, 50, 150, 0.1, 0.018);

    pop();

}