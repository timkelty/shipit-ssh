var registerTask = require('../../lib/register-task');
var getShipit = require('../../lib/get-shipit');
var remoteInteractive = require('../../lib/remote-interactive');
var inquirer = require('bluebird-inquirer');

module.exports = function (gruntOrShipit) {
  var task = function task() {
    var shipit = getShipit(gruntOrShipit);
    shipit = remoteInteractive(shipit);
    var remoteCmd = ['cd', shipit.config.deployTo + ';', 'bash --login'].join(' ');
    var servers = Array.isArray(shipit.config.servers) ? shipit.config.servers : [shipit.config.servers];

    // Ask for server if multiple
    if (servers.length > 1) {

      return inquirer.prompt([{
        type: 'list',
        name: 'server',
        message: 'Choose a server',
        default: shipit.config.servers[0],
        choices: shipit.config.servers,
      }]).then(function(answers) {
        return shipit.remoteInteractive(answers.server, remoteCmd);
      });

    } else {
      return shipit.remoteInteractive(shipit.config.servers[0], remoteCmd);
    }

  };

  registerTask(gruntOrShipit, 'ssh', task);
};
