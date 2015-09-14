var template = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "\r\n    <article class=\"clock-face hebe bounce js-london\">\r\n        <section class=\"hours-container\">\r\n            <section class=\"hours\"></section>\r\n        </section>\r\n        <section class=\"minutes-container\">\r\n            <section class=\"minutes\"></section>\r\n        </section>\r\n        <section class=\"seconds-container\">\r\n            <section class=\"seconds\"></section>\r\n        </section>\r\n    </article>\r\n\r\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((((stack1 = (depth0 && depth0.stories)) && stack1['story-base']) || helperMissing).call(depth0, {"name":"stories/story-base","hash":{
    'viewOnly': (true),
    'data-ss-colspan': ("1"),
    'height': ("-h1"),
    'width': ("-w1"),
    'color': ("-black"),
    'subTitle': ((depth0 != null ? depth0.subTitle : depth0)),
    'title': ((depth0 != null ? depth0.title : depth0))
  },"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});