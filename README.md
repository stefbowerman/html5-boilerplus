# HTML5 Boiler+ 💅
HTML5 Boilerplate plus extra goodies (gulp, scss, browserify, livereload, blah blah blah)

### Development
- All development is done in /public/src
- Running ```gulp``` launches a node server and starts watching all files in the src directory
- JS is compiled using browserify.  The entry path is app.js, include files and components using ```require()```.  Any files that need to be included outside this file should be placed in the lib directory, they will be copied over directly and can be referenced in the html as ``` <script type="text/javascript" src="/js/lib/<file_name>"></script>  ```
- CSS is compiled with SCSS.  The entry path is app.scss
- HTML can be broken into static blocks and included using ```@@include()``` which is provided by the ```gulp-file-include``` node package.

### Deployment
- Production project directory is /public/dist.  This is the only directory that needs to be uploaded to view the site.
