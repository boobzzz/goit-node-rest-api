import gravatar from "gravatar";

export const getUserAvatarURL = (email) => {
    return gravatar.url(email);
}
