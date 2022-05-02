# strapi-provider-upload-uploadcare

## Configurations

Your configuration is passed down to the uploadcare configuration. (e.g: `UploadClient({})`). You can see the complete list of options [here](https://github.com/uploadcare/uploadcare-upload-client#high-level-api)

See the [using a provider](https://strapi.io/documentation/v3.x/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/v3.x/concepts/configurations.html#environment-variables) for setting and using environment variables in your configs.

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'strapi-provider-upload-uploadcare',
    providerOptions: {
      public_key: env('UPLOADCARE_PUBLIC_KEY'),
      // secret_key: env('UPLOADCARE_SECRET_KEY'),
      // base_cdn: env('UPLOADCARE_BASE_CDN'),
    },
  },
  // ...
});
```

https://github.com/uploadcare/uploadcare-upload-client#settings

`public_key: string`
The main use of a `public_key` is to identify a target project for your uploads. It is required when using Upload API.

`base_cdn: string`
Defines your schema and CDN domain. Can be changed to one of the predefined values (https://ucarecdn.com/) or your custom CNAME.

Defaults to `https://ucarecdn.com/`.

### Middleware Update
We must tweak security settings to allow media files coming from UploadCare.
Create a new file `config/middlewares.js` and set the following:

```js
module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "ucarecdn.com"],
          "media-src": ["'self'", "data:", "blob:", "ucarecdn.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  'strapi::session',
  "strapi::favicon",
  "strapi::public",
];
```

> Feel free to change the `src` url based on your CDN url

## Resources

- [License](LICENSE)
