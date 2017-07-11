function [ L, D ] = calculateSailForces( aoa, va, area, ro, cfunction )

[Cl, Cd] = @cfunction(aoa, 20*pi/180, 1.5, 0.2, 1.5);

L = 0.5 * ro * va^2 * area * Cl;
D = 0.5 * ro * va^2 * area * Cd;

end

