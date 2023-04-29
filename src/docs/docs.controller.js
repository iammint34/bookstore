const BaseController = require('@core/controller')
const swaggerUiDist = require('swagger-ui-dist')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerSpecs = swaggerJSDoc(require('@config/documentation'))
const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath()

class DocumentationController extends BaseController {

    handleGenerateHtml(request, response) {
        response.send(`
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <title>Bookstore API</title>
                <link rel="stylesheet" type="text/css" href="./docs/static/swagger-ui.css">
                <link rel="icon" type="image/png" href="./docs/static/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" type="image/png" href="./docs/static/favicon-16x16.png" sizes="16x16" />
                <style>
                    html {
                        box-sizing: border-box;
                        overflow: -moz-scrollbars-vertical;
                        overflow-y: scroll;
                    }
            
                    *,
                    *:before,
                    *:after {
                        box-sizing: inherit;
                    }
            
                    body {
                        margin: 0;
                        background: #fafafa;
                    }
                </style>
            </head>
            
            <body>
                <div id="swagger-ui"></div>
                <script src="./docs/static/swagger-ui-bundle.js"> </script>
                <script src="./docs/static/swagger-ui-standalone-preset.js"> </script>
                <script src="./docs/static/swagger-ui-init.js">
                </script>
            </body>
            </html>
        `)
    }

    handleServeFiles(request, response) {
        const file = request.params.file

        if (file == 'swagger-ui-init.js') {
            const initOptions = { swaggerDoc: swaggerSpecs }
            const scriptString = this.getInitFunction().replace('<% swaggerOptions %>', `var options = ` + JSON.stringify(initOptions))

            response.set('Content-Type', 'application/javascript')
            response.send(scriptString)
        } else {
            response.sendFile(swaggerUiAssetPath + '/' + file)
        }
    }

    getInitFunction() {
        return `window.onload = function() {
            var url = window.location.search.match(/url=([^&]+)/);
            if (url && url.length > 1) {
            url = decodeURIComponent(url[1]);
            } else {
            url = window.location.origin;
            }
            <% swaggerOptions %>
            url = options.swaggerUrl || url
            console.log(url)
            var customOptions = options.customOptions
            var spec1 = options.swaggerDoc
            var swaggerOptions = {
            spec: spec1,
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
            }
            for (var attrname in customOptions) {
            swaggerOptions[attrname] = customOptions[attrname];
            }
            var ui = SwaggerUIBundle(swaggerOptions)
            
            window.ui = ui
        }`
    }
}

module.exports = DocumentationController