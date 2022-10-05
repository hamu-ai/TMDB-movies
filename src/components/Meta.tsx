import Head from "next/head";
import { FC } from "react";

type Props = {
  title?: string;
  keywords?: string;
  description?: string;
};

const Meta: FC<Props> = ({ title, keywords, description }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/movie.png" />
      </Head>
    </div>
  );
};

export default Meta;
