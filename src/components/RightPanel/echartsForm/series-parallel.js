export default [{"id":"series-parallel.id","code":"id","inputType":"text","label":"id"},{"id":"series-parallel.coordinateSystem","code":"coordinateSystem","inputType":"select","label":"coordinateSystem","options":["parallel"]},{"id":"series-parallel.parallelIndex","code":"parallelIndex","inputType":"text","label":"parallelIndex"},{"id":"series-parallel.name","code":"name","inputType":"text","label":"name"},{"id":"series-parallel.colorBy","code":"colorBy","inputType":"select","label":"colorBy","options":["series","data"]},{"id":"series-parallel.inactiveOpacity","code":"inactiveOpacity","inputType":"number","label":"inactiveOpacity","min":0,"max":1,"step":0.01,"default":0.05},{"id":"series-parallel.activeOpacity","code":"activeOpacity","inputType":"number","label":"activeOpacity","min":0,"max":1,"step":0.01,"default":1},{"id":"series-parallel.realtime","code":"realtime","inputType":"boolean","label":"realtime","default":true},{"id":"series-parallel.smooth","code":"smooth","inputType":"boolean","label":"smooth"},{"id":"series-parallel.progressive","code":"progressive","inputType":"text","label":"progressive"},{"id":"series-parallel.progressiveThreshold","code":"progressiveThreshold","inputType":"text","label":"progressiveThreshold"},{"id":"series-parallel.progressiveChunkMode","code":"progressiveChunkMode","inputType":"select","label":"progressiveChunkMode","options":["sequential","mod"]},{"id":"series-parallel.zlevel","code":"zlevel","inputType":"text","label":"zlevel"},{"id":"series-parallel.z","code":"z","inputType":"text","label":"z"},{"id":"series-parallel.silent","code":"silent","inputType":"boolean","label":"silent"},{"id":"series-parallel.animation","code":"animation","inputType":"boolean","label":"animation","default":true},{"id":"series-parallel.animationThreshold","code":"animationThreshold","inputType":"text","label":"animationThreshold"},{"id":"series-parallel.animationDuration","code":"animationDuration","inputType":"number","label":"animationDuration","min":0,"step":20,"default":1000},{"id":"series-parallel.animationEasing","code":"animationEasing","inputType":"select","label":"animationEasing","options":["linear","quadraticIn","quadraticOut","quadraticInOut","cubicIn","cubicOut","cubicInOut","quarticIn","quarticOut","quarticInOut","quinticIn","quinticOut","quinticInOut","sinusoidalIn","sinusoidalOut","sinusoidalInOut","exponentialIn","exponentialOut","exponentialInOut","circularIn","circularOut","circularInOut","elasticIn","elasticOut","elasticInOut","backIn","backOut","backInOut","bounceIn","bounceOut","bounceInOut"]},{"id":"series-parallel.animationDelay","code":"animationDelay","inputType":"text","label":"animationDelay"},{"id":"series-parallel.animationDurationUpdate","code":"animationDurationUpdate","inputType":"number","label":"animationDurationUpdate","min":0,"step":20,"default":1000},{"id":"series-parallel.animationEasingUpdate","code":"animationEasingUpdate","inputType":"select","label":"animationEasingUpdate","options":["linear","quadraticIn","quadraticOut","quadraticInOut","cubicIn","cubicOut","cubicInOut","quarticIn","quarticOut","quarticInOut","quinticIn","quinticOut","quinticInOut","sinusoidalIn","sinusoidalOut","sinusoidalInOut","exponentialIn","exponentialOut","exponentialInOut","circularIn","circularOut","circularInOut","elasticIn","elasticOut","elasticInOut","backIn","backOut","backInOut","bounceIn","bounceOut","bounceInOut"]},{"id":"series-parallel.animationDelayUpdate","code":"animationDelayUpdate","inputType":"text","label":"animationDelayUpdate"},{"inputType":"children","title":"lineStyle","code":"lineStyle","id":"series-parallel.lineStyle","config":[{"id":"series-parallel.lineStyle.color","code":"lineStyle.color","inputType":"color","label":"color","nextCode":"color"},{"id":"series-parallel.lineStyle.width","code":"lineStyle.width","inputType":"number","label":"width","min":0,"step":0.5,"nextCode":"width"},{"id":"series-parallel.lineStyle.type","code":"lineStyle.type","inputType":"select","label":"type","options":["solid","dashed","dotted"],"default":"solid","nextCode":"type"},{"id":"series-parallel.lineStyle.dashOffset","code":"lineStyle.dashOffset","inputType":"number","label":"dashOffset","min":0,"step":1,"default":0,"nextCode":"dashOffset"},{"id":"series-parallel.lineStyle.cap","code":"lineStyle.cap","inputType":"select","label":"cap","options":["butt","round","square"],"default":"butt","nextCode":"cap"},{"id":"series-parallel.lineStyle.join","code":"lineStyle.join","inputType":"select","label":"join","options":["bevel","round","miter"],"default":"bevel","nextCode":"join"},{"id":"series-parallel.lineStyle.miterLimit","code":"lineStyle.miterLimit","inputType":"number","label":"miterLimit","min":0,"step":1,"default":10,"nextCode":"miterLimit"},{"id":"series-parallel.lineStyle.shadowBlur","code":"lineStyle.shadowBlur","inputType":"number","label":"shadowBlur","min":0,"step":0.5,"default":0,"nextCode":"shadowBlur"},{"id":"series-parallel.lineStyle.shadowColor","code":"lineStyle.shadowColor","inputType":"color","label":"shadowColor","nextCode":"shadowColor"},{"id":"series-parallel.lineStyle.shadowOffsetX","code":"lineStyle.shadowOffsetX","inputType":"number","label":"shadowOffsetX","step":0.5,"default":0,"nextCode":"shadowOffsetX"},{"id":"series-parallel.lineStyle.shadowOffsetY","code":"lineStyle.shadowOffsetY","inputType":"number","label":"shadowOffsetY","step":0.5,"default":0,"nextCode":"shadowOffsetY"},{"id":"series-parallel.lineStyle.opacity","code":"lineStyle.opacity","inputType":"number","label":"opacity","min":0,"max":1,"step":0.01,"default":0.45,"nextCode":"opacity"}]},{"inputType":"children","title":"emphasis","code":"emphasis","id":"series-parallel.emphasis","config":[{"id":"series-parallel.emphasis.disabled","code":"emphasis.disabled","inputType":"boolean","label":"disabled","default":true,"nextCode":"disabled"},{"inputType":"children","title":"lineStyle","code":"lineStyle","id":"series-parallel.emphasis.lineStyle","config":[{"id":"series-parallel.emphasis.lineStyle.color","code":"emphasis.lineStyle.color","inputType":"color","label":"color","nextCode":"color"},{"id":"series-parallel.emphasis.lineStyle.width","code":"emphasis.lineStyle.width","inputType":"number","label":"width","min":0,"step":0.5,"nextCode":"width"},{"id":"series-parallel.emphasis.lineStyle.type","code":"emphasis.lineStyle.type","inputType":"select","label":"type","options":["solid","dashed","dotted"],"default":"solid","nextCode":"type"},{"id":"series-parallel.emphasis.lineStyle.dashOffset","code":"emphasis.lineStyle.dashOffset","inputType":"number","label":"dashOffset","min":0,"step":1,"default":0,"nextCode":"dashOffset"},{"id":"series-parallel.emphasis.lineStyle.cap","code":"emphasis.lineStyle.cap","inputType":"select","label":"cap","options":["butt","round","square"],"default":"butt","nextCode":"cap"},{"id":"series-parallel.emphasis.lineStyle.join","code":"emphasis.lineStyle.join","inputType":"select","label":"join","options":["bevel","round","miter"],"default":"bevel","nextCode":"join"},{"id":"series-parallel.emphasis.lineStyle.miterLimit","code":"emphasis.lineStyle.miterLimit","inputType":"number","label":"miterLimit","min":0,"step":1,"default":10,"nextCode":"miterLimit"},{"id":"series-parallel.emphasis.lineStyle.shadowBlur","code":"emphasis.lineStyle.shadowBlur","inputType":"number","label":"shadowBlur","min":0,"step":0.5,"default":0,"nextCode":"shadowBlur"},{"id":"series-parallel.emphasis.lineStyle.shadowColor","code":"emphasis.lineStyle.shadowColor","inputType":"color","label":"shadowColor","nextCode":"shadowColor"},{"id":"series-parallel.emphasis.lineStyle.shadowOffsetX","code":"emphasis.lineStyle.shadowOffsetX","inputType":"number","label":"shadowOffsetX","step":0.5,"default":0,"nextCode":"shadowOffsetX"},{"id":"series-parallel.emphasis.lineStyle.shadowOffsetY","code":"emphasis.lineStyle.shadowOffsetY","inputType":"number","label":"shadowOffsetY","step":0.5,"default":0,"nextCode":"shadowOffsetY"},{"id":"series-parallel.emphasis.lineStyle.opacity","code":"emphasis.lineStyle.opacity","inputType":"number","label":"opacity","min":0,"max":1,"step":0.01,"default":0.45,"nextCode":"opacity"}]}]},{"inputType":"arr","title":"data","code":"data","id":"series-parallel.data","config":[{"id":"series-parallel.data.name","code":"data.name","inputType":"text","label":"name","nextCode":"name"},{"id":"series-parallel.data.value","code":"data.value","inputType":"text","label":"value","nextCode":"value"},{"id":"series-parallel.data.lineStyle","code":"data.lineStyle","inputType":"text","label":"lineStyle","nextCode":"lineStyle"},{"id":"series-parallel.data.color","code":"data.color","inputType":"color","label":"color","nextCode":"color"},{"id":"series-parallel.data.width","code":"data.width","inputType":"number","label":"width","min":0,"step":0.5,"nextCode":"width"},{"id":"series-parallel.data.type","code":"data.type","inputType":"select","label":"type","options":["solid","dashed","dotted"],"default":"solid","nextCode":"type"},{"id":"series-parallel.data.dashOffset","code":"data.dashOffset","inputType":"number","label":"dashOffset","min":0,"step":1,"default":0,"nextCode":"dashOffset"},{"id":"series-parallel.data.cap","code":"data.cap","inputType":"select","label":"cap","options":["butt","round","square"],"default":"butt","nextCode":"cap"},{"id":"series-parallel.data.join","code":"data.join","inputType":"select","label":"join","options":["bevel","round","miter"],"default":"bevel","nextCode":"join"},{"id":"series-parallel.data.miterLimit","code":"data.miterLimit","inputType":"number","label":"miterLimit","min":0,"step":1,"default":10,"nextCode":"miterLimit"},{"id":"series-parallel.data.shadowBlur","code":"data.shadowBlur","inputType":"number","label":"shadowBlur","min":0,"step":0.5,"default":0,"nextCode":"shadowBlur"},{"id":"series-parallel.data.shadowColor","code":"data.shadowColor","inputType":"color","label":"shadowColor","nextCode":"shadowColor"},{"id":"series-parallel.data.shadowOffsetX","code":"data.shadowOffsetX","inputType":"number","label":"shadowOffsetX","step":0.5,"default":0,"nextCode":"shadowOffsetX"},{"id":"series-parallel.data.shadowOffsetY","code":"data.shadowOffsetY","inputType":"number","label":"shadowOffsetY","step":0.5,"default":0,"nextCode":"shadowOffsetY"},{"id":"series-parallel.data.opacity","code":"data.opacity","inputType":"number","label":"opacity","min":0,"max":1,"step":0.01,"default":0.45,"nextCode":"opacity"},{"inputType":"children","title":"emphasis","code":"emphasis","id":"series-parallel.data.emphasis","config":[{"id":"series-parallel.data.emphasis.disabled","code":"data.emphasis.disabled","inputType":"boolean","label":"disabled","default":true,"nextCode":"disabled"},{"inputType":"children","title":"lineStyle","code":"lineStyle","id":"series-parallel.data.emphasis.lineStyle","config":[{"id":"series-parallel.data.emphasis.lineStyle.color","code":"data.emphasis.lineStyle.color","inputType":"color","label":"color","nextCode":"color"},{"id":"series-parallel.data.emphasis.lineStyle.width","code":"data.emphasis.lineStyle.width","inputType":"number","label":"width","min":0,"step":0.5,"nextCode":"width"},{"id":"series-parallel.data.emphasis.lineStyle.type","code":"data.emphasis.lineStyle.type","inputType":"select","label":"type","options":["solid","dashed","dotted"],"default":"solid","nextCode":"type"},{"id":"series-parallel.data.emphasis.lineStyle.dashOffset","code":"data.emphasis.lineStyle.dashOffset","inputType":"number","label":"dashOffset","min":0,"step":1,"default":0,"nextCode":"dashOffset"},{"id":"series-parallel.data.emphasis.lineStyle.cap","code":"data.emphasis.lineStyle.cap","inputType":"select","label":"cap","options":["butt","round","square"],"default":"butt","nextCode":"cap"},{"id":"series-parallel.data.emphasis.lineStyle.join","code":"data.emphasis.lineStyle.join","inputType":"select","label":"join","options":["bevel","round","miter"],"default":"bevel","nextCode":"join"},{"id":"series-parallel.data.emphasis.lineStyle.miterLimit","code":"data.emphasis.lineStyle.miterLimit","inputType":"number","label":"miterLimit","min":0,"step":1,"default":10,"nextCode":"miterLimit"},{"id":"series-parallel.data.emphasis.lineStyle.shadowBlur","code":"data.emphasis.lineStyle.shadowBlur","inputType":"number","label":"shadowBlur","min":0,"step":0.5,"default":0,"nextCode":"shadowBlur"},{"id":"series-parallel.data.emphasis.lineStyle.shadowColor","code":"data.emphasis.lineStyle.shadowColor","inputType":"color","label":"shadowColor","nextCode":"shadowColor"},{"id":"series-parallel.data.emphasis.lineStyle.shadowOffsetX","code":"data.emphasis.lineStyle.shadowOffsetX","inputType":"number","label":"shadowOffsetX","step":0.5,"default":0,"nextCode":"shadowOffsetX"},{"id":"series-parallel.data.emphasis.lineStyle.shadowOffsetY","code":"data.emphasis.lineStyle.shadowOffsetY","inputType":"number","label":"shadowOffsetY","step":0.5,"default":0,"nextCode":"shadowOffsetY"},{"id":"series-parallel.data.emphasis.lineStyle.opacity","code":"data.emphasis.lineStyle.opacity","inputType":"number","label":"opacity","min":0,"max":1,"step":0.01,"default":0.45,"nextCode":"opacity"}]}]}]}]