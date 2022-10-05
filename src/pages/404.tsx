import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className=" text-center mt-10 ">
      <h1>サイトがありません。</h1>
      <h2>3秒後にホームページに自動で戻ります。</h2>
      <div className="mt-10">
        ↓クリックしたらホームページに戻ります
        <p className="text-red-700 mt-5 ">
          <Link href="/">
            <a>ホームページ</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default NotFound;
