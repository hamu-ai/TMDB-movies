import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Meta from "src/components/Meta";
import { useAuth } from "src/hook/AuthContext";
import { auth } from "src/lib/firebase";

import { NextPageWithLayout } from "./_app";

type Inputs = {
  email: string;
  password: string;
};

const Sngin: NextPageWithLayout = () => {
  const { singIn, singUp } = useAuth();
  const [login, setLogin] = useState(false);
  const [opened, setOpened] = useState(false);
  const [text, setText] = useState("");

  // パスワード再設定
  const handleClick = () => {
    if (text.length > 0) {
      sendPasswordResetEmail(auth, text)
        .then(() => {
          toast.success("メールを送信しました。", {
            duration: 2000,
          });
          setTimeout(() => setOpened(false), 2000);
        })
        .catch((error) => {
          toast.error("メールアドレスが間違えています。");
        });
    } else {
      toast.error("メールアドレスを入力してください!");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await singIn(email, password);
    } else {
      await singUp(email, password);
    }
  };
  return (
    <div className=" relative  h-screen ">
      <Toaster position="top-center" reverseOrder={false} />
      <Meta title="ログイン" />
      <Image
        src={"/movie.png"}
        layout="fill"
        className="object-cover "
        alt="error"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col h-screen justify-center  gap-y-4 max-w-xs md:max-w-md mx-auto"
      >
        <TextInput
          placeholder="メールアドレス"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-600 cursor-default">
            メールアドレス入力してください
          </p>
        )}
        <PasswordInput
          placeholder="パスワード6文字以上"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-600 cursor-default">
            6桁以上のパスワードを入力してください
          </p>
        )}

        <Button
          type="submit"
          onClick={() => setLogin(true)}
          className=" font-bold text-xl bg-red-700 hover:bg-red-500"
        >
          ログイン
        </Button>

        {/*    パスワード再設定の処理    */}
        <p
          className="text-sm m-0 text-right font-bold cursor-pointer text-blue-400 hover:text-blue-500"
          onClick={() => setOpened(true)}
        >
          パスワード忘れた場合
        </p>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="メールアドレス入力してください"
        >
          <TextInput
            placeholder="メールアドレス"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="submit"
            onClick={handleClick}
            className=" absolute right-5 bottom-5 font-bold text-xl bg-red-700 hover:bg-red-500 "
          >
            送信
          </Button>
        </Modal>

        {/*    サインアップ    */}
        <div className="flex gap-x-2 items-center">
          <p className="text-red-600 font-bold"> アカウントない場合</p>
          <button
            className="cursor-pointer text-red-700 hover:text-red-500"
            onClick={() => setLogin(false)}
            type="submit"
          >
            sing Up
          </button>
        </div>
      </form>
    </div>
  );
};

Sngin.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Sngin;
