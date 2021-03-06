# Ghost on CF

This is a repository that provides some wrapper functionality to deploy [ghost](https://github.com/TryGhost/Ghost) to [Cloud Foundry](cloudfoundry.org).

It is strikingly similar to the [cobyism/ghost-on-heroku](https://github.com/cobyism/ghost-on-heroku) project referenced below - but was developed independently.

The versions are all locked in, but ghost continues to be under active development! Please keep that in mind

## Deploying

### Dependencies

 * A mysql service called `ghost-mysql`
 * A sendgrid service called `ghost-mail`

### AWS

This release expects either an s3 bucket or a [blobber](https://github.com/mikfreedman/blobber) endpoint, the following environment variables should be set

Either define these keys:

  * S3_ACCESS_KEY_ID
  * S3_ACCESS_SECRET_KEY
  * S3_BUCKET_NAME
  * S3_BUCKET_REGION
  * S3_ASSET_HOST_URL

Or these keys:

 * BLOBBER_API_KEY
 * BLOBBER_API_URL

### Local modifications

 * probably want to modify [manifest.yml](manifest.yml) to change things like app name, or to add a route
 * may want to modify [config.js](config.js) to remove mail configuration if that isn't an option in your environment

### TODO

 * Add support for GCP 
 * Add support for Database file storage
 * Get services by tag instead of name
 * Make the javascript more excellent

## References

* http://www.starkandwayne.com/blog/deploy-ghost-blog-to-cloud-foundry/ - Great reference, inspiration for creating this repo - starting to show its age a little!
* https://github.com/cobyism/ghost-on-heroku - One-button Heroku deploy for the Ghost blogging platform. http://cobyism.com/ghost-on-heroku
* https://www.ghostforbeginners.com/how-to-install-ghost-on-heroku/ - How To Install Ghost On Heroku
