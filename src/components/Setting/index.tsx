import { Button, Paper } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SettingConfirmation, SettingState } from "src/atom/MovieState";
import { useAuth } from "src/hook/AuthContext";

import Meta from "../Meta";
import DataDelete from "./DataDelete";
import SettingModal from "./SettingModal";
import SettingUpdata from "./SettingUpdata";

const SettingPage: FC = () => {
  const { singOut, user } = useAuth();
  const [profile, setProfile] = useState("");
  const [settingEmail] = useRecoilState(SettingState);
  const [update, setUpdate] = useState(false);
  const setCertification = useSetRecoilState(SettingConfirmation);

  //　ユーザーのメールアドレス
  useEffect(() => {
    if (user !== null) {
      setProfile(user.email!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingEmail]);

  return (
    <div className=" flex flex-col h-screen  justify-center max-w-lg mx-auto">
      <Meta title="設定" />
      <Toaster />
      <Paper shadow="xs" p="xl" className=" space-y-10 bg-white  ">
        <div className="flex space-x-4 text-black text-sm md:text-md lg:text-lg">
          <p>メールアドレス</p>
          <p>{profile}</p>
        </div>

        {/*   　メールアドレス変更     */}
        <Button
          className=" top-6 bg-gray-500 hover:bg-gray-700  font-bold cursor-pointer block "
          onClick={() => {
            setCertification(true);
            setUpdate(true);
          }}
        >
          メールアドレス変更
        </Button>

        {/*   　パスワード変更      */}
        <Button
          className="  bg-gray-500 hover:bg-gray-700 font-bold  cursor-pointer  "
          onClick={() => {
            setCertification(true);
            setUpdate(false);
          }}
        >
          パスワード変更
        </Button>

        {update ? (
          <SettingUpdata type={"email"} placeholder={"メールアドレス"} />
        ) : (
          <SettingUpdata type="password" placeholder={"パスワード"} />
        )}

        <SettingModal />

        {/*    　ログアウト      */}
        <div>
          <Button onClick={() => singOut()}>ログアウト</Button>
        </div>

        {/* データ削除 */}
        <div className="flex justify-end">
          <DataDelete />
        </div>
      </Paper>
    </div>
  );
};

export default SettingPage;
