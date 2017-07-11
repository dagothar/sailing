clc; clear all; close all;

a = [0 : 0.01 : pi/2];

cl = []; cd = [];
for i = 1:length(a)
[x, y] = calculateLiftAndDragCoefficients(a(i), 20*pi/180, 1.5, 0.2, 1.5);
cl = [cl x];
cd = [cd y];
end

figure;
plot(a, cl); hold on;
plot(a, cd);

figure;
plot(a, cl ./ cd);