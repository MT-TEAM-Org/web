const generateVerificationEmail = (email: string) => {
  return `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PlayHive 인증 메일</title>
    <style>
      @font-face {
        font-family: "SUIT Variable";
        font-style: normal;
        font-weight: 100 900;
        src: url("https://cdn.jsdelivr.net/gh/sun-typeface/SUIT/fonts/variable/woff2/SUIT-Variable.woff2")
          format("woff2");
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: 'SUIT Variable', Arial, 'Apple SD Gothic Neo',
        'Malgun Gothic', sans-serif;
    "
  >
    <div
      style="
        width: 728px;
        margin: 0 auto;
        background-color: white;
        padding: 80px 40px 40px;
        box-sizing: border-box;
      "
    >
      <div
        style="
          margin: 0 auto;
          max-width: 648px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        "
      >
        <header
          style="
            width: 475.49px;
            display: flex;
            gap: 16px;
            align-items: center;
            margin: 0;
            box-sizing: border-box;
          "
        >
          <div style="max-width: 118.49px; height: 32px">
            <img
              src="https://playhive.com/Logo.svg"
              alt="PlayHive"
              style="width: 100%; height: 100%; object-fit: cover"
            />
          </div>
          <p
            style="
              color: #00adee;
              font-size: 16px;
              margin: 0;
              font-weight: 700;
              letter-spacing: -0.06em;
              line-height: 100%;
            "
          >
            모두 함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!
          </p>
        </header>

        <div
          style="
            max-width: 648px;
            height: 88px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          "
        >
          <h5
            style="
              font-size: 28px;
              font-weight: bold;
              line-height: 40px;
              color: #000;
              margin: 0;
              letter-spacing: -0.04em;
            "
          >
            플레이하이브 회원가입을 위한 이메일 인증번호
          </h5>
          <p
            style="
              font-size: 14px;
              font-weight: 500;
              line-height: 20px;
              color: #424242;
              margin: 0;
            "
          >
            안녕하세요. ${email}님,<br />
            5분 이내로 아래 인증 번호를 입력하여 이메일 주소 인증을 완료하세요.
          </p>
        </div>

        <div>
          <div style="margin-bottom: 4px; color: #444">
            <span
              style="
                font-weight: 700;
                font-size: 20px;
                line-height: 36px;
                letter-spacing: -0.02em;
              "
              >인증 번호</span
            >
          </div>
          <div
            style="
              font-size: 40px;
              font-weight: bold;
              color: #00adee;
              background-color: #f2faff;
              padding: 16px;
              margin-bottom: 24px;
            "
          >
            1234
          </div>
          <p
            style="
              margin: 0;
              font-size: 14px;
              color: #424242;
              line-height: 20px;
              font-weight: 500;
              letter-spacing: -0.02em;
            "
          >
            본 메일은 발신전용으로 회신하실 경우 답변이 되지 않습니다. 자세한
            사항은
            <a
              href="https://playhive.co.kr/customer"
              style="color: #00aaee; text-decoration: underline"
              >플레이하이브 고객센터</a
            >를 이용하세요.
          </p>
        </div>
      </div>
    </div>

    <footer
      style="
        background-color: #000;
        color: white;
        padding: 40px 40px 0;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      "
    >
      <div style="max-width: 648px; margin: 0 auto">
        <div style="display: flex; flex-direction: column; gap: 24px">
          <div
            style="
              width: 148.62px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <img
              src="https://playhive.com/LogoWhite.svg"
              alt="PlayHive"
              style="width: 100%; height: 100%; object-fit: cover"
            />
          </div>
          <p
            style="
              font-weight: 500;
              font-size: 24px;
              line-height: 38px;
              letter-spacing: -0.04em;
              margin: 0;
            "
          >
            열정적으로 응원하고 서로를 존중하며<br />
            <span style="font-weight: 700">
              모두 함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!
            </span>
          </p>
          <p
            style="
              font-weight: 500;
              font-size: 16px;
              line-height: 24px;
              letter-spacing: -0.02em;
              color: #a6a6a6;
              margin: 0;
            "
          >
            서비스명: PlayHive · 대표: 홍길표 · 개인정보 보호책임자: 홍길표<br />
            콘텐츠 내용에 대한 저작권 및 법적 책임은 자료제공자 또는 글쓴이에
            있으며 PlayHive의 입장과 다를 수 있습니다.
          </p>
        </div>
      </div>
      <div
        style="
          width: 100%;
          max-width: 648px;
          margin: 0 auto;
          height: 80px;
          color: #a6a6a6;
          display: flex;
          align-items: center;
          justify-content: left;
          border-top: 1px solid #424242;
        "
      >
        <p
          style="
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -0.02em;
            margin: 0;
          "
        >
          Copyright ⓒ PlayHive Co., Ltd All rights reserved.
        </p>
      </div>
    </footer>
  </body>
</html>
    `;
};

export default generateVerificationEmail;
