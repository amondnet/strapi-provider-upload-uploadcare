"use strict";

/**
 * Module dependencies
 */

    // Public node modules.
const uploadcare = require('@uploadcare/upload-client').default;
const {errors} = require('strapi-plugin-upload');

module.exports = {
  init(providerOptions) {
    const client = new uploadcare({publicKey: providerOptions.public_key});
    return {
      upload: (file, customConfig = {}) => {
        return new Promise((resolve, reject) => {
          client
              .uploadFile(file)
              .then(image => {
                console.log(image.uuid);

                // file.previewUrl = image.cdnUrl;
                file.url = image.cdnUrl;

                file.provider_metadata = {
                  uuid: image.uuid,
                  original_filename: image.originalFilename,
                  image_info: image.imageInfo,
                };
                resolve();
              }, (err) => {
                if (err) {
                  if (err.message.includes('File size too large')) {
                    return reject(errors.entityTooLarge());
                  }
                  return reject(errors.unknownError(`Error uploading to uploadcare: ${err.message}`));
                }
              })

        });
      }, delete: (file) => {
        return new Promise((resolve, reject) => {
        });
      },
    };
  },
};
