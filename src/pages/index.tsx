import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

import HomePage from '@components/HomePage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Home() {
  return (
    <>
      <Head>
        <title>OMUK | 오늘 뭐먹지?</title>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&libraries=services,clusterer,drawing`}
        ></script>
      </Head>
      <HomeLayout content={<HomePage />} />
    </>
  );
}

export default Home;
