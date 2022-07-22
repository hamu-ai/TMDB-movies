import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "src/hook/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

const Sngin: NextPage = () => {
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
      <Image
        src={"/movie.png"}
        layout="fill"
        className="object-cover"
        alt="error"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col h-screen justify-center  gap-y-4 max-w-xs md:max-w-md mx-auto"
      >
        <input
          type="email"
          required
          placeholder="メールアドレス"
          className=" border border-black bg-gray-600 cursor-default "
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-600 cursor-default">
            メールアドレス入力してください
          </p>
        )}
        <input
          type="password"
          placeholder="パスワード6文字以上"
          className=" border border-black bg-gray-600 cursor-default "
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-600 cursor-default">
            6文字以上ののパスワードを入力してください
          </p>
        )}

        <button
          type="submit"
          onClick={() => setLogin(true)}
          className=" font-bold text-xl bg-red-700 hover:bg-red-500"
        >
          ログイン
        </button>
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

export default Sngin;
