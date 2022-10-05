import { Button, Modal } from "@mantine/core";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { SettingUpdate } from "src/atom/MovieState";
import { useAuth } from "src/hook/AuthContext";

type Props = {
  type: string;
  placeholder: string;
};

const SettingUpdata: FC<Props> = ({ type, placeholder }) => {
  const { updataMail, updataPassword } = useAuth();
  const [text, setText] = useState("");
  const [settingUpdata, setSettingUpdata] = useRecoilState(SettingUpdate);

  const handleClick = () => {
    if (type === "email") {
      updataMail(text);
      setSettingUpdata(false);
    } else {
      updataPassword(text);
      setSettingUpdata(false);
    }
  };

  return (
    <div className="space-y-7 ">
      <div className="space-y-7">
        <Modal
          opened={settingUpdata}
          onClose={() => {
            setSettingUpdata(false);
          }}
          title="アクセス確認しました"
        >
          <div className="space-y-6 py-10 ">
            <div>
              <label>{`${placeholder}を入力してください`}</label>
              <input
                placeholder={placeholder}
                type={type}
                required
                className="min-w-full"
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <Button
              className="min-w-full hover:bg-blue-500"
              onClick={handleClick}
            >
              変更する
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SettingUpdata;
