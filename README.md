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
    provider: 'uploadcare',
    providerOptions: {
      public_key: env('UPLOADCARE_PUBLIC_KEY'),
    },
  },
  // ...
});
```

## Resources

- [License](LICENSE)
