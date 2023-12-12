const protocol = 'http';
const host = "localhost";
// const host = '192.168.1.44';
const port = '4200';
const trailUrl = '/api/v1';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}`;
const endpoint = `${protocol}://${host}${port ? ':' + port : ''}${trailUrl}`;

export default {
  endpoint: endpoint,
  hostUrl: hostUrl,
};
