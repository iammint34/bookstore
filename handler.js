require('module-alias/register')
require("dotenv").config();
const Application = require('./app')
const logger = require('@helpers/logger');


Application.listen(process.env.PORT_LISTENER, process.env.HOST_LISTENER, () => {
    logger.log(`Server running at port ${process.env.PORT_LISTENER}`);
})
