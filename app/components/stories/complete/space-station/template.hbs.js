var template = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "\r\n<main class=\"space-station\">\r\n    <h2 class=\"heading\"><a target=\"_blank\" href=\"http://spotthestation.nasa.gov/sightings/view.cfm?country=United_Kingdom&region=England&city=Leeds#.VSenec6aZrj\">International Space Station</a></h2>\r\n\r\n    <div class=\"space-station__icon\">\r\n        <span class=\"icon-space-station svg-space-station\" data-grunticon-embed></span>\r\n    </div>\r\n\r\n";
  stack1 = ((((stack1 = (depth0 && depth0.stories)) && stack1['story-slider']) || helperMissing).call(depth0, {"name":"stories/story-slider","hash":{
    'loaded': ((depth0 != null ? depth0.loaded : depth0))
  },"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</main>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.item : depth0), (depth0 != null ? depth0['in'] : depth0), (depth0 != null ? depth0.items : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = (depth0 != null ? depth0.stories : depth0)) != null ? stack1['story-slide'] : stack1), depth0), {"name":"stories/story-slide","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <p class=\"space-station__details\">\r\n                    <time class=\"space-station__date\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.date : stack1), depth0))
    + "</time><br>\r\n                    <time class=\"space-station__duration\">Visible for "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.duration : stack1), depth0))
    + " mins</time><br>\r\n                </p>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((((stack1 = (depth0 && depth0.stories)) && stack1['story-base']) || helperMissing).call(depth0, {"name":"stories/story-base","hash":{
    'data-ss-colspan': ("2"),
    'height': ("-h2"),
    'width': ("-w2"),
    'color': ("-black"),
    'subTitle': ((depth0 != null ? depth0.subTitle : depth0)),
    'title': ((depth0 != null ? depth0.title : depth0))
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});