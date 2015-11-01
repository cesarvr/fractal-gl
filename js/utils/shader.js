
var Script = {};


//Script.vertex = getCode('vertex-shader');
//Script.fragment = getCode('fragment-shader');

Script.init = function(shader) {
    shader.use();
    shader
        .attribute('position')
        .attribute('texture')
        .attribute('colors')
        .uniform('MV')
        .uniform('uSampler')
        .uniform('P');
}

module.exports = Script;
