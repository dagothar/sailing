function [ Cl, Cd ] = calculateLiftAndDragCoefficients( a, amax, Clmax, Cdmin, Cdmax )

k1 = Clmax / amax;
k2 = Clmax / (pi/2 - amax);
k3 = (Cdmax-Cdmin) / ((pi/2)^2);

if a <= amax
    Cl = k1 * a;
else
    Cl = Clmax - k2 * (a-amax);
end

Cd = Cdmin + k3 * a^2;

end

