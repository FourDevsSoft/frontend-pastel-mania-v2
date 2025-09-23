const hostname = window.location.hostname;

let apiUrl = 'http://apitemplate.fourdevs.com.br/api'; // api prod

if (hostname === 'https://apitemplate.fourdevs.com.br/') {// url do front  hml
  apiUrl = 'https://apitemplate.fourdevs.com.br/';// api hml
}

export const environment = {
  production: true,
  apiUrl,
  siteKey: '6LdLG4grAAAAAAoH5jvawTvnd4sVSNK3ZSOIsBaL'
};
