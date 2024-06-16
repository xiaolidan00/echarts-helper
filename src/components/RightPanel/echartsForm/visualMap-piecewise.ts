export default [{"id":"visualMap-piecewise.type","code":"type","inputType":"text","label":"type"},{"id":"visualMap-piecewise.id","code":"id","inputType":"text","label":"id"},{"id":"visualMap-piecewise.splitNumber","code":"splitNumber","inputType":"number","label":"splitNumber","min":1,"step":1,"default":5},{"id":"visualMap-piecewise.pieces","code":"pieces","inputType":"select","label":"pieces","options":["symbol","symbolSize","color","colorAlpha","opacity","colorLightness","colorSaturation","colorHue"]},{"id":"visualMap-piecewise.categories","code":"categories","inputType":"text","label":"categories"},{"id":"visualMap-piecewise.min","code":"min","inputType":"number","label":"min"},{"id":"visualMap-piecewise.max","code":"max","inputType":"number","label":"max"},{"id":"visualMap-piecewise.minOpen","code":"minOpen","inputType":"boolean","label":"minOpen"},{"id":"visualMap-piecewise.maxOpen","code":"maxOpen","inputType":"boolean","label":"maxOpen"},{"id":"visualMap-piecewise.selectedMode","code":"selectedMode","inputType":"select","label":"selectedMode","options":["single","multiple","true","false"]},{"id":"visualMap-piecewise.inverse","code":"inverse","inputType":"boolean","label":"inverse"},{"id":"visualMap-piecewise.precision","code":"precision","inputType":"number","label":"precision","min":0,"step":1},{"id":"visualMap-piecewise.itemWidth","code":"itemWidth","inputType":"number","label":"itemWidth","min":0,"default":20},{"id":"visualMap-piecewise.itemHeight","code":"itemHeight","inputType":"number","label":"itemHeight","min":0,"default":14},{"id":"visualMap-piecewise.align","code":"align","inputType":"select","label":"align","options":["auto","left","right"]},{"id":"visualMap-piecewise.text","code":"text","inputType":"text","label":"text"},{"id":"visualMap-piecewise.textGap","code":"textGap","inputType":"number","label":"textGap","default":10},{"id":"visualMap-piecewise.showLabel","code":"showLabel","inputType":"boolean","label":"showLabel"},{"id":"visualMap-piecewise.itemGap","code":"itemGap","inputType":"number","label":"itemGap","default":10},{"id":"visualMap-piecewise.itemSymbol","code":"itemSymbol","inputType":"text","label":"itemSymbol"},{"id":"visualMap-piecewise.show","code":"show","inputType":"text","label":"show"},{"id":"visualMap-piecewise.dimension","code":"dimension","inputType":"text","label":"dimension"},{"id":"visualMap-piecewise.seriesIndex","code":"seriesIndex","inputType":"text","label":"seriesIndex"},{"id":"visualMap-piecewise.hoverLink","code":"hoverLink","inputType":"text","label":"hoverLink"},{"id":"visualMap-piecewise.zlevel","code":"zlevel","inputType":"text","label":"zlevel"},{"id":"visualMap-piecewise.z","code":"z","inputType":"text","label":"z"},{"id":"visualMap-piecewise.left","code":"left","inputType":"text","label":"left","default":"0%"},{"id":"visualMap-piecewise.top","code":"top","inputType":"text","label":"top","default":"0%"},{"id":"visualMap-piecewise.right","code":"right","inputType":"text","label":"right","default":"0%"},{"id":"visualMap-piecewise.bottom","code":"bottom","inputType":"text","label":"bottom","default":"0%"},{"id":"visualMap-piecewise.orient","code":"orient","inputType":"text","label":"orient"},{"id":"visualMap-piecewise.padding","code":"padding","inputType":"text","label":"padding"},{"id":"visualMap-piecewise.backgroundColor","code":"backgroundColor","inputType":"color","label":"backgroundColor"},{"id":"visualMap-piecewise.borderColor","code":"borderColor","inputType":"color","label":"borderColor"},{"id":"visualMap-piecewise.borderWidth","code":"borderWidth","inputType":"text","label":"borderWidth"},{"id":"visualMap-piecewise.color","code":"color","inputType":"text","label":"color"},{"id":"visualMap-piecewise.formatter","code":"formatter","inputType":"text","label":"formatter"},{"inputType":"children","title":"controller","code":"controller","id":"visualMap-piecewise.controller","config":[{"id":"visualMap-piecewise.controller.inRange","code":"controller.inRange","inputType":"text","label":"inRange","nextCode":"inRange"},{"id":"visualMap-piecewise.controller.outOfRange","code":"controller.outOfRange","inputType":"text","label":"outOfRange","nextCode":"outOfRange"}]},{"inputType":"children","title":"textStyle","code":"textStyle","id":"visualMap-piecewise.textStyle","config":[{"id":"visualMap-piecewise.textStyle.color","code":"textStyle.color","inputType":"color","label":"color","default":"#333","nextCode":"color"},{"id":"visualMap-piecewise.textStyle.fontStyle","code":"textStyle.fontStyle","inputType":"select","label":"fontStyle","options":["normal","italic","oblique"],"default":"normal","nextCode":"fontStyle"},{"id":"visualMap-piecewise.textStyle.fontWeight","code":"textStyle.fontWeight","inputType":"select","label":"fontWeight","options":["normal","bold","bolder","lighter"],"default":"normal","nextCode":"fontWeight"},{"id":"visualMap-piecewise.textStyle.fontFamily","code":"textStyle.fontFamily","inputType":"select","label":"fontFamily","options":["sans-serif","serif","monospace","Arial","Courier New"],"default":"sans-serif","nextCode":"fontFamily"},{"id":"visualMap-piecewise.textStyle.fontSize","code":"textStyle.fontSize","inputType":"number","label":"fontSize","min":1,"step":1,"default":12,"nextCode":"fontSize"},{"id":"visualMap-piecewise.textStyle.lineHeight","code":"textStyle.lineHeight","inputType":"number","label":"lineHeight","min":0,"step":1,"default":12,"nextCode":"lineHeight"},{"id":"visualMap-piecewise.textStyle.width","code":"textStyle.width","inputType":"number","label":"width","min":1,"max":500,"step":1,"default":100,"nextCode":"width"},{"id":"visualMap-piecewise.textStyle.height","code":"textStyle.height","inputType":"number","label":"height","min":1,"max":500,"step":1,"default":50,"nextCode":"height"},{"id":"visualMap-piecewise.textStyle.textBorderColor","code":"textStyle.textBorderColor","inputType":"color","label":"textBorderColor","nextCode":"textBorderColor"},{"id":"visualMap-piecewise.textStyle.textBorderWidth","code":"textStyle.textBorderWidth","inputType":"number","label":"textBorderWidth","min":0,"step":0.5,"nextCode":"textBorderWidth"},{"id":"visualMap-piecewise.textStyle.textBorderType","code":"textStyle.textBorderType","inputType":"select","label":"textBorderType","options":["solid","dashed","dotted"],"default":"solid","nextCode":"textBorderType"},{"id":"visualMap-piecewise.textStyle.textBorderDashOffset","code":"textStyle.textBorderDashOffset","inputType":"number","label":"textBorderDashOffset","min":0,"step":1,"default":0,"nextCode":"textBorderDashOffset"},{"id":"visualMap-piecewise.textStyle.textShadowColor","code":"textStyle.textShadowColor","inputType":"color","label":"textShadowColor","nextCode":"textShadowColor"},{"id":"visualMap-piecewise.textStyle.textShadowBlur","code":"textStyle.textShadowBlur","inputType":"number","label":"textShadowBlur","min":0,"step":0.5,"nextCode":"textShadowBlur"},{"id":"visualMap-piecewise.textStyle.textShadowOffsetX","code":"textStyle.textShadowOffsetX","inputType":"number","label":"textShadowOffsetX","step":0.5,"nextCode":"textShadowOffsetX"},{"id":"visualMap-piecewise.textStyle.textShadowOffsetY","code":"textStyle.textShadowOffsetY","inputType":"number","label":"textShadowOffsetY","step":0.5,"nextCode":"textShadowOffsetY"},{"id":"visualMap-piecewise.textStyle.overflow","code":"textStyle.overflow","inputType":"select","label":"overflow","options":["truncate","break","breakAll"],"nextCode":"overflow"},{"id":"visualMap-piecewise.textStyle.ellipsis","code":"textStyle.ellipsis","inputType":"text","label":"ellipsis","nextCode":"ellipsis"}]},{"inputType":"children","title":"inRange","code":"inRange","id":"visualMap-piecewise.inRange","config":[{"id":"visualMap-piecewise.inRange.color","code":"inRange.color","inputType":"text","label":"color"}]},{"inputType":"children","title":"outOfRange","code":"outOfRange","id":"visualMap-piecewise.outOfRange","config":[{"id":"visualMap-piecewise.outOfRange.color","code":"outOfRange.color","inputType":"text","label":"color"}]}]