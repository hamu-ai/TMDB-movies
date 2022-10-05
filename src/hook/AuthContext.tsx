import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { SettingState } from "src/atom/MovieState";
import { auth } from "src/lib/firebase";

type Props = {
  user: User | null;
  singUp: (email: string, password: string) => Promise<void>;
  singIn: (email: string, password: string) => Promise<void>;
  singOut: () => Promise<void>;
  erase: () => void;
  updataMail: (text: string) => void;
  updataPassword: (text: string) => void;
};

const AuthContext = createContext<Props>({
  updataPassword: () => {},
  updataMail: () => {},
  erase: () => {},
  user: null,
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
  const setSetting = useSetRecoilState(SettingState);

  const router = useRouter();

  //  現在ログインしているユーザーを取得

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
          setUser(user);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(false);
          router.push("/SingIn");
        }
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
  );

  // パスワード変更
  const updataPassword = (text: string) => {
    if (text.length > 0) {
      updatePassword(user!, text)
        .then(() => {
          toast.success("パスワード変更しました。");
        })
        .catch(() => {
          toast.error("パスワード6桁以上入力してください");
        });
    } else {
      toast.error("入力してください");
    }
  };

  // メールアドレス変更
  const updataMail = (text: string) => {
    if (text.length > 0) {
      updateEmail(auth.currentUser!, text)
        .then(() => {
          toast.success("メールアドレス変更しました。");
          setSetting(true);
        })
        .catch(() => {
          toast.error("メールアドレス変更失敗しました。");
        });
      setSetting(false);
    } else {
      toast.error("入力してください");
    }
  };

  // ユーザー削除
  const erase = () => {
    deleteUser(user!)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // サインアップ
  const singUp = async (email: string, password: string) => {
    setLoading(false);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
        // ...
      })
      .catch(() => {
        alert("メールアドレスとパスワード６桁以上入力してください。");
      });
  };

  // サインイン
  const singIn = async (email: string, password: string) => {
    setLoading(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch(() => {
        alert("アカウントがありません。");
      });
  };

  // ログアウト
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
    user,
    erase,
    updataMail,
    updataPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>Loading</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
