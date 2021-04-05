# Build the container 

GOOGLE_PROJECT_ID=doc2faq 
CONTAINER_IMAGE_NAME=kava-faq
gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CONTAINER_IMAGE_NAME \
  --project=$GOOGLE_PROJECT_ID