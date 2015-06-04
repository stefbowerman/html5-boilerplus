# HTML5 Boiler+ :nail_care:
HTML5 Boilerplate plus extra goodies (gulp, scss, browserify, livereload, etc)



### Development
- All development is done in /public/src
- Running ```gulp``` launches a node server and starts watching all files in the src directory
- JS is compiled using browserify.  The entry path is app.js, include files and components using ```require()```.  Any files that need to be included outside this file should be placed in the lib directory, they will be copied over directly and can be referenced in the html as ``` <script type="text/javascript" src="/js/lib/<file_name>"></script>  ```
- CSS is compiled with SCSS.  The entry path is app.scss
- HTML can be broken into static blocks and included using ```@@include()``` which is provided by the ```gulp-file-include``` node package.

#### Adding Packages
- Dependencies should be included in the project repo unless they are used exclusively for development
- To add a development dependency, run ```npm install --save-dev <package_name>``` and then add ```node_modules/<package_name>``` to ```.gitignore```.  This will add it to our devDependencies inside ```package.json``` but exclude it from the git repo
- To add a normal dependency, run ```npm install --save <package_name>```.  This will add it to our dependencies inside ```package.json```
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
- Production project directory is /public/dist.  This is the only directory that needs to be uploaded to view the site.
