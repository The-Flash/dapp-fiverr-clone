import { gql } from "@apollo/client";

export const UPLOAD_PROFILE_PHOTO_QUERY = gql`
    mutation UploadProfilePhoto($url: String!) {
        uploadProfilePhoto(url: $url)
    }
`;