# Solomon 

Solomon Dashboard. Copyright (C) 2015 Hebe Works Limited.
The Solomon Dashboard was born from partnerships with Public Sector organisations looking to make Open Data easy to understand.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Windows Installation Process
Tested on generic Windows 7 installation
Whenever possible run your command prompt as Administrator to help with potential speed and installation issues
* install git `http://www.git-scm.com/download/win` make sure to check the "Use GIT from the Windows Command Prompt' option
* install node & npm `https://nodejs.org/download/`
* install bower globally `npm install -g bower`
* install ember-cli globally `npm install -g ember-cli`
* open a command prompt and `cd` to the folder you want to install this app
* `git clone <repository-url>` this repository
* `cd` into the new directory
* `npm install`
* `bower install`

## Windows performance
Windows rebuilds can be significantly slower than other platforms
We have added ember-cli-windows-addon to help improve things
see [ember-cli-windows-addon](http://www.ember-cli.com/#windows) for more info
* When developing using Windows, after installation run `ember windows`
This should configure your project to run much faster
* Also, whenever possible run your command prompt as Administrator to help with potential speed and installation issues


## Running / Development
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### SVGs
* We use SVGs to ensure the app looks sharp at all pixel densities (e.g. retina). We use SVG for some icons, and by design some of these also require hover states. If an SVG is used as a bg image, the paths inside cannot be manipulated using CSS, and therefore the SVG code must sit in the markup to achieve it.
* Including lots of SVG code for things like icons will bloat the markup quite a considerable amount and slow page loading speeds, so we lazy load them instead using [grunticon](https://github.com/filamentgroup/grunticon)
* grunticon (run using `grunt svg` in terminal) takes a folder full of SVGs (/public/assets/img/svg/embed), converts them to data URIs and injects them into a stylesheet. It then generates & uses grunticon.loader.js to match the generated CSS classnames from the stylesheet against specific markup in the DOM, such as: <span class="svg-toolbox" data-grunticon-embed></span>, and injects the SVG code inside that element. For config options, check Gruntfile.js

### Code Generators
Make use of the many generators for code, try `ember help generate` for more details
To create a new story try `ember generate story my-story-name` (note all component names must contain at least on hyphen)

### Running Tests

* `ember test`
* `ember test --server`

### Building for deployment

* `grunt` (production) (changed to include grunt tasks)

### Deploying

* production code will be in the /dist folder

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

