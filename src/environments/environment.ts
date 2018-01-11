// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAJi_xcV2bQhoRr8KzCZpBASjo6wu76r9o",
    authDomain: "bike-stats-1d0a3.firebaseapp.com",
    databaseURL: "https://bike-stats-1d0a3.firebaseio.com",
    projectId: "bike-stats-1d0a3",
    storageBucket: "bike-stats-1d0a3.appspot.com",
    messagingSenderId: "230364289455"
  }
};
