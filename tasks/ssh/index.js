/* jshint unused:false */
var registerTask = require('../../lib/register-task');
var getShipit = require('../../lib/get-shipit');

module.exports = function (gruntOrShipit) {
  registerTask(gruntOrShipit, 'ssh', task);


  function task() {
    var shipit = getShipit(gruntOrShipit);
  }
};
