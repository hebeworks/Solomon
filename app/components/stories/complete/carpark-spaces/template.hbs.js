var template = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<main class=\"carpark-spaces\">\r\n    <div>\r\n        "
    + escapeExpression(((helpers['select-2'] || (depth0 && depth0['select-2']) || helperMissing).call(depth0, {"name":"select-2","hash":{
    'placeholder': ("Choose a carpark"),
    'optionLabelPath': ("title"),
    'optionValuePath': ("id"),
    'value': ((depth0 != null ? depth0.selectedCarPark : depth0)),
    'content': ((depth0 != null ? depth0.items : depth0))
  },"data":data})))
    + "\r\n\r\n        <!--optionDescriptionPath=\"title\"-->\r\n        <!--optionLabelPath=\"title\"-->\r\n    </div>\r\n\r\n    <div class=\"car-park\">\r\n        <h2 class=\"heading\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.currentCarPark : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n        <div class=\"car-park__capacity\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.currentCarPark : depth0)) != null ? stack1.totalCapacity : stack1), depth0))
    + "</div>\r\n        <div class=\"car-park__occupied\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.currentCarPark : depth0)) != null ? stack1.occupiedSpaces : stack1), depth0))
    + "</div>\r\n        <div class=\"car-park__available\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.currentCarPark : depth0)) != null ? stack1.available : stack1), depth0))
    + "</div>\r\n    </div>\r\n</main>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((((stack1 = (depth0 && depth0.stories)) && stack1['story-base']) || helperMissing).call(depth0, {"name":"stories/story-base","hash":{
    'data-ss-colspan': ("2"),
    'height': ("-h2"),
    'width': ("-w2"),
    'color': ("-white"),
    'subTitle': ((depth0 != null ? depth0.subTitle : depth0)),
    'title': ((depth0 != null ? depth0.title : depth0))
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});