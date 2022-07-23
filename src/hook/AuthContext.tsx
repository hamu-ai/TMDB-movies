import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "src/lib/firebase";

type Props = {
  singUp: (email: string, password: string) => Promise<void>;
  singIn: (email: string, password: string) => Promise<void>;
  singOut: () => Promise<void>;
};

const AuthContext = createContext<Props>({
  singUp: async () => {},
  singIn: async () => {},
  singOut: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type Child = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Child) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
        } else {
          // Not logged in...
          setLoading(false);
          router.push("/SingIn");
        }
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
  );

  const singUp = async (email: string, password: string) => {
    setLoading(false);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        router.push("/");
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const singIn = async (email: string, password: string) => {
    setLoading(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const singOut = async () => {
    setLoading(false);
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = {
    singUp,
    singIn,
    singOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>Loading</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
