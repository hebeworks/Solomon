var template = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<main class=\"lcc-enquiries\">\r\n    <div>\r\n        "
    + escapeExpression(((helpers['select-2'] || (depth0 && depth0['select-2']) || helperMissing).call(depth0, {"name":"select-2","hash":{
    'cssClass': ("hebe-select-2"),
    'placeholder': ("Choose a month"),
    'value': ((depth0 != null ? depth0.selectedMonth : depth0)),
    'content': ((depth0 != null ? depth0.months : depth0))
  },"data":data})))
    + "\r\n    </div>\r\n\r\n    Most enquiries per postcode:\r\n    <ol>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.item : depth0), (depth0 != null ? depth0['in'] : depth0), (depth0 != null ? depth0.topPostcodes : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </ol>\r\n    MOST CONTACTED SERVICES\r\n    <ol>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.item : depth0), (depth0 != null ? depth0['in'] : depth0), (depth0 != null ? depth0.topEnquiries : depth0), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ol>\r\n</main>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <li>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.postcode : stack1), depth0))
    + ": "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.total : stack1), depth0))
    + "</li>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <li>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.enquiry : stack1), depth0))
    + ": "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.total : stack1), depth0))
    + "</li>\r\n";
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