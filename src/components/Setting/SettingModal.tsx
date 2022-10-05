import { Button, Modal, PasswordInput } from "@mantine/core";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SettingConfirmation, SettingUpdate } from "src/atom/MovieState";
import { useAuth } from "src/hook/AuthContext";

const SettingModal: FC = () => {
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const setSettingUpdata = useSetRecoilState(SettingUpdate);
  const [certification, setCertification] = useRecoilState(SettingConfirmation);

  // ユーザーを再認証する
  const hndle = () => {
    const credential = EmailAuthProvider.credential(user?.email!, password);
    reauthenticateWithCredential(user!, credential)
      .then(() => {
        toast.success("成功！");
        setSettingUpdata(true);
      })
      .catch(() => {
        toast.error("パスワードを間違えています。");
      });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    []
  );
  return (
    <div>
      <Modal
        opened={certification}
        onClose={() => {
          setCertification(false);
        }}
        title="アクセス確認"
      >
        <div className="space-y-6 py-10 ">
          <PasswordInput placeholder="パスワード" onChange={handleChange} />
          <Button
            className="min-w-full bg-red-800 hover:bg-red-500"
            onClick={() => {
              hndle(), setCertification(false);
            }}
          >
            サインイン
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SettingModal;
