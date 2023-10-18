# #!/bin/bash

# # Setzen Sie den Namen Ihres S3-Buckets
# BUCKET_NAME=udacity-bucket-00001

# # Navigieren Sie zum Build-Verzeichnis
# cd ../dist

# # Hochladen der Dateien auf S3
# aws s3 sync . s3://$BUCKET_NAME/ --acl public-read

aws s3 cp --recursive ./dist s3://udacity-bucket-00001
