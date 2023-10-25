# ADR-02 2023-10-25

We're going to do a mix of s3 and locally hosted configuration files.
We're going to host the configuration files locally on the repository for versioning purposes,
But at the build time we're going to fetch the specific configuration files based on the build env and overwrite the local version with what we have in s3.
This will allow us to enable/disable MFE apps by updating the s3 files and triggering a new build via the CircleCI.