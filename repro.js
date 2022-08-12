const Docker = require('dockerode');

(async function() {
  const docker = new Docker()
  const stream = await docker.buildImage({
    context: __dirname,
    src: ['Dockerfile']
  })

  await new Promise((resolve, reject) => {
    docker.modem.followProgress(
      stream,
      (err, res) => {
        if (err) {
          console.error('error ->> ', err)
          reject(err)
        }
        else {
          console.log('successful response object ->>', res)
          console.log()
          console.log('followProgress successfully resolved')
          resolve(res)
        };
      },
    );
  });
})();

