var template = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<a href=\"javascript:;\" class=\"js-cogs icon icon-cogs svg-cogs\" data-grunticon-embed>Settings</a>";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"story__inner\">\r\n    <div class=\"story__card -front\">\r\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.viewOnly : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n        <div class=\"story__content\">\r\n            <header>\r\n                <h2 class=\"heading -gamma\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n                <h3 class=\"heading beta\">"
    + escapeExpression(((helper = (helper = helpers.subTitle || (depth0 != null ? depth0.subTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subTitle","hash":{},"data":data}) : helper)))
    + "</h3>\r\n            </header>\r\n        "
    + escapeExpression(((helper = (helper = helpers['yield'] || (depth0 != null ? depth0['yield'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"yield","hash":{},"data":data}) : helper)))
    + "\r\n        </div>\r\n    </div>\r\n    <div class=\"story__card -back\">\r\n        <a href=\"javascript:;\" class=\"js-cogs icon icon-cogs svg-cogs\" data-grunticon-embed>Settings</a>\r\n        <div class=\"story__content\">\r\n            \r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});