// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.filter.canvasFilterObject.componentTransfer.linear
// Description:Test pixels on CanvasFilter() componentTransfer with linear type
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Test pixels on CanvasFilter() componentTransfer with linear type");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

// From https://www.w3.org/TR/SVG11/filters.html#feComponentTransferElement
function getColor(inputColor, slopes, intercepts) {
    return [
        Math.max(0, Math.min(1, inputColor[0]/255 * slopes[0] + intercepts[0])) * 255,
        Math.max(0, Math.min(1, inputColor[1]/255 * slopes[1] + intercepts[1])) * 255,
        Math.max(0, Math.min(1, inputColor[2]/255 * slopes[2] + intercepts[2])) * 255,
    ];
}

const slopes = [0.5, 1.2, -0.2];
const intercepts = [0.25, 0, 0.5];
ctx.filter = new CanvasFilter({componentTransfer: {
    funcR: {type: "linear", slope: slopes[0], intercept: intercepts[0]},
    funcG: {type: "linear", slope: slopes[1], intercept: intercepts[1]},
    funcB: {type: "linear", slope: slopes[2], intercept: intercepts[2]},
}});

const inputColors = [
    [255, 255, 255],
    [0, 0, 0],
    [127, 0, 34],
    [252, 186, 3],
    [50, 68, 87],
];

for (const color of inputColors) {
    let outputColor = getColor(color, slopes, intercepts);
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.fillRect(0, 0, 10, 10);
    _assertPixelApprox(offscreenCanvas, 5, 5, outputColor[0],outputColor[1],outputColor[2],255, "5,5", `${outputColor[0]},${outputColor[1]},${outputColor[2]}`, 2);
}
t.done();

});
done();
