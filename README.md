# HTML5 Boiler+ :nail_care:

A full project HTML5 boilerplate plus extra goodies (gulp, scss, browserify, es6 compilation, browserSync, etc) to get you up and running fast.

### Development
- All development is done in the ``/public/src`` directory
- Running ``gulp start-dev`` launches a server and starts watching all files in the src directory.
- Changes are injected live using BrowserSync
- JS is compiled using browserify.  The entry path is app.js, include files and components using ``require()``.  Any files that need to be included outside this file should be placed in the lib directory, they will be copied over directly and can be referenced in the html as ``<script type="text/javascript" src="/js/lib/<file_name>"></script>``
- CSS is compiled with SCSS.  The entry path is app.scss
- HTML can be broken into static blocks (with logic-less variables) and included using ```@@include()``` which is provided by the [``gulp-file-include``](https://www.npmjs.com/package/gulp-file-include) node package.

##### Adding Packages
- Dependencies should be included in the project repo unless they are used exclusively for development
- To add a development dependency, run ``npm install --save-dev <package_name>``.  This will add it to our devDependencies inside ``package.json``.
- To add a normal dependency, run ``npm install --save <package_name>``.  This will add it to our dependencies inside ``package.json``.
- To add a dependency that doesn't conform to the AMD syntax, you must add a "browser" property to package.json and specify the package handle and path.  

- For instance, to add the scrollmagic library...
```
npm install --save scrollmagic
```
then add the following to package.json
```
{
  ...
  "browser": {
    "scrollmagic": "./node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js",
  }
}
```
Now you can require scrollmagic with ```require('scrollmagic')```

### Deployment
- The default gulp task deletes everything in the ``/public/dist`` directory and runs a complete build.
- Adding the ``--production`` flag to a gulp task command will run it in production mode which will remove sourcemaps.
- Production project directory is ``/public/dist``.  This is the only directory that needs to be uploaded to view the site.
- If the entire project is uploaded to the root directory, the .htaccess file must be used to rewrite the root url to the ``/public/dist`` subdirectory