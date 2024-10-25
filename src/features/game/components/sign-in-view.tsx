import { auth, database } from "@/firebase";
import { signInAnonymously } from "firebase/auth";
import { ref, set } from "firebase/database";
import { FormEvent, useCallback } from "react";

export function SignInView() {
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = Object.fromEntries(new FormData(e.currentTarget));
    const { user } = await signInAnonymously(auth);
    await set(ref(database, `users/${user.uid}`), {
      name,
      pos: { x: 0, y: 0 },
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" name="name" id="name" required />
        </label>
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
}
