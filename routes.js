const routes = require('next-routes')();

 routes
 .add('/campaigns/new','/campaigns/New')
 .add('/campaigns/:address', '/campaigns/showCampaign')
 .add('/campaigns/:address/requests', '/campaigns/requests/index')
 .add('/campaigns/:address/requests/new', '/campaigns/requests/NewRequest');
module.exports = routes;