var registerTask = require('../../lib/register-task');
var getShipit = require('../../lib/get-shipit');

module.exports = function (gruntOrShipit) {
  var task = function task() {
    var shipit = getShipit(gruntOrShipit);
    var server = Array.isArray(shipit.config.servers) ? shipit.config.servers[0] : shipit.config.servers;
    var cmd = [
      'ssh',
      server,
      '-t',
        ['\'', 'cd', shipit.config.deployTo, ';bash --login', '\''].join(' ')
    ];
    return shipit.local(cmd.join(' '));
  };

  registerTask(gruntOrShipit, 'ssh', task);
};
