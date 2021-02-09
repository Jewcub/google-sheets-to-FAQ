# Build the container 

GOOGLE_PROJECT_ID=google-sheets-to-faq 
CONTAINER_IMAGE_NAME=google-sheets-to-faq 
gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CONTAINER_IMAGE_NAME \
  --project=$GOOGLE_PROJECT_ID