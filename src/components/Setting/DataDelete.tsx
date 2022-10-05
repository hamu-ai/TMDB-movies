import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { useAuth } from "src/hook/AuthContext";

const DataDelete: FC = () => {
  const { erase } = useAuth();
  const [opened, { close, open }] = useDisclosure(false);
  const [on, setOn] = useState(true);

  const handleclick = () => {
    open();
    setTimeout(() => {
      setOn(false);
    }, 3000);
  };

  return (
    <div>
      {/*   　データ削除メニュー     */}
      <Button className=" bg-red-700 hover:bg-red-500" onClick={handleclick}>
        データ削除
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          setOn(true);
        }}
        size="auto"
        title="データを本当に削除しますか？"
      >
        {on ? (
          <Button className="bg-red-400  hover:bg-red-400 w-full mt-10">
            削除
          </Button>
        ) : (
          <Button
            className="bg-red-700 hover:bg-red-500  w-full mt-10"
            onClick={() => {
              erase();
              setOn(true);
            }}
          >
            削除
          </Button>
        )}
      </Modal>
    </div>
  );
};

export default DataDelete;
