import { Button, PasswordInput, TextInput } from "@mantine/core";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Meta from "src/components/Meta";
import { useAuth } from "src/hook/AuthContext";
import { NextPageWithLayout } from "./_app";

type Inputs = {
  email: string;
  password: string;
};

const Sngin: NextPageWithLayout = () => {
  const { singIn, singUp } = useAuth();
  const [login, setLogin] = useState(false);

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
    <div className=" relative w-screen h-screen ">
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
            6文字以上ののパスワードを入力してください
          </p>
        )}

        <Button
          type="submit"
          onClick={() => setLogin(true)}
          className=" font-bold text-xl bg-red-700 hover:bg-red-500"
        >
          ログイン
        </Button>
        <div className="flex gap-x-2 ">
          {"アカウントない場合"}
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
