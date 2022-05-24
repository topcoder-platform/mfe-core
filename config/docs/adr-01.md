# ADR-01 2022-05-06

- by brooke.souza@topcoder.com and chris.mccann@topcoder.com

We moved the source of the config json and routes txt files to source control
from the S3 server in order to simplify modifications.

There is no sensitive info in these files, so there is no need to host
them any differently in prod or dev envs.