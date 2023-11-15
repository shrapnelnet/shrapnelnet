import DecodeJWT from "./DecodeJWT";
const rootURL = "https://wbjetausvsqfuudlrdpo.supabase.co"

export function getUsername() {
    return DecodeJWT()
        .then((res) => {
            return res.username
        })
}

export function getProfilePicture() {
    return DecodeJWT()
        .then((res) => {
            return `${rootURL}/storage/v1/object/public/profile-pictures${res.profilePicture}`
        })
}

export function getUID() {
    return DecodeJWT()
        .then((res) => {
            return res.uid
        })
}