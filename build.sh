# Build the container 

GOOGLE_PROJECT_ID=sheet-to-faq 
CONTAINER_IMAGE_NAME=sheet-to-faq
gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CONTAINER_IMAGE_NAME \
  --project=$GOOGLE_PROJECT_ID