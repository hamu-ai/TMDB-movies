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
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
        router.push("SingIn");
      }
    });
  });

  const singUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        router.push("/");
        // ...
      })
      .catch((error) => {
        console.log(error);

        // ..
      });
  };

  const singIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
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

  const singOut = async () => {
    await signOut(auth)
      .then(() => {
        // Signed in
        router.push("/Sngin");
        // ...
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
