// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { headers } from "next/headers";
import { initializeServerApp } from "firebase/app";

import { firebaseConfig } from "./config";
import { initializeAuth } from "firebase/auth";

export async function getAuthenticatedAppForUser() {
  const idToken = headers().get("Authorization")?.split("Bearer ")[1];

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {}
  );

  const auth = initializeAuth(firebaseServerApp);
  //console.log('this is thhe auth object:', auth)
  await auth.authStateReady();
  console.log('this is thhe auth object:', auth)

  return { firebaseServerApp, currentUser: auth.currentUser };
}
