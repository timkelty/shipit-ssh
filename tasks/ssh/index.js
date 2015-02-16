var registerTask = require('../../lib/register-task');
var getShipit = require('../../lib/get-shipit');
var remoteInteractive = require('../../lib/remote-interactive');

module.exports = function (gruntOrShipit) {
  var task = function task() {
    var shipit = getShipit(gruntOrShipit);
    shipit = remoteInteractive(shipit);
    var remoteCmd = ['cd', shipit.config.deployTo + ';', 'bash --login'].join(' ');
    return shipit.remoteInteractive(remoteCmd);
  };

  registerTask(gruntOrShipit, 'ssh', task);
};
