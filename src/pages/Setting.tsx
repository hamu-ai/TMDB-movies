import { NextPage } from "next";
import {
  Button,
  Menu,
  Modal,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { SettingState } from "src/atom/MovieState";
import Meta from "src/components/Meta";
import { useAuth } from "src/hook/AuthContext";

const Setting: NextPage = () => {
  const { singOut, erase, user, updataMail, updataPassword } = useAuth();
  const [text, setText] = useState("");
  const [profile, setProfile] = useState("");
  const [password, setPassword] = useState("");
  const [opened, setOpened] = useState(false);
  const [emailupdate, setEmailUpdate] = useState(false);
  const [passwordupdate, setPasswordUpdate] = useState(false);
  const [setting, setSetting] = useRecoilState(SettingState);

  useEffect(() => {
    if (user !== null) {
      setProfile(user.email!);
    }
  }, [setting]);

  // ユーザーを再認証する
  const hndle = useCallback(() => {
    const credential = EmailAuthProvider.credential(user?.email!, password);
    reauthenticateWithCredential(user!, credential)
      .then(() => {
        toast.success("成功！");
      })
      .catch(() => {
        setEmailUpdate(false);
        setPasswordUpdate(false);
        toast.error("パスワードを間違えています。");
      });
  }, [user?.email!, password]);

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
          className="relative top-6 text-black font-bold cursor-pointer block "
          onClick={() => {
            setOpened(true);
            setEmailUpdate(true);
          }}
        >
          メールアドレス変更
        </Button>
        {emailupdate === true ? (
          <>
            <TextInput
              placeholder="メールアドレス"
              className="min-w-full"
              onChange={(e) => setText(e.target.value)}
            />

            <Button
              className="min-w-full hover:bg-blue-500"
              onClick={() => {
                updataMail(text), setEmailUpdate(false);
              }}
            >
              変更する
            </Button>
          </>
        ) : null}

        {/*   　パスワード変更      */}
        <Button
          className="relative top-6 text-black font-bold  cursor-pointer  "
          onClick={() => {
            setOpened(true);
            setPasswordUpdate(true);
          }}
        >
          パスワード変更
        </Button>
        {passwordupdate === true ? (
          <>
            <PasswordInput
              placeholder="パスワード"
              onChange={(e) => setText(e.target.value)}
            />

            <Button
              className="min-w-full hover:bg-blue-500"
              onClick={() => {
                updataPassword(text), setPasswordUpdate(false);
              }}
            >
              変更する
            </Button>
          </>
        ) : null}

        {/*   　モーダル      */}
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false), setEmailUpdate(false);
            setPasswordUpdate(false);
          }}
          title="アクセス確認"
        >
          <div className="space-y-6 py-10 ">
            <PasswordInput
              placeholder="パスワード"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="min-w-full bg-red-800 hover:bg-red-500"
              onClick={() => {
                hndle(), setOpened(false);
              }}
            >
              サインイン
            </Button>
          </div>
        </Modal>

        <div className="flex flex-col items-end space-y-6 mr-8">
          {/*   　ログアウト      */}
          <Button onClick={() => singOut()}>ログアウト</Button>

          {/*   　データ削除メニュー     */}
          <Menu shadow="md" width={216}>
            <Menu.Target>
              <Button className=" bg-red-700 hover:bg-red-500">
                データ削除
              </Button>
            </Menu.Target>
            <Menu.Dropdown className="bg-red-700 ">
              <Menu.Item onClick={() => erase()} className=" text-white">
                本当にデータ削除しますか？
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Paper>
    </div>
  );
};

export default Setting;
