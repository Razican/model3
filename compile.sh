# Download JQuery
curl https://code.jquery.com/jquery-3.2.1.slim.js > jquery-3.2.1.slim.js
curl https://code.jquery.com/jquery-3.2.1.slim.min.map > jquery-3.2.1.slim.min.map
curl https://code.jquery.com/jquery-3.2.1.slim.min.js > jquery-3.2.1.slim.min.js
echo "//# sourceMappingURL=jquery-3.2.1.slim.min.map" >> jquery-3.2.1.slim.min.js

# Compress SASS and JS
sass style.scss style.min.css --style compressed
uglifyjs --compress --mangle --source-map "url='script.min.js.map'" -o script.min.js -- script.js
