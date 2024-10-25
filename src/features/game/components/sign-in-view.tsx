import { auth, database } from "@/firebase";
import { signInAnonymously } from "firebase/auth";
import { ref, set } from "firebase/database";
import { FormEvent, useCallback, useState } from "react";

export function SignInView() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { name } = Object.fromEntries(new FormData(e.currentTarget));
    const { user } = await signInAnonymously(auth);
    await set(ref(database, `users/${user.uid}`), {
      name,
      pos: { x: 0, y: 0 },
    });
    setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
