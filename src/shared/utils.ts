import { AuthState } from "shared/interfaces/amplify.interface";

/**
 * This function is used to control if the received
 * state is equal to the signedIn value.
 *
 * TODO: We can use lazy loading based on the return of isAuthenticated function.
 * Until the user is not connected we don't load unecessary component,
 * basically the App components in this context.
 * @param {string} state authState returned by onStateChange
 */
export const isAuthenticated = (state: string) => {
  return state === AuthState.SIGNED_IN;
};